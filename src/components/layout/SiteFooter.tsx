import Image from "next/image";

import { BrandLockup } from "@/components/brand/BrandLockup";
import { event } from "@/content/event";
import { navLinks, speakerCta } from "@/content/nav";
import { organizers } from "@/content/organizers";
import { localePath, type Locale } from "@/lib/i18n";

import { Container } from "./Container";

const resources = [
  { href: "https://aws.amazon.com/free/", label: "AWS Free Tier" },
  { href: "https://skillbuilder.aws/", label: "AWS Skill Builder" },
  { href: "https://aws.amazon.com/certification/", label: "AWS Certification" },
] as const;

/** External by construction — each one leaves the site. */
const participate = [
  {
    href: event.registrationUrl,
    label: { es: "Registro en Luma", en: "Register on Luma" },
  },
  { href: speakerCta.href, label: speakerCta.label },
] as const;

const copy = {
  es: {
    sections: "Secciones del sitio",
    event: "El evento",
    participate: "Participar",
    packages: "Paquetes de patrocinio",
    writeTeam: "Escribir al equipo",
    resources: "Recursos",
  },
  en: {
    sections: "Site sections",
    event: "The event",
    participate: "Take part",
    packages: "Sponsorship packages",
    writeTeam: "Email the team",
    resources: "Resources",
  },
} as const;

const externalLink = { target: "_blank", rel: "noopener noreferrer" } as const;

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const home = localePath(locale, "/");

  return (
    <footer className="border-t border-slate-600 bg-slate-900 py-16">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <BrandLockup />
            <p className="mt-5 max-w-sm text-slate-200">
              {event.name} {event.edition}. {event.tagline[locale]}
            </p>
            {/* Postal detail in the footer is what local search reads; it also
                saves a visitor a scroll back to the Sede section. */}
            <address className="mt-5 text-slate-200 not-italic">
              <span className="block">{event.venue.name}</span>
              <span className="block">
                {event.venue.addressLines.join(" · ")} — {event.venue.city},{" "}
                {event.venue.country}
              </span>
              <a
                href={`mailto:${event.contactEmail}`}
                className="hover:text-sky mt-2 inline-block text-white underline underline-offset-4"
              >
                {event.contactEmail}
              </a>
            </address>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              {organizers.map((organizer) => (
                <Image
                  key={organizer.id}
                  src={organizer.logo}
                  alt={organizer.name}
                  width={organizer.width}
                  height={organizer.height}
                  className="h-12 w-auto max-w-20 object-contain"
                />
              ))}
            </div>
          </div>

          <nav aria-label={t.sections}>
            <h2 className="font-display text-small tracking-mono-caps text-slate-200 uppercase">
              {t.event}
            </h2>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={`${home}${link.href}`}
                    className="text-slate-200 hover:text-white"
                  >
                    {link.label[locale]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.participate}>
            <h2 className="font-display text-small tracking-mono-caps text-slate-200 uppercase">
              {t.participate}
            </h2>
            <ul className="mt-4 space-y-2">
              {participate.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    {...externalLink}
                    className="text-slate-200 hover:text-white"
                  >
                    {item.label[locale]} <span aria-hidden>↗</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={localePath(locale, "/sponsor-deck")}
                  className="text-slate-200 hover:text-white"
                >
                  {t.packages}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${event.sponsorshipEmail}`}
                  className="text-slate-200 hover:text-white"
                >
                  {t.writeTeam}
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label={t.resources}>
            <h2 className="font-display text-small tracking-mono-caps text-slate-200 uppercase">
              {t.resources}
            </h2>
            <ul className="mt-4 space-y-2">
              {resources.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    {...externalLink}
                    className="text-slate-200 hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-slate-600 pt-6">
          <p className="font-display tracking-mono-caps text-[0.6875rem] text-slate-200 uppercase">
            {event.slug} ▪▪ Build · Connect · Grow ▪▪ {event.venue.city} /{" "}
            {event.venue.country}
          </p>
          <p className="text-small text-slate-200">
            © {new Date(event.dateISO).getUTCFullYear()} AWS Student Builder Groups —
            Bolivia
          </p>
        </div>
      </Container>
    </footer>
  );
}
