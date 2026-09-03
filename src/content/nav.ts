import { event } from "./event";

export interface NavLink {
  href: string;
  label: string;
  /** Opens in a new tab and renders the ↗ affordance. */
  external?: boolean;
}

export const navLinks: readonly NavLink[] = [
  { href: "#evento", label: "El evento" },
  { href: "#tracks", label: "Tracks" },
  { href: "#agenda", label: "Agenda" },
  { href: "#speakers", label: "Speakers" },
  { href: "#sede", label: "Sede" },
  { href: "#faq", label: "FAQ" },
];

/**
 * The call for speakers. Kept out of `navLinks` because it is a destination, not
 * a section of this page: it renders as its own button next to the registration
 * CTA in the header, the hero and the footer, so proposing a talk is never more
 * than one click away from anywhere on the site.
 */
export const speakerCta = {
  href: event.speakersUrl,
  label: "Propone tu charla",
  /** Shorter form for the header, where the row is already tight. */
  shortLabel: "Sé speaker",
  external: true,
} as const;
