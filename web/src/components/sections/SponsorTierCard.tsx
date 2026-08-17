import { accentFill } from "@/components/ui/accent";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { event } from "@/content/event";
import type { SponsorTier } from "@/content/types";
import { cn } from "@/lib/cn";

function mailto(tier: SponsorTier) {
  const subject = `Patrocinio ${tier.name} — ${event.name} ${event.edition}`;
  const body = [
    `Hola, nos interesa el paquete ${tier.name} (USD ${tier.priceUsd}).`,
    "",
    "Empresa:",
    "Contacto:",
    "Teléfono:",
  ].join("\n");
  return `mailto:${event.sponsorshipEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function SponsorTierCard({ tier }: { tier: SponsorTier }) {
  const taken = tier.slots !== undefined && tier.sponsors.length >= tier.slots;

  return (
    <article
      className={cn(
        "flex flex-col border p-8",
        tier.featured ? "border-orange bg-slate-800" : "border-slate-600 bg-slate-900",
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <span
          className={cn(
            "font-display inline-block px-1.5 py-0.5 text-[0.6875rem]",
            accentFill[tier.accent],
          )}
        >
          {tier.code}
        </span>
        {tier.featured ? <Badge color="orange">Destacado</Badge> : null}
        {tier.slots !== undefined ? (
          <span className="font-display tracking-mono-caps text-[0.6875rem] text-slate-200 uppercase">
            {tier.slots === 1 ? "Exclusivo" : `${tier.slots} cupos`}
          </span>
        ) : null}
      </div>

      <p className="font-display text-small tracking-mono-caps mt-6 text-slate-200 uppercase">
        {tier.tagline}
      </p>
      <h3 className="font-display text-display-md mt-1 text-white">{tier.name}</h3>

      <p className="mt-4 flex items-baseline gap-2">
        <span className="tabular font-display text-display-md text-white">
          USD {tier.priceUsd}
        </span>
        <span className="text-small text-slate-200">por edición</span>
      </p>

      <ul className="mt-8 flex-1 space-y-3">
        {tier.benefits.map((benefit) => (
          <li key={benefit} className="text-small flex gap-3 text-slate-200">
            <span
              aria-hidden
              className={cn("mt-2 h-px w-3 shrink-0", accentFill[tier.accent])}
            />
            {benefit}
          </li>
        ))}
      </ul>

      <div className="mt-8">
        {taken ? (
          <p className="font-display text-small tracking-mono-caps text-slate-200 uppercase">
            Cupo tomado
          </p>
        ) : (
          <Button
            href={mailto(tier)}
            variant={tier.featured ? "primary" : "secondary"}
            className="w-full"
          >
            Reservar {tier.name}
          </Button>
        )}
      </div>
    </article>
  );
}
