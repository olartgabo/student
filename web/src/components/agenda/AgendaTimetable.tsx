"use client";

import { useMemo, useState } from "react";

import { Tag } from "@/components/ui/Tag";
import { agenda } from "@/content/agenda";
import { tracks } from "@/content/tracks";
import type { TrackId } from "@/content/types";
import { deriveAgendaGrid } from "@/lib/agenda";

import { AgendaList } from "./AgendaList";
import { AgendaTable } from "./AgendaTable";

/**
 * The single client boundary for the programme. It owns the filter and feeds both
 * renderings.
 *
 * Both trees are always in the DOM, toggled with `hidden`/`lg:block`. That is
 * `display: none`, which removes a subtree from the accessibility tree and from
 * the focus order in every browser — so there is no duplicate-content problem, and
 * unlike a `useMediaQuery` swap it needs no SSR guess and cannot flash the wrong
 * layout or mismatch on hydration.
 */
export function AgendaTimetable() {
  const [activeTrack, setActiveTrack] = useState<TrackId | null>(null);
  const rows = useMemo(() => deriveAgendaGrid(agenda, tracks), []);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-2">
        <span className="font-display tracking-mono-caps mr-2 text-[0.6875rem] text-slate-200 uppercase">
          Filtrar
        </span>
        <Tag active={activeTrack === null} onClick={() => setActiveTrack(null)}>
          Todo
        </Tag>
        {tracks.map((track) => (
          <Tag
            key={track.id}
            active={activeTrack === track.id}
            onClick={() => setActiveTrack(activeTrack === track.id ? null : track.id)}
          >
            {track.shortName}
          </Tag>
        ))}
      </div>

      <div className="hidden lg:block">
        <AgendaTable rows={rows} tracks={tracks} activeTrack={activeTrack} />
      </div>

      <div className="lg:hidden">
        <AgendaList blocks={agenda} activeTrack={activeTrack} />
      </div>
    </div>
  );
}
