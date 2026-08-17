"use client";

import { useEffect, useState } from "react";

export type CountdownState =
  | { phase: "pending" }
  | { phase: "upcoming"; days: number; hours: number; minutes: number; seconds: number }
  | { phase: "live" }
  | { phase: "past" };

/**
 * Starts in "pending" and only computes a real value in an effect. The server has
 * no business guessing the visitor's clock, and rendering a number during SSR
 * would desync on hydration.
 */
export function useCountdown(startISO: string, endISO: string): CountdownState {
  const [state, setState] = useState<CountdownState>({ phase: "pending" });

  useEffect(() => {
    const start = new Date(startISO).getTime();
    const end = new Date(endISO).getTime();

    const tick = () => {
      const now = Date.now();
      if (now >= end) return setState({ phase: "past" });
      if (now >= start) return setState({ phase: "live" });

      const diff = start - now;
      setState({
        phase: "upcoming",
        days: Math.floor(diff / 86_400_000),
        hours: Math.floor(diff / 3_600_000) % 24,
        minutes: Math.floor(diff / 60_000) % 60,
        seconds: Math.floor(diff / 1000) % 60,
      });
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [startISO, endISO]);

  return state;
}
