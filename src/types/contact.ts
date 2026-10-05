export const contactEnquiryTypes = [
  "General Information",
  "Admission Enquiry",
  "Campus Visit",
  "Other",
] as const;

export type ContactEnquiryType = (typeof contactEnquiryTypes)[number];

export type ContactEnquiryInput = {
  name: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  enquiryType: ContactEnquiryType;
  message: string;
  source: "website-contact";
};

export type ContactEnquiryStatus = "New" | "Contacted" | "Closed";

export type ContactEnquiryRecord = ContactEnquiryInput & {
  id: string;
  createdAt: string;
  status: ContactEnquiryStatus;
};
