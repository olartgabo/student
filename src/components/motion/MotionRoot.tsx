"use client";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/** Fade and a small y-translate. The brand allows nothing else — no scale, no bounce. */
const reveal = {
  opacity: 1,
  y: 0,
  ease: "power2.out",
  overwrite: true,
} as const;

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
        onEnter: (batch) => gsap.to(batch, { ...reveal, duration: 0.5, stagger: 0.06 }),
      });

      // One batch per group rather than one batch for every group on the page.
      // Batching them together meant a card entering at the same moment as a
      // table row inherited its place in a single shared stagger, so a four-card
      // grid could start its sequence a third of a second late for no reason the
      // reader can see. Scoped per group, each one reads as its own beat.
      for (const group of document.querySelectorAll("[data-reveal-group]")) {
        const items = Array.from(group.children);
        if (items.length === 0) continue;

        ScrollTrigger.batch(items, {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { ...reveal, duration: 0.45, stagger: 0.05 }),
        });
      }

      // Amazon Ember swapping in moves every trigger position down the page.
      void document.fonts.ready.then(() => ScrollTrigger.refresh());
    });

    return () => mm.revert();
  }, {});

  return null;
}
