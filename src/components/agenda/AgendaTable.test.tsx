import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import type { AgendaBlock } from "@/content/types";
import { deriveAgendaGrid } from "@/lib/agenda";

import { AgendaTable } from "./AgendaTable";

const blocks = [
  {
    kind: "parallel",
    id: "morning",
    time: { start: "09:00", end: "09:40" },
    sessions: [
      { id: "bisa-talk", trackId: "bisa", status: "confirmed", title: "BISA talk" },
      {
        id: "gessell-talk",
        trackId: "gessell",
        status: "confirmed",
        title: "Gessell talk",
      },
    ],
  },
  {
    kind: "plenary",
    id: "break",
    time: { start: "09:40", end: "10:00" },
    subtype: "break",
    title: { es: "Pausa", en: "Break" },
  },
] as const satisfies readonly AgendaBlock[];

const rows = deriveAgendaGrid(blocks, [{ id: "bisa" }, { id: "gessell" }]);

describe("AgendaTable", () => {
  it("shows all rooms until a room filter is selected", () => {
    const all = renderToStaticMarkup(
      <AgendaTable rows={rows} activeTrack={null} locale="en" />,
    );
    const filtered = renderToStaticMarkup(
      <AgendaTable rows={rows} activeTrack="bisa" locale="en" />,
    );

    expect(all).toContain("BISA talk");
    expect(all).toContain("Gessell talk");
    expect(filtered).toContain("BISA talk");
    expect(filtered).not.toContain("Gessell talk");
    expect(filtered).toContain("Break");
  });
});
