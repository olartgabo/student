import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";

import { Container } from "./Container";

interface SectionProps {
  id: string;
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  /** "light" is the one off-white band, sanctioned by the reference deck. */
  tone?: "dark" | "light" | "grid";
  children: ReactNode;
  className?: string;
}

const tones = {
  dark: "bg-slate-900 text-white",
  light: "grid-motif-light text-slate-900",
  grid: "grid-motif text-white",
} as const;

export function Section({
  id,
  eyebrow,
  title,
  intro,
  tone = "dark",
  children,
  className,
}: SectionProps) {
  const headingId = `${id}-title`;
  const light = tone === "light";

  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      aria-label={title ? undefined : eyebrow}
      className={cn(
        "scroll-mt-22 border-t border-slate-600/40 py-20 md:py-28",
        tones[tone],
        className,
      )}
    >
      <Container>
        {(eyebrow ?? title ?? intro) ? (
          <header className="mb-12 max-w-2xl" data-reveal>
            {eyebrow ? (
              <Eyebrow className={light ? "text-slate-600" : undefined}>
                {eyebrow}
              </Eyebrow>
            ) : null}
            {title ? (
              <h2
                id={headingId}
                className={cn(
                  "font-display text-display-lg mt-4",
                  light ? "text-navy-900" : "text-white",
                )}
              >
                {title}
              </h2>
            ) : null}
            {intro ? (
              <p
                className={cn(
                  "text-body-lg mt-4",
                  light ? "text-slate-600" : "text-slate-200",
                )}
              >
                {intro}
              </p>
            ) : null}
          </header>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
