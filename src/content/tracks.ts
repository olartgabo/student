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
    name: { es: "Inteligencia Artificial", en: "Artificial Intelligence" },
    shortName: { es: "AI", en: "AI" },
    code: "01",
    accent: "sky",
    description: {
      es: "Modelos, agentes y aplicaciones reales. Desde los fundamentos hasta lo que ya está en producción.",
      en: "Models, agents and real applications. From the fundamentals to what is already in production.",
    },
    topics: {
      es: ["Machine Learning", "Agentes", "IA Generativa", "MLOps"],
      en: ["Machine Learning", "Agents", "Generative AI", "MLOps"],
    },
    icon: "ai",
  },
  {
    id: "cloud",
    kind: "talks",
    name: { es: "Cloud", en: "Cloud" },
    shortName: { es: "Cloud", en: "Cloud" },
    code: "02",
    accent: "green",
    description: {
      es: "Arquitectura, serverless y operación en la nube. Cómo se construye y se sostiene lo que usás todos los días.",
      en: "Architecture, serverless and cloud operations. How the things you use every day are built and kept running.",
    },
    topics: {
      es: ["Arquitectura", "Serverless", "DevOps", "Observabilidad"],
      en: ["Architecture", "Serverless", "DevOps", "Observability"],
    },
    icon: "rocket",
  },
  {
    id: "security",
    kind: "talks",
    name: { es: "Ciberseguridad", en: "Cybersecurity" },
    shortName: { es: "Security", en: "Security" },
    code: "03",
    accent: "purple",
    description: {
      es: "Ofensiva y defensa. Cómo se rompe un sistema y, sobre todo, cómo se protege.",
      en: "Offense and defense. How a system gets broken and, above all, how it is protected.",
    },
    topics: {
      es: ["AppSec", "Cloud Security", "Red Team", "Identidad"],
      en: ["AppSec", "Cloud Security", "Red Team", "Identity"],
    },
    icon: "key",
  },
  {
    id: "workshop-1",
    kind: "workshop",
    name: { es: "Laboratorio 1", en: "Lab 1" },
    shortName: { es: "Taller 1", en: "Workshop 1" },
    code: "04",
    accent: "sky",
    description: {
      es: "Laboratorio práctico. Traé tu laptop y salí con algo construido.",
      en: "Hands-on lab. Bring your laptop and leave with something built.",
    },
    topics: { es: ["Hands-on"], en: ["Hands-on"] },
    icon: "dumbbell",
  },
  {
    id: "workshop-2",
    kind: "workshop",
    name: { es: "Laboratorio 2", en: "Lab 2" },
    shortName: { es: "Taller 2", en: "Workshop 2" },
    code: "05",
    accent: "green",
    description: {
      es: "Segundo laboratorio en paralelo, para los bloques de mayor demanda.",
      en: "A second parallel lab for the most requested blocks.",
    },
    topics: { es: ["Hands-on"], en: ["Hands-on"] },
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
