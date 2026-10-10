"use client";

import { gsap, useGSAP } from "@/lib/gsap";

/**
 * The hero's entrance. Renders nothing — it animates elements the (server-rendered)
 * hero marked with `data-hero-step`, so the section itself stays a Server Component.
 *
 * The server-rendered hero stays visible if this component never runs. Once GSAP
 * is ready, the entrance is applied as a progressive enhancement.
 */
export function HeroIntro() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set("[data-hero-step]", { clearProps: "all" });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const entrance = gsap.timeline();

      entrance.from("[data-hero-step]", {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
      });

      entrance.from(
        "[data-hero-count]",
        {
          scale: 0.85,
          duration: 0.7,
          ease: "back.out(1.4)",
        },
        0.6,
      );

      entrance.from(
        "[data-hero-today]",
        {
          x: -12,
          duration: 0.5,
          ease: "power2.out",
        },
        0.8,
      );
    });

    return () => mm.revert();
  }, {});

  return null;
}
