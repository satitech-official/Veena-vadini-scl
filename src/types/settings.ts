export const cmsContentSections = [
  "homepage",
  "about",
  "leadership",
  "academics",
  "facilities",
  "contact",
  "social",
  "seo",
  "site",
] as const;

export type CmsContentSection = (typeof cmsContentSections)[number];
export type CmsContent = Partial<Record<CmsContentSection, Record<string, string>>>;

export type SchoolSettingsRecord = {
  id: string;
  schoolName: string;
  tagline: string | null;
  motto: string | null;
  address: string | null;
  primaryPhone: string | null;
  secondaryPhone: string | null;
  whatsapp: string | null;
  email: string | null;
  instagram: string | null;
  facebook: string | null;
  officeHours: string | null;
  googleMapsUrl: string | null;
  googleMapsEmbedUrl: string | null;
  cmsContent: CmsContent;
};

/**
 * Safe, presentation-ready school information. It deliberately contains no
 * Supabase credentials or admin-only fields, so it may be passed from Server
 * Components to the small client components that render contact actions.
 */
export type PublicSchoolSettings = {
  name: string;
  tagline: string;
  motto: string;
  board: string;
  medium: string;
  classes: string;
  address: {
    lines: string[];
    formatted: string;
  };
  contact: {
    primaryPhone: { display: string; href: string };
    secondaryPhone: { display: string; href: string };
    whatsapp: { display: string; digits: string; href: string };
    officeHours: string;
    email: string | null;
    privacyConsentText: string;
  };
  social: {
    instagram: { href: string; handle: string };
    facebook: string | null;
  };
  location: {
    googleMapsUrl: string | null;
    googleMapsEmbedUrl: string | null;
  };
  cmsContent: CmsContent;
  developerCredit: string | null;
  brand: {
    temporaryLogoPath: string;
    temporaryLogoNote: string;
  };
};

export type Announcement = {
  id: string;
  title: string;
  message: string;
  ctaLabel: string | null;
  ctaUrl: string | null;
  startsAt: string | null;
  endsAt: string | null;
  priority: number;
};
