import { describe, expect, it } from "vitest";

import { agenda, agendaTracks } from "@/content/agenda";
import { tracks } from "@/content/tracks";
import type { AgendaBlock } from "@/content/types";

import { deriveAgendaGrid, validateAgenda } from "./agenda";

describe("validateAgenda", () => {
  it("accepts the authored agenda", () => {
    expect(validateAgenda(agenda, agendaTracks)).toEqual([]);
  });

  it("places a fifteen-minute breakfast after the welcome and delays in-person sessions to 11:00", () => {
    const openingIndex = agenda.findIndex((block) => block.id === "opening");
    const opening = agenda[openingIndex];
    const breakfast = agenda[openingIndex + 1];
    const firstSessions = agenda.find((block) => block.id === "bloque-1");

    expect(opening?.time.end).toBe("09:15");
    expect(breakfast).toMatchObject({
      id: "breakfast",
      kind: "plenary",
      title: { es: "Desayuno", en: "Breakfast" },
      time: { start: "09:15", end: "09:30" },
    });
    expect(firstSessions).toMatchObject({
      id: "bloque-1",
      time: { start: "11:00", end: "11:40" },
    });
  });

  it("starts the morning Community Break at 12:30", () => {
    expect(agenda.find((block) => block.id === "break-1")?.time).toEqual({
      start: "12:30",
      end: "13:00",
    });
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
        title: { es: "Break", en: "Break" },
      },
    ] as const satisfies readonly AgendaBlock[];

    expect(validateAgenda(blocks, tracks)).toContainEqual(
      expect.stringContaining("bloque plenario"),
    );
  });

  it("rejects virtual talks that overlap on the same stream", () => {
    const blocks = [
      {
        kind: "parallel",
        id: "b1",
        time: { start: "09:00", end: "09:40" },
        sessions: [
          {
            id: "first",
            trackId: "ai",
            status: "tba",
            time: { start: "09:00", end: "09:40" },
          },
        ],
      },
      {
        kind: "plenary",
        id: "break",
        time: { start: "09:40", end: "10:00" },
        subtype: "break",
        title: { es: "Break", en: "Break" },
        sessions: [
          {
            id: "second",
            trackId: "ai",
            status: "tba",
            time: { start: "09:30", end: "10:10" },
          },
        ],
      },
    ] as const satisfies readonly AgendaBlock[];

    expect(validateAgenda(blocks, tracks)).toContainEqual(
      expect.stringContaining('"first" y "second" se superponen'),
    );
  });

  it("allows intentionally overlapping blocks in different rooms", () => {
    const blocks = [
      {
        kind: "plenary",
        id: "a",
        time: { start: "09:00", end: "10:00" },
        subtype: "opening",
        title: { es: "A", en: "A" },
      },
      {
        kind: "plenary",
        id: "b",
        time: { start: "09:30", end: "10:30" },
        subtype: "closing",
        title: { es: "B", en: "B" },
      },
    ] as const satisfies readonly AgendaBlock[];

    expect(validateAgenda(blocks, tracks)).toEqual([]);
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
