import { PixelIcon } from "@/components/brand/PixelIcon";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { event, eventDateLabel, organizerGroupsLabel } from "@/content/event";
import { speakerCta } from "@/content/nav";
import { localePath, type Locale } from "@/lib/i18n";

import { Countdown } from "./Countdown";
import { HeroField } from "./HeroField";
import { HeroIntro } from "./HeroIntro";

const communityLinks = [
  {
    href: "https://www.instagram.com/aws_sbg_bolivia/",
    shortLabel: { es: "SBG Bolivia", en: "SBG Bolivia" },
    platform: "instagram",
  },
  {
    href: "https://chat.whatsapp.com/E3JGbxrbDYaICTwRpIN1Jz?s=cl&p=a&mlu=4",
    shortLabel: { es: "Comunidad WhatsApp", en: "WhatsApp community" },
    platform: "whatsapp",
  },
] as const;

const copy = {
  es: {
    community: "Comunidad",
    today: "¡El evento es hoy!",
    registered: "1010+ personas registradas",
    app: "Abrir la app del evento",
    agenda: "Ver la agenda",
    directions: "Cómo llegar · Google Maps",
  },
  en: {
    community: "Community",
    today: "Today is the day!",
    registered: "1010+ people registered",
    app: "Open the event app",
    agenda: "See the agenda",
    directions: "Get directions · Google Maps",
  },
} as const;

function CommunityIcon({
  platform,
}: {
  platform: (typeof communityLinks)[number]["platform"];
}) {
  if (platform === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="size-4 fill-current">
        <path d="M7.4 2h9.2A5.4 5.4 0 0 1 22 7.4v9.2a5.4 5.4 0 0 1-5.4 5.4H7.4A5.4 5.4 0 0 1 2 16.6V7.4A5.4 5.4 0 0 1 7.4 2Zm-.2 2A3.2 3.2 0 0 0 4 7.2v9.6A3.2 3.2 0 0 0 7.2 20h9.6a3.2 3.2 0 0 0 3.2-3.2V7.2A3.2 3.2 0 0 0 16.8 4H7.2ZM12 6.8A5.2 5.2 0 1 1 6.8 12 5.2 5.2 0 0 1 12 6.8Zm0 2A3.2 3.2 0 1 0 15.2 12 3.2 3.2 0 0 0 12 8.8Zm5.45-3.5a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-4 fill-current">
      <path d="M20.5 3.5A11.9 11.9 0 0 0 2.6 19.1L1 23l4-1.5A12 12 0 1 0 20.5 3.5ZM12 22a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-2.37.88.9-2.3-.24-.38A10 10 0 1 1 12 22Zm5.48-7.44c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07a8.1 8.1 0 0 1-2.38-1.47 8.9 8.9 0 0 1-1.64-2.04c-.17-.3 0-.46.13-.6.14-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52l-.97-2.34c-.24-.57-.48-.5-.67-.5h-.57a1.1 1.1 0 0 0-.8.37 3.35 3.35 0 0 0-1.05 2.5 5.85 5.85 0 0 0 1.22 3.12c.15.2 2.1 3.2 5.08 4.5.7.3 1.25.48 1.68.62.7.22 1.34.19 1.84.12.56-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.28-.2-.58-.35Z" />
    </svg>
  );
}

function CommunityLinks({ locale, className }: { locale: Locale; className?: string }) {
  return (
    <nav aria-label={copy[locale].community} className={className}>
      <ul className="flex flex-wrap items-center gap-x-5 gap-y-3">
        {communityLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-small tracking-mono-caps hover:border-sky inline-flex items-center gap-2 border-b border-slate-600 pb-1 text-slate-200 uppercase transition-colors hover:text-white"
            >
              <CommunityIcon platform={link.platform} />
              <span>{link.shortLabel[locale]}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function MetaBox({
  icon,
  children,
}: {
  icon: "calendar" | "pin";
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 border border-slate-600 px-5 py-4">
      <PixelIcon name={icon} className="text-sky size-6 shrink-0" />
      <div className="font-display text-small tracking-mono-caps text-white uppercase">
        {children}
      </div>
    </div>
  );
}

export function Hero({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const date = eventDateLabel[locale];

  return (
    <header
      id="inicio"
      className="grid-motif relative isolate overflow-hidden [background-position:right_top]"
    >
      <HeroIntro />
      <HeroField className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />

      <Container className="relative flex min-h-svh flex-col justify-center py-28">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          <div className="min-w-0">
            <div data-hero-step>
              <Eyebrow>
                AWS Student Builder Groups — {organizerGroupsLabel(locale)}
              </Eyebrow>
            </div>

            <h1 className="font-display text-display-xl mt-6 uppercase lg:text-[clamp(3rem,5vw,4.75rem)]">
              <span data-hero-step className="block">
                Student
              </span>
              <span data-hero-step className="text-sky block">
                Community
              </span>
              <span data-hero-step className="block">
                Day
              </span>
              <span data-hero-step className="text-display-md mt-3 block">
                Cochabamba Bolivia
              </span>
            </h1>

            <p data-hero-step className="text-body-lg mt-6 max-w-xl text-slate-200">
              {event.tagline[locale]}
            </p>
          </div>

          <div className="min-w-0">
            <div
              data-hero-step
              className="border-orange flex flex-col gap-5 border bg-slate-800/90 p-6"
            >
              <div>
                <p className="font-display text-orange flex items-center gap-3 uppercase">
                  <span
                    aria-hidden
                    className="bg-orange size-3 shrink-0 rounded-full motion-safe:animate-pulse"
                  />
                  {t.today}
                </p>
                <p className="mt-2 text-white">{t.registered}</p>
              </div>
              <Button href="https://app.studentcommunity.day" className="shrink-0">
                {t.app} <span aria-hidden>↗</span>
              </Button>
            </div>

            <div data-hero-step className="mt-5 grid gap-4">
              <MetaBox icon="calendar">
                <span className="text-display-md text-sky mr-2">{date.day}</span>
                {date.month} {date.year}
              </MetaBox>
              <a
                href={event.venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:bg-white/5"
              >
                <MetaBox icon="pin">
                  {event.venue.shortName} · {event.venue.city}
                  <span className="block text-slate-200">{event.venue.country}</span>
                  <span className="text-sky mt-2 block">{t.directions} ↗</span>
                </MetaBox>
              </a>
            </div>

            <div data-hero-step className="mt-4 flex flex-wrap items-center gap-4">
              <Button href={localePath(locale, "/agenda")} variant="secondary" size="lg">
                {t.agenda}
              </Button>
              <Button href={speakerCta.href} variant="secondary" size="lg">
                {speakerCta.label[locale]} <span aria-hidden>↗</span>
              </Button>
            </div>

            <div data-hero-step className="mt-10">
              <Countdown locale={locale} />
            </div>
          </div>
        </div>
      </Container>

      <div className="relative border-t border-slate-600">
        <Container>
          <div className="flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
            <p
              data-hero-step
              className="font-display tracking-mono-caps flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.6875rem] text-slate-200 uppercase"
            >
              <span>{event.slug}</span>
              <span className="text-white">Build · Connect · Grow</span>
              <span>
                {event.venue.city} / {event.venue.country}
              </span>
            </p>
            <CommunityLinks locale={locale} className="shrink-0" />
          </div>
        </Container>
      </div>
    </header>
  );
}
