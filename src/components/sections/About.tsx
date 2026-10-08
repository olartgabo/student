import { Section } from "@/components/layout/Section";
import { organizerGroupsSentence } from "@/content/event";
import type { Locale } from "@/lib/i18n";

const copy = {
  es: {
    eyebrow: "El evento",
    title: "Qué es un Student Community Day",
    intro:
      "La primera edición de Student Community Day en Bolivia: un día gratuito, liderado por estudiantes y respaldado por AWS en Cochabamba.",
    body: [
      "En lugar de una sola sala con una charla detrás de otra, el día está construido como varias experiencias ocurriendo al mismo tiempo. Desde temprano hay charlas impresionantes, talleres y sesiones virtuales en paralelo, y vos elegís en cuál estar.",
      "Ya superamos las 900 personas registradas. También tendremos buses gratuitos para llegar al evento.",
      "Podés seguir un track de principio a fin, saltar entre salas según el tema, o pasar la mañana en un laboratorio construyendo algo. No hay una ruta correcta.",
    ],
    organizersLabel: "Organizan",
    organizers: `Los AWS Student Builder Groups de ${organizerGroupsSentence("es")}, juntos en un solo evento.`,
    stats: [
      { value: "05", label: "Salas presenciales" },
      { value: "02", label: "Streams virtuales" },
      { value: "09h", label: "De contenido" },
      { value: "Gratis", label: "Entrada" },
    ],
  },
  en: {
    eyebrow: "The event",
    title: "What a Student Community Day is",
    intro:
      "The first Student Community Day in Bolivia: a free, student-led day backed by AWS in Cochabamba.",
    body: [
      "Instead of a single room with one talk after another, the day is built as several experiences running at once. From early in the morning, great talks, workshops and virtual sessions run in parallel, and you choose where to be.",
      "More than 900 people have registered. Free buses will also be available to get to the event.",
      "You can follow one track from start to finish, jump between rooms by topic, or spend the morning in a lab building something. There is no right path.",
    ],
    organizersLabel: "Organized by",
    organizers: `The AWS Student Builder Groups of ${organizerGroupsSentence("en")}, together in one event.`,
    stats: [
      { value: "05", label: "In-person rooms" },
      { value: "02", label: "Virtual streams" },
      { value: "09h", label: "Of content" },
      { value: "Free", label: "Admission" },
    ],
  },
} as const;

export function About({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <Section id="evento" eyebrow={t.eyebrow} title={t.title} intro={t.intro}>
      <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
        <div className="text-body-lg max-w-2xl space-y-5 text-slate-200" data-reveal>
          {t.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="border-t border-slate-600 pt-5">
            <p className="font-display text-small tracking-mono-caps text-slate-200 uppercase">
              {t.organizersLabel}
            </p>
            <p className="mt-1 text-white">{t.organizers}</p>
          </div>
        </div>

        <dl
          className="grid grid-cols-2 gap-px border border-slate-600 bg-slate-600 sm:grid-cols-4 lg:w-80 lg:grid-cols-2"
          data-reveal-group
        >
          {t.stats.map((stat) => (
            <div key={stat.label} className="bg-slate-900 p-5">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="font-display text-display-md block text-white">
                  {stat.value}
                </span>
                <span
                  aria-hidden
                  className="font-display tracking-mono-caps mt-1 block text-[0.6875rem] text-slate-200 uppercase"
                >
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
