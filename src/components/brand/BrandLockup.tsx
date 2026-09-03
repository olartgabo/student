import { event } from "@/content/event";
import { cn } from "@/lib/cn";

interface BrandLockupProps {
  className?: string;
  compactOnMobile?: boolean;
  size?: "sm" | "md";
}

export function BrandLockup({
  className,
  compactOnMobile = false,
  size = "md",
}: BrandLockupProps) {
  const label = `${event.name} ${event.venue.country}`;

  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "flex shrink-0 flex-col overflow-hidden rounded-[1px] ring-1 ring-white/30",
          size === "sm" ? "h-4 w-6" : "h-5 w-8",
        )}
      >
        <span className="flex-1 bg-[#d52b1e]" />
        <span className="flex-1 bg-[#f9e300]" />
        <span className="flex-1 bg-[#007934]" />
      </span>
      <span
        className={cn(
          "font-display tracking-[0.04em] text-white",
          size === "sm" ? "text-small" : "text-body",
        )}
      >
        {compactOnMobile ? (
          <>
            <span className="sm:hidden">SCD Bolivia</span>
            <span className="hidden sm:inline">{label}</span>
          </>
        ) : (
          label
        )}
      </span>
    </span>
  );
}
