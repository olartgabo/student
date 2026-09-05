import type { Sponsor, SponsorTier } from "./types";

/** The public sponsorship offer. Keep every line aligned with the sponsor deck. */
export const sponsorTiers = [
  {
    id: "host",
    name: "Host",
    tagline: "Presencia principal",
    summary:
      "La presencia más amplia en escenario, feria de talento, talleres y comunicación previa al evento.",
    code: "01",
    priceUsd: 1000,
    accent: "orange",
    slots: 2,
    featured: true,
    benefits: [
      "Logo en gigantografía de bienvenida, kit, roll-ups, credenciales y lanyards",
      "Logo en la web oficial, 3 publicaciones dedicadas y video promocional de 2 minutos",
      "Mención especial en escenario y en las 4 sesiones virtuales previas",
      "Stand preferente de 3 m con 2 mesas y hasta 8 encargados",
      "Vacantes y prácticas en web y redes; espacio en la feria de talento",
      "CVs de candidatos que autoricen compartirlos y lista de contactos con consentimiento",
      "Charla técnica de 30 minutos, taller hands-on co-dictado y reto de marca",
      "Nombre de una sala o taller, kit de capacitación AWS e informe de métricas",
      "Prioridad de renovación del mismo nivel en 2027",
    ],
    sponsors: [],
  },
  {
    id: "platinum",
    name: "Platinum",
    tagline: "Activación de talento",
    summary:
      "Combina presencia de marca, stand preferente, feria de talento y una activación técnica propia.",
    code: "02",
    priceUsd: 800,
    accent: "sky",
    slots: 4,
    featured: false,
    benefits: [
      "Logo en gigantografía de bienvenida, kit, roll-ups y web oficial",
      "2 publicaciones dedicadas, video promocional de 45 segundos y menciones virtuales previas",
      "Mención especial en escenario principal",
      "Stand preferente de 2 m con 2 mesas y hasta 5 encargados",
      "Vacantes y prácticas en web y redes; espacio en la feria de talento",
      "CVs de candidatos que autoricen compartirlos y lista de contactos con consentimiento",
      "Taller hands-on co-dictado, reto de marca y kit de capacitación AWS",
      "Informe de métricas de marca y prioridad de renovación en 2027",
    ],
    sponsors: [],
  },
  {
    id: "gold",
    name: "Gold",
    tagline: "Presencia activa",
    summary:
      "Una presencia visible durante el evento, con espacio para conversar y reclutar talento.",
    code: "03",
    priceUsd: 500,
    accent: "green",
    slots: 6,
    featured: false,
    benefits: [
      "Logo en gigantografía de bienvenida, kit, roll-ups y web oficial",
      "Mención en escenario, una publicación dedicada y menciones virtuales previas",
      "Stand de 1 m con una mesa y hasta 2 encargados",
      "Vacantes y prácticas en web y redes; espacio en la feria de talento",
      "Informe de métricas de marca hasta 15 días después del evento",
    ],
    sponsors: [],
  },
  {
    id: "silver",
    name: "Silver",
    tagline: "Apoya la comunidad",
    summary:
      "Una forma directa de apoyar un evento gratuito y mantener tu marca presente en sus puntos clave.",
    code: "04",
    priceUsd: 300,
    accent: "purple",
    slots: undefined,
    featured: false,
    benefits: [
      "Logo en gigantografía de bienvenida, kit y web oficial",
      "Mención en el escenario principal",
    ],
    sponsors: [],
  },
] as const satisfies readonly SponsorTier[];

/** The short criteria companies compare before opening a package's full detail. */
export const sponsorComparisonRows = [
  {
    label: "Escenario y contenido",
    values: {
      silver: "Mención en escenario",
      gold: "Mención + sesiones virtuales",
      platinum: "Mención especial + taller",
      host: "Mención especial + charla y taller",
    },
  },
  {
    label: "Feria de talento",
    values: {
      silver: "—",
      gold: "Stand de 1 m",
      platinum: "Stand preferente de 2 m",
      host: "Stand preferente de 3 m",
    },
  },
  {
    label: "Reclutamiento",
    values: {
      silver: "—",
      gold: "Vacantes y prácticas",
      platinum: "Vacantes + candidatos con consentimiento",
      host: "Vacantes + candidatos con consentimiento",
    },
  },
  {
    label: "Comunicación",
    values: {
      silver: "Logo en web, kit y bienvenida",
      gold: "Logo + 1 publicación",
      platinum: "Logo + 2 publicaciones y video",
      host: "Logo + 3 publicaciones y video",
    },
  },
  {
    label: "Informe post-evento",
    values: {
      silver: "—",
      gold: "Sí, hasta 15 días después",
      platinum: "Sí, hasta 15 días después",
      host: "Sí, hasta 15 días después",
    },
  },
] as const satisfies readonly {
  label: string;
  values: Record<SponsorTier["id"], string>;
}[];

export const confirmedSponsors: readonly Sponsor[] = sponsorTiers.flatMap(
  (tier) => tier.sponsors,
);
