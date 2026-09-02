import type { MetadataRoute } from "next";

import { siteUrl } from "@/content/event";

export const dynamic = "force-static";

/**
 * Stated explicitly rather than read from `new Date()`: the build is static, and
 * a clock-derived value would rewrite every `lastmod` on each deploy and teach
 * crawlers to ignore the field. Bump it when the content actually changes.
 */
const lastModified = new Date("2026-09-01");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/agenda`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/sponsor-deck`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
