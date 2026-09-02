import { pixelIcons, type PixelIconName } from "./pixel-icons";

interface PixelIconProps {
  name: PixelIconName;
  /**
   * Size it with a square utility (`size-8`, `size-10`), not a width alone. The
   * source artboard gives each icon a different viewBox ratio — `key` is 2:1 and
   * `bolt` is 2:3 — so width-only sizing renders a row of icons at heights from
   * 20px to 60px. A square box plus `preserveAspectRatio` letterboxes each one
   * into the same optical cell without ever distorting it.
   */
  className?: string;
  /** Omit for decorative use; the icon is then hidden from assistive tech. */
  title?: string;
}

/**
 * Inlined rather than served from /public so `currentColor` resolves against the
 * surrounding text colour.
 */
export function PixelIcon({ name, className, title }: PixelIconProps) {
  const icon = pixelIcons[name];
  return (
    <svg
      viewBox={icon.viewBox}
      className={className}
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <path d={icon.d} fill="currentColor" />
    </svg>
  );
}
