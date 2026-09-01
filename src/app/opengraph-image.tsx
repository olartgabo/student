import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { event, eventDateLabel } from "@/content/event";

export const alt = `AWS ${event.name} ${event.edition}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CELL = 60;

/**
 * Built with plain divs rather than the site's components: ImageResponse runs a
 * subset of CSS with no Tailwind, so the tokens are inlined here on purpose.
 */
export default async function OpengraphImage() {
  // Satori needs the raw font buffer; next/font is a browser-side mechanism and
  // has nothing to hand it. Server-side only, so this never reaches the client.
  const mono = await readFile(
    join(process.cwd(), "src/assets/fonts/JetBrainsMono-Medium.ttf"),
  );

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 72px",
        backgroundColor: "#161d26",
        backgroundImage:
          "linear-gradient(rgba(101,104,115,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(101,104,115,0.28) 1px, transparent 1px)",
        backgroundSize: `${CELL}px ${CELL}px`,
        fontFamily: "JetBrains Mono",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 22,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#ff9900",
        }}
      >
        {"// AWS Student Builder Group — UPB Cochabamba"}
      </div>

      <div style={{ display: "flex", flexDirection: "column", marginTop: 28 }}>
        <div
          style={{ display: "flex", fontSize: 96, color: "#ffffff", lineHeight: 1.04 }}
        >
          STUDENT
        </div>
        <div
          style={{ display: "flex", fontSize: 96, color: "#42b4ff", lineHeight: 1.04 }}
        >
          COMMUNITY
        </div>
        <div
          style={{ display: "flex", fontSize: 96, color: "#ffffff", lineHeight: 1.04 }}
        >
          DAY
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 40,
          marginTop: 44,
          fontSize: 26,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "#aab0bb",
        }}
      >
        <div style={{ display: "flex" }}>
          {eventDateLabel.day} {eventDateLabel.month} {eventDateLabel.year}
        </div>
        <div style={{ display: "flex" }}>·</div>
        <div style={{ display: "flex" }}>
          {event.venue.shortName} {event.venue.city} / {event.venue.country}
        </div>
        <div style={{ display: "flex" }}>·</div>
        <div style={{ display: "flex", color: "#ff9900" }}>{event.price}</div>
      </div>
    </div>,
    {
      ...size,
      fonts: [{ name: "JetBrains Mono", data: mono, weight: 500, style: "normal" }],
    },
  );
}
