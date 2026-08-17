import { PixelIcon } from "@/components/brand/PixelIcon";
import { Container } from "@/components/layout/Container";
import { accentFill } from "@/components/ui/accent";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { event, eventDateLabel } from "@/content/event";
import type { FillAccent } from "@/content/types";
import { cn } from "@/lib/cn";

import { Countdown } from "./Countdown";
import { HeroField } from "./HeroField";
import { HeroIntro } from "./HeroIntro";

/**
 * The six solid cells double as the page's secondary navigation, so the most
 * distinctive thing on the page also does a job. Laid out on the same 80px module
 * as the lattice, anchored right so the two line up.
 *
 * One accent, not three. The reference art fills its numbered cells in a single
 * colour, and the brand rule is that accents are used one at a time on a surface —
 * three saturated fills side by side is exactly the look this design avoids. Track
 * colours still differentiate, but further down where they carry meaning.
 */
const HERO_ACCENT: FillAccent = "sky";

const navCells: ReadonlyArray<{
  code: string;
  label: string;
  href: string;
  column: number;
  row: number;
}> = [
  { code: "01", label: "Tracks", href: "#tracks", column: 1, row: 2 },
  { code: "02", label: "Agenda", href: "#agenda", column: 3, row: 2 },
  { code: "03", label: "Sede", href: "#sede", column: 5, row: 2 },
  { code: "04", label: "Patrocinio", href: "#patrocinio", column: 1, row: 4 },
  { code: "05", label: "Equipo", href: "#equipo", column: 3, row: 4 },
  { code: "06", label: "FAQ", href: "#faq", column: 5, row: 4 },
];

function MetaBox({
  icon,
  children,
}: {
  icon: "calendar" | "pin";
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 border border-slate-600 px-5 py-4">
      <PixelIcon name={icon} className="text-sky w-6 shrink-0" />
      <div className="font-display text-small tracking-mono-caps text-white uppercase">
        {children}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <header
      id="inicio"
      className="grid-motif relative isolate overflow-hidden [background-position:right_top]"
    >
      <HeroIntro />
      <HeroField className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />

      {/* The signature cells. Hidden below lg, where they reappear inline as a
          static block under the call to action. */}
      <nav
        aria-label="Secciones"
        className="pointer-events-none absolute top-0 right-0 bottom-0 hidden lg:grid"
        style={{
          gridTemplateColumns: "repeat(6, 80px)",
          gridAutoRows: "80px",
          width: "480px",
        }}
      >
        {navCells.map((cell) => (
          <a
            key={cell.code}
            href={cell.href}
            data-hero-cell
            style={{ gridColumn: cell.column, gridRow: cell.row }}
            className={cn(
              "pointer-events-auto flex items-start justify-start p-3",
              "border border-transparent transition-colors duration-150",
              "font-display text-body hover:border-white",
              accentFill[HERO_ACCENT],
            )}
          >
            <span aria-hidden>{cell.code}</span>
            <span className="sr-only">{cell.label}</span>
          </a>
        ))}
      </nav>

      <Container className="relative flex min-h-svh flex-col justify-center py-28">
        <div className="max-w-3xl lg:max-w-[36rem] xl:max-w-3xl">
          <div data-hero-step>
            <Eyebrow>AWS Student Builder Group — UPB Cochabamba</Eyebrow>
          </div>

          <h1 className="font-display text-display-xl mt-6 uppercase">
            <span data-hero-step className="block">
              Student
            </span>
            <span data-hero-step className="text-sky block">
              Community
            </span>
            <span data-hero-step className="block">
              Day
            </span>
          </h1>

          <p data-hero-step className="text-body-lg mt-6 max-w-xl text-slate-200">
            {event.tagline}
          </p>

          <div data-hero-step className="mt-10 grid gap-px sm:grid-cols-2 sm:gap-4">
            <MetaBox icon="calendar">
              <span className="text-display-md text-sky mr-2">{eventDateLabel.day}</span>
              {eventDateLabel.month} {eventDateLabel.year}
            </MetaBox>
            <MetaBox icon="pin">
              {event.venue.shortName} · {event.venue.city}
              <span className="block text-slate-200">{event.venue.country}</span>
            </MetaBox>
          </div>

          <div data-hero-step className="mt-10 flex flex-wrap items-center gap-4">
            <Button href={event.registrationUrl} size="lg">
              Inscríbete gratis
            </Button>
            <Button href="/agenda" variant="secondary" size="lg">
              Ver la agenda
            </Button>
          </div>

          <div data-hero-step className="mt-10">
            <Countdown />
          </div>

          {/* Mobile stand-in for the cell field. */}
          <nav
            aria-label="Secciones"
            className="mt-12 grid grid-cols-3 gap-px border border-slate-600 lg:hidden"
          >
            {navCells.map((cell) => (
              <a
                key={cell.code}
                href={cell.href}
                className="font-display text-small flex flex-col gap-1 bg-slate-800 p-4"
              >
                <span className={cn("w-fit px-1", accentFill[HERO_ACCENT])}>
                  {cell.code}
                </span>
                <span className="text-slate-200">{cell.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </Container>

      <div className="relative border-t border-slate-600">
        <Container>
          <p className="font-display tracking-mono-caps flex flex-wrap items-center gap-x-6 gap-y-2 py-4 text-[0.6875rem] text-slate-200 uppercase">
            <span>{event.slug}</span>
            <span className="text-white">Build · Connect · Grow</span>
            <span>
              {event.venue.city} / {event.venue.country}
            </span>
          </p>
        </Container>
      </div>
    </header>
  );
}
