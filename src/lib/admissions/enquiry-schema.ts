import { z } from "zod";

import { admissionClasses } from "@/config/admissions";

const indianMobileNumber = (value: string) => {
  const normalized = value.replace(/[\s-]/g, "");
  return /^(?:\+?91)?[6-9]\d{9}$/.test(normalized);
};

const optionalEmail = z
  .string()
  .trim()
  .refine((value) => value === "" || z.email().safeParse(value).success, "Enter a valid email address.");

export const admissionEnquirySchema = z.object({
  parentName: z.string().trim().min(2, "Enter the parent or guardian name.").max(120, "Use no more than 120 characters."),
  studentName: z.string().trim().min(2, "Enter the student name.").max(120, "Use no more than 120 characters."),
  dateOfBirth: z.string().min(1, "Select the student date of birth.").refine((value) => !Number.isNaN(Date.parse(value)) && new Date(value) <= new Date(), "Enter a valid date of birth."),
  applyingForClass: z.enum(admissionClasses, { error: "Select a class." }),
  currentSchool: z.string().trim().max(160, "Use no more than 160 characters."),
  mobile: z
    .string()
    .trim()
    .refine(indianMobileNumber, "Enter a valid Indian mobile number."),
  useMobileForWhatsapp: z.boolean(),
  whatsapp: z.string().trim(),
  email: optionalEmail,
  address: z.string().trim().min(8, "Enter an address so the school can respond appropriately.").max(600, "Use no more than 600 characters."),
  preferredCommunication: z.enum(["Phone", "WhatsApp", "Email"], { error: "Choose a preferred communication method." }),
  message: z.string().trim().max(2000, "Use no more than 2,000 characters."),
  consent: z.boolean().refine((value) => value, "Consent is required to submit an enquiry."),
  website: z.string().max(0).optional(),
}).superRefine((values, context) => {
  if (!values.useMobileForWhatsapp && values.whatsapp && !indianMobileNumber(values.whatsapp)) {
    context.addIssue({
      code: "custom",
      message: "Enter a valid Indian WhatsApp number.",
      path: ["whatsapp"],
    });
  }
});

export type AdmissionEnquiryFormValues = z.infer<typeof admissionEnquirySchema>;
