import { z } from "zod";

import { contactEnquiryTypes } from "@/types/contact";

const indianMobileNumber = (value: string) => {
  const normalized = value.replace(/[\s-]/g, "");
  return /^(?:\+?91)?[6-9]\d{9}$/.test(normalized);
};

const optionalEmail = z
  .string()
  .trim()
  .refine((value) => value === "" || z.email().safeParse(value).success, "Enter a valid email address.");

export const contactEnquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(120, "Use no more than 120 characters."),
  phone: z.string().trim().refine(indianMobileNumber, "Enter a valid Indian mobile number."),
  whatsapp: z.string().trim().refine((value) => value === "" || indianMobileNumber(value), "Enter a valid Indian WhatsApp number."),
  email: optionalEmail,
  enquiryType: z.enum(contactEnquiryTypes, { error: "Select an enquiry type." }),
  message: z.string().trim().min(10, "Share a little more so the school can respond appropriately.").max(2000, "Use no more than 2,000 characters."),
  consent: z.boolean().refine((value) => value, "Consent is required to submit an enquiry."),
  website: z.string().max(0).optional(),
});

export type ContactEnquiryFormValues = z.infer<typeof contactEnquirySchema>;
