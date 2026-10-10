import type { Locale } from "@/lib/i18n";

import type { EventInfo } from "./types";

/**
 * Canonical origin. Every absolute URL the site emits — `metadataBase`, the
 * sitemap, robots.txt and the JSON-LD graph — resolves from here, so the origin
 * is stated once and can never drift between them.
 */
export const siteUrl = "https://bolivia.studentcommunity.day";

export const event: EventInfo = {
  name: "Student Community Day",
  edition: "Cochabamba 2026",
  slug: "SC-DAY // 001",
  tagline: {
    es: "La comunidad tecnológica universitaria se encuentra aquí.",
    en: "Where Bolivia's university tech community meets.",
  },
  dateISO: "2026-10-10",
  startTime: "08:00",
  endTime: "19:10",
  timeZone: "America/La_Paz",
  utcOffset: "-04:00",
  registrationUrl: "https://luma.com/r65j1ukn",
  /**
   * Convocatoria de speakers. El resto del sitio la trata como destino de primera
   * clase (nav, hero, bloque de registro, agenda y footer) leyendo siempre este
   * campo, así que cambiarla aquí la cambia en todas partes.
   */
  speakersUrl: "https://sessionize.com/aws-student-community-day-cochabamba-bolivia",
  price: { es: "Gratis", en: "Free" },
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

/**
 * The AWS Student Builder Groups organising the event together. Every credit
 * line on the site (hero, About, metadata, social card) is built from this list.
 */
export const organizerName = "AWS Student Builder Groups Bolivia";

export const organizerGroups = [
  { short: "UCB", city: { es: "LP", en: "LP" } },
  { short: "UMSA" },
  { short: "UMSS" },
  { short: "UPB", city: { es: "CBBA y LP", en: "CBBA & LP" } },
  { short: "UAJMS", city: { es: "TJ", en: "TJ" } },
  { short: "Univalle", city: { es: "SCR", en: "SCR" } },
] as const satisfies readonly { short: string; city?: Record<Locale, string> }[];

const groupLabel = (group: (typeof organizerGroups)[number], locale: Locale) =>
  "city" in group ? `${group.short} (${group.city[locale]})` : group.short;

/** "UCB (La Paz) · UMSA · … · Univalle" — for eyebrows and credit lines. */
export function organizerGroupsLabel(locale: Locale): string {
  return organizerGroups.map((group) => groupLabel(group, locale)).join(" · ");
}

/** "UCB (La Paz), UMSA, … y Univalle" — for running copy. */
export function organizerGroupsSentence(locale: Locale): string {
  const names = organizerGroups.map((group) => groupLabel(group, locale));
  const last = names.pop();
  return `${names.join(", ")} ${locale === "es" ? "y" : "and"} ${last}`;
}

/** Absolute instant the programme opens. Used by the countdown and the JSON-LD. */
export const eventStartISO = `${event.dateISO}T${event.startTime}:00${event.utcOffset}`;
export const eventEndISO = `${event.dateISO}T${event.endTime}:00${event.utcOffset}`;

/**
 * The date in the forms the copy actually needs. Written out rather than
 * formatted at runtime so the month is the wording the brand uses and never the
 * server locale's — `event.test.ts` asserts every field against `dateISO`, which
 * is what keeps a stale month label from surviving in a page title again.
 */
export const eventDateLabel = {
  es: {
    day: "10",
    month: "Octubre",
    year: "2026",
    /** Compact form for page titles and social cards. */
    short: "10 Oct",
    long: "10 de octubre de 2026",
  },
  en: {
    day: "10",
    month: "October",
    year: "2026",
    short: "Oct 10",
    long: "October 10, 2026",
  },
} as const satisfies Record<
  Locale,
  Record<"day" | "month" | "year" | "short" | "long", string>
>;
