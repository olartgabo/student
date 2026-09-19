import type { Metadata } from "next";

import { MotionRoot } from "@/components/motion/MotionRoot";
import {
  event,
  eventDateLabel,
  eventEndISO,
  eventStartISO,
  siteUrl,
} from "@/content/event";
import { faq } from "@/content/faq";
import { tracks } from "@/content/tracks";
import { amazonEmber, jetbrainsMono } from "@/lib/fonts";
import { languageAlternates } from "@/lib/i18n";

import "./globals.css";

const title = `AWS ${event.name} ${event.edition}`;

/**
 * Kept under ~155 characters and written as a direct answer rather than a pitch:
 * it is the string a search result and an answer engine both quote, so it leads
 * with what/where/when instead of with adjectives.
 */
const description =
  `Evento gratuito de un día en la ${event.venue.name}, ${event.venue.city}, el ` +
  `${eventDateLabel.es.long}. Tres tracks —IA, Cloud y Ciberseguridad— y dos laboratorios prácticos en paralelo.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${title} — ${eventDateLabel.es.short} · Gratis`,
    template: `%s — AWS ${event.name} ${event.edition}`,
  },
  description,
  applicationName: title,
  // Every route sets its own; the root declares the home page's.
  alternates: { canonical: "/", languages: languageAlternates("/") },
  keywords: [
    "AWS Student Community Day",
    "AWS Student Community Day Bolivia",
    "AWS Student Builder Group",
    "UPB Cochabamba",
    "evento cloud Bolivia",
    "evento tech Cochabamba 2026",
    "call for speakers Bolivia",
    "patrocinio evento tecnológico Cochabamba",
  ],
  authors: [{ name: "AWS Student Builder Group — UPB Cochabamba", url: siteUrl }],
  creator: "AWS Student Builder Group — UPB Cochabamba",
  publisher: "AWS Student Builder Group — UPB Cochabamba",
  category: "technology",
  openGraph: {
    type: "website",
    locale: "es_BO",
    url: "/",
    siteName: title,
    title: `${title} — ${eventDateLabel.es.short} · Cochabamba · Gratis`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} — ${eventDateLabel.es.short} · Cochabamba · Gratis`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    // Answer engines and rich results are both capped by these; the defaults are
    // conservative enough to truncate an FAQ answer mid-sentence.
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

const organizer = {
  "@type": "Organization",
  "@id": `${siteUrl}/#organizer`,
  name: "AWS Student Builder Group — UPB Cochabamba",
  url: siteUrl,
  email: event.contactEmail,
};

const eventSchema = {
  "@type": "Event",
  "@id": `${siteUrl}/#event`,
  name: title,
  url: siteUrl,
  startDate: eventStartISO,
  endDate: eventEndISO,
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  description,
  inLanguage: "es",
  isAccessibleForFree: true,
  image: [`${siteUrl}/opengraph-image`],
  keywords: tracks.map((track) => track.name.es).join(", "),
  about: tracks.map((track) => ({ "@type": "Thing", name: track.name.es })),
  location: {
    "@type": "Place",
    name: event.venue.name,
    url: event.venue.mapsUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: event.venue.addressLines.join(", "),
      addressLocality: event.venue.city,
      addressCountry: "BO",
    },
  },
  organizer,
  offers: {
    "@type": "Offer",
    name: "Entrada general",
    price: 0,
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: event.registrationUrl,
    validFrom: `${event.dateISO.slice(0, 4)}-01-01T00:00:00${event.utcOffset}`,
  },
};

/**
 * The same questions the FAQ section renders, in the shape an answer engine can
 * quote directly. Generated from `faq.ts` rather than restated, so the markup can
 * never claim an answer the page does not show.
 */
const faqSchema = {
  "@type": "FAQPage",
  "@id": `${siteUrl}/#faq`,
  mainEntity: faq.es.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer.join(" ") },
  })),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [eventSchema, faqSchema],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${amazonEmber.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <MotionRoot />
        {children}
      </body>
    </html>
  );
}
