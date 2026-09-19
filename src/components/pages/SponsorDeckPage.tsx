import type { Metadata } from "next";
import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SponsorMotion } from "@/components/motion/SponsorMotion";
import { SponsorComparison } from "@/components/sections/SponsorComparison";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { communityPhotos, communityPhotoSource } from "@/content/community";
import { event, eventDateLabel } from "@/content/event";
import { sponsorDeckPdf, sponsorTiers } from "@/content/sponsors";
import { languageAlternates, localePath, type Locale } from "@/lib/i18n";

const prices = sponsorTiers.map((tier) => tier.priceUsd);
const priceFrom = Math.min(...prices);
const priceTo = Math.max(...prices);
const place = `${event.venue.shortName} ${event.venue.city}`;

const copy = {
  es: {
    title: "Paquetes de patrocinio",
    description:
      `${sponsorTiers.length} paquetes de patrocinio para el ${eventDateLabel.es.long} en ` +
      `${place}, de USD ${priceFrom} a USD ${priceTo}.`,
    facts: [
      { label: "Audiencia esperada", value: "900+" },
      { label: "Universidades", value: "12+" },
      { label: "Duración", value: "1 día completo" },
      { label: "Sede", value: event.venue.city },
    ],
    historyColumns: ["Año", "Ciudad", "Inscritos", "Asistentes", "Speakers"],
    history: [
      {
        year: "2024",
        city: "La Paz",
        registered: "647",
        attendees: "395",
        speakers: "27",
      },
      {
        year: "2025",
        city: "Cochabamba",
        registered: "1.100+",
        attendees: "592",
        speakers: "31",
      },
      {
        year: "2026",
        city: "Santa Cruz",
        registered: "2.122",
        attendees: "956",
        speakers: "59",
      },
    ],
    valueProps: [
      {
        title: "Talento",
        body: "Desde Gold, tu empresa puede publicar vacantes y participar en la feria de talento. Host y Platinum suman CVs y contactos solo de candidatos que autoricen compartirlos.",
      },
      {
        title: "Presencia",
        body: "Logo, menciones, stand y activaciones varían por paquete. Host, Platinum y Gold también acompañan las cuatro sesiones virtuales previas al evento.",
      },
      {
        title: "Informe",
        body: "Hasta 15 días después del evento, Gold, Platinum y Host reciben asistencia real, alcance digital y métricas de su activación.",
      },
    ],
    inKind: [
      "Alimentación, sede, conectividad o espacios de taller",
      "Swag, kits, créditos cloud, licencias, premios o vouchers",
      "Producción, streaming, fotografía, traslados, alojamiento o impresión",
    ],
    funding: [
      "Salas, laboratorios y equipamiento técnico",
      "Alimentación, kits y material de talleres",
      "Publicidad, impresos, señalización y producción",
      "Traslados, alojamiento, premios y vouchers de certificación",
    ],
    heroEyebrow: "Patrocinio 2026",
    heroTitle: "Patrocina la primera edición de Student Community Day en Bolivia",
    heroBody: `Desde Cochabamba, un día para conectar tu marca con estudiantes, builders y comunidades técnicas el ${eventDateLabel.es.long} en ${event.venue.name}.`,
    compare: "Comparar paquetes",
    download: "Descargar deck (PDF)",
    talk: "Hablar con el equipo",
    photoCaption: "AWS Community Day Bolivia 2025 · Cochabamba",
    photoSource: "Ver fuente",
    historyEyebrow: "Trayectoria comprobada",
    historyTitle: "AWS Community Day Bolivia creció en cada edición",
    historyIntro:
      "Student Community Day inicia su propia historia en Cochabamba sobre una comunidad que ya convoca talento técnico en todo el país.",
    historyCaption: "Evolución de AWS Community Day Bolivia entre 2024 y 2026",
    historyNote:
      "Los inscritos de 2025 son una cifra aproximada. Los datos de 2026 son finales.",
    valueEyebrow: "Presencia concreta",
    valueTitle: "Qué obtiene tu empresa",
    valueIntro:
      "Cada beneficio corresponde a un momento visible del evento: escenario, conversaciones cara a cara y acceso a una comunidad técnica en formación.",
    packagesEyebrow: "Comparación",
    packagesTitle: "Elegí el nivel de presencia",
    packagesIntro:
      "Compará inversión, presencia, feria de talento, reclutamiento y reporte post-evento. Abrí cada paquete para ver el alcance completo.",
    discount:
      "Sponsors de AWS Community Day Bolivia 2024, 2025 o 2026 reciben 15% de descuento en Host y Platinum.",
    bookTitle: "Reservá tu paquete",
    bookBody:
      "Los cupos y los aportes en especie se confirman con el equipo. Podemos ajustar una activación según la disponibilidad del evento.",
    writeTeam: "Escribir al equipo",
    inKindEyebrow: "Aportes en especie",
    inKindTitle: "También podés aportar recursos al evento",
    inKindIntro:
      "Valorizamos cada aporte a precio de mercado y lo acreditamos al nivel de patrocinio equivalente.",
    fundingEyebrow: "Transparencia",
    fundingTitle: "Qué financia tu patrocinio",
    fundingNote:
      "Gold, Platinum y Host reciben un informe hasta 15 días después del evento con asistencia, alcance digital y métricas de activación.",
  },
  en: {
    title: "Sponsorship packages",
    description:
      `${sponsorTiers.length} sponsorship packages for ${eventDateLabel.en.long} at ` +
      `${place}, from USD ${priceFrom} to USD ${priceTo}.`,
    facts: [
      { label: "Expected audience", value: "900+" },
      { label: "Universities", value: "12+" },
      { label: "Duration", value: "1 full day" },
      { label: "Venue", value: event.venue.city },
    ],
    historyColumns: ["Year", "City", "Registered", "Attendees", "Speakers"],
    history: [
      {
        year: "2024",
        city: "La Paz",
        registered: "647",
        attendees: "395",
        speakers: "27",
      },
      {
        year: "2025",
        city: "Cochabamba",
        registered: "1,100+",
        attendees: "592",
        speakers: "31",
      },
      {
        year: "2026",
        city: "Santa Cruz",
        registered: "2,122",
        attendees: "956",
        speakers: "59",
      },
    ],
    valueProps: [
      {
        title: "Talent",
        body: "From Gold up, your company can post jobs and take part in the talent fair. Host and Platinum add CVs and contacts, only from candidates who agree to share them.",
      },
      {
        title: "Presence",
        body: "Logo, mentions, booth and activations vary by package. Host, Platinum and Gold also appear in the four virtual sessions before the event.",
      },
      {
        title: "Report",
        body: "Within 15 days after the event, Gold, Platinum and Host receive real attendance, digital reach and the metrics of their activation.",
      },
    ],
    inKind: [
      "Food, venue, connectivity or workshop spaces",
      "Swag, kits, cloud credits, licenses, prizes or vouchers",
      "Production, streaming, photography, travel, lodging or printing",
    ],
    funding: [
      "Rooms, labs and technical equipment",
      "Food, kits and workshop materials",
      "Advertising, print, signage and production",
      "Travel, lodging, prizes and certification vouchers",
    ],
    heroEyebrow: "Sponsorship 2026",
    heroTitle: "Sponsor the first Student Community Day in Bolivia",
    heroBody: `From Cochabamba, one day to connect your brand with students, builders and tech communities on ${eventDateLabel.en.long} at ${event.venue.name}.`,
    compare: "Compare packages",
    download: "Download deck (PDF, Spanish)",
    talk: "Talk to the team",
    photoCaption: "AWS Community Day Bolivia 2025 · Cochabamba",
    photoSource: "View source",
    historyEyebrow: "Proven track record",
    historyTitle: "AWS Community Day Bolivia grew with every edition",
    historyIntro:
      "Student Community Day starts its own story in Cochabamba, on top of a community that already draws technical talent from across the country.",
    historyCaption: "Growth of AWS Community Day Bolivia from 2024 to 2026",
    historyNote: "2025 registrations are approximate. 2026 figures are final.",
    valueEyebrow: "Concrete presence",
    valueTitle: "What your company gets",
    valueIntro:
      "Every benefit maps to a visible moment of the event: the stage, face-to-face conversations and access to a technical community in the making.",
    packagesEyebrow: "Comparison",
    packagesTitle: "Choose your level of presence",
    packagesIntro:
      "Compare investment, presence, talent fair, recruiting and post-event reporting. Open each package to see its full scope.",
    discount:
      "Sponsors of AWS Community Day Bolivia 2024, 2025 or 2026 get 15% off Host and Platinum.",
    bookTitle: "Book your package",
    bookBody:
      "Slots and in-kind contributions are confirmed with the team. We can adapt an activation to what the event has available.",
    writeTeam: "Email the team",
    inKindEyebrow: "In-kind contributions",
    inKindTitle: "You can also contribute resources to the event",
    inKindIntro:
      "We value each contribution at market price and credit it toward the equivalent sponsorship tier.",
    fundingEyebrow: "Transparency",
    fundingTitle: "What your sponsorship funds",
    fundingNote:
      "Gold, Platinum and Host receive a report within 15 days after the event with attendance, digital reach and activation metrics.",
  },
} as const;

export function sponsorDeckMetadata(locale: Locale): Metadata {
  const { title, description } = copy[locale];
  const url = localePath(locale, "/sponsor-deck");

  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates("/sponsor-deck") },
    openGraph: {
      type: "website",
      url,
      title: `${title} — AWS ${event.name} ${event.edition}`,
      description,
    },
  };
}

const heroPhoto = communityPhotos[0];

export function SponsorDeckPage({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <>
      <SiteHeader locale={locale} />
      <main id="contenido" className="pt-18">
        <SponsorMotion />
        <section
          id="inicio"
          aria-labelledby="sponsor-title"
          className="grid-motif scroll-mt-18 border-b border-slate-600"
        >
          <Container className="py-14 md:py-20">
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
              <div data-sponsor-hero-copy>
                <Eyebrow>{t.heroEyebrow}</Eyebrow>
                <h1
                  id="sponsor-title"
                  className="font-display mt-5 text-[clamp(2.5rem,5vw,4.75rem)] leading-[1.04] text-white"
                >
                  {t.heroTitle}
                </h1>
                <p className="text-body-lg mt-6 max-w-xl text-slate-200">{t.heroBody}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="#paquetes" size="lg">
                    {t.compare}
                  </Button>
                  <Button href={sponsorDeckPdf} download variant="secondary" size="lg">
                    {t.download}
                  </Button>
                  <Button
                    href={`mailto:${event.sponsorshipEmail}`}
                    variant="secondary"
                    size="lg"
                  >
                    {t.talk}
                  </Button>
                </div>
              </div>

              <figure
                className="border border-slate-600 bg-slate-800 p-2"
                data-sponsor-hero-photo
              >
                <Image
                  src={heroPhoto.src}
                  alt={heroPhoto.alt[locale]}
                  width={heroPhoto.width}
                  height={heroPhoto.height}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  priority
                  className="aspect-[3/2] w-full object-cover"
                />
                <figcaption className="text-small flex flex-wrap justify-between gap-2 px-2 pt-3 pb-1 text-slate-200">
                  <span>{t.photoCaption}</span>
                  <a
                    href={communityPhotoSource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline underline-offset-4"
                  >
                    {t.photoSource}
                  </a>
                </figcaption>
              </figure>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-slate-600 pt-6 sm:grid-cols-4">
              {t.facts.map((fact) => (
                <div key={fact.label} data-sponsor-fact>
                  <dt className="text-small text-slate-200">{fact.label}</dt>
                  <dd className="font-display mt-1 text-xl text-white">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>

        <section
          aria-labelledby="community-history-title"
          className="grid-motif-light border-b border-slate-600/20 py-16 text-slate-900 md:py-20"
        >
          <Container>
            <header className="max-w-2xl" data-reveal>
              <Eyebrow className="text-slate-600">{t.historyEyebrow}</Eyebrow>
              <h2
                id="community-history-title"
                className="font-display text-display-lg text-navy-900 mt-4"
              >
                {t.historyTitle}
              </h2>
              <p className="text-body-lg mt-4 text-slate-600">{t.historyIntro}</p>
            </header>

            <div className="mt-10 overflow-x-auto" data-reveal>
              <table className="w-full min-w-[40rem] border-collapse text-left">
                <caption className="sr-only">{t.historyCaption}</caption>
                <thead className="text-small tracking-mono-caps border-y border-slate-400 uppercase">
                  <tr>
                    {t.historyColumns.map((column, i) => (
                      <th
                        key={column}
                        scope="col"
                        className={
                          i === 0
                            ? "py-3 pr-6 font-medium"
                            : i === t.historyColumns.length - 1
                              ? "py-3 pl-3 font-medium"
                              : "px-3 py-3 font-medium"
                        }
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.history.map((edition) => (
                    <tr key={edition.year} className="border-b border-slate-300">
                      <th scope="row" className="py-4 pr-6 font-medium">
                        {edition.year}
                      </th>
                      <td className="px-3 py-4">{edition.city}</td>
                      <td className="px-3 py-4">{edition.registered}</td>
                      <td className="px-3 py-4">{edition.attendees}</td>
                      <td className="py-4 pl-3">{edition.speakers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-small mt-5 text-slate-600" data-reveal>
              {t.historyNote}
            </p>
          </Container>
        </section>

        <section
          aria-labelledby="sponsor-value-title"
          className="grid-motif-light border-b border-slate-600/20 py-16 text-slate-900 md:py-20"
        >
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div data-reveal>
                <Eyebrow className="text-slate-600">{t.valueEyebrow}</Eyebrow>
                <h2
                  id="sponsor-value-title"
                  className="font-display text-display-lg text-navy-900 mt-4"
                >
                  {t.valueTitle}
                </h2>
              </div>
              <p className="text-body-lg max-w-2xl text-slate-600" data-reveal>
                {t.valueIntro}
              </p>
            </div>

            <div
              className="border-border-light md:divide-border-light mt-12 grid border-y md:grid-cols-3 md:divide-x"
              data-reveal-group
            >
              {t.valueProps.map((item) => (
                <article
                  key={item.title}
                  className="border-border-light py-7 max-md:not-last:border-b md:border-0 md:px-7 md:first:pl-0 md:last:pr-0"
                >
                  <h3 className="font-display text-navy-900 text-xl">{item.title}</h3>
                  <p className="mt-3 text-slate-600">{item.body}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section
          id="paquetes"
          aria-labelledby="packages-title"
          className="scroll-mt-22 bg-slate-900 py-16 md:py-24"
        >
          <Container>
            <header className="mb-10 max-w-2xl" data-reveal>
              <Eyebrow>{t.packagesEyebrow}</Eyebrow>
              <h2
                id="packages-title"
                className="font-display text-display-lg mt-4 text-white"
              >
                {t.packagesTitle}
              </h2>
              <p className="text-body-lg mt-4 text-slate-200">{t.packagesIntro}</p>
              <p className="text-small mt-4 max-w-2xl text-slate-200">{t.discount}</p>
            </header>

            <div data-reveal>
              <SponsorComparison locale={locale} />
            </div>

            <div
              className="bg-navy-900 mt-12 flex flex-col gap-6 p-7 md:flex-row md:items-center md:justify-between md:p-10"
              data-reveal
            >
              <div>
                <h3 className="font-display text-display-md text-white">{t.bookTitle}</h3>
                <p className="mt-2 max-w-2xl text-slate-200">{t.bookBody}</p>
                <a
                  href={`mailto:${event.sponsorshipEmail}`}
                  className="mt-3 inline-block text-white underline underline-offset-4"
                >
                  {event.sponsorshipEmail}
                </a>
              </div>
              <div className="flex shrink-0 flex-col gap-3">
                <Button href={`mailto:${event.sponsorshipEmail}`} size="lg">
                  {t.writeTeam}
                </Button>
                <Button href={sponsorDeckPdf} download variant="outline" size="lg">
                  {t.download}
                </Button>
              </div>
            </div>
          </Container>
        </section>

        <section
          aria-labelledby="in-kind-title"
          className="grid-motif-light border-b border-slate-600/20 py-16 text-slate-900 md:py-20"
        >
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <header data-reveal>
                <Eyebrow className="text-slate-600">{t.inKindEyebrow}</Eyebrow>
                <h2
                  id="in-kind-title"
                  className="font-display text-display-lg text-navy-900 mt-4"
                >
                  {t.inKindTitle}
                </h2>
              </header>
              <div data-reveal>
                <p className="text-body-lg text-slate-600">{t.inKindIntro}</p>
                <ul className="border-border-light divide-border-light mt-6 border-y">
                  {t.inKind.map((contribution) => (
                    <li key={contribution} className="py-4 text-slate-900">
                      {contribution}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        <section
          aria-labelledby="funding-title"
          className="border-b border-slate-600 bg-slate-900 py-16 text-white md:py-20"
        >
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <header data-reveal>
                <Eyebrow>{t.fundingEyebrow}</Eyebrow>
                <h2 id="funding-title" className="font-display text-display-lg mt-4">
                  {t.fundingTitle}
                </h2>
              </header>
              <div data-reveal>
                <ul className="divide-y divide-slate-600 border-y border-slate-600">
                  {t.funding.map((destination) => (
                    <li key={destination} className="py-4 text-slate-200">
                      {destination}
                    </li>
                  ))}
                </ul>
                <p className="text-small mt-5 text-slate-200">{t.fundingNote}</p>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
