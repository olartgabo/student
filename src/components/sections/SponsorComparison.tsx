import { Button } from "@/components/ui/Button";
import { event, eventDateLabel } from "@/content/event";
import { sponsorComparisonRows, sponsorTiers } from "@/content/sponsors";
import type { FillAccent, SponsorTier } from "@/content/types";
import { cn } from "@/lib/cn";

const tiersForComparison: readonly SponsorTier[] = [...sponsorTiers].reverse();

const tierStyles: Record<
  FillAccent,
  { text: string; borderTop: string; rule: string; surface: string }
> = {
  orange: {
    text: "text-orange",
    borderTop: "border-t-orange",
    rule: "bg-orange",
    surface: "hover:bg-orange/5 focus-within:bg-orange/5",
  },
  sky: {
    text: "text-sky",
    borderTop: "border-t-sky",
    rule: "bg-sky",
    surface: "hover:bg-sky/5 focus-within:bg-sky/5",
  },
  green: {
    text: "text-green",
    borderTop: "border-t-green",
    rule: "bg-green",
    surface: "hover:bg-green/5 focus-within:bg-green/5",
  },
  purple: {
    text: "text-purple",
    borderTop: "border-t-purple",
    rule: "bg-purple",
    surface: "hover:bg-purple/5 focus-within:bg-purple/5",
  },
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
  if (isTaken(tier)) return "Cupo tomado";
  if (tier.slots === 1) return "1 cupo exclusivo";
  if (tier.slots !== undefined) return `${tier.slots} cupos`;
  return null;
}

function isTaken(tier: SponsorTier) {
  return tier.slots !== undefined && tier.sponsors.length >= tier.slots;
}

export function SponsorComparison() {
  return (
    <>
      <p className="font-display text-small tracking-mono-caps mb-4 text-slate-200 uppercase lg:hidden">
        Deslizá para comparar
      </p>
      <div
        role="region"
        aria-label="Comparación de paquetes de patrocinio"
        tabIndex={0}
        className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-5 md:-mx-10 md:px-10 lg:hidden"
      >
        {tiersForComparison.map((tier) => (
          <article
            key={tier.id}
            className={cn(
              "flex w-[82vw] max-w-md shrink-0 snap-start flex-col border border-t-2 p-6 transition-colors duration-200 motion-reduce:transition-none",
              tierStyles[tier.accent].borderTop,
              tierStyles[tier.accent].surface,
              tier.featured
                ? "border-x-orange border-b-orange bg-slate-800"
                : "border-x-slate-600 border-b-slate-600 bg-slate-900",
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3
                  className={cn(
                    "font-display text-display-md",
                    tierStyles[tier.accent].text,
                  )}
                >
                  {tier.name}
                </h3>
                <p className="text-small mt-1 text-slate-200">{tier.tagline}</p>
              </div>
              {availability(tier) ? (
                <span className="font-display tracking-mono-caps text-orange text-right text-[0.6875rem] uppercase">
                  {availability(tier)}
                </span>
              ) : null}
            </div>

            <p className="tabular font-display mt-6 text-3xl text-white">
              USD {tier.priceUsd}
            </p>
            <p className="text-small mt-3 text-slate-200">{tier.summary}</p>

            <dl className="mt-6 divide-y divide-slate-600 border-y border-slate-600">
              {sponsorComparisonRows.map((row) => (
                <div key={row.label} className="grid grid-cols-[7rem_1fr] gap-4 py-3">
                  <dt className="text-small text-slate-200">{row.label}</dt>
                  <dd className="text-small text-white">{row.values[tier.id]}</dd>
                </div>
              ))}
            </dl>

            <details className="mt-5 border-b border-slate-600 pb-5">
              <summary className="font-display text-small cursor-pointer text-white">
                Ver todos los beneficios
              </summary>
              <ul className="mt-4 space-y-2">
                {tier.benefits.map((benefit) => (
                  <li key={benefit} className="text-small flex gap-3 text-slate-200">
                    <span
                      aria-hidden
                      className={cn(
                        "mt-2 h-px w-3 shrink-0",
                        tierStyles[tier.accent].rule,
                      )}
                    />
                    {benefit}
                  </li>
                ))}
              </ul>
            </details>

            {isTaken(tier) ? (
              <p className="font-display text-small tracking-mono-caps mt-6 border border-slate-600 px-4 py-3 text-center text-slate-200 uppercase">
                Cupo tomado
              </p>
            ) : (
              <Button
                href={mailto(tier)}
                variant={tier.featured ? "primary" : "secondary"}
                className="mt-6 w-full"
              >
                Consultar {tier.name}
              </Button>
            )}
          </article>
        ))}
      </div>

      <div className="hidden overflow-hidden border border-slate-600 lg:block">
        <table className="w-full table-fixed border-collapse">
          <caption className="sr-only">
            Comparación de precios y beneficios de los paquetes de patrocinio
          </caption>
          <thead>
            <tr>
              <th scope="col" className="w-40 bg-slate-900 p-5 text-left" />
              {tiersForComparison.map((tier) => (
                <th
                  key={tier.id}
                  scope="col"
                  className={cn(
                    "border-t-2 border-l border-slate-600 p-5 text-left align-top",
                    tierStyles[tier.accent].borderTop,
                    tier.featured ? "bg-slate-800" : "bg-slate-900",
                  )}
                >
                  <span
                    className={cn(
                      "font-display text-display-md block",
                      tierStyles[tier.accent].text,
                    )}
                  >
                    {tier.name}
                  </span>
                  <span className="text-small mt-1 block font-light text-slate-200">
                    {tier.tagline}
                  </span>
                  {availability(tier) ? (
                    <span className="font-display tracking-mono-caps text-orange mt-3 block text-[0.6875rem] uppercase">
                      {availability(tier)}
                    </span>
                  ) : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="group/row border-t border-slate-600">
              <th
                scope="row"
                className="text-small bg-slate-900 p-5 text-left font-light text-slate-200"
              >
                Inversión
              </th>
              {tiersForComparison.map((tier) => (
                <td
                  key={tier.id}
                  className={cn(
                    "tabular font-display border-l border-slate-600 p-5 text-xl text-white transition-colors duration-200 group-hover/row:bg-slate-700 motion-reduce:transition-none",
                    tier.featured ? "bg-slate-800" : "bg-slate-900",
                  )}
                >
                  USD {tier.priceUsd}
                </td>
              ))}
            </tr>
            {sponsorComparisonRows.map((row) => (
              <tr key={row.label} className="group/row border-t border-slate-600">
                <th
                  scope="row"
                  className="text-small bg-slate-900 p-5 text-left font-light text-slate-200"
                >
                  {row.label}
                </th>
                {tiersForComparison.map((tier) => (
                  <td
                    key={tier.id}
                    className={cn(
                      "text-small border-l border-slate-600 p-5 text-white transition-colors duration-200 group-hover/row:bg-slate-700 motion-reduce:transition-none",
                      tier.featured ? "bg-slate-800" : "bg-slate-900",
                    )}
                  >
                    {row.values[tier.id]}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-t border-slate-600">
              <th scope="row" className="bg-slate-900 p-5 text-left">
                <span className="sr-only">Contacto</span>
              </th>
              {tiersForComparison.map((tier) => (
                <td
                  key={tier.id}
                  className={cn(
                    "border-l border-slate-600 p-5",
                    tier.featured ? "bg-slate-800" : "bg-slate-900",
                  )}
                >
                  {isTaken(tier) ? (
                    <span className="font-display text-small tracking-mono-caps block text-center text-slate-200 uppercase">
                      Cupo tomado
                    </span>
                  ) : (
                    <Button
                      href={mailto(tier)}
                      variant={tier.featured ? "primary" : "secondary"}
                      size="sm"
                      className="w-full whitespace-nowrap"
                    >
                      Consultar
                    </Button>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <details className="mt-4 hidden border border-slate-600 bg-slate-900 lg:block">
        <summary className="font-display text-small cursor-pointer px-5 py-4 text-white">
          Ver beneficios completos por paquete
        </summary>
        <div className="grid border-t border-slate-600 lg:grid-cols-4 lg:divide-x lg:divide-slate-600">
          {tiersForComparison.map((tier) => (
            <section
              key={tier.id}
              aria-labelledby={`${tier.id}-benefits-title`}
              className={cn(
                "border-t-2 p-5",
                tierStyles[tier.accent].borderTop,
                tier.featured ? "bg-slate-800" : "bg-slate-900",
              )}
            >
              <h3
                id={`${tier.id}-benefits-title`}
                className={cn("font-display text-body", tierStyles[tier.accent].text)}
              >
                {tier.name}
              </h3>
              <ul className="mt-4 space-y-2">
                {tier.benefits.map((benefit) => (
                  <li key={benefit} className="text-small flex gap-3 text-slate-200">
                    <span
                      aria-hidden
                      className={cn(
                        "mt-2 h-px w-3 shrink-0",
                        tierStyles[tier.accent].rule,
                      )}
                    />
                    {benefit}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </details>
    </>
  );
}
