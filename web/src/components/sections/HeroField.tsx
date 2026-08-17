"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";

const CELL = 80;
const HOT_ALPHA = 0.85;
/** How many cells out the cursor still lifts a hairline. */
const REACH = 2;

/**
 * Cursor-reactive highlight over the hero's hairline lattice.
 *
 * The lattice itself is the CSS `grid-motif` background on the hero, so the
 * texture is there with JavaScript off. This canvas only redraws the few segments
 * near the pointer, on top. Canvas rather than DOM nodes because it repaints on
 * every pointer move and has to hold 60fps.
 *
 * Brightness steps by whole cells (Chebyshev distance) instead of a smooth radial
 * falloff — the same pixel logic as the icon set, and it avoids anything that
 * would read as a glow.
 */
export function HeroField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGSAP(
    () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const state = { px: -1e4, py: -1e4 };
      let width = 0;
      let height = 0;

      const resize = () => {
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = rect.width;
        height = rect.height;
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };

      const draw = () => {
        ctx.clearRect(0, 0, width, height);
        if (state.px < 0) return;

        ctx.lineWidth = 1;

        // Columns are measured from the right edge so they line up with the cell
        // overlay, which is anchored right; rows run from the top.
        const hotCol = Math.floor((width - state.px) / CELL);
        const hotRow = Math.floor(state.py / CELL);

        for (let c = hotCol - REACH; c <= hotCol + REACH + 1; c += 1) {
          if (c < 0) continue;
          for (let r = hotRow - REACH; r <= hotRow + REACH + 1; r += 1) {
            if (r < 0) continue;

            const distance = Math.max(Math.abs(c - hotCol), Math.abs(r - hotRow));
            if (distance > REACH) continue;

            const alpha = HOT_ALPHA * (1 - distance / (REACH + 1));
            ctx.strokeStyle = `rgba(101, 104, 115, ${alpha})`;

            const x = Math.round(width - c * CELL) - 0.5;
            const y = Math.round(r * CELL) + 0.5;

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, Math.min(y + CELL, height));
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(Math.max(x - CELL, 0), y);
            ctx.stroke();
          }
        }
      };

      resize();
      const observer = new ResizeObserver(() => {
        resize();
        draw();
      });
      observer.observe(canvas);

      const mm = gsap.matchMedia();

      // Only where there is a real pointer, and never when motion is reduced.
      mm.add(
        "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)",
        () => {
          const setX = gsap.quickTo(state, "px", { duration: 0.3, ease: "power3.out" });
          const setY = gsap.quickTo(state, "py", { duration: 0.3, ease: "power3.out" });

          const surface = canvas.parentElement ?? canvas;
          const onMove = (e: PointerEvent) => {
            const rect = canvas.getBoundingClientRect();
            setX(e.clientX - rect.left);
            setY(e.clientY - rect.top);
          };
          const onLeave = () => {
            setX(-1e4);
            setY(-1e4);
          };

          surface.addEventListener("pointermove", onMove);
          surface.addEventListener("pointerleave", onLeave);
          gsap.ticker.add(draw);

          return () => {
            surface.removeEventListener("pointermove", onMove);
            surface.removeEventListener("pointerleave", onLeave);
            gsap.ticker.remove(draw);
          };
        },
      );

      return () => {
        observer.disconnect();
        mm.revert();
      };
    },
    { dependencies: [] },
  );

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
