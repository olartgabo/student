import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { dayRhythm } from "@/content/agenda";
import { event } from "@/content/event";
import { speakerCta } from "@/content/nav";

/** Cycled one-at-a-time down the list, the way the brand's agenda slide does it. */
const rowAccents = [
  "text-orange",
  "text-sky",
  "text-green",
  "text-purple",
  "text-sky",
  "text-green",
] as const;

export function AgendaPreview() {
  return (
    <Section
      id="agenda"
      eyebrow="Agenda"
      title="El ritmo del día"
      intro={`El registro abre a las 08:00 y el programa corre de ${event.startTime} a ${event.endTime}, con hasta cinco actividades simultáneas en cada bloque.`}
    >
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
            <span className="font-display text-display-md text-white">{item.label}</span>
          </li>
        ))}
      </ol>

      <p className="mt-8 max-w-2xl text-slate-200" data-reveal>
        Los títulos de sesión se publican a medida que se confirman los speakers. La
        convocatoria sigue abierta.
      </p>

      <div className="mt-6 flex flex-wrap gap-4" data-reveal>
        <Button href="/agenda" variant="secondary">
          Ver la agenda completa
        </Button>
        <Button href={speakerCta.href} variant="ghost">
          {speakerCta.label} <span aria-hidden>↗</span>
        </Button>
      </div>
    </Section>
  );
}
