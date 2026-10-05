import type { Metadata } from "next";

import { schoolConfig } from "@/config/school";

export const defaultSiteTitle = `${schoolConfig.name} | Padhar, Betul`;
export const defaultSiteDescription =
  "Veena Vadini Public School in Padhar, District Betul, Madhya Pradesh offers Hindi and English medium education from Nursery to Class 8 following a CBSE Pattern.";
export const ogImagePath = "/social-card";

function resolveConfiguredSiteUrl(): URL | null {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!configuredUrl) {
    return null;
  }

  try {
    const url = new URL(configuredUrl);

    return url.protocol === "http:" || url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

export const siteUrl = resolveConfiguredSiteUrl();

export function getAbsoluteSiteUrl(pathname: string): string | null {
  return siteUrl ? new URL(pathname, siteUrl).toString() : null;
}

type PageMetadataOptions = {
  title: string;
  description: string;
  pathname: string;
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  pathname,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const canonicalUrl = getAbsoluteSiteUrl(pathname);
  const imageUrl = getAbsoluteSiteUrl(ogImagePath);
  const pageTitle = pathname === "/" ? title : `${title} | ${schoolConfig.name}`;

  return {
    title: pageTitle,
    description,
    ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: schoolConfig.name,
      title: pageTitle,
      description,
      ...(canonicalUrl ? { url: canonicalUrl } : {}),
      ...(imageUrl
        ? {
            images: [
              {
                url: imageUrl,
                width: 1200,
                height: 630,
                alt: `${schoolConfig.name} — ${schoolConfig.tagline}`,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

const defaultOgImageUrl = getAbsoluteSiteUrl(ogImagePath);

export const siteMetadata: Metadata = {
  ...(siteUrl ? { metadataBase: siteUrl } : {}),
  title: defaultSiteTitle,
  description: defaultSiteDescription,
  applicationName: schoolConfig.name,
  category: "education",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: schoolConfig.name,
    title: defaultSiteTitle,
    description: defaultSiteDescription,
    ...(siteUrl ? { url: siteUrl.toString() } : {}),
    ...(defaultOgImageUrl
      ? {
          images: [
            {
              url: defaultOgImageUrl,
              width: 1200,
              height: 630,
              alt: `${schoolConfig.name} — ${schoolConfig.tagline}`,
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: defaultSiteTitle,
    description: defaultSiteDescription,
    ...(defaultOgImageUrl ? { images: [defaultOgImageUrl] } : {}),
  },
};
