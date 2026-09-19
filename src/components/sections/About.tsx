import { Section } from "@/components/layout/Section";
import type { Locale } from "@/lib/i18n";

const copy = {
  es: {
    eyebrow: "El evento",
    title: "Qué es un Student Community Day",
    intro:
      "La primera edición de Student Community Day en Bolivia: un día gratuito, liderado por estudiantes y respaldado por AWS en Cochabamba.",
    body: [
      "En lugar de una sola sala con una charla detrás de otra, el día está construido como varias experiencias ocurriendo al mismo tiempo. A las 11:10 hay cinco cosas pasando en paralelo, y vos elegís en cuál estar.",
      "Podés seguir un track de principio a fin, saltar entre salas según el tema, o pasar la mañana en un laboratorio construyendo algo. No hay una ruta correcta.",
    ],
    stats: [
      { value: "03", label: "Tracks en paralelo" },
      { value: "05", label: "Salas simultáneas" },
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
      "Instead of a single room with one talk after another, the day is built as several experiences running at once. At 11:10 there are five things happening in parallel, and you choose where to be.",
      "You can follow one track from start to finish, jump between rooms by topic, or spend the morning in a lab building something. There is no right path.",
    ],
    stats: [
      { value: "03", label: "Parallel tracks" },
      { value: "05", label: "Simultaneous rooms" },
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
