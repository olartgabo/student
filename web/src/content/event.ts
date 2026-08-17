import type { EventInfo } from "./types";

export const event: EventInfo = {
  name: "Student Community Day",
  edition: "Cochabamba 2026",
  slug: "SC-DAY // 001",
  tagline: "La comunidad tecnológica universitaria se encuentra aquí.",
  dateISO: "2026-10-03",
  startTime: "09:00",
  endTime: "18:00",
  timeZone: "America/La_Paz",
  utcOffset: "-04:00",
  registrationUrl: "https://luma.com/r65j1ukn",
  price: "Gratis",
  venue: {
    name: "Universidad Privada Boliviana",
    shortName: "UPB",
    addressLines: ["Av. Juan Pablo II", "Colcapirhua"],
    city: "Cochabamba",
    country: "Bolivia",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Universidad+Privada+Boliviana+Cochabamba",
  },
  contactEmail: "hola@sbgupb.dev",
  sponsorshipEmail: "patrocinio@sbgupb.dev",
  social: [],
};

/** Absolute instant the doors open. Used by the countdown and the JSON-LD. */
export const eventStartISO = `${event.dateISO}T${event.startTime}:00${event.utcOffset}`;
export const eventEndISO = `${event.dateISO}T${event.endTime}:00${event.utcOffset}`;

export const eventDateLabel = {
  day: "03",
  month: "Octubre",
  year: "2026",
  long: "3 de octubre de 2026",
} as const;
