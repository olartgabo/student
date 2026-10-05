import type { Localized } from "@/lib/i18n";

/** Accent roles. Orange is reserved for calls to action and never used for a track. */
export type AccentKey = "orange" | "sky" | "green" | "purple" | "neutral";

/** Accents that may fill a solid surface. All of them require a dark label. */
export type FillAccent = Exclude<AccentKey, "neutral">;

export type TrackId = "ai" | "cloud" | "security" | "workshop-1" | "workshop-2";
export type AgendaTrackId = "bisa" | "gessell" | "a1" | "d1" | "l22" | "virtual-en";
export type ScheduleTrackId = TrackId | AgendaTrackId;

/**
 * "HH:MM", 24h, always America/La_Paz.
 *
 * Deliberately a string and never a `Date`: a Date serialises in the server's
 * timezone and rehydrates in the client's, which would desync every cell of the
 * timetable for any visitor outside UTC-4. The countdown builds the one real
 * timestamp it needs on the client.
 */
export type ClockTime = `${number}${number}:${number}${number}`;

export interface TimeRange {
  start: ClockTime;
  end: ClockTime;
}

export interface SocialLink {
  platform: "linkedin" | "github" | "instagram" | "x" | "youtube" | "web";
  href: string;
  label?: string;
}

export interface Track {
  id: TrackId;
  /** "talks" gets a session column of its own; "workshop" gets the hands-on treatment. */
  kind: "talks" | "workshop";
  /** Full name, e.g. "Inteligencia Artificial". */
  name: Localized;
  /** Timetable column header — kept short enough to survive a narrow column. */
  shortName: Localized;
  /** "01".."05", drives the grid-motif numbering. */
  code: string;
  accent: FillAccent;
  /** Absent renders "Aula por confirmar". */
  room?: string;
  description: Localized;
  topics: Localized<readonly string[]>;
  icon: import("@/components/brand/pixel-icons").PixelIconName;
}

/** A room or stream used by the published programme. */
export interface AgendaTrack extends Omit<Track, "id" | "kind"> {
  id: AgendaTrackId;
  kind: "room" | "virtual";
}

export interface Speaker {
  id: string;
  name: string;
  role?: string;
  org?: string;
  bio?: string;
  /** Absent renders an initials tile — never a broken image. */
  photo?: string;
  links?: readonly SocialLink[];
  /** false withholds the name; the session renders as "Por anunciar". */
  confirmed: boolean;
}

interface SessionBase {
  id: string;
  trackId: ScheduleTrackId;
  /** Use when a session starts or ends within its parent schedule block. */
  time?: TimeRange;
  /**
   * How many consecutive *parallel* blocks this session occupies. Workshops are
   * typically 2. A span may never cross a plenary block — validateAgenda enforces it.
   */
  span?: number;
  level?: "intro" | "intermedio" | "avanzado";
  format?: "charla" | "taller" | "demo" | "panel" | "caso" | "lightning";
  /** A remote/hybrid speaker. Not a fourth track — it sits inside its own track. */
  remote?: boolean;
  /**
   * A room that projects this session live, e.g. a virtual talk screened in D1.
   * The session still belongs to `trackId`; the room's cell mirrors it.
   */
  screenedIn?: AgendaTrackId;
}

/**
 * The absence of a title is modelled as a variant rather than stored as the
 * string "Por anunciar", so a placeholder can never be mistaken for real content.
 */
export type Session =
  | (SessionBase & {
      status: "confirmed";
      title: string;
      summary?: string;
      speakerIds?: readonly string[];
      /** Display names used while speaker profiles are not published. */
      speakers?: readonly string[];
      moderator?: string;
    })
  | (SessionBase & {
      status: "tba";
      /** Optional teaser shown in place of a title, e.g. "Taller práctico". */
      placeholder?: Localized;
    });

export type PlenarySubtype =
  | "registration"
  | "opening"
  | "keynote"
  | "panel"
  | "break"
  | "lunch"
  | "closing"
  | "networking";

export type AgendaBlock =
  | {
      kind: "plenary";
      id: string;
      time: TimeRange;
      subtype: PlenarySubtype;
      /** Always known — a plenary block's purpose is fixed even when its speaker isn't. */
      title: Localized;
      summary?: Localized;
      speakerIds?: readonly string[];
      location?: string;
    }
  | {
      kind: "parallel";
      id: string;
      time: TimeRange;
      /** e.g. "Bloque 3 — Talks + Workshops". */
      label?: Localized;
      note?: Localized;
      /**
       * Renders the block's single session across every column, tagged with its
       * room, instead of squeezing it into one room column.
       */
      wide?: boolean;
      /** 0–5 entries. A track with no entry renders an empty cell, never a collapsed column. */
      sessions: readonly Session[];
    };

export interface Sponsor {
  id: string;
  name: string;
  /** Path under /public/sponsors/. SVG preferred. */
  logo: string;
  href?: string;
  /** Intrinsic dimensions — required so the logo wall reserves space and never shifts. */
  width: number;
  height: number;
}

/** An organisation behind the event itself rather than a paid package. */
export interface HostPartner extends Sponsor {
  /** "Host", "Sede anfitriona", … */
  role: Localized;
}

export interface SponsorTier {
  id: "host" | "platinum" | "gold" | "silver";
  name: string;
  /** "Eres el evento", "Máxima visibilidad", … */
  tagline: Localized;
  /**
   * One factual sentence on what the tier actually buys, for the deck card and
   * the homepage summary. Reads as value, not as adjectives — every claim in it
   * has to be traceable to a line in `benefits`.
   */
  summary: Localized;
  code: string;
  priceUsd: number;
  accent: FillAccent;
  /** Total slots available; absent means unlimited. */
  slots?: number;
  featured?: boolean;
  benefits: Localized<readonly string[]>;
  /** Confirmed sponsors at this tier. Empty means the tier is still open. */
  sponsors: readonly Sponsor[];
}

export interface FaqItem {
  id: string;
  question: string;
  /** Paragraphs, so the answer never needs dangerouslySetInnerHTML. */
  answer: readonly string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: Localized;
  photo?: string;
  links?: readonly SocialLink[];
}

export interface Venue {
  name: string;
  shortName: string;
  addressLines: readonly string[];
  city: string;
  country: string;
  mapsUrl: string;
  geo?: { lat: number; lng: number };
  notes?: readonly string[];
}

export interface EventInfo {
  name: string;
  edition: string;
  /** "SC-DAY // 001" — the footer strip slug from the reference poster. */
  slug: string;
  tagline: Localized;
  dateISO: `${number}-${number}-${number}`;
  startTime: ClockTime;
  endTime: ClockTime;
  timeZone: "America/La_Paz";
  /** Bolivia does not observe DST, so this is safe to hardcode. */
  utcOffset: "-04:00";
  registrationUrl: string;
  /**
   * Sessionize call for speakers. First-class, not a footnote: almost every
   * session is still `tba`, and proposals are what fill them.
   */
  speakersUrl: string;
  price: Localized;
  venue: Venue;
  contactEmail: string;
  sponsorshipEmail: string;
  social: readonly SocialLink[];
}
