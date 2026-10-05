"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";

import { AdmissionJourney } from "@/components/admissions/admission-journey";
import { usePublicSchoolSettings } from "@/components/settings/public-school-settings-provider";
import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { admissionOverview } from "@/config/admissions";
import { admissionRoute } from "@/config/navigation";
import { getPublicWhatsAppEnquiryUrl } from "@/lib/settings/public-school-settings";
import { cn } from "@/lib/utils/cn";

export function AdmissionsChapter() {
  const settings = usePublicSchoolSettings();
  const whatsappHref = getPublicWhatsAppEnquiryUrl(settings, "Hello Veena Vadini Public School, I would like to know more about admissions.");

  return (
    <section className="admissions-chapter relative overflow-hidden bg-primary py-20 text-white sm:py-28 lg:py-36" id="admissions">
      <div aria-hidden="true" className="admissions-chapter-mark">VV</div>
      <div aria-hidden="true" className="admissions-chapter-rule" />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.65fr)] lg:items-end lg:gap-20">
          <div>
            <p className="type-eyebrow text-gold">Admissions</p>
            <h2 className="mt-5 max-w-4xl font-display text-[clamp(3.4rem,6.6vw,7.5rem)] leading-[0.8] tracking-[-0.075em] text-white">
              Give Your Child a
              <br />
              <span className="text-gold">Strong Beginning.</span>
            </h2>
            <p className="mt-8 max-w-xl text-[1.05rem] leading-8 text-white/72 sm:text-[1.12rem]">
              Explore admission opportunities at Veena Vadini Public School for a considered start to your child’s learning journey.
            </p>
          </div>
          <div className="admissions-chapter-index border-y border-white/16">
            {admissionOverview.map((item) => (
              <div className="grid grid-cols-[2.8rem_minmax(0,1fr)] gap-3 border-b border-white/16 py-4 last:border-b-0" key={item.number}>
                <span className="font-display text-xl tracking-[-0.06em] text-gold">{item.number}</span>
                <div>
                  <p className="type-eyebrow text-white/48">{item.label}</p>
                  <p className="mt-1 text-sm font-semibold text-white">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-3 sm:mt-16">
          <Link className={cn(buttonStyles({ size: "lg" }), "group border-gold bg-gold text-primary hover:border-white hover:bg-white")} href={admissionRoute}>
            Apply for Admission
            <ArrowRight aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" size={17} />
          </Link>
          <a className={cn(buttonStyles({ size: "lg", variant: "secondary" }), "border-white/25 bg-transparent text-white hover:border-gold hover:bg-transparent hover:text-gold")} href={whatsappHref} rel="noreferrer" target="_blank">
            <MessageCircle aria-hidden="true" size={17} />
            WhatsApp Admission Team
          </a>
          <a className="inline-flex min-h-14 items-center gap-2 px-2 text-sm font-semibold text-white/75 transition-colors hover:text-gold" href={settings.contact.primaryPhone.href}>
            <Phone aria-hidden="true" size={16} />
            Call School
          </a>
        </div>

        <div className="mt-16 border-t border-white/16 pt-10 sm:mt-20 sm:pt-12">
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
            <p className="type-eyebrow text-gold">Your admission journey</p>
            <p className="text-sm text-white/55">A simple, school-guided progression.</p>
          </div>
          <AdmissionJourney />
        </div>
      </Container>
    </section>
  );
}
