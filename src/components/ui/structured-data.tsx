import { defaultSiteDescription, getAbsoluteSiteUrl, siteUrl } from "@/config/site-metadata";
import { getCmsText } from "@/lib/settings/cms-content";
import type { PublicSchoolSettings } from "@/types/settings";

type BreadcrumbItem = {
  name: string;
  pathname: string;
};

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
      type="application/ld+json"
    />
  );
}

export function SchoolStructuredData({ settings }: { settings: PublicSchoolSettings }) {
  const schoolUrl = siteUrl?.toString();
  const description = getCmsText(settings.cmsContent, "seo", "metaDescription", defaultSiteDescription);

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "School",
        name: settings.name,
        description,
        ...(schoolUrl ? { url: schoolUrl } : {}),
        telephone: settings.contact.primaryPhone.display,
        address: {
          "@type": "PostalAddress",
          streetAddress: settings.address.formatted,
          addressCountry: "IN",
        },
        sameAs: [settings.social.instagram.href, ...(settings.social.facebook ? [settings.social.facebook] : [])],
        ...(settings.contact.email ? { email: settings.contact.email } : {}),
      }}
    />
  );
}

export function BreadcrumbStructuredData({ items }: { items: readonly BreadcrumbItem[] }) {
  if (!siteUrl) {
    return null;
  }

  const entries = [{ name: "Home", pathname: "/" }, ...items];

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: entries.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: getAbsoluteSiteUrl(item.pathname),
        })),
      }}
    />
  );
}
