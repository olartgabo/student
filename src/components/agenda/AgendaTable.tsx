import { accentFill } from "@/components/ui/accent";
import { agendaTracks } from "@/content/agenda";
import type { AgendaTrackId } from "@/content/types";
import type { AgendaRow } from "@/lib/agenda";
import { formatRange } from "@/lib/agenda";
import type { Locale } from "@/lib/i18n";

import { PlenaryRow } from "./PlenaryRow";
import { SessionCell } from "./SessionCell";

const copy = {
  es: { empty: "No hay sesiones en este bloque." },
  en: { empty: "No sessions in this block." },
} as const;

/** A chronological list keeps every room readable at mobile and desktop widths. */
export function AgendaTable({
  rows,
  activeTrack,
  locale,
}: {
  rows: readonly AgendaRow[];
  activeTrack: AgendaTrackId | null;
  locale: Locale;
}) {
  const t = copy[locale];

  return (
    <ol className="agenda-schedule border-t border-slate-600">
      {rows.map((row, index) => {
        if (row.kind === "plenary") {
          return (
            <li
              key={row.block.id}
              className="grid gap-3 border-b border-slate-600 py-6 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-8"
            >
              <p className="tabular font-display text-small text-orange">
                {formatRange(row.block.time)}
              </p>
              <div className="border-orange border-l-2 pl-4">
                <PlenaryRow block={row.block} locale={locale} />
              </div>
            </li>
          );
        }

        const sessions = row.cells.filter(
          (cell) =>
            cell.kind === "session" &&
            (activeTrack === null || cell.trackId === activeTrack),
        );
        if (activeTrack !== null && sessions.length === 0) return null;

        return (
          <li
            key={row.block.id}
            className="grid gap-4 border-b border-slate-600 py-7 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-8"
          >
            <div>
              <p className="tabular font-display text-small text-sky">
                {formatRange(row.block.time)}
              </p>
              {row.block.label ? (
                <h2 className="font-display text-small mt-2 text-white">
                  {row.block.label[locale]}
                </h2>
              ) : null}
              {row.block.note ? (
                <p className="text-small mt-2 text-slate-200">{row.block.note[locale]}</p>
              ) : null}
            </div>
            <div
              className={`grid min-w-0 gap-3 ${activeTrack === null ? "sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}
            >
              {sessions.length === 0 ? (
                <p className="text-small text-slate-200">{t.empty}</p>
              ) : (
                sessions.map((cell) => {
                  if (cell.kind !== "session") return null;
                  const track = agendaTracks.find((item) => item.id === cell.trackId);
                  if (!track) return null;
                  const lastRow = rows[index + cell.rowSpan - 1];
                  const time = cell.session.time ?? {
                    start: row.block.time.start,
                    end: lastRow?.block.time.end ?? row.block.time.end,
                  };

                  return (
                    <article
                      key={cell.session.id}
                      className="min-w-0 border border-slate-600 bg-slate-800 p-4 md:p-5"
                    >
                      <div className="mb-4 flex items-center gap-2 border-b border-slate-600 pb-3">
                        <div className="flex min-w-0 items-center gap-2">
                          <span
                            aria-hidden
                            className={`size-2 shrink-0 ${accentFill[track.accent]}`}
                          />
                          <p className="font-display text-small text-white">
                            {track.name[locale]}
                          </p>
                        </div>
                      </div>
                      <SessionCell session={cell.session} time={time} locale={locale} />
                    </article>
                  );
                })
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
