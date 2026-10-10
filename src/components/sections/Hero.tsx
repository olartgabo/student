import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { event, eventDateLabel, organizerName, siteUrl } from "@/content/event";
import { localePath, type Locale } from "@/lib/i18n";

import { HeroField } from "./HeroField";
import { HeroIntro } from "./HeroIntro";

const communityUrl = "https://chat.whatsapp.com/E3JGbxrbDYaICTwRpIN1Jz?s=cl&p=a&mlu=4";

const copy = {
  es: {
    thanks: "Gracias",
    headline: "Por hacer comunidad juntos.",
    message:
      "A quienes participaron, compartieron conocimiento, hicieron voluntariado y apoyaron esta primera edición en Bolivia: ustedes la hicieron posible.",
    community: "Seguir en comunidad",
    agenda: "Revive la agenda",
    next: "Nos vemos en la próxima.",
  },
  en: {
    thanks: "Thank you",
    headline: "For building this community together.",
    message:
      "To everyone who joined, shared their knowledge, volunteered, and supported this first edition in Bolivia: you made it possible.",
    community: "Stay in the community",
    agenda: "Explore the programme",
    next: "See you next time.",
  },
} as const;

export function Hero({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <header id="inicio" className="grid-motif relative isolate overflow-hidden">
      <HeroIntro />
      <HeroField className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />

      <Container className="relative flex min-h-svh flex-col justify-center py-28 sm:py-32">
        <div className="max-w-[90rem]">
          <p
            data-hero-step
            className="font-display text-small tracking-mono-caps text-sky uppercase"
          >
            AWS Student Community Day · Cochabamba 2026
          </p>

          <h1
            data-hero-step
            className={`font-display mt-8 font-bold leading-[0.9] tracking-[-0.075em] uppercase ${locale === "es" ? "text-[clamp(4.2rem,15vw,16rem)]" : "text-[clamp(3rem,11vw,12rem)]"}`}
          >
            {t.thanks}<span className="text-orange">.</span>
          </h1>

          <div data-hero-step className="bg-orange mt-8 h-2 w-28 sm:mt-10 sm:w-40" />

          <p
            data-hero-step
            className="font-display mt-8 max-w-6xl text-[clamp(1.9rem,4.5vw,4.75rem)] leading-[1.1] tracking-tight text-white"
          >
            {t.headline}
          </p>

          <p
            data-hero-step
            className="text-body-lg mt-7 max-w-3xl text-slate-200 sm:text-2xl"
          >
            {t.message}
          </p>

          <p
            data-hero-step
            className="font-display text-display-md text-sky mt-8 uppercase"
          >
            {t.next}
          </p>
        </div>

        <div
          data-hero-step
          className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-slate-600 pt-6"
        >
          <div className="min-w-0 flex-1">
            <p className="font-display text-small tracking-mono-caps text-white uppercase">
              {eventDateLabel[locale].long} · {event.venue.shortName} {event.venue.city}
            </p>
            <p className="mt-1 text-small text-slate-200">{organizerName}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={communityUrl}>{t.community} ↗</Button>
            <Button href={localePath(locale, "/agenda")} variant="secondary">
              {t.agenda}
            </Button>
          </div>
        </div>
      </Container>

      <div className="border-t border-slate-600 py-4 text-center">
        <span className="font-display text-small tracking-mono-caps text-slate-200 uppercase">
          {new URL(siteUrl).hostname} · Build · Connect · Grow
        </span>
      </div>
    </header>
  );
}
