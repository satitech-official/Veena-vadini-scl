"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, LoaderCircle, MessageCircle, RefreshCw } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";

import { admissionClasses } from "@/config/admissions";
import { buttonStyles } from "@/components/ui/button";
import { usePublicSchoolSettings } from "@/components/settings/public-school-settings-provider";
import { AdmissionEnquirySubmissionError, admissionEnquiryRepository } from "@/lib/admissions/enquiry-repository";
import { admissionEnquirySchema, type AdmissionEnquiryFormValues } from "@/lib/admissions/enquiry-schema";
import { usePrefersReducedMotion } from "@/lib/motion/use-prefers-reduced-motion";
import { getPublicWhatsAppEnquiryUrl } from "@/lib/settings/public-school-settings";
import { cn } from "@/lib/utils/cn";

type SubmissionState = "idle" | "success" | "error" | "configuration";

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? <p className="mt-2 text-sm leading-5 text-brand-red" id={id} role="alert">{message}</p> : null;
}

export function AdmissionsEnquiryForm() {
  const settings = usePublicSchoolSettings();
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const prefersReducedMotion = usePrefersReducedMotion();
  const successMessageRef = useRef<HTMLDivElement>(null);
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<AdmissionEnquiryFormValues>({
    defaultValues: {
      parentName: "",
      studentName: "",
      dateOfBirth: "",
      applyingForClass: undefined,
      currentSchool: "",
      mobile: "",
      useMobileForWhatsapp: true,
      whatsapp: "",
      email: "",
      address: "",
      preferredCommunication: "Phone",
      message: "",
      consent: false,
      website: "",
    },
    resolver: zodResolver(admissionEnquirySchema),
  });
  const useMobileForWhatsapp = useWatch({ control, name: "useMobileForWhatsapp" });
  const applyingForClass = useWatch({ control, name: "applyingForClass" });

  useEffect(() => {
    if (submissionState === "success") {
      successMessageRef.current?.focus();
    }
  }, [submissionState]);

  const submitEnquiry = async (values: AdmissionEnquiryFormValues) => {
    setSubmissionState("idle");

    try {
      await admissionEnquiryRepository.submit(values);
      setSubmissionState("success");
    } catch (error) {
      setSubmissionState(error instanceof AdmissionEnquirySubmissionError && error.code === "configuration" ? "configuration" : "error");
    }
  };

  if (submissionState === "success") {
    return (
      <motion.div animate={{ opacity: 1, y: 0 }} aria-live="polite" className="admission-form-success border-y border-brand-indigo/16 py-12 text-center sm:py-16" initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }} ref={successMessageRef} role="status" tabIndex={-1} transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.42, ease: [0.22, 1, 0.36, 1] }}>
        <CheckCircle2 aria-hidden="true" className="mx-auto text-gold-ink" size={36} strokeWidth={1.5} />
        <p className="mt-6 type-eyebrow text-brand-red">Enquiry received</p>
        <h3 className="mt-4 font-display text-[clamp(2.3rem,4vw,4.2rem)] leading-[0.88] tracking-[-0.06em] text-primary">
          Your admission enquiry has been received.
        </h3>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted">
          Thank you. The school team can now review the details you shared and respond using your preferred contact method.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a className={cn(buttonStyles({ size: "lg" }), "group")} href={getPublicWhatsAppEnquiryUrl(settings, `Hello Veena Vadini Public School, I would like to know more about admissions${applyingForClass ? ` for ${applyingForClass}` : ""}.`)} rel="noreferrer" target="_blank">
            <MessageCircle aria-hidden="true" size={17} />
            WhatsApp Admission Team
          </a>
          <button
            className={cn(buttonStyles({ size: "lg", variant: "secondary" }))}
            onClick={() => {
              reset();
              setSubmissionState("idle");
            }}
            type="button"
          >
            <RefreshCw aria-hidden="true" size={16} />
            Start another enquiry
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form className="admissions-enquiry-form" noValidate onSubmit={handleSubmit(submitEnquiry)}>
      <label aria-hidden="true" className="sr-only" htmlFor="admission-website">
        Website
        <input autoComplete="off" id="admission-website" tabIndex={-1} {...register("website")} />
      </label>
      <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
        <label className="admission-field">
          <span>Parent / Guardian Name <em>*</em></span>
          <input aria-describedby={errors.parentName ? "admission-parent-name-error" : undefined} aria-invalid={Boolean(errors.parentName)} aria-required="true" autoComplete="name" {...register("parentName")} />
          <FieldError id="admission-parent-name-error" message={errors.parentName?.message} />
        </label>
        <label className="admission-field">
          <span>Student Name <em>*</em></span>
          <input aria-describedby={errors.studentName ? "admission-student-name-error" : undefined} aria-invalid={Boolean(errors.studentName)} aria-required="true" {...register("studentName")} />
          <FieldError id="admission-student-name-error" message={errors.studentName?.message} />
        </label>
        <label className="admission-field">
          <span>Student Date of Birth <em>*</em></span>
          <input aria-describedby={errors.dateOfBirth ? "admission-date-of-birth-error" : undefined} aria-invalid={Boolean(errors.dateOfBirth)} aria-required="true" max={new Date().toISOString().split("T")[0]} type="date" {...register("dateOfBirth")} />
          <FieldError id="admission-date-of-birth-error" message={errors.dateOfBirth?.message} />
        </label>
        <label className="admission-field">
          <span>Applying For Class <em>*</em></span>
          <select aria-describedby={errors.applyingForClass ? "admission-class-error" : undefined} aria-invalid={Boolean(errors.applyingForClass)} aria-required="true" {...register("applyingForClass")}>
            <option value="">Select a class</option>
            {admissionClasses.map((admissionClass) => <option key={admissionClass} value={admissionClass}>{admissionClass}</option>)}
          </select>
          <FieldError id="admission-class-error" message={errors.applyingForClass?.message} />
        </label>
        <label className="admission-field">
          <span>Current School <small>Optional</small></span>
          <input {...register("currentSchool")} />
        </label>
        <label className="admission-field">
          <span>Parent Mobile Number <em>*</em></span>
          <input aria-describedby={errors.mobile ? "admission-mobile-error" : undefined} aria-invalid={Boolean(errors.mobile)} aria-required="true" autoComplete="tel" inputMode="tel" type="tel" {...register("mobile")} />
          <FieldError id="admission-mobile-error" message={errors.mobile?.message} />
        </label>
      </div>

      <div className="mt-7 border-y border-brand-indigo/12 py-6">
        <label className="admission-checkbox">
          <input type="checkbox" {...register("useMobileForWhatsapp")} />
          <span>Use the same number for WhatsApp.</span>
        </label>
        {!useMobileForWhatsapp ? (
          <label className="admission-field mt-6 block max-w-md">
            <span>WhatsApp Number <small>Optional</small></span>
            <input aria-describedby={errors.whatsapp ? "admission-whatsapp-error" : undefined} aria-invalid={Boolean(errors.whatsapp)} autoComplete="tel" inputMode="tel" type="tel" {...register("whatsapp")} />
            <FieldError id="admission-whatsapp-error" message={errors.whatsapp?.message} />
          </label>
        ) : null}
      </div>

      <div className="mt-7 grid gap-x-6 gap-y-7 sm:grid-cols-2">
        <label className="admission-field">
          <span>Email Address <small>Optional</small></span>
          <input aria-describedby={errors.email ? "admission-email-error" : undefined} aria-invalid={Boolean(errors.email)} autoComplete="email" type="email" {...register("email")} />
          <FieldError id="admission-email-error" message={errors.email?.message} />
        </label>
        <fieldset aria-describedby={errors.preferredCommunication ? "admission-preferred-communication-error" : undefined} aria-invalid={Boolean(errors.preferredCommunication)} aria-required="true" className="admission-field">
          <legend>Preferred Communication Method <em>*</em></legend>
          <div className="admission-radio-group mt-3" role="radiogroup">
            {(["Phone", "WhatsApp", "Email"] as const).map((method) => (
              <label key={method}>
                <input type="radio" value={method} {...register("preferredCommunication")} />
                <span>{method}</span>
              </label>
            ))}
          </div>
          <FieldError id="admission-preferred-communication-error" message={errors.preferredCommunication?.message} />
        </fieldset>
        <label className="admission-field sm:col-span-2">
          <span>Address <em>*</em></span>
          <textarea aria-describedby={errors.address ? "admission-address-error" : undefined} aria-invalid={Boolean(errors.address)} aria-required="true" autoComplete="street-address" rows={3} {...register("address")} />
          <FieldError id="admission-address-error" message={errors.address?.message} />
        </label>
        <label className="admission-field sm:col-span-2">
          <span>Message / Additional Information <small>Optional</small></span>
          <textarea rows={4} {...register("message")} />
        </label>
      </div>

      <div className="mt-8 border-t border-brand-indigo/12 pt-7">
        <label className="admission-checkbox">
          <input aria-describedby={errors.consent ? "admission-consent-error" : undefined} aria-invalid={Boolean(errors.consent)} aria-required="true" type="checkbox" {...register("consent")} />
          <span>I agree that the information provided may be used to respond to my admission enquiry.</span>
        </label>
        <p className="mt-3 pl-7 text-xs leading-5 text-muted">Final privacy wording remains configurable before the production enquiry system is connected.</p>
        <FieldError id="admission-consent-error" message={errors.consent?.message} />
      </div>

      {submissionState === "error" || submissionState === "configuration" ? (
        <motion.p animate={{ opacity: 1, y: 0 }} aria-live="assertive" className="mt-6 border-l-2 border-brand-red bg-brand-red/5 px-4 py-3 text-sm leading-6 text-primary" initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }} transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.24, ease: [0.22, 1, 0.36, 1] }}>
          {submissionState === "configuration" ? "Online admission enquiries are not configured yet. Please contact the school directly by phone or WhatsApp." : "We could not submit this enquiry right now. Please try again or contact the school directly."}
        </motion.p>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center gap-5">
        <button className={cn(buttonStyles({ size: "lg" }), "group min-w-52")} disabled={isSubmitting} type="submit">
          {isSubmitting ? <LoaderCircle aria-hidden="true" className="animate-spin" size={17} /> : null}
          {isSubmitting ? "Sending enquiry…" : "Send Admission Enquiry"}
        </button>
        <p className="max-w-sm text-xs leading-5 text-muted">Your details are sent only after server-side validation. If online enquiries are unavailable, the form will tell you clearly.</p>
      </div>
    </form>
  );
}
