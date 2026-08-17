import { Section } from "@/components/layout/Section";

const stats = [
  { value: "03", label: "Tracks en paralelo" },
  { value: "05", label: "Salas simultáneas" },
  { value: "09h", label: "De contenido" },
  { value: "Gratis", label: "Entrada" },
] as const;

export function About() {
  return (
    <Section
      id="evento"
      eyebrow="El evento"
      title="Qué es un Student Community Day"
      intro="Un día gratuito, liderado por estudiantes y respaldado por AWS. Charlas técnicas, laboratorios prácticos y la comunidad de Cochabamba en un mismo lugar."
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
        <div className="text-body-lg max-w-2xl space-y-5 text-slate-200" data-reveal>
          <p>
            En lugar de una sola sala con una charla detrás de otra, el día está
            construido como varias experiencias ocurriendo al mismo tiempo. A las 11:10
            hay cinco cosas pasando en paralelo, y vos elegís en cuál estar.
          </p>
          <p>
            Podés seguir un track de principio a fin, saltar entre salas según el tema, o
            pasar la mañana en un laboratorio construyendo algo. No hay una ruta correcta.
          </p>
        </div>

        <dl
          className="grid grid-cols-2 gap-px border border-slate-600 bg-slate-600 sm:grid-cols-4 lg:w-80 lg:grid-cols-2"
          data-reveal-group
        >
          {stats.map((stat) => (
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
