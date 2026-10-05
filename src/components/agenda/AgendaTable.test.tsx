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
    expect(a1).toContain("Jose Matias Medinaceli Saavedra");
    expect(a1).not.toContain("Networking para IA");
    expect(a1).toContain("Cuando tu servidor desaparece");
  });

  it("mirrors a screened virtual talk into the room that projects it", () => {
    const screened = [
      {
        kind: "parallel",
        id: "stream",
        time: { start: "09:00", end: "09:40" },
        sessions: [
          {
            id: "remote",
            trackId: "virtual-en",
            status: "confirmed",
            title: "Remote talk",
            screenedIn: "gessell",
          },
        ],
      },
    ] as const satisfies readonly AgendaBlock[];
    const programme = deriveAgendaGrid(screened, agendaTracks);
    const room = renderToStaticMarkup(
      <AgendaTable
        rows={programme}
        tracks={agendaTracks}
        activeTrack="gessell"
        locale="es"
      />,
    );
    const stream = renderToStaticMarkup(
      <AgendaTable
        rows={programme}
        tracks={agendaTracks}
        activeTrack="virtual-en"
        locale="es"
      />,
    );

    expect(room).toContain("Remote talk");
    expect(room).toContain("Transmisión en vivo desde");
    expect(stream).toContain("También se transmite en");
  });

  it("shows the career panel roster and moderator", () => {
    const programme = deriveAgendaGrid(agenda, agendaTracks).filter(
      (row) => row.block.id === "career-panel",
    );
    const html = renderToStaticMarkup(
      <AgendaTable
        rows={programme}
        tracks={agendaTracks}
        activeTrack="bisa"
        locale="es"
      />,
    );

    expect(html).toContain("Silvana Gutierrez");
    expect(html).toContain("Gonzalo Alfaro");
    expect(html).toContain("Carlos Isaac Jaldin Benavides");
    expect(html).toContain("Victor Altamirano");
    expect(html).toContain("Moderador: Gabriel Olarte");
  });

  it("spans the career panel across every room and tags it with BISA", () => {
    const programme = deriveAgendaGrid(agenda, agendaTracks).filter(
      (row) => row.block.id === "career-panel",
    );
    const all = renderToStaticMarkup(
      <AgendaTable
        rows={programme}
        tracks={agendaTracks}
        activeTrack={null}
        locale="es"
      />,
    );
    const gessell = renderToStaticMarkup(
      <AgendaTable
        rows={programme}
        tracks={agendaTracks}
        activeTrack="gessell"
        locale="es"
      />,
    );

    expect(all).toContain(`colSpan="${agendaTracks.length}"`);
    expect(all).toContain(">BISA<");
    expect(gessell).not.toContain("Building Your Career Before Graduation");
  });
});
