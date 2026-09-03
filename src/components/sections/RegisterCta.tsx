import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { event, eventDateLabel } from "@/content/event";
import { speakerCta } from "@/content/nav";

/**
 * The two ways in, side by side: attend, or propose a talk. The call for speakers
 * used to be missing entirely, which made a programme that is still almost all
 * `tba` look closed rather than open.
 */
export function RegisterCta() {
  return (
    <section
      id="registro"
      aria-labelledby="registro-title"
      className="grid-motif scroll-mt-22 border-t border-slate-600 py-24 md:py-32"
    >
      <Container>
        <div className="max-w-2xl" data-reveal>
          <Eyebrow>Participar</Eyebrow>
          <h2
            id="registro-title"
            className="font-display text-display-lg mt-4 text-white"
          >
            Dos formas de estar acá
          </h2>
          <p className="text-body-lg mt-4 text-slate-200">
            El {eventDateLabel.long} en {event.venue.shortName} {event.venue.city}: venís
            a aprender, o subís al escenario a contar lo que sabés.
          </p>
        </div>

        <div className="mt-12 grid gap-px border border-slate-600 bg-slate-600 md:grid-cols-2">
          <div className="flex flex-col bg-slate-900 p-8 md:p-10" data-reveal>
            <p className="font-display text-small tracking-mono-caps text-orange uppercase">
              01 // Asistir
            </p>
            <h3 className="font-display text-display-md mt-3 text-white">
              Reservá tu lugar
            </h3>
            <p className="mt-4 flex-1 text-slate-200">
              La entrada es {event.price.toLowerCase()} y el registro es obligatorio: lo
              necesitamos para la acreditación en puerta y los cupos de los laboratorios
              son limitados.
            </p>
            <div className="mt-8">
              <Button href={event.registrationUrl} size="lg" className="w-full sm:w-auto">
                Inscríbete gratis <span aria-hidden>↗</span>
              </Button>
            </div>
          </div>

          <div className="flex flex-col bg-slate-800 p-8 md:p-10" data-reveal>
            <p className="font-display text-small tracking-mono-caps text-sky uppercase">
              02 // Presentar
            </p>
            <h3 className="font-display text-display-md mt-3 text-white">
              Propone tu charla
            </h3>
            <p className="mt-4 flex-1 text-slate-200">
              La convocatoria está abierta en Sessionize. Bloques de 40 minutos, en
              cualquiera de los tres tracks o en los laboratorios prácticos, desde nivel
              introductorio. No hace falta haber hablado antes en un evento.
            </p>
            <div className="mt-8">
              <Button
                href={speakerCta.href}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                {speakerCta.label} <span aria-hidden>↗</span>
              </Button>
            </div>
          </div>
        </div>

        <p
          className="font-display text-small tracking-mono-caps mt-8 text-slate-200 uppercase"
          data-reveal
        >
          {eventDateLabel.day} {eventDateLabel.month} · {event.startTime}–{event.endTime}{" "}
          · {event.venue.shortName} {event.venue.city}
        </p>
      </Container>
    </section>
  );
}
