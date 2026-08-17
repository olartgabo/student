import { accentFill } from "@/components/ui/accent";
import { eventDateLabel } from "@/content/event";
import type { Track, TrackId } from "@/content/types";
import type { AgendaRow } from "@/lib/agenda";
import { formatRange } from "@/lib/agenda";
import { cn } from "@/lib/cn";
import { NO_SESSION } from "@/lib/tba";

import { PlenaryRow } from "./PlenaryRow";
import { SessionCell } from "./SessionCell";

/**
 * A real <table>, not a CSS grid of divs.
 *
 * colSpan for the plenary rows and rowSpan for multi-block workshops are native
 * here, and `scope="col"` / `scope="row"` give screen readers the row and column
 * announcement on every cell for free. Note the display type is never overridden:
 * setting `display: grid` on a table drops its implicit ARIA roles in Chrome and
 * Firefox, which would trade the semantics away for nothing.
 */
export function AgendaTable({
  rows,
  tracks,
  activeTrack,
}: {
  rows: AgendaRow[];
  tracks: readonly Track[];
  activeTrack: TrackId | null;
}) {
  const dimmed = (trackId: TrackId) => activeTrack !== null && activeTrack !== trackId;

  return (
    // Deliberately no overflow wrapper. `overflow-x: auto` forces the computed
    // `overflow-y` to `auto` as well, which makes a scroll container and breaks the
    // sticky header — it would stick to the container, not the viewport. This table
    // only renders at lg and up, where 56rem fits the content width; narrower
    // viewports get AgendaList instead.
    <div>
      <table className="w-full min-w-[56rem] table-fixed border-separate border-spacing-0">
        <caption className="sr-only">
          Programa completo del {eventDateLabel.long}, de 08:00 a 18:00. Las columnas son
          los tracks y talleres; las filas, los bloques horarios.
        </caption>
        <colgroup>
          <col className="w-24" />
          {tracks.map((track) => (
            <col key={track.id} />
          ))}
        </colgroup>

        <thead>
          <tr>
            <th scope="col" className="sticky top-18 z-20 bg-slate-900 p-0">
              <span className="sr-only">Hora</span>
            </th>
            {tracks.map((track) => (
              <th
                key={track.id}
                scope="col"
                data-dimmed={dimmed(track.id)}
                className="sticky top-18 z-20 border-b border-l border-slate-600 bg-slate-900 p-4 text-left align-bottom transition-opacity duration-200 data-[dimmed=true]:opacity-35"
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
                  {track.shortName}
                </span>
                <span className="mt-1 block text-[0.6875rem] text-slate-200">
                  {track.room ?? "Aula por confirmar"}
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
                  <PlenaryRow block={row.block} />
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
                        <SessionCell session={cell.session} />
                      ) : (
                        <>
                          <span aria-hidden className="text-slate-400">
                            —
                          </span>
                          <span className="sr-only">{NO_SESSION}</span>
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
