import { pixelIcons, type PixelIconName } from "./pixel-icons";

interface PixelIconProps {
  name: PixelIconName;
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
