import type { AgendaBlock } from "./types";

/**
 * The full-day programme.
 *
 * Reconstructed from the organisers' draft. Three of its rows (bloques 2, 5 and 7)
 * lost table columns to a paste error; they are rebuilt here from the surviving
 * intent and marked RECONSTRUIDO. Correct those three and delete the markers.
 *
 * Session titles are almost all `status: "tba"` on purpose — see lib/tba.ts. Fill
 * one in by switching the variant and adding `title`; nothing else has to change.
 */
export const agenda = [
  {
    kind: "plenary",
    id: "registro",
    time: { start: "08:00", end: "09:00" },
    subtype: "registration",
    title: "Registro + Community Expo",
    summary: "Acreditación, café y apertura de stands de sponsors y comunidades.",
  },
  {
    kind: "plenary",
    id: "opening",
    time: { start: "09:00", end: "09:30" },
    subtype: "opening",
    title: "Opening",
    summary:
      "Bienvenida, presentación del evento, las comunidades participantes y los tres tracks.",
  },
  {
    kind: "parallel",
    id: "bloque-1",
    time: { start: "09:30", end: "10:10" },
    label: "Bloque 1 — Talks",
    sessions: [
      { id: "b1-ai", trackId: "ai", status: "tba", format: "charla" },
      { id: "b1-cloud", trackId: "cloud", status: "tba", format: "charla" },
      { id: "b1-sec", trackId: "security", status: "tba", format: "charla" },
    ],
  },
  {
    // RECONSTRUIDO — el draft perdió columnas aquí.
    kind: "parallel",
    id: "bloque-2",
    time: { start: "10:10", end: "10:50" },
    label: "Bloque 2 — Talks + Workshops",
    note: "Empiezan las actividades prácticas en paralelo a las charlas.",
    sessions: [
      { id: "b2-ai", trackId: "ai", status: "tba", format: "charla" },
      { id: "b2-cloud", trackId: "cloud", status: "tba", format: "charla" },
      { id: "b2-w1", trackId: "workshop-1", status: "tba", format: "taller" },
      { id: "b2-w2", trackId: "workshop-2", status: "tba", format: "taller" },
    ],
  },
  {
    kind: "plenary",
    id: "break-1",
    time: { start: "10:50", end: "11:10" },
    subtype: "break",
    title: "Community Break",
    summary: "Café, networking, sponsors y comunidades. Momento para cambiar de sala.",
  },
  {
    kind: "parallel",
    id: "bloque-3",
    time: { start: "11:10", end: "11:50" },
    label: "Bloque 3 — Talks + Workshops",
    sessions: [
      { id: "b3-ai", trackId: "ai", status: "tba", format: "charla" },
      { id: "b3-cloud", trackId: "cloud", status: "tba", format: "charla" },
      { id: "b3-sec", trackId: "security", status: "tba", format: "charla" },
      { id: "b3-w1", trackId: "workshop-1", status: "tba", format: "taller" },
      { id: "b3-w2", trackId: "workshop-2", status: "tba", format: "taller" },
    ],
  },
  {
    kind: "parallel",
    id: "bloque-4",
    time: { start: "11:50", end: "12:30" },
    label: "Bloque 4 — Parallel Sessions",
    note: "Bloque preferente para speakers internacionales remotos.",
    sessions: [
      { id: "b4-ai", trackId: "ai", status: "tba", format: "demo" },
      { id: "b4-cloud", trackId: "cloud", status: "tba", format: "charla" },
      { id: "b4-sec", trackId: "security", status: "tba", format: "charla" },
      { id: "b4-w1", trackId: "workshop-1", status: "tba", format: "taller" },
      { id: "b4-w2", trackId: "workshop-2", status: "tba", format: "taller" },
    ],
  },
  {
    kind: "plenary",
    id: "panel",
    time: { start: "12:30", end: "13:00" },
    subtype: "panel",
    title: "Community Panel — Building Your Career in Tech",
    summary: "Panel conjunto con speakers de los tres tracks.",
  },
  {
    kind: "plenary",
    id: "almuerzo",
    time: { start: "13:00", end: "14:00" },
    subtype: "lunch",
    title: "Almuerzo + Community Expo",
    summary: "Networking, sponsors y comunidades.",
  },
  {
    // RECONSTRUIDO — el draft perdió columnas aquí.
    kind: "parallel",
    id: "bloque-5",
    time: { start: "14:00", end: "14:40" },
    label: "Bloque 5 — Talks + Workshops",
    sessions: [
      { id: "b5-ai", trackId: "ai", status: "tba", format: "charla" },
      { id: "b5-cloud", trackId: "cloud", status: "tba", format: "charla" },
      { id: "b5-w1", trackId: "workshop-1", status: "tba", format: "taller" },
      { id: "b5-w2", trackId: "workshop-2", status: "tba", format: "taller" },
    ],
  },
  {
    kind: "parallel",
    id: "bloque-6",
    time: { start: "14:40", end: "15:20" },
    label: "Bloque 6 — Parallel Sessions",
    sessions: [
      { id: "b6-ai", trackId: "ai", status: "tba", format: "demo" },
      { id: "b6-cloud", trackId: "cloud", status: "tba", format: "charla" },
      { id: "b6-sec", trackId: "security", status: "tba", format: "charla" },
      { id: "b6-w1", trackId: "workshop-1", status: "tba", format: "taller" },
      { id: "b6-w2", trackId: "workshop-2", status: "tba", format: "taller" },
    ],
  },
  {
    kind: "plenary",
    id: "break-2",
    time: { start: "15:20", end: "15:40" },
    subtype: "break",
    title: "Community Break",
    summary: "Café, networking, sponsors y comunidades.",
  },
  {
    // RECONSTRUIDO — el draft perdió columnas aquí.
    kind: "parallel",
    id: "bloque-7",
    time: { start: "15:40", end: "16:20" },
    label: "Bloque 7 — Advanced Sessions",
    note: "Aquí sube el nivel técnico del contenido.",
    sessions: [
      { id: "b7-ai", trackId: "ai", status: "tba", format: "charla", level: "avanzado" },
      {
        id: "b7-cloud",
        trackId: "cloud",
        status: "tba",
        format: "charla",
        level: "avanzado",
      },
      {
        id: "b7-sec",
        trackId: "security",
        status: "tba",
        format: "charla",
        level: "avanzado",
      },
      { id: "b7-w1", trackId: "workshop-1", status: "tba", format: "taller" },
      { id: "b7-w2", trackId: "workshop-2", status: "tba", format: "taller" },
    ],
  },
  {
    kind: "parallel",
    id: "bloque-8",
    time: { start: "16:20", end: "17:00" },
    label: "Bloque 8 — Demos, Paneles e Industria",
    note: "Bloque deliberadamente abierto: demos, casos reales, fireside chats o sesiones especiales.",
    sessions: [
      { id: "b8-ai", trackId: "ai", status: "tba", format: "panel" },
      { id: "b8-cloud", trackId: "cloud", status: "tba", format: "charla" },
      { id: "b8-sec", trackId: "security", status: "tba", format: "caso" },
      { id: "b8-w1", trackId: "workshop-1", status: "tba", format: "taller" },
      { id: "b8-w2", trackId: "workshop-2", status: "tba", format: "taller" },
    ],
  },
  {
    kind: "plenary",
    id: "closing",
    time: { start: "17:00", end: "17:30" },
    subtype: "closing",
    title: "Closing Session",
    summary: "Recapitulación del día y principales aprendizajes.",
  },
  {
    kind: "plenary",
    id: "recognition",
    time: { start: "17:30", end: "17:45" },
    subtype: "closing",
    title: "Community Recognition",
    summary:
      "Reconocimiento a speakers, sponsors, comunidades, voluntarios y organizadores.",
  },
  {
    kind: "plenary",
    id: "community-call",
    time: { start: "17:45", end: "18:00" },
    subtype: "networking",
    title: "Community Call",
    summary:
      "Próximas actividades, cómo seguir involucrándose, cierre oficial y fotografía grupal.",
  },
] as const satisfies readonly AgendaBlock[];

/** The day's shape, for the homepage preview. Times bracket the blocks above. */
export const dayRhythm = [
  { code: "01", time: "09:00", label: "Opening" },
  { code: "02", time: "09:30", label: "Talks + Workshops" },
  { code: "03", time: "12:30", label: "Community Panel" },
  { code: "04", time: "13:00", label: "Almuerzo + Expo" },
  { code: "05", time: "14:00", label: "Contenido técnico profundo" },
  { code: "06", time: "17:00", label: "Closing + Community" },
] as const;
