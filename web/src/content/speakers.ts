import type { Speaker } from "./types";

/**
 * Empty until speakers are confirmed. Add them here and reference them by id from
 * a session's `speakerIds` in agenda.ts.
 */
export const speakers: readonly Speaker[] = [];

export function getSpeaker(id: string): Speaker | undefined {
  return speakers.find((s) => s.id === id);
}
