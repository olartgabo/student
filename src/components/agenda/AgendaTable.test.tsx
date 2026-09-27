import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { agenda, agendaTracks } from "@/content/agenda";
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
const tracks = agendaTracks.filter(
  (track) => track.id === "bisa" || track.id === "gessell",
);

describe("AgendaTable", () => {
  it("shows all rooms until a room filter is selected", () => {
    const all = renderToStaticMarkup(
      <AgendaTable rows={rows} tracks={tracks} activeTrack={null} locale="en" />,
    );
    const filtered = renderToStaticMarkup(
      <AgendaTable rows={rows} tracks={tracks} activeTrack="bisa" locale="en" />,
    );

    expect(all).toContain("<table");
    expect(all).toContain("Gessell Hall");
    expect(all).toContain("BISA talk");
    expect(all).toContain("Gessell talk");
    expect(filtered).toContain("BISA talk");
    expect(filtered).not.toContain("Gessell talk");
    expect(filtered).not.toContain("Gessell Hall");
    expect(filtered).toContain("Break");
  });

  it("keeps the late A1 and virtual talks in the full grid", () => {
    const programme = deriveAgendaGrid(agenda, agendaTracks);
    const all = renderToStaticMarkup(
      <AgendaTable
        rows={programme}
        tracks={agendaTracks}
        activeTrack={null}
        locale="es"
      />,
    );
    const a1 = renderToStaticMarkup(
      <AgendaTable rows={programme} tracks={agendaTracks} activeTrack="a1" locale="es" />,
    );

    expect(all).toContain("Cuando tu servidor desaparece");
    expect(all).toContain("Networking para IA");
    expect(all).toContain("Securing Serverless Enterprises");
    expect(a1).toContain("Networking para IA");
    expect(a1).not.toContain("Cuando tu servidor desaparece");
  });
});
