import { Button } from "@/components/ui/Button";
import { event, eventDateLabel } from "@/content/event";
import { sponsorComparisonRows, sponsorTiers } from "@/content/sponsors";
import type { FillAccent, SponsorTier } from "@/content/types";
import { cn } from "@/lib/cn";

const tierStyles: Record<FillAccent, { text: string; border: string; rule: string }> = {
  orange: { text: "text-orange", border: "border-orange", rule: "bg-orange" },
  sky: { text: "text-sky", border: "border-sky", rule: "bg-sky" },
  green: { text: "text-green", border: "border-green", rule: "bg-green" },
  purple: { text: "text-purple", border: "border-purple", rule: "bg-purple" },
};

function mailto(tier: SponsorTier) {
  const subject = `Patrocinio ${tier.name} — ${event.name} ${event.edition}`;
  const body = [
    `Hola, nos interesa el paquete ${tier.name} (USD ${tier.priceUsd}) para el ${eventDateLabel.long}.`,
    "",
    "Empresa:",
    "Contacto:",
    "Teléfono:",
    "",
    "Consultas o ajustes al paquete:",
  ].join("\n");

  return `mailto:${event.sponsorshipEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function availability(tier: SponsorTier) {
  const filled = tier.sponsors.length;
  if (tier.slots !== undefined && filled >= tier.slots) return "Cupo tomado";
  if (tier.slots === undefined) return "Cupos abiertos";
  return `${tier.slots - filled} de ${tier.slots} cupos disponibles`;
}

export function SponsorComparison() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" data-reveal-group>
      {sponsorTiers.map((tier) => {
        const taken = tier.slots !== undefined && tier.sponsors.length >= tier.slots;
        const style = tierStyles[tier.accent];

        return (
          <article
            key={tier.id}
            className={cn(
              "flex min-w-0 flex-col border bg-slate-900 p-6",
              style.border,
              tier.featured ? "border-2 bg-slate-800" : "border-slate-600",
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-display text-small tracking-mono-caps text-slate-200 uppercase">
                  Paquete {tier.code}
                </p>
                <h3 className={cn("font-display text-display-md mt-2", style.text)}>
                  {tier.name}
                </h3>
              </div>
              <span className="text-small max-w-28 text-right text-slate-200">
                {availability(tier)}
              </span>
            </div>

            <p className="tabular font-display mt-8 text-4xl text-white">
              USD {tier.priceUsd}
            </p>
            <p className="mt-2 min-h-15 text-sm leading-6 text-slate-200">
              {tier.summary}
            </p>

            <dl className="mt-7 border-y border-slate-600">
              {sponsorComparisonRows.map((row) => (
                <div
                  key={row.label}
                  className="border-b border-slate-600 py-3 last:border-b-0"
                >
                  <dt className="text-small text-slate-200">{row.label}</dt>
                  <dd className="mt-1 text-sm text-white">{row.values[tier.id]}</dd>
                </div>
              ))}
            </dl>

            <details className="mt-5">
              <summary className="font-display text-small cursor-pointer text-white">
                Ver beneficios completos
              </summary>
              <ul className="mt-4 space-y-3">
                {tier.benefits.map((benefit) => (
                  <li key={benefit} className="text-small flex gap-3 text-slate-200">
                    <span
                      aria-hidden
                      className={cn("mt-2 h-px w-3 shrink-0", style.rule)}
                    />
                    {benefit}
                  </li>
                ))}
              </ul>
            </details>

            {taken ? (
              <p className="font-display text-small tracking-mono-caps mt-7 border border-slate-600 px-4 py-3 text-center text-slate-200 uppercase">
                Cupo tomado
              </p>
            ) : (
              <Button
                href={mailto(tier)}
                variant={tier.featured ? "primary" : "secondary"}
                className="mt-7 w-full"
              >
                Consultar {tier.name}
              </Button>
            )}
          </article>
        );
      })}
    </div>
  );
}
