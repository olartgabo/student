import type { Metadata } from "next";

import { MotionRoot } from "@/components/motion/MotionRoot";
import { event, eventEndISO, eventStartISO } from "@/content/event";
import { amazonEmber, jetbrainsMono } from "@/lib/fonts";

import "./globals.css";

const title = `AWS ${event.name} ${event.edition}`;
const description =
  "Un día para aprender, construir y conectar. Tres tracks —  IA, Cloud y Ciberseguridad — " +
  "más talleres prácticos en paralelo. Gratis, en la Universidad Privada Boliviana, Cochabamba.";

export const metadata: Metadata = {
  metadataBase: new URL("https://scday.upb.bo"),
  title: {
    default: `${title} — 3 Oct · Cochabamba · Gratis`,
    template: `%s — AWS ${event.name} ${event.edition}`,
  },
  description,
  applicationName: title,
  keywords: [
    "AWS Student Community Day",
    "AWS Student Community Day Bolivia",
    "AWS Student Builder Group",
    "UPB Cochabamba",
    "cloud computing Bolivia",
    "evento tech Cochabamba",
  ],
  openGraph: {
    type: "website",
    locale: "es_BO",
    siteName: title,
    title: `${title} — 3 Oct · Cochabamba · Gratis`,
    description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: title,
  startDate: eventStartISO,
  endDate: eventEndISO,
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  description,
  location: {
    "@type": "Place",
    name: event.venue.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: event.venue.addressLines.join(", "),
      addressLocality: event.venue.city,
      addressCountry: "BO",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "AWS Student Builder Group — UPB Cochabamba",
  },
  offers: {
    "@type": "Offer",
    price: 0,
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: event.registrationUrl,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning covers the `data-js` attribute the head script
    // below adds before React hydrates. It applies to this element only.
    <html
      lang="es"
      className={`${amazonEmber.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Gates the scroll-reveal rest states in globals.css. If JavaScript is off
          or the motion chunk fails to load, this never lands and every section
          renders at full opacity instead of staying invisible forever.

          A data attribute rather than a class: React owns `className` on <html>,
          so mutating it here would trip a hydration mismatch.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.dataset.js="1"`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
        />
      </head>
      <body>
        <a
          href="#contenido"
          className="focus:bg-orange focus:font-display focus:text-small focus:text-navy-900 sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-sm focus:px-4 focus:py-2"
        >
          Saltar al contenido
        </a>
        <MotionRoot />
        {children}
      </body>
    </html>
  );
}
