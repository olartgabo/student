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

export const metadata: Metadata = {
  title: "Paquetes de patrocinio",
  description: `Cuatro paquetes de patrocinio para el ${eventDateLabel.long} en ${event.venue.shortName} ${event.venue.city}, desde USD 300 hasta USD 1000.`,
};

const reach = [
  { value: "300+", label: "Asistentes esperados" },
  { value: "05", label: "Salas simultáneas" },
  { value: "09h", label: "De evento" },
  { value: "03", label: "Tracks técnicos" },
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
              estudiantes. Los paquetes de patrocinio son lo que lo hace posible — y lo
              que pone tu marca frente a la próxima generación técnica de Cochabamba.
            </p>

            <dl className="mt-12 grid max-w-3xl grid-cols-2 gap-px border border-slate-600 bg-slate-600 sm:grid-cols-4">
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
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {sponsorTiers.map((tier) => (
              <SponsorTierCard key={tier.id} tier={tier} />
            ))}
          </div>

          <Callout tone="info" title="Antes de reservar" className="mt-12 max-w-3xl">
            Los precios son por edición y están expresados en dólares estadounidenses. Si
            ninguno de los paquetes encaja con lo que buscás, escribinos a{" "}
            <a href={`mailto:${event.sponsorshipEmail}`} className="text-sky underline">
              {event.sponsorshipEmail}
            </a>{" "}
            y lo armamos a medida.
          </Callout>

          <div className="mt-12">
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
