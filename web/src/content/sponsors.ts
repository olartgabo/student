import type { Sponsor, SponsorTier } from "./types";

/**
 * Tiers as supplied by the organisers. Several benefit lines arrived truncated in
 * the brief and were completed to read as full sentences — check the wording
 * before this goes to a prospect.
 *
 * `sponsors: []` means the tier is still open; a tier renders as available until
 * a logo is added here.
 */
export const sponsorTiers = [
  {
    id: "host",
    name: "Host",
    tagline: "Eres el evento",
    code: "01",
    priceUsd: 1000,
    accent: "orange",
    slots: 1,
    featured: true,
    benefits: [
      "Co-branding en el nombre y en toda la comunicación del evento",
      "Keynote de 45 minutos en el escenario principal",
      "Logo principal en web, backdrop del escenario y material impreso",
      "Stand preferente — 3 m · 2 mesas",
      "Video promocional de 2 minutos proyectado en el escenario",
      "Material de marca en las bolsas de los asistentes",
      "Techmixer — 10 invitaciones",
      "Publicación de vacantes en la web y las redes del evento",
      "Mención especial y detallada en escenario",
      "20 pases de acceso completo",
    ],
    sponsors: [],
  },
  {
    id: "platinum",
    name: "Platinum",
    tagline: "Máxima visibilidad",
    code: "02",
    priceUsd: 800,
    accent: "sky",
    benefits: [
      "Logo destacado en web, escenario y material impreso",
      "Lightning talk de 15 minutos en el escenario principal",
      "Stand — 2 m · 2 mesas",
      "Video promocional de 45 segundos en el escenario",
      "Material de marca en las bolsas de los asistentes",
      "Techmixer — 5 invitaciones",
      "Publicación de vacantes en la web del evento",
      "Mención especial en escenario",
      "10 pases de acceso completo",
    ],
    sponsors: [],
  },
  {
    id: "gold",
    name: "Gold",
    tagline: "Presencia activa",
    code: "03",
    priceUsd: 500,
    accent: "green",
    benefits: [
      "Logo en el website y en los materiales del evento",
      "Mesa en la zona de networking",
      "Material de marca en las bolsas de los asistentes",
      "Techmixer — 3 invitaciones",
      "Publicación de vacantes en las redes del evento",
      "Post dedicado en las redes del evento",
      "Mención en el escenario principal",
      "5 pases de acceso completo",
    ],
    sponsors: [],
  },
  {
    id: "silver",
    name: "Silver",
    tagline: "Apoya la comunidad",
    code: "04",
    priceUsd: 300,
    accent: "purple",
    benefits: [
      "Logo en el website del evento",
      "Mención en el escenario principal",
      "Mención en redes sociales",
      "2 pases de acceso completo",
    ],
    sponsors: [],
  },
] as const satisfies readonly SponsorTier[];

export const confirmedSponsors: readonly Sponsor[] = sponsorTiers.flatMap(
  (tier) => tier.sponsors,
);
