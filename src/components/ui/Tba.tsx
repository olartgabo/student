import { TBA } from "@/lib/tba";
import { cn } from "@/lib/cn";

/**
 * The placeholder state, given deliberate visual mass by a short rule above it
 * so an unfilled slot reads as "not announced yet" rather than as a rendering bug.
 */
export function Tba({ label, className }: { label?: string; className?: string }) {
  return (
    <span className={cn("flex flex-col gap-2", className)}>
      <span aria-hidden className="block h-px w-6 bg-slate-600" />
      <span className="font-display text-small tracking-mono-caps text-slate-200 uppercase">
        {label ?? TBA}
      </span>
    </span>
  );
}
