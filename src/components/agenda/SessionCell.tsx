import { Badge } from "@/components/ui/Badge";
import { Tba } from "@/components/ui/Tba";
import { getSpeaker } from "@/content/speakers";
import { getAgendaTrack } from "@/content/agenda";
import type { Session } from "@/content/types";
import { accentFill } from "@/components/ui/accent";
import { cn } from "@/lib/cn";
import { TBA } from "@/lib/tba";
import type { Locale, Localized } from "@/lib/i18n";

const formatLabels: Record<NonNullable<Session["format"]>, Localized> = {
  charla: { es: "Charla", en: "Talk" },
  taller: { es: "Taller", en: "Workshop" },
  demo: { es: "Demo", en: "Demo" },
  panel: { es: "Panel", en: "Panel" },
  caso: { es: "Caso", en: "Case study" },
};

const levelLabels: Record<NonNullable<Session["level"]>, Localized> = {
  intro: { es: "intro", en: "intro" },
  intermedio: { es: "intermedio", en: "intermediate" },
  avanzado: { es: "avanzado", en: "advanced" },
};

export function SessionCell({ session, locale }: { session: Session; locale: Locale }) {
  const track = getAgendaTrack(session.trackId);
  const speakers =
    session.status === "confirmed"
      ? (session.speakerIds ?? []).map(getSpeaker).filter((s) => s?.confirmed)
      : [];

  return (
    <div className="flex h-full flex-col gap-3">
      <span aria-hidden className={cn("h-1 w-10 shrink-0", accentFill[track.accent])} />

      <div className="flex flex-wrap items-center gap-2">
        {session.time ? (
          <Badge color="neutral">
            {session.time.start}–{session.time.end}
          </Badge>
        ) : null}
        {session.format ? (
          <Badge color={track.accent}>{formatLabels[session.format][locale]}</Badge>
        ) : null}
        {session.level ? (
          <Badge color="neutral">{levelLabels[session.level][locale]}</Badge>
        ) : null}
        {session.remote ? <Badge color="neutral">Online</Badge> : null}
      </div>

      {session.status === "confirmed" ? (
        <>
          <p className="font-body font-medium text-white">{session.title}</p>
          {speakers.length > 0 ? (
            <p className="text-small text-slate-200">
              {speakers.map((s) => s?.name).join(", ")}
            </p>
          ) : session.speakers?.length ? (
            <p className="text-small text-slate-200">{session.speakers.join(", ")}</p>
          ) : null}
        </>
      ) : (
        <Tba label={session.placeholder?.[locale] ?? TBA[locale]} />
      )}
    </div>
  );
}
