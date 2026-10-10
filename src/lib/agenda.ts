import type { AgendaBlock, ScheduleTrackId, Session } from "@/content/types";

/**
 * Turns the authored agenda into a render-ready row/cell matrix.
 *
 * The former table view used row spans, so they are resolved up front for any
 * future matrix presentation:
 * a session spanning two blocks emits one cell in the first row and marks the
 * corresponding cell in the next row as covered so it is not rendered at all.
 */

export type AgendaCell =
  | { kind: "session"; trackId: ScheduleTrackId; session: Session; rowSpan: number }
  /** A room projecting a session that belongs to another track (`screenedIn`). */
  | { kind: "screening"; trackId: ScheduleTrackId; session: Session }
  | { kind: "empty"; trackId: ScheduleTrackId }
  | { kind: "covered"; trackId: ScheduleTrackId };

export type AgendaRow =
  | { kind: "plenary"; block: Extract<AgendaBlock, { kind: "plenary" }> }
  | {
      kind: "parallel";
      block: Extract<AgendaBlock, { kind: "parallel" }>;
      cells: AgendaCell[];
    };

export function deriveAgendaGrid(
  blocks: readonly AgendaBlock[],
  tracks: readonly { id: ScheduleTrackId }[],
): AgendaRow[] {
  const columns = tracks.map((t) => t.id);
  // blockIndex -> trackId -> true when a session from an earlier row covers it
  const covered = new Map<number, Set<ScheduleTrackId>>();

  const claim = (blockIndex: number, trackId: ScheduleTrackId) => {
    const set = covered.get(blockIndex) ?? new Set<ScheduleTrackId>();
    set.add(trackId);
    covered.set(blockIndex, set);
  };

  return blocks.map((block, index): AgendaRow => {
    if (block.kind === "plenary") return { kind: "plenary", block };

    const byTrack = new Map(block.sessions.map((s) => [s.trackId, s]));
    const screenedBy = new Map<ScheduleTrackId, Session>(
      block.sessions.flatMap((s) => (s.screenedIn ? [[s.screenedIn, s] as const] : [])),
    );

    const cells = columns.map((trackId): AgendaCell => {
      if (covered.get(index)?.has(trackId)) return { kind: "covered", trackId };

      const session = byTrack.get(trackId);
      if (!session) {
        const screened = screenedBy.get(trackId);
        return screened
          ? { kind: "screening", trackId, session: screened }
          : { kind: "empty", trackId };
      }

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
  tracks: readonly { id: ScheduleTrackId }[],
): string[] {
  const errors: string[] = [];
  const knownTracks = new Set<ScheduleTrackId>(tracks.map((t) => t.id));
  const seenIds = new Set<string>();

  blocks.forEach((block, index) => {
    if (seenIds.has(block.id)) errors.push(`bloque duplicado: "${block.id}"`);
    seenIds.add(block.id);

    if (toMinutes(block.time.end) <= toMinutes(block.time.start)) {
      errors.push(
        `"${block.id}" termina antes de empezar (${block.time.start}–${block.time.end})`,
      );
    }

    if (block.kind !== "parallel") {
      const usedTracks = new Set<ScheduleTrackId>();
      for (const session of block.sessions ?? []) {
        if (!knownTracks.has(session.trackId)) {
          errors.push(
            `"${session.id}" apunta a un track inexistente: "${session.trackId}"`,
          );
        }
        if (usedTracks.has(session.trackId)) {
          errors.push(`"${block.id}" tiene dos sesiones en el track "${session.trackId}"`);
        }
        usedTracks.add(session.trackId);
        if ((session.span ?? 1) !== 1) {
          errors.push(`"${session.id}" no puede extenderse desde un bloque plenario`);
        }
      }
      return;
    }

    const usedTracks = new Set<ScheduleTrackId>();
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

      if (session.screenedIn) {
        if (!knownTracks.has(session.screenedIn)) {
          errors.push(
            `"${session.id}" se proyecta en una sala inexistente: "${session.screenedIn}"`,
          );
        } else if (session.screenedIn === session.trackId) {
          errors.push(`"${session.id}" se proyecta en su propia sala`);
        } else if (block.sessions.some((other) => other.trackId === session.screenedIn)) {
          errors.push(
            `"${session.id}" se proyecta en "${session.screenedIn}", que ya tiene una sesión en "${block.id}"`,
          );
        }
      }

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

  // Each track runs one session at a time. Virtual talks carry their own times,
  // so they are checked against the clock rather than against the block rows.
  const slots = new Map<ScheduleTrackId, { id: string; start: number; end: number }[]>();
  blocks.forEach((block, index) => {
    for (const session of block.sessions ?? []) {
      const last = blocks[index + (session.span ?? 1) - 1] ?? block;
      const time = session.time ?? { start: block.time.start, end: last.time.end };
      const start = toMinutes(time.start);
      const end = toMinutes(time.end);
      if (end <= start) {
        errors.push(`"${session.id}" termina antes de empezar (${time.start}–${time.end})`);
      }
      const list = slots.get(session.trackId) ?? [];
      list.push({ id: session.id, start, end });
      slots.set(session.trackId, list);
    }
  });
  for (const [trackId, list] of slots) {
    const sorted = [...list].sort((a, b) => a.start - b.start);
    sorted.slice(1).forEach((current, i) => {
      const previous = sorted[i];
      if (previous && current.start < previous.end) {
        errors.push(
          `"${previous.id}" y "${current.id}" se superponen en el track "${trackId}"`,
        );
      }
    });
  }

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
