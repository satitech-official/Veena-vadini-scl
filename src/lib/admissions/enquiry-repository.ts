import type { AdmissionEnquiryFormValues } from "@/lib/admissions/enquiry-schema";

export type AdmissionEnquirySubmissionResult = {
  mode: "supabase";
  submittedAt: string;
};

export interface AdmissionEnquiryRepository {
  submit(input: AdmissionEnquiryFormValues): Promise<AdmissionEnquirySubmissionResult>;
}

export class AdmissionEnquirySubmissionError extends Error {
  constructor(readonly code: "configuration" | "submission" | "validation") {
    super(code === "configuration" ? "The online admission enquiry service is not configured." : "The admission enquiry could not be submitted.");
  }
}

export const admissionEnquiryRepository: AdmissionEnquiryRepository = {
  async submit(input) {
    const response = await fetch("/api/enquiries/admission", {
      body: JSON.stringify(input),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    const result = await response.json().catch(() => null) as { code?: "configuration" | "submission" | "validation"; submittedAt?: string } | null;

    if (!response.ok || !result?.submittedAt) {
      throw new AdmissionEnquirySubmissionError(result?.code ?? "submission");
    }

    return { mode: "supabase", submittedAt: result.submittedAt };
  },
};
