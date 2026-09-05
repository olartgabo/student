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
  { label: "Audiencia esperada", value: "900+" },
  { label: "Universidades", value: "12+" },
  { label: "Duración", value: "1 día completo" },
  { label: "Sede", value: event.venue.city },
] as const;

const communityDayHistory = [
  { year: "2024", city: "La Paz", registered: "647", attendees: "395", speakers: "27" },
  {
    year: "2025",
    city: "Cochabamba",
    registered: "1.100+",
    attendees: "592",
    speakers: "31",
  },
  {
    year: "2026",
    city: "Santa Cruz",
    registered: "2.122",
    attendees: "956",
    speakers: "59",
  },
] as const;

const sponsorValueProps = [
  {
    title: "Talento",
    body: "Desde Gold, tu empresa puede publicar vacantes y participar en la feria de talento. Host y Platinum suman CVs y contactos solo de candidatos que autoricen compartirlos.",
  },
  {
    title: "Presencia",
    body: "Logo, menciones, stand y activaciones varían por paquete. Host, Platinum y Gold también acompañan las cuatro sesiones virtuales previas al evento.",
  },
  {
    title: "Informe",
    body: "Hasta 15 días después del evento, Gold, Platinum y Host reciben asistencia real, alcance digital y métricas de su activación.",
  },
] as const;

const inKindContributions = [
  "Alimentación, sede, conectividad o espacios de taller",
  "Swag, kits, créditos cloud, licencias, premios o vouchers",
  "Producción, streaming, fotografía, traslados, alojamiento o impresión",
] as const;

const fundingDestinations = [
  "Salas, laboratorios y equipamiento técnico",
  "Alimentación, kits y material de talleres",
  "Publicidad, impresos, señalización y producción",
  "Traslados, alojamiento, premios y vouchers de certificación",
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
                  Patrocina la primera edición de Student Community Day en Bolivia
                </h1>
                <p className="text-body-lg mt-6 max-w-xl text-slate-200">
                  Desde Cochabamba, un día para conectar tu marca con estudiantes,
                  builders y comunidades técnicas el {eventDateLabel.long} en{" "}
                  {event.venue.name}.
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
          aria-labelledby="community-history-title"
          className="grid-motif-light border-b border-slate-600/20 py-16 text-slate-900 md:py-20"
        >
          <Container>
            <header className="max-w-2xl" data-reveal>
              <Eyebrow className="text-slate-600">Trayectoria comprobada</Eyebrow>
              <h2
                id="community-history-title"
                className="font-display text-display-lg text-navy-900 mt-4"
              >
                AWS Community Day Bolivia creció en cada edición
              </h2>
              <p className="text-body-lg mt-4 text-slate-600">
                Student Community Day inicia su propia historia en Cochabamba sobre una
                comunidad que ya convoca talento técnico en todo el país.
              </p>
            </header>

            <div className="mt-10 overflow-x-auto" data-reveal>
              <table className="w-full min-w-[40rem] border-collapse text-left">
                <caption className="sr-only">
                  Evolución de AWS Community Day Bolivia entre 2024 y 2026
                </caption>
                <thead className="text-small tracking-mono-caps border-y border-slate-400 uppercase">
                  <tr>
                    <th scope="col" className="py-3 pr-6 font-medium">
                      Año
                    </th>
                    <th scope="col" className="px-3 py-3 font-medium">
                      Ciudad
                    </th>
                    <th scope="col" className="px-3 py-3 font-medium">
                      Inscritos
                    </th>
                    <th scope="col" className="px-3 py-3 font-medium">
                      Asistentes
                    </th>
                    <th scope="col" className="py-3 pl-3 font-medium">
                      Speakers
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {communityDayHistory.map((edition) => (
                    <tr key={edition.year} className="border-b border-slate-300">
                      <th scope="row" className="py-4 pr-6 font-medium">
                        {edition.year}
                      </th>
                      <td className="px-3 py-4">{edition.city}</td>
                      <td className="px-3 py-4">{edition.registered}</td>
                      <td className="px-3 py-4">{edition.attendees}</td>
                      <td className="py-4 pl-3">{edition.speakers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-small mt-5 text-slate-600" data-reveal>
              Los inscritos de 2025 son una cifra aproximada. Los datos de 2026 son
              finales.
            </p>
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
                Compará inversión, presencia, feria de talento, reclutamiento y reporte
                post-evento. Abrí cada paquete para ver el alcance completo.
              </p>
              <p className="text-small mt-4 max-w-2xl text-slate-200">
                Sponsors de AWS Community Day Bolivia 2024, 2025 o 2026 reciben 15% de
                descuento en Host y Platinum.
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
                  Reservá tu paquete
                </h3>
                <p className="mt-2 max-w-2xl text-slate-200">
                  Los cupos y los aportes en especie se confirman con el equipo. Podemos
                  ajustar una activación según la disponibilidad del evento.
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

        <section
          aria-labelledby="in-kind-title"
          className="grid-motif-light border-b border-slate-600/20 py-16 text-slate-900 md:py-20"
        >
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <header data-reveal>
                <Eyebrow className="text-slate-600">Aportes en especie</Eyebrow>
                <h2
                  id="in-kind-title"
                  className="font-display text-display-lg text-navy-900 mt-4"
                >
                  También podés aportar recursos al evento
                </h2>
              </header>
              <div data-reveal>
                <p className="text-body-lg text-slate-600">
                  Valorizamos cada aporte a precio de mercado y lo acreditamos al nivel de
                  patrocinio equivalente.
                </p>
                <ul className="border-border-light divide-border-light mt-6 border-y">
                  {inKindContributions.map((contribution) => (
                    <li key={contribution} className="py-4 text-slate-900">
                      {contribution}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        <section
          aria-labelledby="funding-title"
          className="border-b border-slate-600 bg-slate-900 py-16 text-white md:py-20"
        >
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <header data-reveal>
                <Eyebrow>Transparencia</Eyebrow>
                <h2 id="funding-title" className="font-display text-display-lg mt-4">
                  Qué financia tu patrocinio
                </h2>
              </header>
              <div data-reveal>
                <ul className="divide-y divide-slate-600 border-y border-slate-600">
                  {fundingDestinations.map((destination) => (
                    <li key={destination} className="py-4 text-slate-200">
                      {destination}
                    </li>
                  ))}
                </ul>
                <p className="text-small mt-5 text-slate-200">
                  Gold, Platinum y Host reciben un informe hasta 15 días después del
                  evento con asistencia, alcance digital y métricas de activación.
                </p>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
