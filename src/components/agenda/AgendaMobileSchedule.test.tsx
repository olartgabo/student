import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { agenda, agendaTracks } from "@/content/agenda";
import type { AgendaBlock, Session } from "@/content/types";
import { deriveAgendaGrid } from "@/lib/agenda";

import { AgendaMobileSchedule } from "./AgendaMobileSchedule";

const rows = deriveAgendaGrid(agenda, agendaTracks);
const sessions: readonly Session[] = agenda.flatMap((block) =>
  "sessions" in block ? [...block.sessions] : [],
);
const text = (value: string) => renderToStaticMarkup(<>{value}</>);

describe("mobile agenda", () => {
  it("keeps every published session and its speakers in the all-rooms view", () => {
    const html = renderToStaticMarkup(
      <AgendaMobileSchedule rows={rows} tracks={agendaTracks} locale="es" />,
    );

    expect(html.match(/<article\b/g)).toHaveLength(sessions.length);
    for (const session of sessions) {
      if (session.status !== "confirmed") continue;
      expect(html).toContain(text(session.title));
      for (const name of session.speakers ?? []) expect(html).toContain(text(name));
      if (session.moderator) expect(html).toContain(text(session.moderator));
      if (session.time) {
        expect(html).toContain(`${session.time.start}–${session.time.end}`);
      }
    }
    expect(html).toContain("Diseño 2");
    expect(html).toContain("Registro + Community Expo");
    expect(html).toContain("Community Call + Networking");
  });

  it("keeps exactly the sessions belonging to each room when filtered", () => {
    for (const track of agendaTracks) {
      const html = renderToStaticMarkup(
        <AgendaMobileSchedule rows={rows} tracks={[track]} locale="en" />,
      );
      const expected = sessions.filter((session) => session.trackId === track.id);
      expect(html.match(/<article\b/g) ?? []).toHaveLength(expected.length);
      for (const session of sessions) {
        if (session.status !== "confirmed") continue;
        if (session.trackId === track.id) expect(html).toContain(text(session.title));
        else expect(html).not.toContain(text(session.title));
      }
      expect(html).toContain("Registration + Community Expo");
    }
  });

  it("shows a spanning workshop once, with its full duration, and mirrors screenings", () => {
    const blocks = [
      {
        kind: "parallel",
        id: "first",
        time: { start: "09:00", end: "09:40" },
        sessions: [
          {
            id: "workshop",
            trackId: "l22",
            status: "confirmed",
            title: "Long workshop",
            span: 2,
          },
          {
            id: "stream",
            trackId: "a2",
            status: "confirmed",
            title: "Remote session",
            screenedIn: "gessell",
          },
        ],
      },
      {
        kind: "parallel",
        id: "second",
        time: { start: "09:40", end: "10:20" },
        sessions: [],
      },
    ] as const satisfies readonly AgendaBlock[];
    const programme = deriveAgendaGrid(blocks, agendaTracks);
    const html = renderToStaticMarkup(
      <AgendaMobileSchedule rows={programme} tracks={agendaTracks} locale="en" />,
    );
    expect(html.match(/Long workshop/g)).toHaveLength(1);
    expect(html).toContain("09:00–10:20");
    expect(html.match(/Remote session/g)).toHaveLength(2);
    expect(html).toContain("Live screening from");
  });
});
