import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Pill chip set in the body face — deliberately unlike Badge, which is mono and
 * carries status. Tags are filters and multi-select values.
 */
export function Tag({
  children,
  active,
  onClick,
  className,
}: {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const classes = cn(
    "inline-flex items-center rounded-full border px-3 py-1 text-small transition-colors duration-150",
    active
      ? "border-white bg-white text-slate-900"
      : "border-slate-600 text-slate-200 hover:border-slate-400",
    className,
  );

  if (!onClick) return <span className={classes}>{children}</span>;

  return (
    <button type="button" onClick={onClick} aria-pressed={active} className={classes}>
      {children}
    </button>
  );
}
