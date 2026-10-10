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
      <AgendaTable rows={programme} tracks={agendaTracks} activeTrack="d1" locale="es" />,
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
            trackId: "a2",
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
      <AgendaTable rows={programme} tracks={agendaTracks} activeTrack="a2" locale="es" />,
    );

    expect(room).toContain("Remote talk");
    expect(room).toContain("Transmisión en vivo desde");
    expect(stream).toContain("También se transmite en");
  });

  const panel = [
    {
      kind: "parallel",
      id: "career-panel",
      time: { start: "12:20", end: "13:00" },
      wide: true,
      sessions: [
        {
          id: "career",
          trackId: "bisa",
          status: "confirmed",
          title: "Building Your Career Before Graduation",
          speakers: ["Silvana Gutierrez", "Gonzalo Alfaro"],
          format: "panel",
          moderator: "Gabriel Olarte",
        },
        {
          id: "remote",
          trackId: "a1",
          status: "confirmed",
          title: "Remote talk",
          speakers: ["Jean Reyes"],
          time: { start: "12:35", end: "13:15" },
        },
        {
          id: "remote-en",
          trackId: "a2",
          status: "confirmed",
          title: "Remote English talk",
          time: { start: "12:50", end: "13:10" },
        },
      ],
    },
  ] as const satisfies readonly AgendaBlock[];

  it("shows the panel roster and moderator", () => {
    const html = renderToStaticMarkup(
      <AgendaTable
        rows={deriveAgendaGrid(panel, agendaTracks)}
        tracks={agendaTracks}
        activeTrack="bisa"
        locale="es"
      />,
    );

    expect(html).toContain("Silvana Gutierrez");
    expect(html).toContain("Gonzalo Alfaro");
    expect(html).toContain("Moderador: Gabriel Olarte");
  });

  it("spans a wide panel across the rooms and tags it with BISA", () => {
    const programme = deriveAgendaGrid(panel, agendaTracks);
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

    expect(all).toContain(`colSpan="${agendaTracks.length - 2}"`);
    expect(all).toContain("Jean Reyes");
    expect(all).toContain(">BISA<");
    expect(gessell).not.toContain("Building Your Career Before Graduation");
  });
});
