"use client";

import { gsap, useGSAP } from "@/lib/gsap";

export function SponsorMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });

      timeline
        .from("[data-sponsor-hero-copy] > *", {
          opacity: 0,
          y: 12,
          duration: 0.45,
          stagger: 0.07,
        })
        .from(
          "[data-sponsor-hero-photo]",
          { opacity: 0, x: 18, duration: 0.55 },
          "-=0.28",
        )
        .from(
          "[data-sponsor-fact]",
          { opacity: 0, y: 8, duration: 0.3, stagger: 0.05 },
          "-=0.2",
        );

      return () => timeline.kill();
    });

    return () => mm.revert();
  }, {});

  return null;
}
