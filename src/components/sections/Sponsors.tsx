import Image from "next/image";

import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import {
  confirmedSponsors,
  hostPartners,
  sponsorDeckPdf,
  sponsorTiers,
} from "@/content/sponsors";
import type { Sponsor } from "@/content/types";
import { localePath, type Locale } from "@/lib/i18n";

const priceFrom = Math.min(...sponsorTiers.map((tier) => tier.priceUsd));

const copy = {
  es: {
    eyebrow: "Sponsors",
    title: "Quienes hacen posible este evento",
    intro:
      "Organizaciones que invierten en una comunidad tecnológica abierta para estudiantes y profesionales de Cochabamba.",
    sponsorsHeading: "Sponsors",
    ctaEyebrow: "Patrocinio 2026",
    ctaTitle: "Sumá a tu empresa",
    ctaBody: `Cuatro paquetes desde USD ${priceFrom}, con presencia de marca, stand en la feria de talento y acceso a estudiantes de 12+ universidades. El deck detalla cada beneficio.`,
    download: "Descargar el deck",
    downloadNote: "El deck se descarga en PDF.",
    packages: "Comparar paquetes",
  },
  en: {
    eyebrow: "Sponsors",
    title: "Who makes this event possible",
    intro:
      "Organizations investing in an open tech community for students and professionals in Cochabamba.",
    sponsorsHeading: "Sponsors",
    ctaEyebrow: "Sponsorship 2026",
    ctaTitle: "Bring your company on board",
    ctaBody: `Four packages from USD ${priceFrom}, with brand presence, a booth at the talent fair and access to students from 12+ universities. The deck lists every benefit.`,
    download: "Download the deck",
    downloadNote: "The deck is a PDF, in Spanish.",
    packages: "Compare packages",
  },
} as const;

function Logo({ sponsor }: { sponsor: Sponsor }) {
  const image = (
    <Image
      src={sponsor.logo}
      alt={sponsor.name}
      width={sponsor.width}
      height={sponsor.height}
      className="h-14 w-auto md:h-16"
    />
  );

  return sponsor.href ? (
    <a href={sponsor.href} target="_blank" rel="noopener noreferrer">
      {image}
    </a>
  ) : (
    image
  );
}

export function Sponsors({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <Section
      id="patrocinio"
      tone="light"
      eyebrow={t.eyebrow}
      title={t.title}
      intro={t.intro}
    >
      <ul
        className="border-border-light bg-border-light grid gap-px border sm:grid-cols-2"
        data-reveal-group
      >
        {hostPartners.map((partner) => (
          <li key={partner.id} className="flex flex-col bg-white p-8">
            <p className="font-display text-small tracking-mono-caps text-slate-600 uppercase">
              {partner.role[locale]}
            </p>
            <div className="flex flex-1 items-center justify-center pt-6">
              <Logo sponsor={partner} />
            </div>
          </li>
        ))}
      </ul>

      {confirmedSponsors.length > 0 ? (
        <>
          <h3 className="font-display text-small tracking-mono-caps mt-10 text-slate-600 uppercase">
            {t.sponsorsHeading}
          </h3>
          <ul
            className="border-border-light bg-border-light mt-4 grid grid-cols-2 gap-px border md:grid-cols-4"
            data-reveal-group
          >
            {confirmedSponsors.map((sponsor) => (
              <li
                key={sponsor.id}
                className="flex items-center justify-center bg-white p-8"
              >
                <Logo sponsor={sponsor} />
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <div
        className="bg-navy-900 mt-12 flex flex-col gap-8 p-7 md:p-10 lg:flex-row lg:items-center lg:justify-between"
        data-reveal
      >
        <div className="max-w-2xl">
          <p className="font-display text-small tracking-mono-caps text-orange uppercase">
            {t.ctaEyebrow}
          </p>
          <h3 className="font-display text-display-md mt-3 text-white">{t.ctaTitle}</h3>
          <p className="mt-3 text-slate-200">{t.ctaBody}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col">
          <Button href={sponsorDeckPdf} download size="lg">
            {t.download}
          </Button>
          <Button href={localePath(locale, "/sponsor-deck")} variant="outline" size="lg">
            {t.packages}
          </Button>
          <p className="text-small text-slate-200 sm:w-full">{t.downloadNote}</p>
        </div>
      </div>
    </Section>
  );
}
