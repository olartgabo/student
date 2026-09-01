import { Section } from "@/components/layout/Section";
import { faq } from "@/content/faq";

/** Native <details>, so it works with zero JavaScript and needs no ARIA of its own. */
export function Faq() {
  return (
    <Section id="faq" eyebrow="Preguntas frecuentes" title="Lo que suelen preguntarnos">
      <div className="max-w-3xl border-t border-slate-600" data-reveal-group>
        {faq.map((item) => (
          <details key={item.id} className="group border-b border-slate-600">
            <summary className="font-display text-body-lg flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-white marker:content-none">
              {item.question}
              <span
                aria-hidden
                className="text-orange shrink-0 transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div className="space-y-3 pb-6 text-slate-200">
              {item.answer.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}
