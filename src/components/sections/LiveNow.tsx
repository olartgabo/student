"use client";

import { useEffect, useState } from "react";

import { agenda } from "@/content/agenda";
import { event, eventEndISO, eventStartISO } from "@/content/event";
import { localePath, type Locale } from "@/lib/i18n";

function currentBisaSession(now: number): string | null {
  const block = agenda.find(({ time }) => {
    const start = new Date(`${event.dateISO}T${time.start}:00${event.utcOffset}`).getTime();
    const end = new Date(`${event.dateISO}T${time.end}:00${event.utcOffset}`).getTime();
    return now >= start && now < end;
  });

  if (block?.kind !== "parallel") return null;
  const session = block.sessions.find((item) => item.trackId === "bisa");
  return session?.status === "confirmed" ? session.title : null;
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

  const title = currentBisaSession(now);

  return (
    <a
      href={localePath(locale, "/agenda")}
      className="border-green mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border bg-green/10 px-5 py-4 text-white transition-colors hover:bg-green/20"
    >
      <span className="font-display text-small tracking-mono-caps text-green flex items-center gap-2 uppercase">
        <span className="bg-green size-2 rounded-full" aria-hidden="true" />
        {locale === "es" ? "En vivo ahora" : "Live now"}
      </span>
      <span className="text-small">
        {title
          ? `${title} · BISA`
          : locale === "es"
            ? "El evento está en marcha · Ver agenda actualizada ↗"
            : "The event is underway · See the updated programme ↗"}
      </span>
    </a>
  );
}
