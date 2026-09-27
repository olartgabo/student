import { accentFill } from "@/components/ui/accent";
import { getAgendaTrack } from "@/content/agenda";
import type { AgendaBlock, AgendaTrackId } from "@/content/types";
import { formatRange } from "@/lib/agenda";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n";

import { PlenaryRow } from "./PlenaryRow";
import { SessionCell } from "./SessionCell";

/** A chronological agenda that preserves the programme's intentionally overlapping rooms. */
export function AgendaList({
  blocks,
  activeTrack,
  locale,
}: {
  blocks: readonly AgendaBlock[];
  activeTrack: AgendaTrackId | null;
  locale: Locale;
}) {
  return (
    <ol className="border-t border-slate-600">
      {blocks.map((block) => {
        const sessions =
          block.kind === "parallel"
            ? block.sessions.filter(
                (s) => activeTrack === null || s.trackId === activeTrack,
              )
            : [];

        if (block.kind === "parallel" && sessions.length === 0) return null;

        return (
          <li key={block.id}>
            <h3 className="sticky top-18 z-10 flex items-baseline gap-4 border-b border-slate-600 bg-slate-800 px-4 py-2">
              <span className="tabular font-display text-small text-white">
                {formatRange(block.time)}
              </span>
              {block.kind === "parallel" && block.label ? (
                <span className="truncate text-[0.6875rem] text-slate-200">
                  {block.label[locale]}
                </span>
              ) : null}
            </h3>

            {block.kind === "plenary" ? (
              <div className="border-b border-slate-600 p-4">
                <PlenaryRow block={block} locale={locale} />
              </div>
            ) : (
              <ul>
                {sessions.map((session) => {
                  const track = getAgendaTrack(session.trackId);
                  return (
                    <li
                      key={session.id}
                      className="flex gap-4 border-b border-slate-600 p-4"
                    >
                      <span
                        aria-hidden
                        className={cn("w-1 shrink-0", accentFill[track.accent])}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-display tracking-mono-caps mb-2 text-[0.6875rem] text-slate-200 uppercase">
                          {track.shortName[locale]}
                        </p>
                        <SessionCell session={session} locale={locale} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
            {block.kind === "parallel" && block.note ? (
              <p className="text-small border-b border-slate-600 px-4 py-3 text-slate-200">
                {block.note[locale]}
              </p>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
