import { describe, expect, it } from "vitest";

import { event, eventDateLabel, eventEndISO, eventStartISO, siteUrl } from "./event";
import { locales } from "@/lib/i18n";

import { navLinks, speakerCta } from "./nav";
import { sponsorComparisonRows, sponsorTiers } from "./sponsors";

const MONTHS_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const MONTHS_ES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
] as const;

const [year = "", month = "", day = ""] = event.dateISO.split("-");
const monthName = MONTHS_ES[Number(month) - 1] ?? "";
const monthNameEn = MONTHS_EN[Number(month) - 1] ?? "";
const dayNumber = String(Number(day));

/**
 * `dateISO` is the one authority for the date. The prose labels are written by
 * hand — a title once shipped reading "3 Oct" for months while every other
 * surface said 10 October — so each one is checked against it here.
 */
describe("event date", () => {
  it("keeps every written label in step with dateISO", () => {
    const es = eventDateLabel.es;
    expect(es.year).toBe(year);
    expect(es.day).toBe(day);
    expect(es.month.toLowerCase()).toBe(monthName);
    expect(es.long).toBe(`${dayNumber} de ${monthName} de ${year}`);
    expect(es.short).toBe(
      `${dayNumber} ${monthName.slice(0, 1).toUpperCase()}${monthName.slice(1, 3)}`,
    );
  });

  it("keeps the English labels in step with dateISO", () => {
    const en = eventDateLabel.en;
    expect(en.year).toBe(year);
    expect(en.day).toBe(day);
    expect(en.month).toBe(monthNameEn);
    expect(en.long).toBe(`${monthNameEn} ${dayNumber}, ${year}`);
    expect(en.short).toBe(`${monthNameEn.slice(0, 3)} ${dayNumber}`);
  });

  it("opens before it closes, on the same day, at the venue's offset", () => {
    const start = new Date(eventStartISO);
    const end = new Date(eventEndISO);

    expect(Number.isNaN(start.getTime())).toBe(false);
    expect(start.getTime()).toBeLessThan(end.getTime());
    expect(eventStartISO.startsWith(event.dateISO)).toBe(true);
    expect(eventStartISO.endsWith(event.utcOffset)).toBe(true);
  });
});

describe("contact addresses", () => {
  const inbox = "sbgcbba@upb.edu";

  it("routes attendees and sponsors to the same group inbox", () => {
    expect(event.contactEmail).toBe(inbox);
    expect(event.sponsorshipEmail).toBe(inbox);
  });
});

describe("outbound URLs", () => {
  const outbound = [event.registrationUrl, event.speakersUrl, event.venue.mapsUrl];

  it("are absolute and https", () => {
    for (const url of outbound) {
      expect(() => new URL(url)).not.toThrow();
      expect(new URL(url).protocol).toBe("https:");
    }
  });

  it("points the speaker CTA at Sessionize", () => {
    expect(new URL(event.speakersUrl).hostname).toBe("sessionize.com");
    expect(speakerCta.href).toBe(event.speakersUrl);
    expect(speakerCta.external).toBe(true);
  });

  it("states the canonical origin once, without a trailing slash", () => {
    expect(siteUrl).toMatch(/^https:\/\//);
    expect(siteUrl.endsWith("/")).toBe(false);
  });
});

describe("navigation", () => {
  it("has no duplicate targets or labels", () => {
    expect(new Set(navLinks.map((l) => l.href)).size).toBe(navLinks.length);
    for (const locale of locales) {
      expect(new Set(navLinks.map((l) => l.label[locale])).size).toBe(navLinks.length);
    }
  });

  it("uses in-page anchors, so the header nav never leaves the page", () => {
    for (const link of navLinks) expect(link.href.startsWith("#")).toBe(true);
  });
});

describe("sponsor tiers", () => {
  it("are ordered from the most expensive down", () => {
    const prices = sponsorTiers.map((t) => t.priceUsd);
    expect([...prices].sort((a, b) => b - a)).toEqual(prices);
  });

  it("give every tier a value summary and a unique code", () => {
    expect(new Set(sponsorTiers.map((t) => t.code)).size).toBe(sponsorTiers.length);
    for (const tier of sponsorTiers) {
      for (const locale of locales) {
        expect(tier.summary[locale].length).toBeGreaterThan(0);
        expect(tier.benefits[locale].length).toBeGreaterThan(0);
      }
      // A benefit added in one language only would quietly drop from the other.
      expect(tier.benefits.en.length).toBe(tier.benefits.es.length);
    }
  });

  it("compares every tier in every decision row", () => {
    const tierIds = sponsorTiers.map((tier) => tier.id).sort();

    for (const row of sponsorComparisonRows) {
      expect(Object.keys(row.values).sort()).toEqual(tierIds);
      for (const value of Object.values(row.values)) {
        for (const locale of locales) expect(value[locale].length).toBeGreaterThan(0);
      }
    }
  });
});
