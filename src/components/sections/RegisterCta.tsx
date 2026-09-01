import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { event, eventDateLabel } from "@/content/event";

export function RegisterCta() {
  return (
    <section
      id="registro"
      aria-labelledby="registro-title"
      className="grid-motif scroll-mt-22 border-t border-slate-600 py-24 md:py-32"
    >
      <Container>
        <div className="max-w-2xl" data-reveal>
          <Eyebrow>Registro</Eyebrow>
          <h2
            id="registro-title"
            className="font-display text-display-lg mt-4 text-white"
          >
            Reservá tu lugar
          </h2>
          <p className="text-body-lg mt-4 text-slate-200">
            Cupos limitados. El registro es {event.price.toLowerCase()} pero obligatorio —
            lo necesitamos para la acreditación en puerta.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Button href={event.registrationUrl} size="lg">
              Inscríbete gratis
            </Button>
            <p className="font-display text-small tracking-mono-caps text-slate-200 uppercase">
              {eventDateLabel.day} {eventDateLabel.month} · {event.venue.shortName}{" "}
              {event.venue.city}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
