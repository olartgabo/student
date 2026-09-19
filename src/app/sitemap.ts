import type { MetadataRoute } from "next";

import { siteUrl } from "@/content/event";
import { localePath, locales } from "@/lib/i18n";

export const dynamic = "force-static";

/**
 * Stated explicitly rather than read from `new Date()`: the build is static, and
 * a clock-derived value would rewrite every `lastmod` on each deploy and teach
 * crawlers to ignore the field. Bump it when the content actually changes.
 */
const lastModified = new Date("2026-09-19");

const routes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/agenda", changeFrequency: "weekly", priority: 0.8 },
  { path: "/sponsor-deck", changeFrequency: "monthly", priority: 0.6 },
] as const;

const absolute = (path: string) => (path === "/" ? siteUrl : `${siteUrl}${path}`);

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: absolute(localePath(locale, route.path)),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((alt) => [alt, absolute(localePath(alt, route.path))]),
        ),
      },
    })),
  );
}
