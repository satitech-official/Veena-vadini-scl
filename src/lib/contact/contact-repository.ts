import type { ContactEnquiryFormValues } from "@/lib/contact/contact-schema";

export type ContactEnquirySubmissionResult = {
  mode: "supabase";
  submittedAt: string;
};

export interface ContactEnquiryRepository {
  submit(input: ContactEnquiryFormValues): Promise<ContactEnquirySubmissionResult>;
}

export class ContactEnquirySubmissionError extends Error {
  constructor(readonly code: "configuration" | "submission" | "validation") {
    super(code === "configuration" ? "The online contact service is not configured." : "The contact enquiry could not be submitted.");
  }
}

export const contactEnquiryRepository: ContactEnquiryRepository = {
  async submit(input) {
    const response = await fetch("/api/enquiries/contact", {
      body: JSON.stringify(input),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    const result = await response.json().catch(() => null) as { code?: "configuration" | "submission" | "validation"; submittedAt?: string } | null;

    if (!response.ok || !result?.submittedAt) {
      throw new ContactEnquirySubmissionError(result?.code ?? "submission");
    }

    return { mode: "supabase", submittedAt: result.submittedAt };
  },
};
