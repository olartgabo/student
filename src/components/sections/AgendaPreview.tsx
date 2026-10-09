import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { dayRhythm } from "@/content/agenda";
import { event } from "@/content/event";
import { speakerCta } from "@/content/nav";
import { localePath, type Locale } from "@/lib/i18n";

/** Cycled one-at-a-time down the list, the way the brand's agenda slide does it. */
const rowAccents = [
  "text-orange",
  "text-sky",
  "text-green",
  "text-purple",
  "text-sky",
  "text-green",
] as const;

const copy = {
  es: {
    title: "El ritmo del día",
    intro: `El registro abre a las 08:00 y el programa corre de ${event.startTime} a ${event.endTime}, con hasta cinco actividades simultáneas en cada bloque.`,
    note: "La agenda incluye salas presenciales y dos salas híbridas: Arquitectura 1 (español) y Arquitectura 2 (inglés).",
    fullAgenda: "Ver la agenda completa",
  },
  en: {
    title: "The shape of the day",
    intro: `Check-in opens at 08:00 and the programme runs from ${event.startTime} to ${event.endTime}, with up to five activities at once in each block.`,
    note: "The programme includes in-person rooms and two hybrid rooms: Architecture 1 (Spanish) and Architecture 2 (English).",
    fullAgenda: "See the full agenda",
  },
} as const;

export function AgendaPreview({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <Section id="agenda" eyebrow="Agenda" title={t.title} intro={t.intro}>
      <ol className="border-t border-slate-600" data-reveal-group>
        {dayRhythm.map((item, i) => (
          <li
            key={item.code}
            className="flex flex-wrap items-baseline gap-x-8 gap-y-2 border-b border-slate-600 py-6"
          >
            <span className={`font-display text-body w-8 ${rowAccents[i] ?? "text-sky"}`}>
              {item.code}
            </span>
            {/* A machine-readable local time: the same string a crawler needs and
                the same string the reader sees. */}
            <time
              dateTime={`${event.dateISO}T${item.time}:00${event.utcOffset}`}
              className="tabular font-display text-body w-20 text-slate-200"
            >
              {item.time}
            </time>
            <span className="font-display text-display-md text-white">
              {item.label[locale]}
            </span>
          </li>
        ))}
      </ol>

      <p className="mt-8 max-w-2xl text-slate-200" data-reveal>
        {t.note}
      </p>

      <div className="mt-6 flex flex-wrap gap-4" data-reveal>
        <Button href={localePath(locale, "/agenda")} variant="secondary">
          {t.fullAgenda}
        </Button>
        <Button href={speakerCta.href} variant="ghost">
          {speakerCta.label[locale]} <span aria-hidden>↗</span>
        </Button>
      </div>
    </Section>
  );
}
