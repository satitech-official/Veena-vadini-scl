"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, LoaderCircle, MessageCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";

import { buttonStyles } from "@/components/ui/button";
import { usePublicSchoolSettings } from "@/components/settings/public-school-settings-provider";
import { ContactEnquirySubmissionError, contactEnquiryRepository } from "@/lib/contact/contact-repository";
import { contactEnquirySchema, type ContactEnquiryFormValues } from "@/lib/contact/contact-schema";
import { usePrefersReducedMotion } from "@/lib/motion/use-prefers-reduced-motion";
import { getPublicWhatsAppEnquiryUrl } from "@/lib/settings/public-school-settings";
import { contactEnquiryTypes } from "@/types/contact";
import { cn } from "@/lib/utils/cn";

type SubmissionState = "idle" | "success" | "error" | "configuration";

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? <p className="mt-2 text-sm leading-5 text-brand-red" id={id} role="alert">{message}</p> : null;
}

export function ContactEnquiryForm() {
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
  } = useForm<ContactEnquiryFormValues>({
    defaultValues: {
      name: "",
      phone: "",
      whatsapp: "",
      email: "",
      enquiryType: "General Information",
      message: "",
      consent: false,
      website: "",
    },
    resolver: zodResolver(contactEnquirySchema),
  });
  const enquiryType = useWatch({ control, name: "enquiryType" });

  useEffect(() => {
    if (submissionState === "success") {
      successMessageRef.current?.focus();
    }
  }, [submissionState]);

  const submitEnquiry = async (values: ContactEnquiryFormValues) => {
    setSubmissionState("idle");
    try {
      await contactEnquiryRepository.submit(values);
      setSubmissionState("success");
    } catch (error) {
      setSubmissionState(error instanceof ContactEnquirySubmissionError && error.code === "configuration" ? "configuration" : "error");
    }
  };

  if (submissionState === "success") {
    return (
      <motion.div animate={{ opacity: 1, y: 0 }} aria-live="polite" className="contact-form-success border-y border-brand-indigo/16 py-12 text-center sm:py-16" initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }} ref={successMessageRef} role="status" tabIndex={-1} transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.42, ease: [0.22, 1, 0.36, 1] }}>
        <CheckCircle2 aria-hidden="true" className="mx-auto text-gold-ink" size={36} strokeWidth={1.5} />
        <p className="mt-6 type-eyebrow text-brand-red">Message received</p>
        <h3 className="mt-4 font-display text-[clamp(2.3rem,4vw,4.2rem)] leading-[0.88] tracking-[-0.06em] text-primary">Your message has been received.</h3>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted">Thank you. The school team can now review your message and respond using the details you shared.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a className={cn(buttonStyles({ size: "lg" }), "group")} href={getPublicWhatsAppEnquiryUrl(settings, "Hello Veena Vadini Public School, I would like to know more about the school.")} rel="noreferrer" target="_blank">
            <MessageCircle aria-hidden="true" size={17} />
            Continue on WhatsApp
          </a>
          <button className={cn(buttonStyles({ size: "lg", variant: "secondary" }))} onClick={() => { reset(); setSubmissionState("idle"); }} type="button">
            <RefreshCw aria-hidden="true" size={16} />
            Start another enquiry
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form className="contact-enquiry-form" noValidate onSubmit={handleSubmit(submitEnquiry)}>
      <label aria-hidden="true" className="sr-only" htmlFor="contact-website">
        Website
        <input autoComplete="off" id="contact-website" tabIndex={-1} {...register("website")} />
      </label>
      <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
        <label className="contact-field">
          <span>Name <em>*</em></span>
          <input aria-describedby={errors.name ? "contact-name-error" : undefined} aria-invalid={Boolean(errors.name)} aria-required="true" autoComplete="name" {...register("name")} />
          <FieldError id="contact-name-error" message={errors.name?.message} />
        </label>
        <label className="contact-field">
          <span>Phone Number <em>*</em></span>
          <input aria-describedby={errors.phone ? "contact-phone-error" : undefined} aria-invalid={Boolean(errors.phone)} aria-required="true" autoComplete="tel" inputMode="tel" type="tel" {...register("phone")} />
          <FieldError id="contact-phone-error" message={errors.phone?.message} />
        </label>
        <label className="contact-field">
          <span>WhatsApp Number <small>Optional</small></span>
          <input aria-describedby={errors.whatsapp ? "contact-whatsapp-error" : undefined} aria-invalid={Boolean(errors.whatsapp)} autoComplete="tel" inputMode="tel" type="tel" {...register("whatsapp")} />
          <FieldError id="contact-whatsapp-error" message={errors.whatsapp?.message} />
        </label>
        <label className="contact-field">
          <span>Email Address <small>Optional</small></span>
          <input aria-describedby={errors.email ? "contact-email-error" : undefined} aria-invalid={Boolean(errors.email)} autoComplete="email" type="email" {...register("email")} />
          <FieldError id="contact-email-error" message={errors.email?.message} />
        </label>
        <label className="contact-field sm:col-span-2">
          <span>Enquiry Type <em>*</em></span>
          <select aria-describedby={errors.enquiryType ? "contact-enquiry-type-error" : undefined} aria-invalid={Boolean(errors.enquiryType)} aria-required="true" {...register("enquiryType")}>
            {contactEnquiryTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
          <FieldError id="contact-enquiry-type-error" message={errors.enquiryType?.message} />
        </label>
        {enquiryType === "Admission Enquiry" ? (
          <div className="contact-admission-prompt sm:col-span-2">
            <p className="type-eyebrow text-brand-red">Dedicated admission route</p>
            <p className="mt-2 text-sm leading-6 text-muted">For a full admission enquiry, the dedicated form gathers the right school-stage details without duplicating them here.</p>
            <Link className="mt-3 inline-flex text-sm font-semibold text-primary underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-brand-red" href="/admissions#admission-enquiry">Open the admission enquiry form</Link>
          </div>
        ) : null}
        <label className="contact-field sm:col-span-2">
          <span>Message <em>*</em></span>
          <textarea aria-describedby={errors.message ? "contact-message-error" : undefined} aria-invalid={Boolean(errors.message)} aria-required="true" rows={5} {...register("message")} />
          <FieldError id="contact-message-error" message={errors.message?.message} />
        </label>
      </div>

      <div className="mt-8 border-t border-brand-indigo/12 pt-7">
        <label className="contact-checkbox">
          <input aria-describedby={errors.consent ? "contact-consent-error" : undefined} aria-invalid={Boolean(errors.consent)} aria-required="true" type="checkbox" {...register("consent")} />
          <span>{settings.contact.privacyConsentText}</span>
        </label>
        <p className="mt-3 pl-7 text-xs leading-5 text-muted">Final privacy wording remains configurable before the production contact system is connected.</p>
        <FieldError id="contact-consent-error" message={errors.consent?.message} />
      </div>

      {submissionState === "error" || submissionState === "configuration" ? <motion.p animate={{ opacity: 1, y: 0 }} aria-live="assertive" className="mt-6 border-l-2 border-brand-red bg-brand-red/5 px-4 py-3 text-sm leading-6 text-primary" initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }} transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.24, ease: [0.22, 1, 0.36, 1] }}>{submissionState === "configuration" ? "Online messages are not configured yet. Please contact the school directly by phone or WhatsApp." : "We could not submit this message right now. Please try again or contact the school directly."}</motion.p> : null}

      <div className="mt-8 flex flex-wrap items-center gap-5">
        <button className={cn(buttonStyles({ size: "lg" }), "group min-w-52")} disabled={isSubmitting} type="submit">
          {isSubmitting ? <LoaderCircle aria-hidden="true" className="animate-spin" size={17} /> : null}
          {isSubmitting ? "Sending message…" : "Send Enquiry"}
        </button>
        <p className="max-w-sm text-xs leading-5 text-muted">Your details are sent only after server-side validation. If online enquiries are unavailable, the form will tell you clearly.</p>
      </div>
    </form>
  );
}
