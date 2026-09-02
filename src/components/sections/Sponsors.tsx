import Image from "next/image";

import { Section } from "@/components/layout/Section";
import { accentFill } from "@/components/ui/accent";
import { Button } from "@/components/ui/Button";
import { event } from "@/content/event";
import { confirmedSponsors, sponsorTiers } from "@/content/sponsors";
import type { SponsorTier } from "@/content/types";
import { cn } from "@/lib/cn";

const prices = sponsorTiers.map((tier) => tier.priceUsd);
const priceFrom = Math.min(...prices);
const priceTo = Math.max(...prices);

export function Sponsors() {
  return (
    <Section
      id="patrocinio"
      tone="light"
      eyebrow="Patrocinio"
      title="Empresas que hacen posible este evento"
      intro={`La entrada es ${event.price.toLowerCase()} para los asistentes porque hay empresas que deciden invertir en la comunidad técnica de ${event.venue.city}. Hay ${sponsorTiers.length} paquetes, de USD ${priceFrom} a USD ${priceTo}.`}
    >
      {confirmedSponsors.length > 0 ? (
        <ul
          className="border-border-light bg-border-light grid grid-cols-2 gap-px border md:grid-cols-4"
          data-reveal-group
        >
          {confirmedSponsors.map((sponsor) => (
            <li
              key={sponsor.id}
              className="flex items-center justify-center bg-white p-8"
            >
              {sponsor.href ? (
                <a href={sponsor.href} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    width={sponsor.width}
                    height={sponsor.height}
                  />
                </a>
              ) : (
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={sponsor.width}
                  height={sponsor.height}
                />
              )}
            </li>
          ))}
        </ul>
      ) : null}

      {/* The tiers themselves, on the page a prospect actually lands on. Sending
          them to a separate deck for the price alone lost most of them. */}
      <ul
        className="border-border-light bg-border-light grid gap-px border md:grid-cols-2 xl:grid-cols-4"
        data-reveal-group
      >
        {sponsorTiers.map((tier: SponsorTier) => (
          <li key={tier.id} className="flex flex-col bg-white p-6">
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "font-display px-1.5 py-0.5 text-[0.6875rem]",
                  accentFill[tier.accent],
                )}
              >
                {tier.code}
              </span>
              <h3 className="font-display text-body tracking-mono-caps text-navy-900 uppercase">
                {tier.name}
              </h3>
            </div>
            <p className="tabular font-display text-display-md text-navy-900 mt-4">
              USD {tier.priceUsd}
            </p>
            <p className="text-small mt-3 flex-1 text-slate-600">{tier.summary}</p>
            {tier.slots !== undefined ? (
              <p className="font-display tracking-mono-caps mt-4 text-[0.6875rem] text-slate-600 uppercase">
                {tier.slots === 1 ? "Cupo exclusivo" : `${tier.slots} cupos`}
              </p>
            ) : null}
          </li>
        ))}
      </ul>

      <div
        className="border-border-light mt-10 flex flex-wrap items-center justify-between gap-6 border bg-white p-8"
        data-reveal
      >
        <div>
          <p className="font-display text-display-md text-navy-900">Sé parte</p>
          <p className="mt-2 max-w-xl text-slate-600">
            Todos los paquetes incluyen logo en la web y mención en el escenario
            principal. El deck detalla qué suma cada nivel — stand, charla, pases y
            publicación de vacantes.
          </p>
          <p className="text-small mt-3 text-slate-600">
            ¿Ninguno encaja? Escribinos a{" "}
            <a
              href={`mailto:${event.sponsorshipEmail}`}
              className="text-navy-900 underline underline-offset-4"
            >
              {event.sponsorshipEmail}
            </a>{" "}
            y lo armamos a medida.
          </p>
        </div>
        <Button href="/sponsor-deck">Ver los paquetes</Button>
      </div>
    </Section>
  );
}
