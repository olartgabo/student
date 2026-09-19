import { describe, expect, it } from "vitest";

import { languageAlternates, localePath, switchLocalePath } from "./i18n";

describe("localePath", () => {
  it("keeps Spanish at the root and nests English under /en", () => {
    expect(localePath("es", "/")).toBe("/");
    expect(localePath("es", "/agenda")).toBe("/agenda");
    expect(localePath("en", "/")).toBe("/en");
    expect(localePath("en", "/sponsor-deck")).toBe("/en/sponsor-deck");
  });
});

describe("switchLocalePath", () => {
  it("maps each page to its counterpart in the other language", () => {
    expect(switchLocalePath("/", "en")).toBe("/en");
    expect(switchLocalePath("/agenda", "en")).toBe("/en/agenda");
    expect(switchLocalePath("/en", "es")).toBe("/");
    expect(switchLocalePath("/en/sponsor-deck", "es")).toBe("/sponsor-deck");
  });

  it("does not mistake a route that merely starts with 'en' for the English tree", () => {
    expect(switchLocalePath("/entradas", "en")).toBe("/en/entradas");
  });
});

describe("languageAlternates", () => {
  it("points x-default at the Spanish page", () => {
    expect(languageAlternates("/agenda")).toEqual({
      es: "/agenda",
      en: "/en/agenda",
      "x-default": "/agenda",
    });
  });
});
