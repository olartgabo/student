import type { Localized } from "@/lib/i18n";

import type { FaqItem } from "./types";

import { event, eventDateLabel } from "./event";

export const faq = {
  es: [
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
        `No. La entrada es ${event.price.es.toLowerCase()}, pero el registro es obligatorio porque los cupos son limitados.`,
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
      id: "speaker",
      question: "¿Cómo propongo una charla?",
      answer: [
        "La convocatoria de speakers está abierta en Sessionize.",
        "Los bloques son de 40 minutos, en cualquiera de los tres tracks o en los laboratorios prácticos. Se aceptan propuestas desde nivel introductorio y no hace falta haber hablado antes en un evento.",
      ],
    },
    {
      id: "llegar",
      question: `¿Cómo llego a la ${event.venue.name}?`,
      answer: [
        `El evento es el ${eventDateLabel.es.long} en el campus de ${event.venue.city}, ${event.venue.addressLines.join(", ")}.`,
        "En la sección Sede vas a encontrar el enlace directo a Google Maps.",
      ],
    },
  ],
  en: [
    {
      id: "que-es",
      question: "What is a Student Community Day?",
      answer: [
        "A free, one-day, student-led event backed by AWS and organized by the Student Builder Groups.",
        "A place to learn about cloud technology, build hands-on, and meet the Cochabamba tech community.",
      ],
    },
    {
      id: "quien-puede",
      question: "Who can attend?",
      answer: [
        "Anyone interested in technology. You don't need to be a UPB student or have prior experience.",
        "Content ranges from introductory to advanced sessions, so you can plan your day around what you already know.",
      ],
    },
    {
      id: "precio",
      question: "Does it cost anything?",
      answer: [
        `No. Admission is ${event.price.en.toLowerCase()}, but registration is required because seats are limited.`,
      ],
    },
    {
      id: "que-llevar",
      question: "What should I bring?",
      answer: [
        "Your ID for check-in at the door.",
        "If you plan to join the workshops, bring your laptop and charger. The labs are hands-on and you will work on your own machine.",
      ],
    },
    {
      id: "tracks",
      question: "Do I have to pick a single track?",
      answer: [
        "No. You can move freely between AI, Cloud, Cybersecurity and the workshops all day.",
        "The agenda runs several experiences in parallel: in each block you choose whether to learn, build or explore.",
      ],
    },
    {
      id: "idioma",
      question: "What language are the sessions in?",
      answer: [
        "Most sessions are in Spanish. Some sessions with international speakers may be in English, and they will be marked in the agenda.",
      ],
    },
    {
      id: "comida",
      question: "Is food provided?",
      answer: [
        "Yes. There are coffee breaks in the morning and afternoon, and a lunch area at midday next to the Community Expo.",
      ],
    },
    {
      id: "certificado",
      question: "Do you issue a certificate of participation?",
      answer: [
        "Yes, for everyone who registers and attends. Details are shared by email after the event.",
      ],
    },
    {
      id: "speaker",
      question: "How do I submit a talk?",
      answer: [
        "The call for speakers is open on Sessionize.",
        "Slots are 40 minutes, in any of the three tracks or the hands-on labs. Introductory proposals are welcome, and you don't need prior speaking experience.",
      ],
    },
    {
      id: "llegar",
      question: `How do I get to ${event.venue.name}?`,
      answer: [
        `The event is on ${eventDateLabel.en.long} at the ${event.venue.city} campus, ${event.venue.addressLines.join(", ")}.`,
        "The Venue section has a direct link to Google Maps.",
      ],
    },
  ],
} as const satisfies Localized<readonly FaqItem[]>;
