"use client";

import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      let active = true;

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-reveal], [data-reveal-group] > *", { clearProps: "all" });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const belowFold = (element: HTMLElement) =>
          element.getBoundingClientRect().top > window.innerHeight * 0.88;
        const revealItems = gsap.utils
          .toArray<HTMLElement>("[data-reveal]")
          .filter(belowFold);

        // Content is visible in the server response. Only hide elements after this
        // client layer is ready, so a failed animation chunk can never blank a section.
        gsap.set(revealItems, { opacity: 0, y: 12 });
        ScrollTrigger.batch(revealItems, {
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
          const items = Array.from(group.children).filter(
            (item): item is HTMLElement => item instanceof HTMLElement && belowFold(item),
          );
          if (items.length === 0) continue;

          gsap.set(items, { opacity: 0, y: 12 });
          ScrollTrigger.batch(items, {
            start: "top 88%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, { ...reveal, duration: 0.45, stagger: 0.05 }),
          });
        }

        ScrollTrigger.refresh();

        // Amazon Ember swapping in moves every trigger position down the page.
        void document.fonts.ready.then(() => {
          if (active) ScrollTrigger.refresh();
        });
      });

      return () => {
        active = false;
        mm.revert();
      };
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
