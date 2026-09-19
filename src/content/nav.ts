import type { Localized } from "@/lib/i18n";

import { event } from "./event";

export interface NavLink {
  href: string;
  label: Localized;
  /** Opens in a new tab and renders the ↗ affordance. */
  external?: boolean;
}

export const navLinks: readonly NavLink[] = [
  { href: "#evento", label: { es: "El evento", en: "The event" } },
  { href: "#tracks", label: { es: "Tracks", en: "Tracks" } },
  { href: "#agenda", label: { es: "Agenda", en: "Agenda" } },
  { href: "#speakers", label: { es: "Speakers", en: "Speakers" } },
  { href: "#sede", label: { es: "Sede", en: "Venue" } },
  { href: "#patrocinio", label: { es: "Sponsors", en: "Sponsors" } },
  { href: "#faq", label: { es: "FAQ", en: "FAQ" } },
];

/**
 * The call for speakers. Kept out of `navLinks` because it is a destination, not
 * a section of this page: it renders as its own button next to the registration
 * CTA in the header, the hero and the footer, so proposing a talk is never more
 * than one click away from anywhere on the site.
 */
export const speakerCta = {
  href: event.speakersUrl,
  label: { es: "Propone tu charla", en: "Submit a talk" },
  /** Shorter form for the header, where the row is already tight. */
  shortLabel: { es: "Sé speaker", en: "Speak" },
  external: true,
} as const;
