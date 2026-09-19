import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { event, eventDateLabel } from "@/content/event";
import { speakerCta } from "@/content/nav";
import type { Locale } from "@/lib/i18n";

const copy = {
  es: {
    eyebrow: "Participar",
    title: "Dos formas de estar acá",
    intro: `El ${eventDateLabel.es.long} en ${event.venue.shortName} ${event.venue.city}: venís a aprender, o subís al escenario a contar lo que sabés.`,
    attendEyebrow: "01 // Asistir",
    attendTitle: "Reservá tu lugar",
    attendBody: `La entrada es ${event.price.es.toLowerCase()} y el registro es obligatorio: lo necesitamos para la acreditación en puerta y los cupos de los laboratorios son limitados.`,
    attendCta: "Inscríbete gratis",
    speakEyebrow: "02 // Presentar",
    speakTitle: "Propone tu charla",
    speakBody:
      "La convocatoria está abierta en Sessionize. Bloques de 40 minutos, en cualquiera de los tres tracks o en los laboratorios prácticos, desde nivel introductorio. No hace falta haber hablado antes en un evento.",
  },
  en: {
    eyebrow: "Take part",
    title: "Two ways to be here",
    intro: `${eventDateLabel.en.long} at ${event.venue.shortName} ${event.venue.city}: come to learn, or take the stage and share what you know.`,
    attendEyebrow: "01 // Attend",
    attendTitle: "Save your spot",
    attendBody: `Admission is ${event.price.en.toLowerCase()} and registration is required: we need it for check-in at the door, and lab seats are limited.`,
    attendCta: "Register for free",
    speakEyebrow: "02 // Speak",
    speakTitle: "Submit a talk",
    speakBody:
      "The call for speakers is open on Sessionize. 40-minute slots, in any of the three tracks or the hands-on labs, from introductory level up. You don't need prior speaking experience.",
  },
} as const;

/**
 * The two ways in, side by side: attend, or propose a talk. The call for speakers
 * used to be missing entirely, which made a programme that is still almost all
 * `tba` look closed rather than open.
 */
export function RegisterCta({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const date = eventDateLabel[locale];

  return (
    <section
      id="registro"
      aria-labelledby="registro-title"
      className="grid-motif scroll-mt-22 border-t border-slate-600 py-24 md:py-32"
    >
      <Container>
        <div className="max-w-2xl" data-reveal>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2
            id="registro-title"
            className="font-display text-display-lg mt-4 text-white"
          >
            {t.title}
          </h2>
          <p className="text-body-lg mt-4 text-slate-200">{t.intro}</p>
        </div>

        <div className="mt-12 grid gap-px border border-slate-600 bg-slate-600 md:grid-cols-2">
          <div className="flex flex-col bg-slate-900 p-8 md:p-10" data-reveal>
            <p className="font-display text-small tracking-mono-caps text-orange uppercase">
              {t.attendEyebrow}
            </p>
            <h3 className="font-display text-display-md mt-3 text-white">
              {t.attendTitle}
            </h3>
            <p className="mt-4 flex-1 text-slate-200">{t.attendBody}</p>
            <div className="mt-8">
              <Button href={event.registrationUrl} size="lg" className="w-full sm:w-auto">
                {t.attendCta} <span aria-hidden>↗</span>
              </Button>
            </div>
          </div>

          <div className="flex flex-col bg-slate-800 p-8 md:p-10" data-reveal>
            <p className="font-display text-small tracking-mono-caps text-sky uppercase">
              {t.speakEyebrow}
            </p>
            <h3 className="font-display text-display-md mt-3 text-white">
              {t.speakTitle}
            </h3>
            <p className="mt-4 flex-1 text-slate-200">{t.speakBody}</p>
            <div className="mt-8">
              <Button
                href={speakerCta.href}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                {speakerCta.label[locale]} <span aria-hidden>↗</span>
              </Button>
            </div>
          </div>
        </div>

        <p
          className="font-display text-small tracking-mono-caps mt-8 text-slate-200 uppercase"
          data-reveal
        >
          {date.day} {date.month} · {event.startTime}–{event.endTime} ·{" "}
          {event.venue.shortName} {event.venue.city}
        </p>
      </Container>
    </section>
  );
}
