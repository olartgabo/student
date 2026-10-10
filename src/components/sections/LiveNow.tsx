"use client";

import { useEffect, useState } from "react";

import { agenda } from "@/content/agenda";
import { event, eventEndISO, eventStartISO } from "@/content/event";
import { localePath, type Locale } from "@/lib/i18n";

type BisaStatus =
  | { phase: "live"; title: string }
  | { phase: "next"; title: string; start: string };

function bisaStatus(now: number): BisaStatus | null {
  let next: BisaStatus | null = null;
  for (const block of agenda) {
    if (block.kind !== "parallel") continue;
    const session = block.sessions.find((item) => item.trackId === "bisa");
    if (session?.status !== "confirmed") continue;
    const time = session.time ?? block.time;
    const start = new Date(`${event.dateISO}T${time.start}:00${event.utcOffset}`).getTime();
    const end = new Date(`${event.dateISO}T${time.end}:00${event.utcOffset}`).getTime();
    if (now >= start && now < end) return { phase: "live", title: session.title };
    if (now < start && next === null) {
      next = { phase: "next", title: session.title, start: time.start };
    }
  }
  return next;
}

export function LiveNow({ locale }: { locale: Locale }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setNow(Date.now());
    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  if (
    now === null ||
    now < new Date(eventStartISO).getTime() ||
    now >= new Date(eventEndISO).getTime()
  ) {
    return null;
  }

  const status = bisaStatus(now);
  if (!status) return null;

  return (
    <a
      href={localePath(locale, "/agenda")}
      className="border-green mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border bg-green/10 px-5 py-4 text-white transition-colors hover:bg-green/20"
    >
      <span className="font-display text-small tracking-mono-caps text-green flex items-center gap-2 uppercase">
        <span
          className={`size-2 rounded-full ${status.phase === "live" ? "bg-green motion-safe:animate-pulse" : "border border-green"}`}
          aria-hidden="true"
        />
        {status.phase === "live"
          ? locale === "es"
            ? "Escenario principal · En vivo ahora"
            : "Mainstage · Live now"
          : locale === "es"
            ? "Próximo en escenario principal"
            : "Up next on mainstage"}
      </span>
      <span className="text-small">
        {status.phase === "live"
          ? status.title
          : `${status.start} · ${status.title}`}
      </span>
    </a>
  );
}
