import { BrandLockup } from "@/components/brand/BrandLockup";
import { SbgTile } from "@/components/brand/SbgTile";
import { event } from "@/content/event";
import { navLinks, speakerCta } from "@/content/nav";

import { Container } from "./Container";

const resources = [
  { href: "https://aws.amazon.com/free/", label: "AWS Free Tier" },
  { href: "https://skillbuilder.aws/", label: "AWS Skill Builder" },
  { href: "https://aws.amazon.com/certification/", label: "AWS Certification" },
] as const;

/** External by construction — each one leaves the site. */
const participate = [
  { href: event.registrationUrl, label: "Registro en Luma" },
  { href: speakerCta.href, label: speakerCta.label },
] as const;

const externalLink = { target: "_blank", rel: "noopener noreferrer" } as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-600 bg-slate-900 py-16">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <BrandLockup />
            <p className="mt-5 max-w-sm text-slate-200">
              {event.name} {event.edition}. {event.tagline}
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
            <SbgTile
              title="Universidad Privada Boliviana"
              className="mt-8 size-20 text-slate-200"
            />
          </div>

          <nav aria-label="Secciones del sitio">
            <h2 className="font-display text-small tracking-mono-caps text-slate-200 uppercase">
              El evento
            </h2>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={`/${link.href}`} className="text-slate-200 hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Participar">
            <h2 className="font-display text-small tracking-mono-caps text-slate-200 uppercase">
              Participar
            </h2>
            <ul className="mt-4 space-y-2">
              {participate.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    {...externalLink}
                    className="text-slate-200 hover:text-white"
                  >
                    {item.label} <span aria-hidden>↗</span>
                  </a>
                </li>
              ))}
              <li>
                <a href="/sponsor-deck" className="text-slate-200 hover:text-white">
                  Paquetes de patrocinio
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${event.sponsorshipEmail}`}
                  className="text-slate-200 hover:text-white"
                >
                  Escribir al equipo
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Recursos">
            <h2 className="font-display text-small tracking-mono-caps text-slate-200 uppercase">
              Recursos
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
            © {new Date(event.dateISO).getUTCFullYear()} AWS Student Builder Group — UPB
            Cochabamba
          </p>
        </div>
      </Container>
    </footer>
  );
}
