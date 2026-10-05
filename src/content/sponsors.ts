import type { Localized } from "@/lib/i18n";

import type { HostPartner, Sponsor, SponsorTier } from "./types";

/** The public sponsorship offer. Keep every line aligned with the sponsor deck. */
export const sponsorTiers = [
  {
    id: "host",
    name: "Host",
    tagline: { es: "Presencia principal", en: "Lead presence" },
    summary: {
      es: "La presencia más amplia en escenario, feria de talento, talleres y comunicación previa al evento.",
      en: "The widest presence on stage, at the talent fair, in the workshops and in pre-event communications.",
    },
    code: "01",
    priceUsd: 1000,
    accent: "orange",
    slots: 2,
    featured: true,
    benefits: {
      es: [
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
      en: [
        "Logo on the welcome banner, kit, roll-ups, badges and lanyards",
        "Logo on the official website, 3 dedicated posts and a 2-minute promo video",
        "Special mention on stage and in the 4 pre-event virtual sessions",
        "Preferred 3 m booth with 2 tables and up to 8 staff",
        "Jobs and internships on the website and social media; a spot at the talent fair",
        "CVs from candidates who agree to share them and an opt-in contact list",
        "30-minute technical talk, a co-taught hands-on workshop and a branded challenge",
        "Naming of a room or workshop, an AWS training kit and a metrics report",
        "Priority renewal at the same tier in 2027",
      ],
    },
    sponsors: [],
  },
  {
    id: "platinum",
    name: "Platinum",
    tagline: { es: "Activación de talento", en: "Talent activation" },
    summary: {
      es: "Combina presencia de marca, stand preferente, feria de talento y una activación técnica propia.",
      en: "Combines brand presence, a preferred booth, the talent fair and a technical activation of your own.",
    },
    code: "02",
    priceUsd: 800,
    accent: "sky",
    slots: 4,
    featured: false,
    benefits: {
      es: [
        "Logo en gigantografía de bienvenida, kit, roll-ups y web oficial",
        "2 publicaciones dedicadas, video promocional de 45 segundos y menciones virtuales previas",
        "Mención especial en escenario principal",
        "Stand preferente de 2 m con 2 mesas y hasta 5 encargados",
        "Vacantes y prácticas en web y redes; espacio en la feria de talento",
        "CVs de candidatos que autoricen compartirlos y lista de contactos con consentimiento",
        "Taller hands-on co-dictado, reto de marca y kit de capacitación AWS",
        "Informe de métricas de marca y prioridad de renovación en 2027",
      ],
      en: [
        "Logo on the welcome banner, kit, roll-ups and official website",
        "2 dedicated posts, a 45-second promo video and mentions in the pre-event virtual sessions",
        "Special mention on the main stage",
        "Preferred 2 m booth with 2 tables and up to 5 staff",
        "Jobs and internships on the website and social media; a spot at the talent fair",
        "CVs from candidates who agree to share them and an opt-in contact list",
        "A co-taught hands-on workshop, a branded challenge and an AWS training kit",
        "Brand metrics report and priority renewal in 2027",
      ],
    },
    sponsors: [],
  },
  {
    id: "gold",
    name: "Gold",
    tagline: { es: "Presencia activa", en: "Active presence" },
    summary: {
      es: "Una presencia visible durante el evento, con espacio para conversar y reclutar talento.",
      en: "A visible presence throughout the event, with room to talk with and recruit talent.",
    },
    code: "03",
    priceUsd: 500,
    accent: "green",
    slots: 6,
    featured: false,
    benefits: {
      es: [
        "Logo en gigantografía de bienvenida, kit, roll-ups y web oficial",
        "Mención en escenario, una publicación dedicada y menciones virtuales previas",
        "Stand de 1 m con una mesa y hasta 2 encargados",
        "Vacantes y prácticas en web y redes; espacio en la feria de talento",
        "Informe de métricas de marca hasta 15 días después del evento",
      ],
      en: [
        "Logo on the welcome banner, kit, roll-ups and official website",
        "Stage mention, one dedicated post and mentions in the pre-event virtual sessions",
        "1 m booth with one table and up to 2 staff",
        "Jobs and internships on the website and social media; a spot at the talent fair",
        "Brand metrics report within 15 days after the event",
      ],
    },
    sponsors: [],
  },
  {
    id: "silver",
    name: "Silver",
    tagline: { es: "Apoya la comunidad", en: "Support the community" },
    summary: {
      es: "Una forma directa de apoyar un evento gratuito y mantener tu marca presente en sus puntos clave.",
      en: "A direct way to support a free event and keep your brand present at its key moments.",
    },
    code: "04",
    priceUsd: 300,
    accent: "purple",
    slots: undefined,
    featured: false,
    benefits: {
      es: [
        "Logo en gigantografía de bienvenida, kit y web oficial",
        "Mención en el escenario principal",
      ],
      en: [
        "Logo on the welcome banner, kit and official website",
        "Mention on the main stage",
      ],
    },
    sponsors: [],
  },
] as const satisfies readonly SponsorTier[];

/** The short criteria companies compare before opening a package's full detail. */
export const sponsorComparisonRows = [
  {
    label: { es: "Escenario y contenido", en: "Stage and content" },
    values: {
      silver: { es: "Mención en escenario", en: "Stage mention" },
      gold: { es: "Mención + sesiones virtuales", en: "Mention + virtual sessions" },
      platinum: { es: "Mención especial + taller", en: "Special mention + workshop" },
      host: {
        es: "Mención especial + charla y taller",
        en: "Special mention + talk and workshop",
      },
    },
  },
  {
    label: { es: "Feria de talento", en: "Talent fair" },
    values: {
      silver: { es: "—", en: "—" },
      gold: { es: "Stand de 1 m", en: "1 m booth" },
      platinum: { es: "Stand preferente de 2 m", en: "Preferred 2 m booth" },
      host: { es: "Stand preferente de 3 m", en: "Preferred 3 m booth" },
    },
  },
  {
    label: { es: "Reclutamiento", en: "Recruiting" },
    values: {
      silver: { es: "—", en: "—" },
      gold: { es: "Vacantes y prácticas", en: "Jobs and internships" },
      platinum: {
        es: "Vacantes + candidatos con consentimiento",
        en: "Jobs + opt-in candidates",
      },
      host: {
        es: "Vacantes + candidatos con consentimiento",
        en: "Jobs + opt-in candidates",
      },
    },
  },
  {
    label: { es: "Comunicación", en: "Communications" },
    values: {
      silver: {
        es: "Logo en web, kit y bienvenida",
        en: "Logo on website, kit and welcome banner",
      },
      gold: { es: "Logo + 1 publicación", en: "Logo + 1 post" },
      platinum: { es: "Logo + 2 publicaciones y video", en: "Logo + 2 posts and video" },
      host: { es: "Logo + 3 publicaciones y video", en: "Logo + 3 posts and video" },
    },
  },
  {
    label: { es: "Informe post-evento", en: "Post-event report" },
    values: {
      silver: { es: "—", en: "—" },
      gold: { es: "Sí, hasta 15 días después", en: "Yes, within 15 days" },
      platinum: { es: "Sí, hasta 15 días después", en: "Yes, within 15 days" },
      host: { es: "Sí, hasta 15 días después", en: "Yes, within 15 days" },
    },
  },
] as const satisfies readonly {
  label: Localized;
  values: Record<SponsorTier["id"], Localized>;
}[];

export const confirmedSponsors: readonly Sponsor[] = sponsorTiers.flatMap(
  (tier) => tier.sponsors,
);

/**
 * The organisations behind the event itself. Kept apart from `sponsorTiers` so
 * they never take a paid package's slot or change its availability count.
 */
export const hostPartners = [
  {
    id: "aws",
    name: "Amazon Web Services",
    role: { es: "Host", en: "Host" },
    logo: "/sponsors/aws.svg",
    href: "https://aws.amazon.com/",
    width: 304,
    height: 182,
  },
  {
    id: "upb",
    name: "Universidad Privada Boliviana",
    role: { es: "Sede anfitriona", en: "Host venue" },
    logo: "/sponsors/upb.svg",
    href: "https://www.upb.edu/",
    width: 356,
    height: 135,
  },
] as const satisfies readonly HostPartner[];

/**
 * Sister AWS Student Builder Groups co-organising the event, shown after the
 * UPB group's own tile. White marks: render them on a dark surface only.
 */
export const organizers = [
  {
    id: "sbg-ucb-la-paz",
    name: "AWS Student Builder Group UCB La Paz",
    logo: "/organizers/ucb-la-paz-white.svg",
    width: 2334,
    height: 2257,
  },
  {
    id: "sbg-umsa",
    name: "AWS Student Builder Group UMSA",
    logo: "/organizers/umsa-white.png",
    width: 1200,
    height: 359,
  },
  {
    id: "sbg-umss",
    name: "AWS Student Builder Group UMSS",
    logo: "/organizers/umss-white.png",
    width: 800,
    height: 800,
  },
  {
    id: "sbg-univalle",
    name: "AWS Student Builder Group Univalle",
    logo: "/organizers/univalle-white.png",
    width: 800,
    height: 668,
  },
] as const satisfies readonly Sponsor[];

/** The PDF deck offered for download next to the sponsorship CTA. */
export const sponsorDeckPdf = "/downloads/scd-bolivia-2026-sponsor-deck.pdf";
