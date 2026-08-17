import { accentFill } from "@/components/ui/accent";
import { getTrack } from "@/content/tracks";
import type { AgendaBlock, TrackId } from "@/content/types";
import { formatRange } from "@/lib/agenda";
import { cn } from "@/lib/cn";

import { PlenaryRow } from "./PlenaryRow";
import { SessionCell } from "./SessionCell";

/**
 * The narrow-screen reading of the same data: strictly chronological, time as a
 * sticky sub-header, one card per session.
 *
 * Plenary blocks ignore the track filter — opening, breaks, lunch, the panel and
 * the closing apply to everyone regardless of which track you are following.
 */
export function AgendaList({
  blocks,
  activeTrack,
}: {
  blocks: readonly AgendaBlock[];
  activeTrack: TrackId | null;
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
                  {block.label}
                </span>
              ) : null}
            </h3>

            {block.kind === "plenary" ? (
              <div className="border-b border-slate-600 p-4">
                <PlenaryRow block={block} />
              </div>
            ) : (
              <ul>
                {sessions.map((session) => {
                  const track = getTrack(session.trackId);
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
                          {track.shortName}
                        </p>
                        <SessionCell session={session} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      })}
    </ol>
  );
}
