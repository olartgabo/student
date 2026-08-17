import type { MetadataRoute } from "next";

const BASE = "https://scday.upb.bo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-14");
  return [
    { url: BASE, lastModified, priority: 1 },
    { url: `${BASE}/agenda`, lastModified, priority: 0.8 },
    { url: `${BASE}/sponsor-deck`, lastModified, priority: 0.6 },
  ];
}
