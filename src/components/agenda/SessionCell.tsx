import { Badge } from "@/components/ui/Badge";
import { Tba } from "@/components/ui/Tba";
import { getSpeaker } from "@/content/speakers";
import { getTrack } from "@/content/tracks";
import type { Session } from "@/content/types";
import { accentFill } from "@/components/ui/accent";
import { cn } from "@/lib/cn";

const formatLabels: Record<NonNullable<Session["format"]>, string> = {
  charla: "Charla",
  taller: "Taller",
  demo: "Demo",
  panel: "Panel",
  caso: "Caso",
};

export function SessionCell({ session }: { session: Session }) {
  const track = getTrack(session.trackId);
  const speakers =
    session.status === "confirmed"
      ? (session.speakerIds ?? []).map(getSpeaker).filter((s) => s?.confirmed)
      : [];

  return (
    <div className="flex h-full flex-col gap-3">
      <span aria-hidden className={cn("h-1 w-10 shrink-0", accentFill[track.accent])} />

      <div className="flex flex-wrap items-center gap-2">
        {session.format ? (
          <Badge color={track.accent}>{formatLabels[session.format]}</Badge>
        ) : null}
        {session.level ? <Badge color="neutral">{session.level}</Badge> : null}
        {session.remote ? <Badge color="neutral">Online</Badge> : null}
      </div>

      {session.status === "confirmed" ? (
        <>
          <p className="font-body font-medium text-white">{session.title}</p>
          {speakers.length > 0 ? (
            <p className="text-small text-slate-200">
              {speakers.map((s) => s?.name).join(", ")}
            </p>
          ) : null}
        </>
      ) : (
        <Tba label={session.placeholder} />
      )}
    </div>
  );
}
