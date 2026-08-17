import type { AgendaBlock, Session, Track, TrackId } from "@/content/types";

/**
 * Turns the authored agenda into a render-ready row/cell matrix.
 *
 * The timetable is a real <table>, so `rowSpan` has to be resolved up front:
 * a session spanning two blocks emits one cell in the first row and marks the
 * corresponding cell in the next row as covered so it is not rendered at all.
 */

export type AgendaCell =
  | { kind: "session"; trackId: TrackId; session: Session; rowSpan: number }
  | { kind: "empty"; trackId: TrackId }
  | { kind: "covered"; trackId: TrackId };

export type AgendaRow =
  | { kind: "plenary"; block: Extract<AgendaBlock, { kind: "plenary" }> }
  | {
      kind: "parallel";
      block: Extract<AgendaBlock, { kind: "parallel" }>;
      cells: AgendaCell[];
    };

export function deriveAgendaGrid(
  blocks: readonly AgendaBlock[],
  tracks: readonly Track[],
): AgendaRow[] {
  const columns = tracks.map((t) => t.id);
  // blockIndex -> trackId -> true when a session from an earlier row covers it
  const covered = new Map<number, Set<TrackId>>();

  const claim = (blockIndex: number, trackId: TrackId) => {
    const set = covered.get(blockIndex) ?? new Set<TrackId>();
    set.add(trackId);
    covered.set(blockIndex, set);
  };

  return blocks.map((block, index): AgendaRow => {
    if (block.kind === "plenary") return { kind: "plenary", block };

    const byTrack = new Map(block.sessions.map((s) => [s.trackId, s]));

    const cells = columns.map((trackId): AgendaCell => {
      if (covered.get(index)?.has(trackId)) return { kind: "covered", trackId };

      const session = byTrack.get(trackId);
      if (!session) return { kind: "empty", trackId };

      const rowSpan = session.span ?? 1;
      for (let offset = 1; offset < rowSpan; offset += 1) {
        claim(index + offset, trackId);
      }
      return { kind: "session", trackId, session, rowSpan };
    });

    return { kind: "parallel", block, cells };
  });
}

const toMinutes = (time: string): number => {
  const [h, m] = time.split(":").map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
};

/**
 * Structural invariants the type system cannot express. Asserted by a test so a
 * bad content edit fails `npm run check` rather than production.
 */
export function validateAgenda(
  blocks: readonly AgendaBlock[],
  tracks: readonly Track[],
): string[] {
  const errors: string[] = [];
  const knownTracks = new Set(tracks.map((t) => t.id));
  const seenIds = new Set<string>();

  blocks.forEach((block, index) => {
    if (seenIds.has(block.id)) errors.push(`bloque duplicado: "${block.id}"`);
    seenIds.add(block.id);

    if (toMinutes(block.time.end) <= toMinutes(block.time.start)) {
      errors.push(
        `"${block.id}" termina antes de empezar (${block.time.start}–${block.time.end})`,
      );
    }

    const previous = blocks[index - 1];
    if (previous && toMinutes(block.time.start) < toMinutes(previous.time.end)) {
      errors.push(`"${block.id}" empieza antes de que termine "${previous.id}"`);
    }

    if (block.kind !== "parallel") return;

    const usedTracks = new Set<TrackId>();
    for (const session of block.sessions) {
      if (!knownTracks.has(session.trackId)) {
        errors.push(
          `"${session.id}" apunta a un track inexistente: "${session.trackId}"`,
        );
      }
      if (usedTracks.has(session.trackId)) {
        errors.push(`"${block.id}" tiene dos sesiones en el track "${session.trackId}"`);
      }
      usedTracks.add(session.trackId);

      const span = session.span ?? 1;
      if (span < 1) errors.push(`"${session.id}" tiene un span inválido: ${span}`);
      for (let offset = 1; offset < span; offset += 1) {
        const target = blocks[index + offset];
        if (!target) {
          errors.push(`"${session.id}" se extiende más allá del final del día`);
        } else if (target.kind !== "parallel") {
          errors.push(
            `"${session.id}" se extiende sobre "${target.id}", que es un bloque plenario`,
          );
        }
      }
    }
  });

  // A cell may not be both covered by a span and filled by its own session.
  const grid = deriveAgendaGrid(blocks, tracks);
  grid.forEach((row) => {
    if (row.kind !== "parallel") return;
    const declared = new Set(row.block.sessions.map((s) => s.trackId));
    for (const cell of row.cells) {
      if (cell.kind === "covered" && declared.has(cell.trackId)) {
        errors.push(
          `"${row.block.id}" declara una sesión en "${cell.trackId}", pero esa celda ya está ocupada por un taller que se extiende desde un bloque anterior`,
        );
      }
    }
  });

  return errors;
}

/** "09:30–10:10" */
export const formatRange = (time: { start: string; end: string }): string =>
  `${time.start}–${time.end}`;

export const durationMinutes = (time: { start: string; end: string }): number =>
  toMinutes(time.end) - toMinutes(time.start);
