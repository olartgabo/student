import type { TeamMember } from "./types";

/**
 * Empty until the roster is confirmed. The Team section checks this and does not
 * render at all while it is empty — an empty section reads worse than no section.
 * A member without a `photo` renders an initials tile, so headshots are optional.
 */
export const team: readonly TeamMember[] = [];
