import {
  event,
  eventDateLabel,
  eventEndISO,
  eventStartISO,
  siteUrl,
} from "@/content/event";
import { faq } from "@/content/faq";
import { tracks } from "@/content/tracks";
import type { Locale } from "@/lib/i18n";

export function HomeStructuredData({ locale }: { locale: Locale }) {
  const description =
    locale === "es"
      ? `Evento gratuito el ${eventDateLabel.es.long} en ${event.venue.name}, ${event.venue.city}, con charlas, talleres y stream virtual.`
      : `Free event on ${eventDateLabel.en.long} at ${event.venue.name}, ${event.venue.city}, with talks, workshops and a virtual stream.`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Event",
        "@id": `${siteUrl}/#event`,
        name: `AWS ${event.name} ${event.edition}`,
        url: siteUrl,
        startDate: eventStartISO,
        endDate: eventEndISO,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        description,
        inLanguage: locale,
        isAccessibleForFree: true,
        image: [`${siteUrl}/opengraph-image`],
        keywords: tracks.map((track) => track.name[locale]).join(", "),
        about: tracks.map((track) => ({ "@type": "Thing", name: track.name[locale] })),
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
        organizer: {
          "@type": "Organization",
          "@id": `${siteUrl}/#organizer`,
          name: "AWS Student Builder Group — UPB Cochabamba",
          url: siteUrl,
          email: event.contactEmail,
        },
        offers: {
          "@type": "Offer",
          name: locale === "es" ? "Entrada general" : "General admission",
          price: 0,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: event.registrationUrl,
          validFrom: `${event.dateISO.slice(0, 4)}-01-01T00:00:00${event.utcOffset}`,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}${locale === "en" ? "/en" : "/"}#faq`,
        mainEntity: faq[locale].map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer.join(" ") },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
