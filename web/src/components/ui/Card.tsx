import type { ReactNode } from "react";

import type { AccentKey } from "@/content/types";
import { cn } from "@/lib/cn";

import { accentFill } from "./accent";

interface CardProps {
  /** Short accent bar flush to the top edge. Never a left border — that belongs to Callout. */
  accent?: AccentKey;
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function Card({
  accent = "orange",
  eyebrow,
  title,
  description,
  footer,
  children,
  className,
}: CardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-md border border-slate-600",
        "bg-slate-700 p-6 shadow-[var(--shadow-card)]",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn("absolute inset-x-0 top-0 h-1", accentFill[accent])}
      />
      {eyebrow ? (
        <p className="font-display text-small tracking-mono-caps text-slate-200 uppercase">
          {eyebrow}
        </p>
      ) : null}
      {title ? (
        <h3 className="font-display text-display-md mt-2 text-white">{title}</h3>
      ) : null}
      {children ??
        (description ? <p className="mt-3 text-slate-200">{description}</p> : null)}
      {footer ? <div className="mt-6 flex items-center gap-3">{footer}</div> : null}
    </div>
  );
}
