import { getWhatsAppEnquiryUrl, schoolConfig } from "@/config/school";

export const admissionClasses = [
  "Nursery",
  "LKG",
  "UKG",
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
] as const;

export type AdmissionClass = (typeof admissionClasses)[number];

export const admissionClassGroups = [
  { number: "01", title: "Early Years", classes: ["Nursery", "LKG", "UKG"] },
  { number: "02", title: "Primary", classes: ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"] },
  { number: "03", title: "Middle School", classes: ["Class 6", "Class 7", "Class 8"] },
] as const;

export const admissionOverview = [
  { number: "01", label: "Admissions", value: schoolConfig.classes },
  { number: "02", label: "Academic pattern", value: schoolConfig.board },
  { number: "03", label: "Medium", value: `${schoolConfig.medium} Medium` },
  { number: "04", label: "Location", value: "Padhar, Betul" },
] as const;

export const admissionProcess = [
  { number: "01", title: "Enquiry", description: "Share your interest and the class you are exploring." },
  { number: "02", title: "Campus Visit", description: "Arrange a conversation and see the school environment." },
  { number: "03", title: "Application", description: "Complete the admission application when guided by the school." },
  { number: "04", title: "Interaction", description: "Continue the admission conversation with the school team." },
  { number: "05", title: "Admission Confirmation", description: "Receive the next steps directly from the school." },
] as const;

export const admissionFaqs = [
  {
    question: "Which classes are available?",
    answer: "Admissions enquiries are welcome for Nursery through Class 8.",
  },
  {
    question: "What is the medium of instruction?",
    answer: "The school offers Hindi & English Medium.",
  },
  {
    question: "What academic pattern does the school follow?",
    answer: "The school follows the CBSE Pattern.",
  },
  {
    question: "How can I enquire about admission?",
    answer: "You can start an enquiry using the form on this page, message the admission team on WhatsApp, or call the school.",
  },
  {
    question: "Where is the school located?",
    answer: "Veena Vadini Public School is located in Padhar, District Betul, Madhya Pradesh.",
  },
  {
    question: "How can I contact the school?",
    answer: `Call ${schoolConfig.contact.primaryPhone.display} or ${schoolConfig.contact.secondaryPhone.display}, or contact the school on WhatsApp at ${schoolConfig.contact.whatsapp.display}.`,
  },
] as const;

export const defaultAdmissionWhatsAppMessage =
  "Hello Veena Vadini Public School, I would like to enquire about admission for my child.";

export function getAdmissionWhatsAppUrl(applyingForClass?: AdmissionClass | string): string {
  const message = applyingForClass
    ? `Hello Veena Vadini Public School, I would like to enquire about admission for my child in ${applyingForClass}.`
    : defaultAdmissionWhatsAppMessage;

  return getWhatsAppEnquiryUrl(message);
}
