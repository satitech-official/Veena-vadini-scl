import { schoolConfig } from "@/config/school";
import type { PublicSchoolSettings, SchoolSettingsRecord } from "@/types/settings";
import { readCmsContent } from "@/lib/settings/cms-content";

function nonEmpty(value: string | null | undefined, fallback: string) {
  return value?.trim() || fallback;
}

function safeHttpsUrl(value: string | null | undefined, fallback: string | null) {
  if (!value?.trim()) return fallback;

  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : fallback;
  } catch {
    return fallback;
  }
}

function phoneValue(value: string | null | undefined, fallback: { display: string; href: string }) {
  const display = nonEmpty(value, fallback.display);
  const digits = display.replace(/\D/g, "");

  return digits.length >= 7 && digits.length <= 15
    ? { display, href: `tel:+${digits}` }
    : fallback;
}

function whatsappValue(value: string | null | undefined) {
  const fallback = schoolConfig.contact.whatsapp;
  const display = nonEmpty(value, fallback.display);
  const digits = display.replace(/\D/g, "");

  return digits.length >= 7 && digits.length <= 15
    ? { display, digits, href: `https://wa.me/${digits}` }
    : { display: fallback.display, digits: fallback.digits, href: fallback.href };
}

function addressValue(value: string | null | undefined) {
  if (!value?.trim()) return { lines: [...schoolConfig.address.lines], formatted: schoolConfig.address.formatted };

  const lines = value
    .split(/\r?\n|,/)
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.length
    ? { lines, formatted: lines.join(", ") }
    : { lines: [...schoolConfig.address.lines], formatted: schoolConfig.address.formatted };
}

function instagramValue(value: string | null | undefined) {
  const href = safeHttpsUrl(value, schoolConfig.social.instagram.href) ?? schoolConfig.social.instagram.href;

  try {
    const handle = new URL(href).pathname.split("/").filter(Boolean).at(-1);
    return { href, handle: handle ? `@${handle}` : schoolConfig.social.instagram.handle };
  } catch {
    return schoolConfig.social.instagram;
  }
}

/**
 * The checked-in values are a resilient public fallback. A valid CMS row
 * replaces them field-by-field so an incomplete edit never breaks Call,
 * WhatsApp, map, or social actions across the public website.
 */
export function resolvePublicSchoolSettings(record: SchoolSettingsRecord | null): PublicSchoolSettings {
  const cmsContent = readCmsContent(record?.cmsContent);
  const contactContent = cmsContent.contact;
  const socialContent = cmsContent.social;

  return {
    name: nonEmpty(record?.schoolName, schoolConfig.name),
    tagline: nonEmpty(record?.tagline, schoolConfig.tagline),
    motto: nonEmpty(record?.motto, schoolConfig.motto),
    board: schoolConfig.board,
    medium: schoolConfig.medium,
    classes: schoolConfig.classes,
    address: addressValue(contactContent?.address || record?.address),
    contact: {
      primaryPhone: phoneValue(contactContent?.primaryPhone || record?.primaryPhone, schoolConfig.contact.primaryPhone),
      secondaryPhone: phoneValue(contactContent?.secondaryPhone || record?.secondaryPhone, schoolConfig.contact.secondaryPhone),
      whatsapp: whatsappValue(contactContent?.whatsapp || record?.whatsapp),
      officeHours: nonEmpty(contactContent?.officeHours || record?.officeHours, schoolConfig.contact.officeHours),
      email: contactContent?.email?.trim() || record?.email?.trim() || null,
      privacyConsentText: schoolConfig.contact.privacyConsentText,
    },
    social: {
      instagram: instagramValue(socialContent?.instagramUrl || record?.instagram),
      facebook: safeHttpsUrl(socialContent?.facebookUrl || record?.facebook, null),
    },
    location: {
      googleMapsUrl: safeHttpsUrl(contactContent?.googleMapsUrl || record?.googleMapsUrl, null),
      googleMapsEmbedUrl: safeHttpsUrl(record?.googleMapsEmbedUrl, null),
    },
    cmsContent,
    developerCredit: schoolConfig.developerCredit,
    brand: {
      temporaryLogoPath: schoolConfig.brand.temporaryLogoPath,
      temporaryLogoNote: schoolConfig.brand.temporaryLogoNote,
    },
  };
}

export const defaultPublicSchoolSettings = resolvePublicSchoolSettings(null);

export function getPublicWhatsAppEnquiryUrl(settings: PublicSchoolSettings, message: string) {
  return `${settings.contact.whatsapp.href}?text=${encodeURIComponent(message)}`;
}
