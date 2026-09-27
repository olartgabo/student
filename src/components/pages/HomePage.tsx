import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { About } from "@/components/sections/About";
import { AgendaPreview } from "@/components/sections/AgendaPreview";
import { CommunityGallery } from "@/components/sections/CommunityGallery";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { RegisterCta } from "@/components/sections/RegisterCta";
import { Speakers } from "@/components/sections/Speakers";
import { Sponsors } from "@/components/sections/Sponsors";
import { Team } from "@/components/sections/Team";
import { Tracks } from "@/components/sections/Tracks";
import { Venue } from "@/components/sections/Venue";
import type { Locale } from "@/lib/i18n";

import { HomeStructuredData } from "./HomeStructuredData";

export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <HomeStructuredData locale={locale} />
      <SiteHeader locale={locale} />
      <main id="contenido">
        <Hero locale={locale} />
        <About locale={locale} />
        <CommunityGallery locale={locale} />
        <Tracks locale={locale} />
        <AgendaPreview locale={locale} />
        <Speakers locale={locale} />
        <Venue locale={locale} />
        <Sponsors locale={locale} />
        <Team locale={locale} />
        <Faq locale={locale} />
        <RegisterCta locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
