import Image from "next/image";

import { Section } from "@/components/layout/Section";
import { confirmedSponsors } from "@/content/sponsors";

export function Sponsors() {
  if (confirmedSponsors.length === 0) return null;

  return (
    <Section
      id="patrocinio"
      tone="light"
      eyebrow="Aliados"
      title="Empresas que hacen posible este evento"
      intro="Organizaciones que invierten en una comunidad tecnológica abierta para estudiantes y profesionales de Cochabamba."
    >
      <ul
        className="border-border-light bg-border-light grid grid-cols-2 gap-px border md:grid-cols-4"
        data-reveal-group
      >
        {confirmedSponsors.map((sponsor) => (
          <li key={sponsor.id} className="flex items-center justify-center bg-white p-8">
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
    </Section>
  );
}
