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
      gsap.to("[data-hero-step]", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
      });
    });

    return () => mm.revert();
  }, {});

  return null;
}
