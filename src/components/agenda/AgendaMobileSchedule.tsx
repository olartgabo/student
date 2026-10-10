import { Badge } from "@/components/ui/Badge";
import type { AgendaTrack, Session, TimeRange } from "@/content/types";
import type { AgendaRow } from "@/lib/agenda";
import { formatRange } from "@/lib/agenda";
import type { Locale } from "@/lib/i18n";
import { NO_SESSION } from "@/lib/tba";

import { PlenaryRow } from "./PlenaryRow";
import { SessionCell } from "./SessionCell";

/** The same programme as the desktop grid, with full-width sessions on phones. */
export function AgendaMobileSchedule({
  rows,
  tracks,
  locale,
  hideEmptyBlocks = false,
}: {
  rows: readonly AgendaRow[];
  tracks: readonly AgendaTrack[];
  locale: Locale;
  /** Drops parallel blocks with nothing to show for these tracks. */
  hideEmptyBlocks?: boolean;
}) {
  return (
    <ol className="space-y-6">
      {rows.map((row, index) => {
        const entries: {
          session: Session;
          track: AgendaTrack;
          time: TimeRange;
          screening?: boolean;
        }[] = [];

        for (const track of tracks) {
          if (row.kind === "plenary") {
            const session = row.block.sessions?.find((item) => item.trackId === track.id);
            if (session)
              entries.push({ session, track, time: session.time ?? row.block.time });
          } else {
            const cell = row.cells.find((item) => item.trackId === track.id);
            if (cell?.kind !== "session" && cell?.kind !== "screening") continue;
            const lastRow =
              cell.kind === "session" ? rows[index + cell.rowSpan - 1] : row;
            entries.push({
              session: cell.session,
              track,
              time: cell.session.time ?? {
                start: row.block.time.start,
                end: lastRow?.block.time.end ?? row.block.time.end,
              },
              screening: cell.kind === "screening",
            });
          }
        }

        // A room showing a concurrent talk keeps that talk in place of the
        // plenary, just as the filtered desktop table does.
        const showPlenary = row.kind === "plenary" && entries.length < tracks.length;
        if (hideEmptyBlocks && row.kind === "parallel" && entries.length === 0)
          return null;

        return (
          <li key={row.block.id} className="min-w-0">
            <div className="mb-3 border-b border-slate-600 pb-3">
              <p className="tabular font-display text-body font-medium text-white">
                {formatRange(row.block.time)}
              </p>
              {row.kind === "parallel" && row.block.label ? (
                <h2 className="font-body text-small mt-1 text-slate-200">
                  {row.block.label[locale]}
                </h2>
              ) : null}
              {row.kind === "parallel" && row.block.note ? (
                <p className="text-small mt-2 text-slate-200">{row.block.note[locale]}</p>
              ) : null}
            </div>

            <div className="space-y-3">
              {showPlenary && row.kind === "plenary" ? (
                <div className="border border-slate-600 bg-slate-800 p-4">
                  <PlenaryRow block={row.block} locale={locale} />
                </div>
              ) : null}
              {entries.map(({ session, track, time, screening }) => (
                <article
                  key={`${session.id}-${track.id}`}
                  className="min-w-0 rounded-sm border border-slate-600 bg-slate-900 p-4 [overflow-wrap:anywhere]"
                >
                  <div className="mb-4 border-b border-slate-600/60 pb-3">
                    <Badge color={track.accent}>{track.name[locale]}</Badge>
                  </div>
                  <SessionCell
                    session={session}
                    time={time}
                    locale={locale}
                    screening={screening}
                  />
                </article>
              ))}
              {!showPlenary && entries.length === 0 ? (
                <p className="text-small px-1 text-slate-200">{NO_SESSION[locale]}</p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
