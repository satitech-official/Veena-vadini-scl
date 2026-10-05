import Link from "next/link";
import { ArrowRight, MapPin, MessageCircle, Phone } from "lucide-react";

import { AdmissionJourney } from "@/components/admissions/admission-journey";
import { AdmissionsEnquiryForm } from "@/components/admissions/admissions-enquiry-form";
import { AdmissionsFaq } from "@/components/admissions/admissions-faq";
import { SchoolMediaPlaceholder } from "@/components/home/school-media-placeholder";
import { InternalSiteHeader } from "@/components/layout/internal-site-header";
import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { admissionClassGroups, admissionOverview, getAdmissionWhatsAppUrl } from "@/config/admissions";
import { schoolConfig } from "@/config/school";
import { aboutHighlights, placeholderMedia } from "@/content/homepage";
import { cn } from "@/lib/utils/cn";

export function AdmissionsPage() {
  return (
    <>
      <InternalSiteHeader />
      <main className="flex-1">
        <section className="admissions-page-hero relative overflow-hidden bg-primary pb-20 pt-36 text-white sm:pb-28 sm:pt-44 lg:pb-36 lg:pt-52">
          <div aria-hidden="true" className="admissions-page-hero-mark">AD</div>
          <div aria-hidden="true" className="admissions-page-hero-grid" />
          <Container className="relative">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.58fr)] lg:items-end lg:gap-20">
              <div>
                <p className="type-eyebrow text-gold">Admissions</p>
                <h1 className="mt-6 max-w-5xl font-display text-[clamp(3.5rem,7.1vw,8rem)] leading-[0.79] tracking-[-0.08em] text-white">
                  Begin Their Learning
                  <br />
                  <span className="text-gold">Journey With Us.</span>
                </h1>
                <p className="mt-8 max-w-xl text-[1.05rem] leading-8 text-white/72 sm:text-[1.16rem]">
                  Admissions enquiries are welcome for Nursery to Class 8.
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Link className={cn(buttonStyles({ size: "lg" }), "group border-gold bg-gold text-primary hover:border-white hover:bg-white")} href="#admission-enquiry">
                    Start an Enquiry
                    <ArrowRight aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" size={17} />
                  </Link>
                  <a className={cn(buttonStyles({ size: "lg", variant: "secondary" }), "border-white/25 bg-transparent text-white hover:border-gold hover:bg-transparent hover:text-gold")} href={getAdmissionWhatsAppUrl()} rel="noreferrer" target="_blank">
                    <MessageCircle aria-hidden="true" size={17} />
                    WhatsApp Us
                  </a>
                </div>
              </div>
              <div className="admissions-page-hero-index border-y border-white/18">
                {admissionOverview.slice(0, 3).map((item) => (
                  <div className="grid grid-cols-[2.8rem_minmax(0,1fr)] gap-3 border-b border-white/18 py-5 last:border-b-0" key={item.number}>
                    <span className="font-display text-xl tracking-[-0.06em] text-gold">{item.number}</span>
                    <div>
                      <p className="type-eyebrow text-white/48">{item.label}</p>
                      <p className="mt-1 text-sm font-semibold text-white">{item.value}</p>
                    </div>
                  </div>
                ))}
                <div className="flex items-start gap-3 py-5 text-sm leading-6 text-white/70">
                  <MapPin aria-hidden="true" className="mt-0.5 shrink-0 text-gold" size={16} />
                  Padhar, Betul
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-surface py-20 sm:py-28 lg:py-36">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[minmax(15rem,0.6fr)_minmax(0,1.4fr)] lg:gap-20">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p className="type-eyebrow text-brand-red">Admission overview</p>
                <h2 className="mt-5 font-display text-[clamp(3rem,5.5vw,6.1rem)] leading-[0.82] tracking-[-0.07em] text-primary">
                  A Considered
                  <br />
                  <span className="text-brand-red">First Step.</span>
                </h2>
                <p className="mt-7 max-w-sm text-base leading-7 text-muted">A clear way to begin a conversation with the school and explore the right next step for your child.</p>
              </div>
              <div className="admissions-overview-index border-t border-brand-indigo/15">
                {admissionOverview.map((item) => (
                  <div className="grid gap-4 border-b border-brand-indigo/15 py-7 sm:grid-cols-[4.5rem_minmax(10rem,0.62fr)_minmax(0,1fr)] sm:items-baseline sm:gap-8" key={item.number}>
                    <span className="font-display text-3xl tracking-[-0.07em] text-gold-ink">{item.number}</span>
                    <p className="type-eyebrow text-brand-red">{item.label}</p>
                    <p className="font-display text-[clamp(1.7rem,3vw,3.1rem)] leading-[0.92] tracking-[-0.055em] text-primary">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="relative overflow-hidden bg-background py-20 sm:py-28 lg:py-36">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(18rem,0.82fr)] lg:items-center lg:gap-20">
              <div className="relative order-2 lg:order-1">
                <SchoolMediaPlaceholder className="aspect-[5/4] min-h-[14rem] sm:min-h-[23rem] sm:aspect-[6/5]" index="01" media={placeholderMedia.campus} />
                <div className="admissions-media-note absolute -bottom-5 -right-2 hidden max-w-52 border border-brand-indigo/12 bg-surface px-5 py-4 shadow-[0_18px_45px_rgba(27,27,76,0.08)] sm:block">
                  <p className="type-eyebrow text-brand-red">A place to explore</p>
                  <p className="mt-2 text-sm leading-5 text-muted">Reserved for approved campus photography.</p>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <p className="type-eyebrow text-brand-red">Learning environment</p>
                <h2 className="mt-5 font-display text-[clamp(3rem,5.5vw,6.1rem)] leading-[0.82] tracking-[-0.07em] text-primary">
                  Explore the School
                  <br />
                  <span className="text-brand-red">Experience.</span>
                </h2>
                <p className="mt-7 max-w-xl text-base leading-7 text-muted">During an admission conversation, parents can explore the learning environment and the school experiences already shaping each day.</p>
                <ul className="mt-9 grid gap-x-7 gap-y-3 border-y border-brand-indigo/12 py-6 sm:grid-cols-2">
                  {aboutHighlights.map((item) => (
                    <li className="flex items-start gap-3 text-sm font-semibold leading-6 text-primary" key={item}>
                      <span aria-hidden="true" className="mt-2 size-1.5 rotate-45 bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-brand-red py-20 text-white sm:py-28 lg:py-36">
          <Container>
            <div className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.56fr)] lg:items-end">
              <div>
                <p className="type-eyebrow text-gold">Available classes</p>
                <h2 className="mt-5 font-display text-[clamp(3rem,5.7vw,6.35rem)] leading-[0.82] tracking-[-0.07em] text-white">
                  The Right Stage,
                  <br />
                  <span className="text-gold">Clearly Mapped.</span>
                </h2>
              </div>
              <p className="max-w-md text-base leading-7 text-white/72 lg:justify-self-end">Admissions enquiries are welcome from Nursery through Class 8.</p>
            </div>
            <ol className="admissions-class-index border-t border-white/20 lg:grid lg:grid-cols-3">
              {admissionClassGroups.map((group) => (
                <li className="border-b border-white/20 py-8 lg:border-r lg:border-b-0 lg:px-8 lg:py-2 lg:first:pl-0 lg:last:border-r-0" key={group.title}>
                  <span className="font-display text-3xl tracking-[-0.07em] text-gold">{group.number}</span>
                  <p className="mt-6 type-eyebrow text-gold">{group.title}</p>
                  <p className="mt-3 font-display text-[clamp(2rem,3.4vw,3.7rem)] leading-[0.9] tracking-[-0.055em] text-white">{group.classes.join(" / ")}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <section className="bg-surface py-20 sm:py-28 lg:py-36">
          <Container>
            <div className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.56fr)] lg:items-end">
              <div>
                <p className="type-eyebrow text-brand-red">Admission process</p>
                <h2 className="mt-5 font-display text-[clamp(3rem,5.7vw,6.35rem)] leading-[0.82] tracking-[-0.07em] text-primary">
                  One Clear
                  <br />
                  <span className="text-brand-red">Journey Forward.</span>
                </h2>
              </div>
              <p className="max-w-md text-base leading-7 text-muted lg:justify-self-end">The school can guide parents through each step once an enquiry begins.</p>
            </div>
            <AdmissionJourney tone="light" />
          </Container>
        </section>

        <section className="relative overflow-hidden bg-background py-20 sm:py-28 lg:py-36" id="admission-enquiry">
          <div aria-hidden="true" className="admission-form-ghost">ENQUIRE</div>
          <Container className="relative">
            <div className="grid gap-12 lg:grid-cols-[minmax(14rem,0.52fr)_minmax(0,1.48fr)] lg:gap-20">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p className="type-eyebrow text-brand-red">Admission enquiry</p>
                <h2 className="mt-5 font-display text-[clamp(2.45rem,3.5vw,3.7rem)] text-primary">
                  Let’s Begin the
                  <br />
                  <span className="text-brand-red">Conversation.</span>
                </h2>
                <p className="mt-7 max-w-sm text-base leading-7 text-muted">Share the essentials below. The form validates details locally until the school enquiry system is connected.</p>
              </div>
              <div className="border-t border-brand-indigo/16 pt-8 sm:pt-10">
                <AdmissionsEnquiryForm />
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-surface py-20 sm:py-28 lg:py-36">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[minmax(15rem,0.55fr)_minmax(0,1.45fr)] lg:gap-20">
              <div>
                <p className="type-eyebrow text-brand-red">Admission questions</p>
                <h2 className="mt-5 font-display text-[clamp(3rem,5.5vw,6.1rem)] leading-[0.82] tracking-[-0.07em] text-primary">
                  Helpful Answers,
                  <br />
                  <span className="text-brand-red">Simply Shared.</span>
                </h2>
              </div>
              <AdmissionsFaq />
            </div>
          </Container>
        </section>

        <section className="admissions-contact-section relative overflow-hidden bg-primary py-16 text-white sm:py-20 lg:py-24">
          <Container className="relative">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
              <div>
                <p className="type-eyebrow text-gold">Speak with the school</p>
                <h2 className="mt-4 font-display text-[clamp(2.7rem,4.8vw,5.2rem)] leading-[0.84] tracking-[-0.065em] text-white">
                  A Warm Conversation
                  <br />
                  <span className="text-gold">Starts Here.</span>
                </h2>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <a className={cn(buttonStyles({ size: "lg" }), "border-gold bg-gold text-primary hover:border-white hover:bg-white")} href={getAdmissionWhatsAppUrl()} rel="noreferrer" target="_blank">
                  <MessageCircle aria-hidden="true" size={17} />
                  WhatsApp Admission Team
                </a>
                <a className={cn(buttonStyles({ size: "lg", variant: "secondary" }), "border-white/25 bg-transparent text-white hover:border-gold hover:bg-transparent hover:text-gold")} href={schoolConfig.contact.primaryPhone.href}>
                  <Phone aria-hidden="true" size={17} />
                  Call {schoolConfig.contact.primaryPhone.display}
                </a>
                <a className="inline-flex min-h-14 items-center text-sm font-semibold text-white/72 transition-colors hover:text-gold" href={schoolConfig.contact.secondaryPhone.href}>
                  Alternate: {schoolConfig.contact.secondaryPhone.display}
                </a>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
