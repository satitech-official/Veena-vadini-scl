import type { AdmissionClass } from "@/config/admissions";

export type PreferredCommunicationMethod = "Phone" | "WhatsApp" | "Email";

export type AdmissionEnquiryStatus =
  | "New"
  | "Contacted"
  | "Follow Up"
  | "Visit Scheduled"
  | "Admitted"
  | "Closed";

export type AdmissionEnquiryInput = {
  parentName: string;
  studentName: string;
  dateOfBirth: string;
  applyingForClass: AdmissionClass;
  currentSchool?: string;
  mobile: string;
  whatsapp?: string;
  email?: string;
  address: string;
  preferredCommunication: PreferredCommunicationMethod;
  message?: string;
  source: "website";
};

export type AdmissionEnquiryRecord = AdmissionEnquiryInput & {
  id: string;
  createdAt: string;
  status: AdmissionEnquiryStatus;
};
