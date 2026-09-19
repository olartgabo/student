import { Badge } from "@/components/ui/Badge";
import type { AccentKey, AgendaBlock, PlenarySubtype } from "@/content/types";
import type { Locale, Localized } from "@/lib/i18n";

type Plenary = Extract<AgendaBlock, { kind: "plenary" }>;

const subtypeLabels: Record<PlenarySubtype, Localized> = {
  registration: { es: "Registro", en: "Check-in" },
  opening: { es: "Apertura", en: "Opening" },
  keynote: { es: "Keynote", en: "Keynote" },
  panel: { es: "Panel", en: "Panel" },
  break: { es: "Break", en: "Break" },
  lunch: { es: "Almuerzo", en: "Lunch" },
  closing: { es: "Cierre", en: "Closing" },
  networking: { es: "Networking", en: "Networking" },
};

/** Breaks and meals stay neutral so they read as pauses, not as programme items. */
const subtypeAccents: Record<PlenarySubtype, AccentKey> = {
  registration: "neutral",
  opening: "orange",
  keynote: "orange",
  panel: "purple",
  break: "neutral",
  lunch: "neutral",
  closing: "orange",
  networking: "green",
};

export function PlenaryRow({ block, locale }: { block: Plenary; locale: Locale }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-3">
        <Badge color={subtypeAccents[block.subtype]}>
          {subtypeLabels[block.subtype][locale]}
        </Badge>
        <p className="font-display text-body text-white">{block.title[locale]}</p>
      </div>
      {block.summary ? (
        <p className="text-small text-slate-200">{block.summary[locale]}</p>
      ) : null}
    </div>
  );
}
