"use client";

import { useState } from "react";

import { Tag } from "@/components/ui/Tag";
import { agenda, agendaTracks } from "@/content/agenda";
import type { AgendaTrackId } from "@/content/types";
import type { Locale } from "@/lib/i18n";

import { AgendaList } from "./AgendaList";

/** The single client boundary for filtering the programme by room or stream. */
const copy = {
  es: { filter: "Filtrar", all: "Todo" },
  en: { filter: "Filter", all: "All" },
} as const;

export function AgendaTimetable({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [activeTrack, setActiveTrack] = useState<AgendaTrackId | null>(null);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-2">
        <span className="font-display tracking-mono-caps mr-2 text-[0.6875rem] text-slate-200 uppercase">
          {t.filter}
        </span>
        <Tag active={activeTrack === null} onClick={() => setActiveTrack(null)}>
          {t.all}
        </Tag>
        {agendaTracks.map((track) => (
          <Tag
            key={track.id}
            active={activeTrack === track.id}
            onClick={() => setActiveTrack(activeTrack === track.id ? null : track.id)}
          >
            {track.shortName[locale]}
          </Tag>
        ))}
      </div>

      <AgendaList blocks={agenda} activeTrack={activeTrack} locale={locale} />
    </div>
  );
}
