/**
 * The single source of truth for verified public school information.
 * Keep unavailable information as null rather than guessing.
 */
export const schoolConfig = {
  name: "Veena Vadini Public School",
  tagline: "Empowering Young Minds for a Brighter Tomorrow.",
  motto: "Dream. Believe. Achieve.",
  board: "CBSE Pattern",
  medium: "Hindi & English",
  classes: "Nursery to Class 8",
  address: {
    lines: ["Chhuri Road", "Padhar", "District Betul", "Madhya Pradesh"],
    formatted: "Chhuri Road, Padhar, District Betul, Madhya Pradesh",
  },
  contact: {
    primaryPhone: {
      display: "+91 95758 51407",
      href: "tel:+919575851407",
    },
    secondaryPhone: {
      display: "+91 88150 91010",
      href: "tel:+918815091010",
    },
    whatsapp: {
      display: "+91 95758 51407",
      digits: "919575851407",
      href: "https://wa.me/919575851407",
    },
    officeHours: "8:00 AM – 4:00 PM",
    email: null,
    privacyConsentText:
      "I agree that the information provided may be used to respond to my enquiry.",
  },
  social: {
    instagram: {
      href: "https://www.instagram.com/veena_vadini_public_school",
      handle: "@veena_vadini_public_school",
    },
    facebook: null,
  },
  location: {
    googleMapsUrl: null,
    googleMapsEmbedUrl: null,
  },
  developerCredit: null,
  brand: {
    temporaryLogoPath: "/brand/veena-vadini-logo-reference.jpeg",
    temporaryLogoNote:
      "Temporary photographed reference only. Replace with a clean approved PNG or SVG when supplied.",
  },
} as const;

export type SchoolConfig = typeof schoolConfig;

export function getWhatsAppEnquiryUrl(message: string): string {
  return `${schoolConfig.contact.whatsapp.href}?text=${encodeURIComponent(message)}`;
}

export const defaultContactWhatsAppMessage =
  "Hello Veena Vadini Public School, I would like to know more about the school.";

export function getContactWhatsAppUrl(): string {
  return getWhatsAppEnquiryUrl(defaultContactWhatsAppMessage);
}
