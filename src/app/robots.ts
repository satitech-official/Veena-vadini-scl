import type { MetadataRoute } from "next";

import { getAbsoluteSiteUrl, siteUrl } from "@/config/site-metadata";

export default function robots(): MetadataRoute.Robots {
  const shouldAllowIndexing = process.env.NODE_ENV === "production" && Boolean(siteUrl);

  if (!shouldAllowIndexing) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },
    sitemap: getAbsoluteSiteUrl("/sitemap.xml") ?? undefined,
    host: siteUrl?.origin,
  };
}
