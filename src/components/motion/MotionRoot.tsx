"use client";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * The whole scroll-reveal layer, in one client component mounted once.
 *
 * Sections opt in with a `data-reveal` (or `data-reveal-group`) attribute and stay
 * Server Components. One batched ScrollTrigger replaces what would otherwise be
 * dozens of individual instances.
 */
export function MotionRoot() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set("[data-reveal], [data-reveal-group] > *", { clearProps: "all" });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out",
            overwrite: true,
          }),
      });

      ScrollTrigger.batch("[data-reveal-group] > *", {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.06,
            ease: "power2.out",
            overwrite: true,
          }),
      });

      // Amazon Ember swapping in moves every trigger position down the page.
      void document.fonts.ready.then(() => ScrollTrigger.refresh());
    });

    return () => mm.revert();
  }, {});

  return null;
}
