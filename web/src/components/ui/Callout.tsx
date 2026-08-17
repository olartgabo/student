import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

const tones = {
  info: "border-l-sky",
  success: "border-l-green",
  warning: "border-l-orange",
} as const;

/**
 * The one place a left-border accent belongs in this system. Do not reach for it
 * as a generic card style.
 */
export function Callout({
  tone = "info",
  title,
  children,
  className,
}: {
  tone?: keyof typeof tones;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-l-[3px] bg-slate-800 py-4 pr-5 pl-5 text-slate-200",
        tones[tone],
        className,
      )}
    >
      {title ? (
        <p className="font-display text-small tracking-mono-caps mb-1 text-white uppercase">
          {title}
        </p>
      ) : null}
      {children}
    </div>
  );
}
