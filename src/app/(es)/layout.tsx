import type { Metadata } from "next";

import { MotionRoot } from "@/components/motion/MotionRoot";
import { event, eventDateLabel, organizerName, siteUrl } from "@/content/event";
import { amazonEmber, jetbrainsMono } from "@/lib/fonts";
import { languageAlternates } from "@/lib/i18n";

import "../globals.css";

const title = `AWS ${event.name} ${event.edition}`;

/**
 * Kept under ~155 characters and written as a direct answer rather than a pitch:
 * it is the string a search result and an answer engine both quote, so it leads
 * with what/where/when instead of with adjectives.
 */
const description =
  `Evento gratuito de un día en la ${event.venue.name}, ${event.venue.city}, el ` +
  `${eventDateLabel.es.long}. Charlas, talleres y un stream virtual sobre tecnología en la nube.`;

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
  authors: [{ name: organizerName, url: siteUrl }],
  creator: organizerName,
  publisher: organizerName,
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${amazonEmber.variable} ${jetbrainsMono.variable}`}>
      <body>
        <MotionRoot />
        {children}
      </body>
    </html>
  );
}
