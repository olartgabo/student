import { accentFill } from "@/components/ui/accent";
import { eventDateLabel } from "@/content/event";
import type { AgendaTrack, AgendaTrackId, ScheduleTrackId } from "@/content/types";
import type { AgendaRow } from "@/lib/agenda";
import { formatRange } from "@/lib/agenda";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n";
import { NO_SESSION } from "@/lib/tba";

import { PlenaryRow } from "./PlenaryRow";
import { SessionCell } from "./SessionCell";

const copy = {
  es: {
    caption: `Programa completo del ${eventDateLabel.es.long}. Las columnas son las salas y el stream; las filas, los bloques horarios.`,
    time: "Hora",
    roomTbc: "Aula por confirmar",
  },
  en: {
    caption: `Full programme for ${eventDateLabel.en.long}. Columns are rooms and the stream; rows are time blocks.`,
    time: "Time",
    roomTbc: "Room to be confirmed",
  },
} as const;

/** The programme is a native table so parallel sessions remain visible together. */
export function AgendaTable({
  rows,
  tracks,
  activeTrack,
  locale,
}: {
  rows: readonly AgendaRow[];
  tracks: readonly AgendaTrack[];
  activeTrack: AgendaTrackId | null;
  locale: Locale;
}) {
  const t = copy[locale];
  const dimmed = (trackId: ScheduleTrackId) =>
    activeTrack !== null && activeTrack !== trackId;

  return (
    <div className="overflow-x-auto border border-slate-600">
      <table className="w-full min-w-[70rem] table-fixed border-separate border-spacing-0">
        <caption className="sr-only">{t.caption}</caption>
        <colgroup>
          <col className="w-28" />
          {tracks.map((track) => (
            <col key={track.id} />
          ))}
        </colgroup>
        <thead>
          <tr>
            <th scope="col" className="sticky top-18 z-20 bg-slate-900 p-4 text-left">
              <span className="font-display text-small text-slate-200">{t.time}</span>
            </th>
            {tracks.map((track) => (
              <th
                key={track.id}
                scope="col"
                data-dimmed={dimmed(track.id)}
                className="sticky top-18 z-20 border-l border-slate-600 bg-slate-900 p-4 text-left align-bottom transition-opacity duration-200 data-[dimmed=true]:opacity-35"
              >
                <span
                  className={cn(
                    "font-display inline-block px-1 text-[0.6875rem]",
                    accentFill[track.accent],
                  )}
                >
                  {track.code}
                </span>
                <span className="font-display text-small tracking-mono-caps mt-2 block text-white uppercase">
                  {track.shortName[locale]}
                </span>
                <span className="mt-1 block text-[0.6875rem] text-slate-200">
                  {track.room ?? t.roomTbc}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) =>
            row.kind === "plenary" ? (
              <tr key={row.block.id}>
                <th
                  scope="row"
                  className="border-t border-slate-600 p-4 text-left align-top"
                >
                  <span className="tabular font-display text-small text-slate-200">
                    {formatRange(row.block.time)}
                  </span>
                </th>
                <td
                  colSpan={tracks.length}
                  className="border-t border-l border-slate-600 bg-slate-800 p-4 align-top"
                >
                  <PlenaryRow block={row.block} locale={locale} />
                </td>
              </tr>
            ) : (
              <tr key={row.block.id}>
                <th
                  scope="row"
                  className="border-t border-slate-600 p-4 text-left align-top"
                >
                  <span className="tabular font-display text-small text-slate-200">
                    {formatRange(row.block.time)}
                  </span>
                  {row.block.label ? (
                    <span className="mt-2 block text-[0.6875rem] text-slate-200">
                      {row.block.label[locale]}
                    </span>
                  ) : null}
                  {row.block.note ? (
                    <span className="mt-2 block text-[0.6875rem] leading-4 text-slate-400">
                      {row.block.note[locale]}
                    </span>
                  ) : null}
                </th>
                {row.cells.map((cell) => {
                  if (cell.kind === "covered") return null;

                  return (
                    <td
                      key={cell.trackId}
                      rowSpan={cell.kind === "session" ? cell.rowSpan : undefined}
                      data-dimmed={dimmed(cell.trackId)}
                      className="min-h-28 border-t border-l border-slate-600 p-4 align-top transition-opacity duration-200 data-[dimmed=true]:opacity-35"
                    >
                      {cell.kind === "session" ? (
                        <SessionCell session={cell.session} locale={locale} />
                      ) : (
                        <>
                          <span aria-hidden className="text-slate-400">
                            —
                          </span>
                          <span className="sr-only">{NO_SESSION[locale]}</span>
                        </>
                      )}
                    </td>
                  );
                })}
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}
