import type { Metadata } from "next";
import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SponsorMotion } from "@/components/motion/SponsorMotion";
import { SponsorComparison } from "@/components/sections/SponsorComparison";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { communityPhotos, communityPhotoSource } from "@/content/community";
import { event, eventDateLabel } from "@/content/event";
import { sponsorTiers } from "@/content/sponsors";

const prices = sponsorTiers.map((tier) => tier.priceUsd);
const priceFrom = Math.min(...prices);
const priceTo = Math.max(...prices);

const description =
  `${sponsorTiers.length} paquetes de patrocinio para el ${eventDateLabel.long} en ` +
  `${event.venue.shortName} ${event.venue.city}, de USD ${priceFrom} a USD ${priceTo}.`;

export const metadata: Metadata = {
  title: "Paquetes de patrocinio",
  description,
  alternates: { canonical: "/sponsor-deck" },
  openGraph: {
    type: "website",
    url: "/sponsor-deck",
    title: `Paquetes de patrocinio — AWS ${event.name} ${event.edition}`,
    description,
  },
};

const sponsorFacts = [
  { label: "Audiencia esperada", value: "300+" },
  { label: "Presencia de marca", value: "08–18 h" },
  { label: "Espacios simultáneos", value: "5 salas" },
  { label: "Sede", value: event.venue.city },
] as const;

const sponsorValueProps = [
  {
    title: "Escenario",
    body: "Platinum incluye un lightning talk de 15 minutos. Host suma una keynote de 45 minutos y presencia principal en la comunicación.",
  },
  {
    title: "Expo y networking",
    body: "Desde Gold hay espacio propio en la zona de networking. Platinum y Host agregan stand, video e invitaciones al Techmixer.",
  },
  {
    title: "Talento",
    body: "Los paquetes Gold, Platinum y Host incluyen publicación de vacantes para conectar con estudiantes y perfiles técnicos tempranos.",
  },
] as const;

const heroPhoto = communityPhotos[0];

export default function SponsorDeckPage() {
  return (
    <>
      <SiteHeader />
      <main id="contenido" className="pt-18">
        <SponsorMotion />
        <section
          id="inicio"
          aria-labelledby="sponsor-title"
          className="grid-motif scroll-mt-18 border-b border-slate-600"
        >
          <Container className="py-14 md:py-20">
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
              <div data-sponsor-hero-copy>
                <Eyebrow>Patrocinio 2026</Eyebrow>
                <h1
                  id="sponsor-title"
                  className="font-display mt-5 text-[clamp(2.5rem,5vw,4.75rem)] leading-[1.04] text-white"
                >
                  Patrocina Student Community Day Bolivia
                </h1>
                <p className="text-body-lg mt-6 max-w-xl text-slate-200">
                  Un día para conectar tu marca con estudiantes, builders y comunidades
                  técnicas el {eventDateLabel.long} en {event.venue.name}.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="#paquetes" size="lg">
                    Comparar paquetes
                  </Button>
                  <Button
                    href={`mailto:${event.sponsorshipEmail}`}
                    variant="secondary"
                    size="lg"
                  >
                    Hablar con el equipo
                  </Button>
                </div>
              </div>

              <figure
                className="border border-slate-600 bg-slate-800 p-2"
                data-sponsor-hero-photo
              >
                <Image
                  src={heroPhoto.src}
                  alt={heroPhoto.alt}
                  width={heroPhoto.width}
                  height={heroPhoto.height}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  priority
                  className="aspect-[3/2] w-full object-cover"
                />
                <figcaption className="text-small flex flex-wrap justify-between gap-2 px-2 pt-3 pb-1 text-slate-200">
                  <span>AWS Community Day Bolivia 2025 · Cochabamba</span>
                  <a
                    href={communityPhotoSource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline underline-offset-4"
                  >
                    Ver fuente
                  </a>
                </figcaption>
              </figure>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-slate-600 pt-6 sm:grid-cols-4">
              {sponsorFacts.map((fact) => (
                <div key={fact.label} data-sponsor-fact>
                  <dt className="text-small text-slate-200">{fact.label}</dt>
                  <dd className="font-display mt-1 text-xl text-white">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>

        <section
          aria-labelledby="sponsor-value-title"
          className="grid-motif-light border-b border-slate-600/20 py-16 text-slate-900 md:py-20"
        >
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div data-reveal>
                <Eyebrow className="text-slate-600">Presencia concreta</Eyebrow>
                <h2
                  id="sponsor-value-title"
                  className="font-display text-display-lg text-navy-900 mt-4"
                >
                  Qué obtiene tu empresa
                </h2>
              </div>
              <p className="text-body-lg max-w-2xl text-slate-600" data-reveal>
                Cada beneficio corresponde a un momento visible del evento: escenario,
                conversaciones cara a cara y acceso a una comunidad técnica en formación.
              </p>
            </div>

            <div
              className="border-border-light md:divide-border-light mt-12 grid border-y md:grid-cols-3 md:divide-x"
              data-reveal-group
            >
              {sponsorValueProps.map((item) => (
                <article
                  key={item.title}
                  className="border-border-light py-7 max-md:not-last:border-b md:border-0 md:px-7 md:first:pl-0 md:last:pr-0"
                >
                  <h3 className="font-display text-navy-900 text-xl">{item.title}</h3>
                  <p className="mt-3 text-slate-600">{item.body}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section
          id="paquetes"
          aria-labelledby="packages-title"
          className="scroll-mt-22 bg-slate-900 py-16 md:py-24"
        >
          <Container>
            <header className="mb-10 max-w-2xl" data-reveal>
              <Eyebrow>Comparación</Eyebrow>
              <h2
                id="packages-title"
                className="font-display text-display-lg mt-4 text-white"
              >
                Elegí el nivel de presencia
              </h2>
              <p className="text-body-lg mt-4 text-slate-200">
                Compará inversión, escenario, espacio de expo, acceso al Techmixer y
                pases. Abrí el detalle para ver la lista completa de cada nivel.
              </p>
            </header>

            <div data-reveal>
              <SponsorComparison />
            </div>

            <div
              className="bg-navy-900 mt-12 flex flex-col gap-6 p-7 md:flex-row md:items-center md:justify-between md:p-10"
              data-reveal
            >
              <div>
                <h3 className="font-display text-display-md text-white">
                  ¿Necesitás un paquete a medida?
                </h3>
                <p className="mt-2 max-w-2xl text-slate-200">
                  Contanos qué objetivo tiene tu empresa y armamos una combinación de
                  presencia, contenido y networking.
                </p>
                <a
                  href={`mailto:${event.sponsorshipEmail}`}
                  className="mt-3 inline-block text-white underline underline-offset-4"
                >
                  {event.sponsorshipEmail}
                </a>
              </div>
              <Button
                href={`mailto:${event.sponsorshipEmail}`}
                size="lg"
                className="shrink-0"
              >
                Escribir al equipo
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
