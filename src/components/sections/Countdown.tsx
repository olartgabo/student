"use client";

import { eventEndISO, eventStartISO } from "@/content/event";
import { useCountdown } from "@/hooks/useCountdown";
import type { Locale } from "@/lib/i18n";

const copy = {
  es: {
    live: "Sucediendo ahora",
    past: "Gracias por acompañarnos",
    label: "Tiempo restante para el evento",
    units: ["días", "hrs", "min", "seg"],
  },
  en: {
    live: "Happening now",
    past: "Thanks for joining us",
    label: "Time left until the event",
    units: ["days", "hrs", "min", "sec"],
  },
} as const;

const pad = (n: number) => String(n).padStart(2, "0");

function Unit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="tabular font-display text-display-md leading-none text-white">
        {value}
      </span>
      <span className="font-display tracking-mono-caps text-[0.6875rem] text-slate-200 uppercase">
        {label}
      </span>
    </div>
  );
}

export function Countdown({ locale }: { locale: Locale }) {
  const state = useCountdown(eventStartISO, eventEndISO);
  const t = copy[locale];

  if (state.phase === "live") {
    return (
      <p className="font-display text-small tracking-mono-caps text-green uppercase">
        {t.live}
      </p>
    );
  }

  if (state.phase === "past") {
    return (
      <p className="font-display text-small tracking-mono-caps text-slate-200 uppercase">
        {t.past}
      </p>
    );
  }

  // "pending" renders the same shape with placeholders, so nothing shifts when
  // the real numbers arrive a frame later.
  const values =
    state.phase === "pending"
      ? ["--", "--", "--", "--"]
      : [pad(state.days), pad(state.hours), pad(state.minutes), pad(state.seconds)];

  return (
    <div className="flex gap-6" role="timer" aria-live="off" aria-label={t.label}>
      {t.units.map((label, i) => (
        <Unit key={label} value={values[i] ?? "--"} label={label} />
      ))}
    </div>
  );
}
