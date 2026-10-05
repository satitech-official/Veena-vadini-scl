import type { MetadataRoute } from "next";

import { getAbsoluteSiteUrl, siteUrl } from "@/config/site-metadata";

const publicRoutes = [
  { pathname: "/", changeFrequency: "weekly", priority: 1 },
  { pathname: "/about", changeFrequency: "monthly", priority: 0.8 },
  { pathname: "/academics", changeFrequency: "monthly", priority: 0.8 },
  { pathname: "/admissions", changeFrequency: "weekly", priority: 0.9 },
  { pathname: "/facilities", changeFrequency: "monthly", priority: 0.7 },
  { pathname: "/student-life", changeFrequency: "monthly", priority: 0.7 },
  { pathname: "/faculty", changeFrequency: "monthly", priority: 0.6 },
  { pathname: "/gallery", changeFrequency: "monthly", priority: 0.6 },
  { pathname: "/events", changeFrequency: "weekly", priority: 0.7 },
  { pathname: "/notices", changeFrequency: "weekly", priority: 0.8 },
  { pathname: "/downloads", changeFrequency: "monthly", priority: 0.5 },
  { pathname: "/contact", changeFrequency: "monthly", priority: 0.8 },
] as const satisfies ReadonlyArray<{
  pathname: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
}>;

export default function sitemap(): MetadataRoute.Sitemap {
  if (process.env.NODE_ENV !== "production" || !siteUrl) {
    return [];
  }

  return publicRoutes.flatMap((route) => {
    const url = getAbsoluteSiteUrl(route.pathname);

    return url
      ? [{ url, changeFrequency: route.changeFrequency, priority: route.priority }]
      : [];
  });
}
