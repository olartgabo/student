import type { Metadata } from "next";

import { DocumentLang } from "@/components/layout/DocumentLang";
import { event, eventDateLabel } from "@/content/event";
import { languageAlternates } from "@/lib/i18n";

const title = `AWS ${event.name} ${event.edition}`;

const description =
  `A free one-day event at ${event.venue.name}, ${event.venue.city}, on ` +
  `${eventDateLabel.en.long}. Three tracks (AI, Cloud and Cybersecurity) and two hands-on labs in parallel.`;

/** Overrides the Spanish defaults the root layout sets for every route. */
export const metadata: Metadata = {
  title: {
    // `absolute`, or the root layout's Spanish-side template wraps it a second time.
    absolute: `${title} — ${eventDateLabel.en.short} · Free`,
    template: `%s — ${title}`,
  },
  description,
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
};

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="en">
      <DocumentLang lang="en" />
      {children}
    </div>
  );
}
