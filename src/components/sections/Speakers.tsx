import Image from "next/image";

import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { speakerCta } from "@/content/nav";
import { speakers } from "@/content/speakers";

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function Speakers() {
  const confirmedSpeakers = speakers.filter((speaker) => speaker.confirmed);

  return (
    <Section
      id="speakers"
      eyebrow="Speakers"
      title={
        confirmedSpeakers.length > 0
          ? "Conocé a quienes suben al escenario"
          : "El line-up está en construcción"
      }
      intro={
        confirmedSpeakers.length > 0
          ? "Builders, estudiantes y profesionales que vienen a compartir lo que aprendieron haciendo."
          : "Publicaremos aquí a cada speaker apenas confirme su participación. Mientras tanto, la convocatoria sigue abierta."
      }
      tone="light"
    >
      {confirmedSpeakers.length > 0 ? (
        <div
          className="grid gap-px border border-slate-600/20 bg-slate-600/20 sm:grid-cols-2 lg:grid-cols-3"
          data-reveal-group
        >
          {confirmedSpeakers.map((speaker) => (
            <article key={speaker.id} className="bg-off-white p-6">
              {speaker.photo ? (
                <Image
                  src={speaker.photo}
                  alt=""
                  width={640}
                  height={640}
                  className="aspect-square w-full object-cover"
                />
              ) : (
                <div
                  className="bg-navy-900 font-display text-sky grid aspect-square place-items-center text-5xl"
                  aria-hidden
                >
                  {initials(speaker.name)}
                </div>
              )}
              <h3 className="font-display text-navy-900 mt-5 text-xl">{speaker.name}</h3>
              {speaker.role || speaker.org ? (
                <p className="text-small mt-1 text-slate-600">
                  {[speaker.role, speaker.org].filter(Boolean).join(" · ")}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      ) : (
        <div className="border-navy-900 grid border md:grid-cols-[10rem_1fr]" data-reveal>
          <div
            className="bg-navy-900 font-display text-sky flex min-h-36 items-center justify-center text-5xl"
            aria-hidden
          >
            CFP
          </div>
          <div className="bg-white p-7 md:p-9">
            <p className="font-display tracking-mono-caps text-purple text-small uppercase">
              Convocatoria abierta
            </p>
            <h3 className="font-display text-display-md text-navy-900 mt-3">
              Tu experiencia también puede ser una charla
            </h3>
            <p className="mt-3 max-w-2xl text-slate-600">
              Buscamos sesiones de 40 minutos y laboratorios prácticos para todos los
              niveles. No hace falta haber hablado antes en un evento.
            </p>
            <Button href={speakerCta.href} className="mt-6">
              {speakerCta.label} <span aria-hidden>↗</span>
            </Button>
          </div>
        </div>
      )}
    </Section>
  );
}
