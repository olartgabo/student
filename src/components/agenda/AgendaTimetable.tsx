"use client";

import { useMemo, useState } from "react";

import { Tag } from "@/components/ui/Tag";
import { agenda, agendaTracks } from "@/content/agenda";
import type { AgendaTrackId } from "@/content/types";
import { deriveAgendaGrid } from "@/lib/agenda";
import type { Locale } from "@/lib/i18n";

import { AgendaTable } from "./AgendaTable";

/** The single client boundary for filtering the programme by room or stream. */
const copy = {
  es: { filter: "Sala o stream", all: "Todo", showing: "Mostrando" },
  en: { filter: "Room or stream", all: "All", showing: "Showing" },
} as const;

export function AgendaTimetable({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [activeTrack, setActiveTrack] = useState<AgendaTrackId | null>(null);
  const rows = useMemo(() => deriveAgendaGrid(agenda, agendaTracks), []);

  return (
    <div>
      <div className="agenda-filters mb-8 flex flex-wrap items-center gap-2">
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

      <p aria-live="polite" className="text-small mb-4 text-slate-200">
        {t.showing}:{" "}
        {activeTrack === null
          ? t.all
          : agendaTracks.find((track) => track.id === activeTrack)?.name[locale]}
      </p>

      <AgendaTable
        rows={rows}
        tracks={agendaTracks}
        activeTrack={activeTrack}
        locale={locale}
      />
    </div>
  );
}
