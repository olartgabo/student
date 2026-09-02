import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { navLinks } from "@/content/nav";
import { team } from "@/content/team";

/**
 * A static QA pass over the source, not a rendering test.
 *
 * There is no DOM harness in this project and adding one to assert that a link
 * points somewhere is a poor trade. Everything below is checkable by reading the
 * files: dead in-page anchors, unsafe external links, images without alt text,
 * icons sized on one axis. They are the defects that survive a typecheck and a
 * build, and each one has actually shipped here at least once.
 */
const SRC = fileURLToPath(new URL("..", import.meta.url));

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    return /\.tsx?$/.test(entry.name) && !entry.name.endsWith(".test.ts") ? [path] : [];
  });
}

const files = sourceFiles(SRC).map((path) => ({
  path: path.slice(SRC.length).replace(/\\/g, "/"),
  text: readFileSync(path, "utf8"),
}));

const all = files.map((f) => f.text).join("\n");

/** Every `id="…"` a component renders, including the ones passed to <Section>. */
const renderedIds = new Set(
  [...all.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1] ?? ""),
);

/** Every literal in-page anchor in the source, plus the ones the nav data holds. */
const anchors = new Set(
  [
    ...[...all.matchAll(/href="(#[^"]+)"/g)].map((match) => match[1] ?? ""),
    ...navLinks.map((link) => link.href).filter((href) => href.startsWith("#")),
  ].filter(Boolean),
);

describe("in-page links", () => {
  it("every anchor points at a section that exists", () => {
    const dangling = [...anchors].filter((href) => !renderedIds.has(href.slice(1)));
    expect(dangling).toEqual([]);
  });

  it("does not link a section that removes itself when empty", () => {
    // Team renders nothing while the roster is unconfirmed, so nothing may offer
    // the reader a jump to it.
    if (team.length === 0) expect([...anchors]).not.toContain("#equipo");
  });
});

describe("outbound links", () => {
  it("never leaves a new tab with access to window.opener", () => {
    const unsafe = files
      .filter((f) => f.text.includes('target="_blank"') && !f.text.includes("noopener"))
      .map((f) => f.path);
    expect(unsafe).toEqual([]);
  });

  it("uses no plain-http URLs", () => {
    const insecure = files.filter((f) => f.text.includes("http://")).map((f) => f.path);
    expect(insecure).toEqual([]);
  });

  it("has no leftover placeholder hrefs", () => {
    expect(all).not.toMatch(/href="#"/);
  });
});

describe("content that has drifted before", () => {
  it("carries no address from the retired domain", () => {
    expect(all).not.toMatch(/sbgupb\.dev/);
  });

  it("never states the date as 3 October", () => {
    // The event is 10 October. Page titles claimed "3 Oct" for months because
    // the string was hardcoded next to a value that came from `event.ts`.
    expect(all).not.toMatch(/(?<!\d)3\s*Oct\b/i);
    expect(all).not.toMatch(/(?<!\d)3 de octubre/i);
  });
});

describe("images and icons", () => {
  it("gives every next/image an alt and intrinsic dimensions", () => {
    for (const { path, text } of files) {
      for (const [tag] of text.matchAll(/<Image\b[\s\S]*?\/>/g)) {
        expect(tag, `${path}: <Image> without alt`).toMatch(/\balt=/);
        expect(tag, `${path}: <Image> without width`).toMatch(/\bwidth=/);
        expect(tag, `${path}: <Image> without height`).toMatch(/\bheight=/);
      }
    }
  });

  it("sizes every PixelIcon on both axes", () => {
    // The source artboard hands out viewBox ratios from 2:1 to 2:3, so a width
    // alone renders a row of icons at wildly different heights. `size-*` boxes
    // them; `preserveAspectRatio` keeps the art undistorted inside the box.
    for (const { path, text } of files) {
      for (const [tag] of text.matchAll(/<PixelIcon\b[\s\S]*?\/>/g)) {
        expect(tag, `${path}: PixelIcon sized with a bare w-*`).not.toMatch(/\bw-\d/);
        expect(tag, `${path}: PixelIcon without a size-* box`).toMatch(/\bsize-\d/);
      }
    }
  });
});

describe("responsive safety", () => {
  it("keeps fixed pixel widths out of everything but the hero lattice", () => {
    // A hardcoded px width is the usual cause of horizontal overflow at 375px.
    // The hero's 480px cell field is the one exception: it is `hidden lg:grid`.
    const offenders = files
      .filter((f) => /width:\s*"\d+px"/.test(f.text))
      .map((f) => f.path);
    expect(offenders).toEqual(["components/sections/Hero.tsx"]);
  });
});
