import type { FaqItem } from "./types";

import { event, eventDateLabel } from "./event";

export const faq = [
  {
    id: "que-es",
    question: "¿Qué es un Student Community Day?",
    answer: [
      "Es un evento de un día, gratuito y liderado por estudiantes, respaldado por AWS y organizado por los Student Builder Groups.",
      "Un espacio para aprender sobre tecnología en la nube, construir con las manos y conectar con la comunidad técnica de Cochabamba.",
    ],
  },
  {
    id: "quien-puede",
    question: "¿Quién puede asistir?",
    answer: [
      "Cualquier persona interesada en tecnología. No hace falta ser estudiante de la UPB ni tener experiencia previa.",
      "Hay contenido desde nivel introductorio hasta sesiones avanzadas, así que podés armar tu día según lo que ya sabés.",
    ],
  },
  {
    id: "precio",
    question: "¿Tiene costo?",
    answer: [
      `No. La entrada es ${event.price.toLowerCase()}, pero el registro es obligatorio porque los cupos son limitados.`,
    ],
  },
  {
    id: "que-llevar",
    question: "¿Qué necesito llevar?",
    answer: [
      "Tu documento de identidad para el registro en puerta.",
      "Si pensás entrar a los talleres, llevá tu laptop y su cargador. Los laboratorios son prácticos y vas a trabajar sobre tu propia máquina.",
    ],
  },
  {
    id: "tracks",
    question: "¿Tengo que elegir un solo track?",
    answer: [
      "No. Podés moverte libremente entre AI, Cloud, Ciberseguridad y los talleres durante todo el día.",
      "La agenda está pensada como varias experiencias ocurriendo en paralelo: en cada bloque elegís si querés aprender, construir o explorar.",
    ],
  },
  {
    id: "idioma",
    question: "¿En qué idioma son las sesiones?",
    answer: [
      "La mayoría de las sesiones son en español. Algunas sesiones con speakers internacionales pueden ser en inglés, y quedarán marcadas en la agenda.",
    ],
  },
  {
    id: "comida",
    question: "¿Hay comida?",
    answer: [
      "Sí. Hay coffee breaks por la mañana y por la tarde, y un espacio de almuerzo al mediodía junto a la Community Expo.",
    ],
  },
  {
    id: "certificado",
    question: "¿Dan certificado de participación?",
    answer: [
      "Sí, para quienes se registren y asistan. Los detalles se comparten por correo después del evento.",
    ],
  },
  {
    id: "llegar",
    question: `¿Cómo llego a la ${event.venue.name}?`,
    answer: [
      `El evento es el ${eventDateLabel.long} en el campus de ${event.venue.city}, ${event.venue.addressLines.join(", ")}.`,
      "En la sección Sede vas a encontrar el enlace directo a Google Maps.",
    ],
  },
] as const satisfies readonly FaqItem[];
