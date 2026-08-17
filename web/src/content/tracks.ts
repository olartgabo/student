import type { Track, TrackId } from "./types";

/**
 * Three content tracks plus two workshop rooms.
 *
 * Colour assignment is fixed here and nowhere else: orange is reserved for calls
 * to action, so the tracks take sky / green / purple and the workshop rooms
 * reuse the neighbouring track colours at a smaller weight.
 */
export const tracks = [
  {
    id: "ai",
    kind: "talks",
    name: "Inteligencia Artificial",
    shortName: "AI",
    code: "01",
    accent: "sky",
    description:
      "Modelos, agentes y aplicaciones reales. Desde los fundamentos hasta lo que ya está en producción.",
    topics: ["Machine Learning", "Agentes", "IA Generativa", "MLOps"],
    icon: "ai",
  },
  {
    id: "cloud",
    kind: "talks",
    name: "Cloud",
    shortName: "Cloud",
    code: "02",
    accent: "green",
    description:
      "Arquitectura, serverless y operación en la nube. Cómo se construye y se sostiene lo que usás todos los días.",
    topics: ["Arquitectura", "Serverless", "DevOps", "Observabilidad"],
    icon: "rocket",
  },
  {
    id: "security",
    kind: "talks",
    name: "Ciberseguridad",
    shortName: "Security",
    code: "03",
    accent: "purple",
    description:
      "Ofensiva y defensa. Cómo se rompe un sistema y, sobre todo, cómo se protege.",
    topics: ["AppSec", "Cloud Security", "Red Team", "Identidad"],
    icon: "key",
  },
  {
    id: "workshop-1",
    kind: "workshop",
    name: "Laboratorio 1",
    shortName: "Taller 1",
    code: "04",
    accent: "sky",
    description: "Laboratorio práctico. Traé tu laptop y salí con algo construido.",
    topics: ["Hands-on"],
    icon: "dumbbell",
  },
  {
    id: "workshop-2",
    kind: "workshop",
    name: "Laboratorio 2",
    shortName: "Taller 2",
    code: "05",
    accent: "green",
    description: "Segundo laboratorio en paralelo, para los bloques de mayor demanda.",
    topics: ["Hands-on"],
    icon: "bolt",
  },
] as const satisfies readonly Track[];

export const talkTracks = tracks.filter((t) => t.kind === "talks");
export const workshopTracks = tracks.filter((t) => t.kind === "workshop");

export function getTrack(id: TrackId): Track {
  const track = tracks.find((t) => t.id === id);
  if (!track) throw new Error(`Track desconocido: ${id}`);
  return track;
}
