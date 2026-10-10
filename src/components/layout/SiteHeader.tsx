"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { BrandLockup } from "@/components/brand/BrandLockup";
import { Button } from "@/components/ui/Button";
import { event } from "@/content/event";
import { navLinks, speakerCta } from "@/content/nav";
import { localePath, switchLocalePath, type Locale } from "@/lib/i18n";
import { Container } from "./Container";

const copy = {
  es: {
    skip: "Saltar al contenido",
    home: "Ir al inicio de Student Community Day Cochabamba Bolivia",
    nav: "Principal",
    register: "Regístrate",
    open: "Menú",
    close: "Cerrar",
  },
  en: {
    skip: "Skip to content",
    home: "Go to the Student Community Day Cochabamba Bolivia home page",
    nav: "Main",
    register: "Register",
    open: "Menu",
    close: "Close",
  },
} as const;

/** The toggle names the language it switches *to*, in that language. */
const switchTo = {
  es: { locale: "en", short: "EN", name: "English" },
  en: { locale: "es", short: "ES", name: "Español" },
} as const satisfies Record<Locale, { locale: Locale; short: string; name: string }>;

export function SiteHeader({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = copy[locale];
  const home = localePath(locale, "/");
  const homeHref = (hash: string) => (pathname === home ? hash : `${home}${hash}`);
  const other = switchTo[locale];

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-600 bg-slate-900">
      <a
        href="#contenido"
        className="focus:bg-orange focus:font-display focus:text-small focus:text-navy-900 sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-sm focus:px-4 focus:py-2"
      >
        {t.skip}
      </a>
      <Container>
        <div className="flex h-18 items-center justify-between gap-4 xl:gap-6">
          <Link
            href={home}
            className="shrink-0"
            aria-label={t.home}
            onClick={() => setOpen(false)}
          >
            <BrandLockup size="sm" compactOnMobile />
          </Link>

          <nav aria-label={t.nav} className="hidden xl:block">
            <ul className="flex items-center gap-5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={homeHref(link.href)}
                    className="font-display text-small tracking-mono-caps text-slate-200 uppercase transition-colors hover:text-white"
                  >
                    {link.label[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              href={speakerCta.href}
              variant="ghost"
              size="sm"
              className="max-xl:hidden"
            >
              {speakerCta.shortLabel[locale]} <span aria-hidden>↗</span>
            </Button>
            <Button href={event.registrationUrl} size="sm" className="max-sm:hidden">
              {t.register}
            </Button>
            <Link
              href={switchLocalePath(pathname, other.locale)}
              hrefLang={other.locale}
              lang={other.locale}
              onClick={() => setOpen(false)}
              className="font-display text-small tracking-mono-caps hover:border-sky flex h-8 items-center rounded-sm border border-slate-600 px-2.5 text-white uppercase transition-colors"
            >
              <span aria-hidden>{other.short}</span>
              <span className="sr-only">{other.name}</span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-movil"
              className="font-display text-small tracking-mono-caps text-white uppercase xl:hidden"
            >
              {open ? t.close : t.open}
            </button>
          </div>
        </div>
      </Container>

      <div
        id="menu-movil"
        hidden={!open}
        className="border-t border-slate-600 bg-slate-900 xl:hidden"
      >
        <Container>
          <ul className="flex flex-col py-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={homeHref(link.href)}
                  onClick={() => setOpen(false)}
                  className="font-display text-small tracking-mono-caps block py-3 text-slate-200 uppercase"
                >
                  {link.label[locale]}
                </Link>
              </li>
            ))}
            <li className="flex flex-wrap gap-3 py-3">
              <Button href={event.registrationUrl} size="sm">
                {t.register}
              </Button>
              <Button href={speakerCta.href} variant="secondary" size="sm">
                {speakerCta.shortLabel[locale]} <span aria-hidden>↗</span>
              </Button>
            </li>
          </ul>
        </Container>
      </div>
    </header>
  );
}
