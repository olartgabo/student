"use client";

import { useEffect, useRef, useState } from "react";

import { accentFill } from "@/components/ui/accent";
import { eventDateLabel } from "@/content/event";
import type { AgendaTrack, AgendaTrackId, Session, TimeRange } from "@/content/types";
import type { AgendaRow } from "@/lib/agenda";
import { formatRange } from "@/lib/agenda";
import type { Locale } from "@/lib/i18n";
import { NO_SESSION } from "@/lib/tba";

import { PlenaryRow } from "./PlenaryRow";
import { SessionCell } from "./SessionCell";

const copy = {
  es: {
    caption: `Programa completo del ${eventDateLabel.es.long}. Las columnas son las salas y el stream; las filas, los bloques horarios.`,
    time: "Hora",
    roomTbc: "Sala por confirmar",
    scroll: "Desplazá la tabla para ver todas las salas.",
    previous: "Ver salas anteriores",
    next: "Ver más salas",
  },
  en: {
    caption: `Full programme for ${eventDateLabel.en.long}. Columns are rooms and the stream; rows are time blocks.`,
    time: "Time",
    roomTbc: "Room to be confirmed",
    scroll: "Scroll the table to see every room.",
    previous: "See previous rooms",
    next: "See more rooms",
  },
} as const;

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
  const visibleTracks =
    activeTrack === null ? tracks : tracks.filter((track) => track.id === activeTrack);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    scroller.scrollLeft = 0;
    const update = () => {
      setCanScrollLeft(scroller.scrollLeft > 1);
      setCanScrollRight(
        scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - 1,
      );
    };
    update();
    scroller.addEventListener("scroll", update);
    const observer = new ResizeObserver(update);
    observer.observe(scroller);
    if (scroller.firstElementChild) observer.observe(scroller.firstElementChild);
    return () => {
      scroller.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [activeTrack]);

  /**
   * A plenary or wide row spans the room columns up to the first track that
   * keeps a virtual session running alongside it; those tracks get their own cells.
   */
  const concurrent = (sessions: readonly Session[], fallback: TimeRange) => {
    const byTrack = new Map(sessions.map((s) => [s.trackId, s]));
    const first = visibleTracks.findIndex((track) => byTrack.has(track.id));
    const span = first === -1 ? visibleTracks.length : first;
    const cells = visibleTracks.slice(span).map((track) => {
      const session = byTrack.get(track.id);
      return (
        <td
          key={track.id}
          className="min-w-0 border-t border-l border-slate-600 p-3 align-top [overflow-wrap:anywhere]"
        >
          {session ? (
            <SessionCell session={session} time={session.time ?? fallback} locale={locale} />
          ) : (
            <EmptyCell locale={locale} />
          )}
        </td>
      );
    });
    return { span, cells };
  };

  const scroll = (direction: -1 | 1) => {
    const scroller = scrollRef.current;
    if (scroller)
      scroller.scrollBy({
        left: direction * scroller.clientWidth * 0.75,
        behavior: "smooth",
      });
  };

  return (
    <div>
      {activeTrack === null && (canScrollLeft || canScrollRight) ? (
        <div className="agenda-scroll-controls mb-3 flex items-center justify-between gap-3">
          <p className="text-small text-slate-200">{t.scroll}</p>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              aria-label={t.previous}
              disabled={!canScrollLeft}
              onClick={() => scroll(-1)}
              className="border border-slate-600 px-3 py-1 text-white disabled:opacity-35"
            >
              ←
            </button>
            <button
              type="button"
              aria-label={t.next}
              disabled={!canScrollRight}
              onClick={() => scroll(1)}
              className="border border-slate-600 px-3 py-1 text-white disabled:opacity-35"
            >
              →
            </button>
          </div>
        </div>
      ) : null}
      <div
        ref={scrollRef}
        className="agenda-grid w-full min-w-0 overflow-x-auto overscroll-x-contain border border-slate-600"
        style={{ scrollbarGutter: "stable" }}
      >
        <table
          className={`agenda-table table-fixed border-separate border-spacing-0 ${activeTrack === null ? "w-full min-w-[80rem]" : "w-full"}`}
        >
          <caption className="sr-only">{t.caption}</caption>
          <colgroup>
            <col className="w-36" />
            {visibleTracks.map((track) => (
              <col key={track.id} className={activeTrack === null ? "w-40" : undefined} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th scope="col" className="sticky left-0 z-20 bg-slate-900 p-3 text-left">
                <span className="font-display text-small text-slate-200">{t.time}</span>
              </th>
              {visibleTracks.map((track) => (
                <th
                  key={track.id}
                  scope="col"
                  className="border-l border-slate-600 bg-slate-900 p-3 text-left align-bottom"
                >
                  <span
                    className={`font-display inline-block px-1 text-[0.6875rem] ${accentFill[track.accent]}`}
                  >
                    {track.code}
                  </span>
                  <span className="font-display text-small mt-2 block text-white">
                    {track.name[locale]}
                  </span>
                  <span className="text-small mt-1 block text-slate-200">
                    {track.room ?? t.roomTbc}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) =>
              row.kind === "plenary" ? (
                <tr key={row.block.id}>
                  <th
                    scope="row"
                    className="sticky left-0 z-10 border-t border-slate-600 bg-slate-900 p-3 text-left align-top"
                  >
                    <span className="tabular font-display text-small text-slate-200">
                      {formatRange(row.block.time)}
                    </span>
                  </th>
                  {(() => {
                    const { span, cells } = concurrent(
                      row.block.sessions ?? [],
                      row.block.time,
                    );
                    return (
                      <>
                        {span > 0 ? (
                          <td
                            colSpan={span}
                            className="border-t border-l border-slate-600 bg-slate-800 p-4 align-top"
                          >
                            <PlenaryRow block={row.block} locale={locale} />
                          </td>
                        ) : null}
                        {cells}
                      </>
                    );
                  })()}
                </tr>
              ) : row.block.wide &&
                row.block.sessions[0] &&
                (activeTrack === null ||
                  activeTrack === row.block.sessions[0].trackId) ? (
                <tr key={row.block.id}>
                  <th
                    scope="row"
                    className="sticky left-0 z-10 border-t border-slate-600 bg-slate-900 p-3 text-left align-top"
                  >
                    <span className="tabular font-display text-small text-slate-200">
                      {formatRange(row.block.time)}
                    </span>
                    {row.block.label ? (
                      <span className="text-small mt-2 block text-white">
                        {row.block.label[locale]}
                      </span>
                    ) : null}
                    {row.block.note ? (
                      <span className="mt-2 block text-[0.6875rem] leading-4 text-slate-200">
                        {row.block.note[locale]}
                      </span>
                    ) : null}
                  </th>
                  {(() => {
                    const [main, ...streams] = row.block.sessions;
                    if (!main) return null;
                    const { span, cells } = concurrent(streams, row.block.time);
                    return (
                      <>
                        <td
                          colSpan={Math.max(span, 1)}
                          className="border-t border-l border-slate-600 p-4 align-top"
                        >
                          <SessionCell
                            session={main}
                            time={main.time ?? row.block.time}
                            locale={locale}
                            wide
                          />
                        </td>
                        {cells}
                      </>
                    );
                  })()}
                </tr>
              ) : (
                <tr key={row.block.id}>
                  <th
                    scope="row"
                    className="sticky left-0 z-10 border-t border-slate-600 bg-slate-900 p-3 text-left align-top"
                  >
                    <span className="tabular font-display text-small text-slate-200">
                      {formatRange(row.block.time)}
                    </span>
                    {row.block.label ? (
                      <span className="text-small mt-2 block text-white">
                        {row.block.label[locale]}
                      </span>
                    ) : null}
                    {row.block.note ? (
                      <span className="mt-2 block text-[0.6875rem] leading-4 text-slate-200">
                        {row.block.note[locale]}
                      </span>
                    ) : null}
                  </th>
                  {visibleTracks.map((track) => {
                    const cell = row.cells.find((item) => item.trackId === track.id);
                    if (!cell || cell.kind === "covered") return null;
                    const lastRow =
                      cell.kind === "session" ? rows[index + cell.rowSpan - 1] : null;
                    const time: TimeRange =
                      cell.kind === "session"
                        ? (cell.session.time ?? {
                            start: row.block.time.start,
                            end: lastRow?.block.time.end ?? row.block.time.end,
                          })
                        : cell.kind === "screening"
                          ? (cell.session.time ?? row.block.time)
                          : row.block.time;
                    return (
                      <td
                        key={track.id}
                        rowSpan={cell.kind === "session" ? cell.rowSpan : undefined}
                        className="min-w-0 border-t border-l border-slate-600 p-3 align-top [overflow-wrap:anywhere]"
                      >
                        {cell.kind === "session" || cell.kind === "screening" ? (
                          <SessionCell
                            session={cell.session}
                            time={time}
                            locale={locale}
                            screening={cell.kind === "screening"}
                          />
                        ) : (
                          <EmptyCell locale={locale} />
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
    </div>
  );
}

function EmptyCell({ locale }: { locale: Locale }) {
  return (
    <>
      <span aria-hidden className="text-slate-400">
        —
      </span>
      <span className="sr-only">{NO_SESSION[locale]}</span>
    </>
  );
}
