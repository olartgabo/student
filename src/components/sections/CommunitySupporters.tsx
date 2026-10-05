import Image from "next/image";

import { Section } from "@/components/layout/Section";
import type { Locale } from "@/lib/i18n";

const supporters = [
  { name: { es: "Universidad Católica Boliviana, sede La Paz", en: "Bolivian Catholic University, La Paz campus" }, logo: "/community-supporters/UCB - La Paz.svg", width: 2853, height: 2752 },
  { name: { es: "Universidad de Aquino Bolivia", en: "Universidad de Aquino Bolivia" }, logo: "/community-supporters/UJAMS.svg", width: 1254, height: 1254 },
  { name: { es: "Universidad Mayor de San Andrés", en: "Universidad Mayor de San Andrés" }, logo: "/community-supporters/UMSA.png", width: 3000, height: 3000 },
  { name: { es: "Universidad Mayor de San Simón", en: "Universidad Mayor de San Simón" }, logo: "/community-supporters/UMSS.png", width: 2128, height: 2128 },
  { name: { es: "Universidad Privada Boliviana, Cochabamba", en: "Bolivian Private University, Cochabamba" }, logo: "/community-supporters/UPB-CBBA.svg", width: 572, height: 572 },
  { name: { es: "Universidad Privada Boliviana, La Paz", en: "Bolivian Private University, La Paz" }, logo: "/community-supporters/UPB-LaPaz.png", width: 3415, height: 3415 },
  { name: { es: "Universidad del Valle", en: "Universidad del Valle" }, logo: "/community-supporters/univalle.png", width: 1080, height: 1080 },
] as const;

const copy = {
  es: {
    eyebrow: "AWS Student Builder Groups",
    title: "Comunidades que hacen posible este evento",
    intro: "Gracias a los grupos universitarios y a sus instituciones anfitrionas por impulsar la comunidad tecnológica estudiantil en Bolivia.",
  },
  en: {
    eyebrow: "AWS Student Builder Groups",
    title: "The communities making this event possible",
    intro: "Thank you to the university groups and their host institutions for supporting Bolivia’s student tech community.",
  },
} as const;

export function CommunitySupporters({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <Section
      id="comunidades"
      tone="light"
      eyebrow={t.eyebrow}
      title={t.title}
      intro={t.intro}
    >
      <ul className="border-border-light bg-border-light grid grid-cols-2 gap-px border md:grid-cols-4" data-reveal-group>
        {supporters.map((supporter) => (
          <li key={supporter.logo} className="flex min-h-40 items-center justify-center bg-white p-8">
            <Image
              src={supporter.logo}
              alt={supporter.name[locale]}
              width={supporter.width}
              height={supporter.height}
              className="h-20 w-full object-contain"
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
