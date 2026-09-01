"use client";

import { useEffect, useState } from "react";

import { BrandLockup } from "@/components/brand/BrandLockup";
import { Button } from "@/components/ui/Button";
import { event } from "@/content/event";
import { navLinks } from "@/content/nav";
import { cn } from "@/lib/cn";

import { Container } from "./Container";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-colors duration-200",
        scrolled || open
          ? "border-slate-600 bg-slate-900"
          : "border-transparent bg-transparent",
      )}
    >
      <Container>
        <div className="flex h-18 items-center justify-between gap-6">
          <a href="#inicio" className="shrink-0" aria-label="Inicio">
            <BrandLockup size="sm" className="max-sm:[&>span:last-child]:hidden" />
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-display text-small tracking-mono-caps text-slate-200 uppercase transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Button href={event.registrationUrl} size="sm" className="max-sm:hidden">
              Regístrate
            </Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-movil"
              className="font-display text-small tracking-mono-caps text-white uppercase lg:hidden"
            >
              {open ? "Cerrar" : "Menú"}
            </button>
          </div>
        </div>
      </Container>

      <div
        id="menu-movil"
        hidden={!open}
        className="border-t border-slate-600 bg-slate-900 lg:hidden"
      >
        <Container>
          <ul className="flex flex-col py-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-small tracking-mono-caps block py-3 text-slate-200 uppercase"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="py-3">
              <Button href={event.registrationUrl} size="sm">
                Regístrate
              </Button>
            </li>
          </ul>
        </Container>
      </div>
    </header>
  );
}
