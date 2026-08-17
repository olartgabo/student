import Image from "next/image";

import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { confirmedSponsors, sponsorTiers } from "@/content/sponsors";

export function Sponsors() {
  return (
    <Section
      id="patrocinio"
      tone="light"
      eyebrow="Patrocinio"
      title="Empresas que hacen posible este evento"
      intro="El evento es gratuito para los asistentes porque hay empresas que deciden invertir en la comunidad técnica de Cochabamba."
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

      <div
        className="border-border-light mt-10 flex flex-wrap items-center justify-between gap-6 border bg-white p-8"
        data-reveal
      >
        <div>
          <p className="font-display text-display-md text-navy-900">Sé parte</p>
          <p className="mt-2 max-w-xl text-slate-600">
            {sponsorTiers.length} paquetes de patrocinio, desde presencia de marca hasta
            un keynote en el escenario principal.
          </p>
        </div>
        <Button href="/sponsor-deck">Ver los paquetes</Button>
      </div>
    </Section>
  );
}
