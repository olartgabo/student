"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { BrandLockup } from "@/components/brand/BrandLockup";
import { Button } from "@/components/ui/Button";
import { event } from "@/content/event";
import { navLinks, speakerCta } from "@/content/nav";
import { Container } from "./Container";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const homeHref = (hash: string) => (pathname === "/" ? hash : `/${hash}`);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-600 bg-slate-900">
      <Container>
        <div className="flex h-18 items-center justify-between gap-4 xl:gap-6">
          <Link
            href="/"
            className="shrink-0"
            aria-label="Ir al inicio de Student Community Day Bolivia"
            onClick={() => setOpen(false)}
          >
            <BrandLockup size="sm" compactOnMobile />
          </Link>

          <nav aria-label="Principal" className="hidden xl:block">
            <ul className="flex items-center gap-5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={homeHref(link.href)}
                    className="font-display text-small tracking-mono-caps text-slate-200 uppercase transition-colors hover:text-white"
                  >
                    {link.label}
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
              {speakerCta.shortLabel} <span aria-hidden>↗</span>
            </Button>
            <Button href={event.registrationUrl} size="sm" className="max-sm:hidden">
              Regístrate
            </Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-movil"
              className="font-display text-small tracking-mono-caps text-white uppercase xl:hidden"
            >
              {open ? "Cerrar" : "Menú"}
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
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="flex flex-wrap gap-3 py-3">
              <Button href={event.registrationUrl} size="sm">
                Regístrate
              </Button>
              <Button href={speakerCta.href} variant="secondary" size="sm">
                {speakerCta.shortLabel} <span aria-hidden>↗</span>
              </Button>
            </li>
          </ul>
        </Container>
      </div>
    </header>
  );
}
