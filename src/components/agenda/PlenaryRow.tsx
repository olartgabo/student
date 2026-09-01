import { Badge } from "@/components/ui/Badge";
import type { AccentKey, AgendaBlock, PlenarySubtype } from "@/content/types";

type Plenary = Extract<AgendaBlock, { kind: "plenary" }>;

const subtypeLabels: Record<PlenarySubtype, string> = {
  registration: "Registro",
  opening: "Apertura",
  keynote: "Keynote",
  panel: "Panel",
  break: "Break",
  lunch: "Almuerzo",
  closing: "Cierre",
  networking: "Networking",
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

export function PlenaryRow({ block }: { block: Plenary }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-3">
        <Badge color={subtypeAccents[block.subtype]}>
          {subtypeLabels[block.subtype]}
        </Badge>
        <p className="font-display text-body text-white">{block.title}</p>
      </div>
      {block.summary ? (
        <p className="text-small text-slate-200">{block.summary}</p>
      ) : null}
    </div>
  );
}
