import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SponsorTierCard } from "@/components/sections/SponsorTierCard";
import { Button } from "@/components/ui/Button";
import { Callout } from "@/components/ui/Callout";
import { Eyebrow } from "@/components/ui/Eyebrow";
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

const reach = [
  { value: "300+", label: "Asistentes esperados" },
  { value: "05", label: "Salas simultáneas" },
  { value: "09h", label: "De evento" },
  { value: "03", label: "Tracks técnicos" },
] as const;

/**
 * Why a company sponsors this, in three claims that can each be checked against
 * the agenda or the tier benefits. No projections beyond the attendance estimate,
 * which is labelled as an estimate wherever it appears.
 */
const valueProps = [
  {
    code: "A",
    title: "Una audiencia técnica en formación",
    body: `Estudiantes y profesionales tempranos de ${event.venue.city}: exactamente el perfil que las empresas de la región tardan meses en encontrar. El evento es gratuito para ellos, y eso es lo que llena las salas.`,
  },
  {
    code: "B",
    title: "Un día entero de presencia, no un logo en una slide",
    body: "La Community Expo abre a las 08:00 con el registro y sigue durante los breaks y el almuerzo. Desde Gold hay mesa propia en la zona de networking; desde Platinum, stand y escenario.",
  },
  {
    code: "C",
    title: "Una vía directa de contratación",
    body: "Los paquetes desde Gold incluyen publicación de vacantes en las redes del evento, y desde Platinum también en la web. Las invitaciones al Techmixer suman conversaciones fuera del escenario.",
  },
] as const;

export default function SponsorDeckPage() {
  return (
    <>
      <SiteHeader />
      <main id="contenido" className="pt-18">
        <div className="grid-motif border-b border-slate-600 py-16 md:py-20">
          <Container>
            <Eyebrow>Patrocinio</Eyebrow>
            <h1 className="font-display text-display-lg mt-4 max-w-3xl text-white">
              Paquetes de patrocinio 2026
            </h1>
            <p className="text-body-lg mt-4 max-w-2xl text-slate-200">
              {event.name} {event.edition} es un evento gratuito, organizado por
              estudiantes, el {eventDateLabel.long} en {event.venue.name}. Los paquetes de
              patrocinio son lo que lo hace posible — y lo que pone tu marca frente a la
              próxima generación técnica de {event.venue.city}.
            </p>

            <dl
              className="mt-12 grid max-w-3xl grid-cols-2 gap-px border border-slate-600 bg-slate-600 sm:grid-cols-4"
              data-reveal-group
            >
              {reach.map((item) => (
                <div key={item.label} className="bg-slate-900 p-5">
                  <dt className="sr-only">{item.label}</dt>
                  <dd>
                    <span className="font-display text-display-md block text-white">
                      {item.value}
                    </span>
                    <span
                      aria-hidden
                      className="font-display tracking-mono-caps mt-1 block text-[0.6875rem] text-slate-200 uppercase"
                    >
                      {item.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </div>

        <Container className="py-16 md:py-20">
          <h2 className="font-display text-display-lg max-w-2xl text-white" data-reveal>
            Qué compra realmente un patrocinio
          </h2>
          <div
            className="mt-10 grid gap-px border border-slate-600 bg-slate-600 md:grid-cols-3"
            data-reveal-group
          >
            {valueProps.map((prop) => (
              <section key={prop.code} className="bg-slate-900 p-8">
                <span className="font-display tracking-mono-caps text-orange text-[0.6875rem] uppercase">
                  {prop.code}
                </span>
                <h3 className="font-display text-body tracking-mono-caps mt-4 text-white uppercase">
                  {prop.title}
                </h3>
                <p className="text-small mt-3 text-slate-200">{prop.body}</p>
              </section>
            ))}
          </div>

          <h2
            id="paquetes"
            className="font-display text-display-lg mt-20 max-w-2xl scroll-mt-22 text-white"
            data-reveal
          >
            Los {sponsorTiers.length} paquetes
          </h2>
          <div
            className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-4"
            data-reveal-group
          >
            {sponsorTiers.map((tier) => (
              <SponsorTierCard key={tier.id} tier={tier} />
            ))}
          </div>

          <Callout tone="info" title="Antes de reservar" className="mt-12 max-w-3xl">
            Los precios son por edición y están expresados en dólares estadounidenses.
            Todos los paquetes incluyen logo en la web y mención en el escenario
            principal. Si ninguno encaja con lo que buscás, escribinos a{" "}
            <a href={`mailto:${event.sponsorshipEmail}`} className="text-sky underline">
              {event.sponsorshipEmail}
            </a>{" "}
            y lo armamos a medida.
          </Callout>

          <div className="mt-12" data-reveal>
            <Button href={`mailto:${event.sponsorshipEmail}`}>
              Hablar con el equipo
            </Button>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
