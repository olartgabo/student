import type { Metadata } from "next";

import { AgendaTimetable } from "@/components/agenda/AgendaTimetable";
import { Container } from "@/components/layout/Container";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { event, eventDateLabel } from "@/content/event";

export const metadata: Metadata = {
  title: "Agenda",
  description: `Programa completo del ${eventDateLabel.long}: tres tracks y dos laboratorios en paralelo, de ${event.startTime} a ${event.endTime}.`,
};

export default function AgendaPage() {
  return (
    <>
      <SiteHeader />
      <main id="contenido" className="pt-18">
        <div className="grid-motif border-b border-slate-600 py-16 md:py-20">
          <Container>
            <Eyebrow>Agenda</Eyebrow>
            <h1 className="font-display text-display-lg mt-4 text-white">
              Programa del día
            </h1>
            <p className="text-body-lg mt-4 max-w-2xl text-slate-200">
              {eventDateLabel.long} · {event.startTime}–{event.endTime} ·{" "}
              {event.venue.shortName} {event.venue.city}. Los títulos de sesión se
              publican a medida que se confirman los speakers.
            </p>
            <div className="mt-8">
              <Button href={event.registrationUrl}>Inscríbete gratis</Button>
            </div>
          </Container>
        </div>

        <Container className="py-12 md:py-16">
          <AgendaTimetable />
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
