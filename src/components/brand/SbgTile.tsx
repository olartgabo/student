import { SBG_TILE_PATHS, SBG_TILE_VIEWBOX } from "./sbg-tile-paths";

interface SbgTileProps {
  className?: string;
  title?: string;
}

/** The UPB badge tile. A partner mark — co-branding only, never our own identity. */
export function SbgTile({ className, title }: SbgTileProps) {
  return (
    <svg
      viewBox={SBG_TILE_VIEWBOX}
      className={className}
      fill="none"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {SBG_TILE_PATHS.map((d, i) => (
        <path key={i} d={d} fill="currentColor" />
      ))}
    </svg>
  );
}
