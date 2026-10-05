import type { CmsContentSection } from "@/types/settings";

export type AdminSiteContentField = {
  key: string;
  label: string;
  kind: "text" | "textarea" | "url";
  help?: string;
  rows?: number;
};

export type AdminSiteContentDefinition = {
  label: string;
  eyebrow: string;
  description: string;
  previewHref?: string;
  fields: readonly AdminSiteContentField[];
};

export const adminSiteContentDefinitions: Record<CmsContentSection, AdminSiteContentDefinition> = {
  homepage: {
    label: "Homepage", eyebrow: "Homepage content", previewHref: "/",
    description: "Update the welcome copy and calls to action while keeping the approved hero design intact.",
    fields: [
      { key: "heroEyebrow", label: "Welcome label", kind: "text" },
      { key: "heroTitleTop", label: "Hero heading — first line", kind: "text" },
      { key: "heroTitleBottom", label: "Hero heading — highlighted line", kind: "text" },
      { key: "heroDescription", label: "Hero description", kind: "textarea", rows: 4 },
      { key: "primaryCtaLabel", label: "Primary button text", kind: "text" },
      { key: "primaryCtaUrl", label: "Primary button link", kind: "url", help: "Use a page path such as /about or an approved HTTPS link." },
      { key: "secondaryCtaLabel", label: "Secondary button text", kind: "text" },
      { key: "secondaryCtaUrl", label: "Secondary button link", kind: "url", help: "Use a page path such as /admissions or an approved HTTPS link." },
    ],
  },
  about: {
    label: "About School", eyebrow: "About content", previewHref: "/about",
    description: "Manage the introductory school story without changing the approved editorial layout.",
    fields: [
      { key: "eyebrow", label: "Section label", kind: "text" },
      { key: "heading", label: "Heading", kind: "text" },
      { key: "highlight", label: "Highlighted heading", kind: "text" },
      { key: "description", label: "Introduction", kind: "textarea", rows: 5 },
    ],
  },
  leadership: {
    label: "Principal & Leadership", eyebrow: "Leadership content", previewHref: "/about",
    description: "Add approved leadership information. Empty fields preserve the existing placeholder until the school is ready to publish.",
    fields: [
      { key: "heading", label: "Section heading", kind: "text" },
      { key: "description", label: "Section introduction", kind: "textarea", rows: 3 },
      { key: "name", label: "Leader name", kind: "text" },
      { key: "designation", label: "Designation", kind: "text" },
      { key: "message", label: "Leadership message", kind: "textarea", rows: 6 },
    ],
  },
  academics: {
    label: "Classes & Academics", eyebrow: "Academics content", previewHref: "/academics",
    description: "Keep the academic page language current without disturbing its approved visual structure.",
    fields: [
      { key: "eyebrow", label: "Section label", kind: "text" },
      { key: "heading", label: "Heading", kind: "text" },
      { key: "highlight", label: "Highlighted heading", kind: "text" },
      { key: "description", label: "Introduction", kind: "textarea", rows: 5 },
    ],
  },
  facilities: {
    label: "Facilities", eyebrow: "Facilities content", previewHref: "/facilities",
    description: "Update the facilities introduction while keeping the established chapter layout and approved media placeholders.",
    fields: [
      { key: "eyebrow", label: "Section label", kind: "text" },
      { key: "heading", label: "Heading", kind: "text" },
      { key: "highlight", label: "Highlighted heading", kind: "text" },
      { key: "description", label: "Introduction", kind: "textarea", rows: 5 },
    ],
  },
  contact: {
    label: "Contact Information", eyebrow: "Contact content", previewHref: "/contact",
    description: "Manage public contact details and supporting copy. Leave an optional field blank to retain a verified fallback.",
    fields: [
      { key: "primaryPhone", label: "Primary phone", kind: "text" },
      { key: "secondaryPhone", label: "Secondary phone", kind: "text" },
      { key: "whatsapp", label: "WhatsApp", kind: "text" },
      { key: "email", label: "Email", kind: "text" },
      { key: "address", label: "Address", kind: "textarea", rows: 3 },
      { key: "officeHours", label: "Opening hours", kind: "text" },
      { key: "googleMapsUrl", label: "Google Maps link", kind: "url" },
      { key: "heading", label: "Contact page heading", kind: "text" },
      { key: "highlight", label: "Contact page highlighted heading", kind: "text" },
      { key: "description", label: "Contact page introduction", kind: "textarea", rows: 3 },
      { key: "footerText", label: "Footer text", kind: "textarea", rows: 3 },
      { key: "admissionContact", label: "Admission contact note", kind: "text" },
    ],
  },
  social: {
    label: "Social Media", eyebrow: "Social media", previewHref: "/",
    description: "Use official full HTTPS profile links only. Blank Facebook and YouTube fields stay hidden on the public site.",
    fields: [
      { key: "instagramUrl", label: "Instagram link", kind: "url" },
      { key: "facebookUrl", label: "Facebook link", kind: "url" },
      { key: "youtubeUrl", label: "YouTube link", kind: "url" },
      { key: "heading", label: "Instagram section heading", kind: "text" },
      { key: "description", label: "Instagram section description", kind: "textarea", rows: 3 },
    ],
  },
  seo: {
    label: "SEO Settings", eyebrow: "Search & sharing", previewHref: "/",
    description: "Use clear school wording for search results and social sharing. These values safely fall back to the approved defaults when blank.",
    fields: [
      { key: "siteTitle", label: "Site title", kind: "text" },
      { key: "metaDescription", label: "Meta description", kind: "textarea", rows: 3 },
      { key: "keywords", label: "Keywords", kind: "text", help: "Separate phrases with commas." },
      { key: "ogTitle", label: "Social sharing title", kind: "text" },
      { key: "ogDescription", label: "Social sharing description", kind: "textarea", rows: 3 },
      { key: "ogImageUrl", label: "Social sharing image URL", kind: "url" },
      { key: "canonicalUrl", label: "Canonical website URL", kind: "url" },
      { key: "localSeo", label: "Local SEO information", kind: "textarea", rows: 3 },
      { key: "globalSeo", label: "Global SEO information", kind: "textarea", rows: 3 },
    ],
  },
  site: {
    label: "Site Settings", eyebrow: "Site settings", previewHref: "/",
    description: "Small site-wide details that are safe to update without changing code or the approved visual system.",
    fields: [
      { key: "footerText", label: "Footer text", kind: "textarea", rows: 3 },
      { key: "admissionContact", label: "Admission contact note", kind: "text" },
    ],
  },
};
