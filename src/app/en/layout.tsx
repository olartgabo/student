import type { Metadata } from "next";

import { MotionRoot } from "@/components/motion/MotionRoot";
import { event, eventDateLabel, organizerName, siteUrl } from "@/content/event";
import { amazonEmber, jetbrainsMono } from "@/lib/fonts";
import { languageAlternates } from "@/lib/i18n";

import "../globals.css";

const title = `AWS ${event.name} ${event.edition}`;

const description =
  `A free one-day event at ${event.venue.name}, ${event.venue.city}, on ` +
  `${eventDateLabel.en.long}. Talks, hands-on workshops and a virtual stream about cloud technology.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${title} — ${eventDateLabel.en.short} · Free`,
    template: `%s — ${title}`,
  },
  description,
  applicationName: title,
  authors: [{ name: organizerName, url: siteUrl }],
  creator: organizerName,
  publisher: organizerName,
  category: "technology",
  alternates: { canonical: "/en", languages: languageAlternates("/") },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/en",
    siteName: title,
    title: `${title} — ${eventDateLabel.en.short} · Cochabamba · Free`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} — ${eventDateLabel.en.short} · Cochabamba · Free`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${amazonEmber.variable} ${jetbrainsMono.variable}`}>
      <body>
        <MotionRoot />
        {children}
      </body>
    </html>
  );
}
