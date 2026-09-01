import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { dayRhythm } from "@/content/agenda";

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
      intro="De 09:00 a 18:00, con hasta cinco actividades simultáneas en cada bloque."
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
            <span className="tabular font-display text-body w-20 text-slate-200">
              {item.time}
            </span>
            <span className="font-display text-display-md text-white">{item.label}</span>
          </li>
        ))}
      </ol>

      <div className="mt-10" data-reveal>
        <Button href="/agenda" variant="secondary">
          Ver la agenda completa
        </Button>
      </div>
    </Section>
  );
}
