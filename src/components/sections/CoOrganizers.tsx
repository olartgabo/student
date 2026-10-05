import Image from "next/image";

import { Section } from "@/components/layout/Section";
import { organizers } from "@/content/organizers";
import type { Locale } from "@/lib/i18n";

const copy = {
  es: {
    eyebrow: "AWS Student Builder Groups",
    title: "Coorganizadores",
    intro: "Siete Student Builder Groups de Bolivia hacen posible este evento juntos.",
  },
  en: {
    eyebrow: "AWS Student Builder Groups",
    title: "Co-organizers",
    intro:
      "Seven Student Builder Groups across Bolivia are making this event possible together.",
  },
} as const;

export function CoOrganizers({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <Section id="coorganizadores" eyebrow={t.eyebrow} title={t.title} intro={t.intro}>
      <ul
        className="grid grid-cols-2 items-center gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-4"
        data-reveal-group
      >
        {organizers.map((organizer) => (
          <li key={organizer.id} className="flex min-h-32 items-center justify-center">
            <Image
              src={organizer.logo}
              alt={organizer.name}
              width={organizer.width}
              height={organizer.height}
              className="max-h-32 w-full max-w-48 object-contain"
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
