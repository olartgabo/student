import type { Metadata } from "next";

import { AgendaTimetable } from "@/components/agenda/AgendaTimetable";
import { Container } from "@/components/layout/Container";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { event, eventDateLabel } from "@/content/event";
import { speakerCta } from "@/content/nav";
import { languageAlternates, localePath, type Locale } from "@/lib/i18n";

const place = `${event.venue.shortName} ${event.venue.city}`;

const copy = {
  es: {
    description:
      `Programa completo del ${eventDateLabel.es.long}: tres tracks y dos laboratorios en ` +
      `paralelo, de ${event.startTime} a ${event.endTime} en ${place}.`,
    title: "Programa del día",
    intro: `${eventDateLabel.es.long} · ${event.startTime}–${event.endTime} · ${place}. El registro abre a las 08:00. Los títulos de sesión se publican a medida que se confirman los speakers.`,
    register: "Inscríbete gratis",
  },
  en: {
    description:
      `Full programme for ${eventDateLabel.en.long}: three tracks and two labs in ` +
      `parallel, from ${event.startTime} to ${event.endTime} at ${place}.`,
    title: "Programme for the day",
    intro: `${eventDateLabel.en.long} · ${event.startTime}–${event.endTime} · ${place}. Check-in opens at 08:00. Session titles are published as speakers are confirmed.`,
    register: "Register for free",
  },
} as const;

export function agendaMetadata(locale: Locale): Metadata {
  const { description } = copy[locale];
  const url = localePath(locale, "/agenda");

  return {
    title: "Agenda",
    description,
    alternates: { canonical: url, languages: languageAlternates("/agenda") },
    openGraph: {
      type: "website",
      url,
      title: `Agenda — AWS ${event.name} ${event.edition}`,
      description,
    },
  };
}

export function AgendaPage({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <>
      <SiteHeader locale={locale} />
      <main id="contenido" className="pt-18">
        <div className="grid-motif border-b border-slate-600 py-16 md:py-20">
          <Container>
            <Eyebrow>Agenda</Eyebrow>
            <h1 className="font-display text-display-lg mt-4 text-white">{t.title}</h1>
            <p className="text-body-lg mt-4 max-w-2xl text-slate-200">{t.intro}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={event.registrationUrl}>
                {t.register} <span aria-hidden>↗</span>
              </Button>
              <Button href={speakerCta.href} variant="secondary">
                {speakerCta.label[locale]} <span aria-hidden>↗</span>
              </Button>
            </div>
          </Container>
        </div>

        <Container className="py-12 md:py-16">
          <AgendaTimetable locale={locale} />
        </Container>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
