import type { EventInfo } from "./types";

/**
 * Canonical origin. Every absolute URL the site emits — `metadataBase`, the
 * sitemap, robots.txt and the JSON-LD graph — resolves from here, so the origin
 * is stated once and can never drift between them.
 */
export const siteUrl = "https://scday.upb.bo";

export const event: EventInfo = {
  name: "Student Community Day",
  edition: "Cochabamba 2026",
  slug: "SC-DAY // 001",
  tagline: "La comunidad tecnológica universitaria se encuentra aquí.",
  dateISO: "2026-10-10",
  startTime: "09:00",
  endTime: "18:00",
  timeZone: "America/La_Paz",
  utcOffset: "-04:00",
  registrationUrl: "https://luma.com/r65j1ukn",
  /**
   * Convocatoria de speakers. El resto del sitio la trata como destino de primera
   * clase (nav, hero, bloque de registro, agenda y footer) leyendo siempre este
   * campo, así que cambiarla aquí la cambia en todas partes.
   */
  speakersUrl: "https://sessionize.com/aws-student-community-day-cochabamba-bolivia",
  price: "Gratis",
  venue: {
    name: "Universidad Privada Boliviana",
    shortName: "UPB",
    addressLines: ["Av. Juan Pablo II", "Colcapirhua"],
    city: "Cochabamba",
    country: "Bolivia",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Universidad+Privada+Boliviana+Cochabamba",
  },
  contactEmail: "sbgcbba@upb.edu",
  sponsorshipEmail: "sbgcbba@upb.edu",
  social: [],
};

/** Absolute instant the programme opens. Used by the countdown and the JSON-LD. */
export const eventStartISO = `${event.dateISO}T${event.startTime}:00${event.utcOffset}`;
export const eventEndISO = `${event.dateISO}T${event.endTime}:00${event.utcOffset}`;

/**
 * The date in the forms the copy actually needs. Written out rather than
 * formatted at runtime so the month is the Spanish the brand uses and never the
 * server locale's — `event.test.ts` asserts every field against `dateISO`, which
 * is what keeps a stale month label from surviving in a page title again.
 */
export const eventDateLabel = {
  day: "10",
  month: "Octubre",
  year: "2026",
  /** Compact form for page titles and social cards. */
  short: "10 Oct",
  long: "10 de octubre de 2026",
} as const;
