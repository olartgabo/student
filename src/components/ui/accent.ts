import type { AccentKey } from "@/content/types";

/**
 * Accent classes, written out in full because Tailwind scans source text and
 * cannot see a class name built by string concatenation.
 *
 * `fill` always pairs with a dark label: white on orange measures 2.14:1, and the
 * other three accents are brighter still. See the reference art, where the grid
 * numerals sit dark on solid sky.
 */
export const accentText: Record<AccentKey, string> = {
  orange: "text-orange",
  sky: "text-sky",
  green: "text-green",
  purple: "text-purple",
  neutral: "text-slate-200",
};

export const accentFill: Record<AccentKey, string> = {
  orange: "bg-orange text-navy-900",
  sky: "bg-sky text-slate-900",
  green: "bg-green text-slate-900",
  purple: "bg-purple text-slate-900",
  neutral: "bg-slate-600 text-white",
};

export const accentBorder: Record<AccentKey, string> = {
  orange: "border-orange",
  sky: "border-sky",
  green: "border-green",
  purple: "border-purple",
  neutral: "border-slate-600",
};

/**
 * Accent at ~15% behind full-opacity text — the only transparency in the system.
 *
 * The label is white rather than the accent itself. Accent-on-tint looks good but
 * purple measures 3.88:1 at badge size and cannot be rescued by lowering the tint
 * (even at 8% it only reaches 4.25:1), so tinting the text would mean one accent
 * silently failing AA. The tint still carries the colour identity.
 */
export const accentTint: Record<AccentKey, string> = {
  orange: "bg-orange/15 text-white",
  sky: "bg-sky/15 text-white",
  green: "bg-green/15 text-white",
  purple: "bg-purple/15 text-white",
  neutral: "bg-white/10 text-slate-200",
};
