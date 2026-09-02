import type { MetadataRoute } from "next";

import { siteUrl } from "@/content/event";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Nothing here is private and the whole site is three static routes, so the
      // only rule worth stating is that crawlers — search and answer engines
      // alike — may read all of it.
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
