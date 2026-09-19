import { PixelIcon } from "@/components/brand/PixelIcon";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { event, eventDateLabel } from "@/content/event";
import type { Locale } from "@/lib/i18n";

const copy = {
  es: {
    eyebrow: "Sede",
    title: "Dónde y cuándo",
    directions: "Cómo llegar",
    note: "El registro abre a las 08:00. Llevá tu documento de identidad, y tu laptop si pensás entrar a los laboratorios.",
  },
  en: {
    eyebrow: "Venue",
    title: "Where and when",
    directions: "Get directions",
    note: "Check-in opens at 08:00. Bring your ID, and your laptop if you plan to join the labs.",
  },
} as const;

export function Venue({ locale }: { locale: Locale }) {
  const { venue } = event;
  const t = copy[locale];

  return (
    <Section id="sede" eyebrow={t.eyebrow} title={t.title}>
      <div className="grid gap-px border border-slate-600 bg-slate-600 lg:grid-cols-2">
        <div className="bg-slate-900 p-8 md:p-10" data-reveal>
          <PixelIcon name="pin" className="text-purple size-8" />
          <h3 className="font-display text-display-md mt-6 text-white">{venue.name}</h3>
          <address className="text-body-lg mt-3 space-y-1 text-slate-200 not-italic">
            {venue.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <span className="block">
              {venue.city}, {venue.country}
            </span>
          </address>
          <div className="mt-8">
            <Button href={venue.mapsUrl} variant="secondary" size="sm">
              {t.directions}
            </Button>
          </div>
        </div>

        <div className="bg-slate-900 p-8 md:p-10" data-reveal>
          <PixelIcon name="calendar" className="text-sky size-8" />
          <p className="font-display text-display-md mt-6 text-white">
            {eventDateLabel[locale].long}
          </p>
          <p className="tabular font-display text-body-lg mt-3 text-slate-200">
            {event.startTime} — {event.endTime}
          </p>
          <p className="mt-8 text-slate-200">{t.note}</p>
        </div>
      </div>
    </Section>
  );
}
