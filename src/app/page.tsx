import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { About } from "@/components/sections/About";
import { AgendaPreview } from "@/components/sections/AgendaPreview";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { RegisterCta } from "@/components/sections/RegisterCta";
import { Sponsors } from "@/components/sections/Sponsors";
import { Team } from "@/components/sections/Team";
import { Tracks } from "@/components/sections/Tracks";
import { Venue } from "@/components/sections/Venue";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="contenido">
        <Hero />
        <About />
        <Tracks />
        <AgendaPreview />
        <Venue />
        <Sponsors />
        <Team />
        <Faq />
        <RegisterCta />
      </main>
      <SiteFooter />
    </>
  );
}
