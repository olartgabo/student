import { cn } from "@/lib/cn";

import { PixelIcon } from "./PixelIcon";

interface BrandLockupProps {
  className?: string;
  size?: "sm" | "md";
}

/**
 * There is no wordmark for the group — the identity is the chip mark next to the
 * name set in type. See the design system's Logos section.
 */
export function BrandLockup({ className, size = "md" }: BrandLockupProps) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <PixelIcon
        name="chip"
        className={cn("text-orange", size === "sm" ? "w-6" : "w-8")}
      />
      <span
        className={cn(
          "font-display tracking-[0.04em] text-white",
          size === "sm" ? "text-small" : "text-body",
        )}
      >
        AWS Student Builder Group
      </span>
    </span>
  );
}
