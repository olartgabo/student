"use client";

import { gsap, useGSAP } from "@/lib/gsap";

/** Longest we will hold the entrance waiting for Amazon Ember to land. */
const FONT_WAIT_MS = 1200;

/**
 * The hero's entrance. Renders nothing — it animates elements the (server-rendered)
 * hero marked with `data-hero-step` and `data-hero-cell`, so the section itself
 * stays a Server Component.
 *
 * Their opacity-0 rest state lives in globals.css behind `html[data-js]`, so the
 * content is visible if this never runs.
 */
export function HeroIntro() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set("[data-hero-step], [data-hero-cell]", { clearProps: "all" });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const start = () => {
        const tl = gsap.timeline();
        tl.to("[data-hero-step]", {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
        });
        // The signature: solid cells arriving in sequence, as in the reference art.
        tl.to(
          "[data-hero-cell]",
          { opacity: 1, duration: 0.35, stagger: 0.06, ease: "power1.out" },
          "+=0.15",
        );
        return tl;
      };

      // Waiting on fonts keeps the headline from animating in at fallback metrics
      // and then reflowing when Amazon Ember lands. The race is the safety net: a
      // font request that hangs must not leave the hero at opacity 0 for as long
      // as the browser is willing to wait for it.
      let tl: gsap.core.Timeline | undefined;
      let cancelled = false;
      const timeout = new Promise((resolve) => setTimeout(resolve, FONT_WAIT_MS));

      void Promise.race([document.fonts.ready, timeout]).then(() => {
        if (!cancelled) tl = start();
      });

      return () => {
        cancelled = true;
        tl?.kill();
      };
    });

    return () => mm.revert();
  }, {});

  return null;
}
