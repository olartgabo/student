import { describe, expect, it } from "vitest";

import { agenda } from "@/content/agenda";
import { tracks } from "@/content/tracks";
import type { AgendaBlock } from "@/content/types";

import { deriveAgendaGrid, validateAgenda } from "./agenda";

describe("validateAgenda", () => {
  it("accepts the authored agenda", () => {
    expect(validateAgenda(agenda, tracks)).toEqual([]);
  });

  it("rejects two sessions in the same track within one block", () => {
    const blocks = [
      {
        kind: "parallel",
        id: "b",
        time: { start: "09:00", end: "09:40" },
        sessions: [
          { id: "x", trackId: "ai", status: "tba" },
          { id: "y", trackId: "ai", status: "tba" },
        ],
      },
    ] as const satisfies readonly AgendaBlock[];

    expect(validateAgenda(blocks, tracks)).toContainEqual(
      expect.stringContaining('dos sesiones en el track "ai"'),
    );
  });

  it("rejects a span that crosses a plenary block", () => {
    const blocks = [
      {
        kind: "parallel",
        id: "b1",
        time: { start: "09:00", end: "09:40" },
        sessions: [{ id: "w", trackId: "workshop-1", status: "tba", span: 2 }],
      },
      {
        kind: "plenary",
        id: "break",
        time: { start: "09:40", end: "10:00" },
        subtype: "break",
        title: "Break",
      },
    ] as const satisfies readonly AgendaBlock[];

    expect(validateAgenda(blocks, tracks)).toContainEqual(
      expect.stringContaining("bloque plenario"),
    );
  });

  it("rejects overlapping blocks", () => {
    const blocks = [
      {
        kind: "plenary",
        id: "a",
        time: { start: "09:00", end: "10:00" },
        subtype: "opening",
        title: "A",
      },
      {
        kind: "plenary",
        id: "b",
        time: { start: "09:30", end: "10:30" },
        subtype: "closing",
        title: "B",
      },
    ] as const satisfies readonly AgendaBlock[];

    expect(validateAgenda(blocks, tracks)).toContainEqual(
      expect.stringContaining("antes de que termine"),
    );
  });
});

describe("deriveAgendaGrid", () => {
  it("gives every parallel row one cell per track", () => {
    for (const row of deriveAgendaGrid(agenda, tracks)) {
      if (row.kind === "parallel") expect(row.cells).toHaveLength(tracks.length);
    }
  });

  it("marks the covered cell when a session spans two blocks", () => {
    const blocks = [
      {
        kind: "parallel",
        id: "b1",
        time: { start: "09:00", end: "09:40" },
        sessions: [{ id: "w", trackId: "workshop-1", status: "tba", span: 2 }],
      },
      {
        kind: "parallel",
        id: "b2",
        time: { start: "09:40", end: "10:20" },
        sessions: [{ id: "a", trackId: "ai", status: "tba" }],
      },
    ] as const satisfies readonly AgendaBlock[];

    const [first, second] = deriveAgendaGrid(blocks, tracks);
    if (first?.kind !== "parallel" || second?.kind !== "parallel") {
      throw new Error("expected two parallel rows");
    }

    const spanning = first.cells.find((c) => c.trackId === "workshop-1");
    expect(spanning).toMatchObject({ kind: "session", rowSpan: 2 });

    const covered = second.cells.find((c) => c.trackId === "workshop-1");
    expect(covered).toMatchObject({ kind: "covered" });

    // Tracks with nothing scheduled still get a cell, so no column collapses.
    expect(second.cells.find((c) => c.trackId === "security")).toMatchObject({
      kind: "empty",
    });
  });
});
