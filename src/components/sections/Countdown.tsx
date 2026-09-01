"use client";

import { eventEndISO, eventStartISO } from "@/content/event";
import { useCountdown } from "@/hooks/useCountdown";

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

export function Countdown() {
  const state = useCountdown(eventStartISO, eventEndISO);

  if (state.phase === "live") {
    return (
      <p className="font-display text-small tracking-mono-caps text-green uppercase">
        Sucediendo ahora
      </p>
    );
  }

  if (state.phase === "past") {
    return (
      <p className="font-display text-small tracking-mono-caps text-slate-200 uppercase">
        Gracias por acompañarnos
      </p>
    );
  }

  // "pending" renders the same shape with placeholders, so nothing shifts when
  // the real numbers arrive a frame later.
  const units =
    state.phase === "pending"
      ? [
          ["--", "días"],
          ["--", "hrs"],
          ["--", "min"],
          ["--", "seg"],
        ]
      : [
          [pad(state.days), "días"],
          [pad(state.hours), "hrs"],
          [pad(state.minutes), "min"],
          [pad(state.seconds), "seg"],
        ];

  return (
    <div
      className="flex gap-6"
      role="timer"
      aria-live="off"
      aria-label="Tiempo restante para el evento"
    >
      {units.map(([value, label]) => (
        <Unit key={label} value={value ?? "--"} label={label ?? ""} />
      ))}
    </div>
  );
}
