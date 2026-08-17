import type { ReactNode } from "react";

import type { AccentKey } from "@/content/types";
import { cn } from "@/lib/cn";

import { accentTint } from "./accent";

interface BadgeProps {
  children: ReactNode;
  color?: AccentKey;
  className?: string;
}

/** Status or category. One or two words, always uppercase mono. */
export function Badge({ children, color = "orange", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "font-display inline-flex items-center rounded-sm px-2 py-1 text-[0.6875rem]",
        "tracking-mono-caps uppercase",
        accentTint[color],
        className,
      )}
    >
      {children}
    </span>
  );
}
