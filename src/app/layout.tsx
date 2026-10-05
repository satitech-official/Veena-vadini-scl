import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  DM_Sans,
} from "next/font/google";

import { siteMetadata } from "@/config/site-metadata";
import { PublicSiteChrome } from "@/components/layout/public-site-chrome";
import { PageTransition } from "@/components/motion/page-transition";
import { SectionMotion } from "@/components/motion/section-motion";
import { PublicSchoolSettingsProvider } from "@/components/settings/public-school-settings-provider";
import { SchoolStructuredData } from "@/components/ui/structured-data";
import { getPublicSchoolSettings } from "@/lib/settings/settings-repository";
import { getCmsText } from "@/lib/settings/cms-content";

import "./globals.css";

const displayFont = Cormorant_Garamond({
  variable: "--font-vv-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sansFont = DM_Sans({
  variable: "--font-vv-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function safeHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPublicSchoolSettings();
  const seo = settings.cmsContent.seo;
  const title = getCmsText(settings.cmsContent, "seo", "siteTitle", String(siteMetadata.title ?? settings.name));
  const description = getCmsText(settings.cmsContent, "seo", "metaDescription", String(siteMetadata.description ?? ""));
  const ogTitle = getCmsText(settings.cmsContent, "seo", "ogTitle", title);
  const ogDescription = getCmsText(settings.cmsContent, "seo", "ogDescription", description);
  const canonical = safeHttpUrl(seo?.canonicalUrl ?? "");
  const ogImage = safeHttpUrl(seo?.ogImageUrl ?? "");

  return {
    ...siteMetadata,
    title,
    description,
    ...(seo?.keywords ? { keywords: seo.keywords.split(",").map((keyword) => keyword.trim()).filter(Boolean) } : {}),
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: {
      ...siteMetadata.openGraph,
      title: ogTitle,
      description: ogDescription,
      ...(canonical ? { url: canonical } : {}),
      ...(ogImage ? { images: [{ url: ogImage, alt: `${settings.name} school preview` }] } : {}),
    },
    twitter: {
      ...siteMetadata.twitter,
      title: ogTitle,
      description: ogDescription,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getPublicSchoolSettings();

  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${sansFont.variable} h-full antialiased`}
      >
      <body className="flex min-h-full flex-col">
        <SchoolStructuredData settings={settings} />
        <PublicSchoolSettingsProvider settings={settings}>
          <PageTransition>{children}</PageTransition>
          <SectionMotion />
          <PublicSiteChrome />
        </PublicSchoolSettingsProvider>
      </body>
    </html>
  );
}
