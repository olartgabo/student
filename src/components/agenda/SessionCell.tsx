import { Badge } from "@/components/ui/Badge";
import { Tba } from "@/components/ui/Tba";
import { getSpeaker } from "@/content/speakers";
import { getAgendaTrack } from "@/content/agenda";
import type { Session, TimeRange } from "@/content/types";
import { TBA } from "@/lib/tba";
import type { Locale, Localized } from "@/lib/i18n";

const formatLabels: Record<NonNullable<Session["format"]>, Localized> = {
  charla: { es: "Charla", en: "Talk" },
  taller: { es: "Taller", en: "Workshop" },
  demo: { es: "Demo", en: "Demo" },
  panel: { es: "Panel", en: "Panel" },
  caso: { es: "Caso", en: "Case study" },
  lightning: { es: "Lightning talk", en: "Lightning talk" },
};

const levelLabels: Record<NonNullable<Session["level"]>, Localized> = {
  intro: { es: "intro", en: "intro" },
  intermedio: { es: "intermedio", en: "intermediate" },
  avanzado: { es: "avanzado", en: "advanced" },
};

export function SessionCell({
  session,
  time,
  locale,
  wide = false,
  screening = false,
}: {
  session: Session;
  time: TimeRange;
  locale: Locale;
  /** Full-width row: names the room with a tag and lays the roster out in a line. */
  wide?: boolean;
  /** This cell is a room projecting a session that belongs to another track. */
  screening?: boolean;
}) {
  const track = getAgendaTrack(session.trackId);
  const speakers =
    session.status === "confirmed"
      ? (session.speakerIds ?? []).map(getSpeaker).filter((s) => s?.confirmed)
      : [];

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Badge color="neutral">
          {time.start}–{time.end}
        </Badge>
        {session.format ? (
          <Badge color={track.accent}>{formatLabels[session.format][locale]}</Badge>
        ) : null}
        {session.level ? (
          <Badge color="neutral">{levelLabels[session.level][locale]}</Badge>
        ) : null}
        {session.remote ? <Badge color="neutral">Online</Badge> : null}
        {wide ? <Badge color={track.accent}>{track.shortName[locale]}</Badge> : null}
      </div>

      {screening ? (
        <p className="font-display tracking-mono-caps text-[0.6875rem] text-slate-200 uppercase">
          {locale === "es" ? "Transmisión en vivo desde" : "Live screening from"}{" "}
          {track.shortName[locale]}
        </p>
      ) : session.screenedIn ? (
        <p className="font-display tracking-mono-caps text-[0.6875rem] text-slate-200 uppercase">
          {locale === "es" ? "También se transmite en" : "Also screened in"}{" "}
          {getAgendaTrack(session.screenedIn).name[locale]}
        </p>
      ) : null}

      {session.status === "confirmed" ? (
        <>
          <h3 className="font-body text-body font-medium text-white">{session.title}</h3>
          {speakers.length > 0 ? (
            <p className="text-small text-slate-200">
              {speakers.map((s) => s?.name).join(", ")}
            </p>
          ) : session.speakers?.length ? (
            session.format === "panel" ? (
              <ul
                className={
                  wide
                    ? "text-small flex flex-wrap gap-x-6 gap-y-1 text-slate-200"
                    : "text-small space-y-1 text-slate-200"
                }
              >
                {session.speakers.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            ) : (
              <p className="text-small text-slate-200">{session.speakers.join(", ")}</p>
            )
          ) : null}
          {session.moderator ? (
            <p className="text-small text-slate-200">
              {locale === "es" ? "Moderador" : "Moderator"}: {session.moderator}
            </p>
          ) : null}
        </>
      ) : (
        <Tba label={session.placeholder?.[locale] ?? TBA[locale]} />
      )}
    </div>
  );
}
