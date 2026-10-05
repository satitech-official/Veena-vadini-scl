import { Clock3, MapPin, MessageCircle, Phone } from "lucide-react";

import { ContactEnquiryForm } from "@/components/contact/contact-enquiry-form";
import { DirectionsAction, MapReady } from "@/components/contact/map-ready";
import { ContentPageHero } from "@/components/content/content-page-hero";
import { InternalSiteHeader } from "@/components/layout/internal-site-header";
import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { getPublicSchoolSettings } from "@/lib/settings/settings-repository";
import { getPublicWhatsAppEnquiryUrl } from "@/lib/settings/public-school-settings";
import { getCmsText } from "@/lib/settings/cms-content";
import { cn } from "@/lib/utils/cn";

export async function ContactPage() {
  const settings = await getPublicSchoolSettings();
  const contactEyebrow = getCmsText(settings.cmsContent, "contact", "heading", "Let’s Start a");
  const contactHighlight = getCmsText(settings.cmsContent, "contact", "highlight", "Conversation.");
  const contactDescription = getCmsText(settings.cmsContent, "contact", "description", "For admissions, school information or a campus visit, parents can contact Veena Vadini Public School by phone or WhatsApp.");
  const whatsappHref = getPublicWhatsAppEnquiryUrl(settings, "Hello Veena Vadini Public School, I would like to know more about the school.");

  return (
    <>
      <InternalSiteHeader />
      <main className="flex-1">
        <ContentPageHero description={contactDescription} eyebrow="Contact" mark="HELLO" title={<>{contactEyebrow}<br /><span className="text-gold">{contactHighlight}</span></>}>
          <div className="mt-7 flex flex-wrap gap-3">
            <a className={cn(buttonStyles({ size: "md" }), "border-gold bg-gold text-primary hover:border-white hover:bg-white")} href={settings.contact.primaryPhone.href}><Phone aria-hidden="true" size={16} />Call School</a>
            <a aria-label={`WhatsApp ${settings.name}`} className={cn(buttonStyles({ size: "md", variant: "secondary" }), "border-white/25 bg-transparent text-white hover:border-gold hover:bg-transparent hover:text-gold")} href={whatsappHref} rel="noreferrer" target="_blank"><MessageCircle aria-hidden="true" size={16} />WhatsApp Us</a>
          </div>
        </ContentPageHero>

        <section className="bg-surface py-16 sm:py-24 lg:py-32">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[minmax(15rem,0.62fr)_minmax(0,1.38fr)] lg:gap-20">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p className="type-eyebrow text-brand-red">Contact details</p>
                <h2 className="mt-5 font-display text-[clamp(3rem,5.2vw,5.9rem)] leading-[0.82] tracking-[-0.07em] text-primary">A Clear Way<br /><span className="text-brand-red">to Reach Us.</span></h2>
                <address className="mt-7 not-italic text-base leading-7 text-muted">{settings.address.lines.map((line) => <span className="block" key={line}>{line}</span>)}</address>
              </div>
              <div className="contact-page-index border-t border-brand-indigo/15">
                <a aria-label={`Call ${settings.name} primary number ${settings.contact.primaryPhone.display}`} className="contact-page-detail" href={settings.contact.primaryPhone.href}><Phone aria-hidden="true" className="text-gold-ink" size={18} /><span><span className="type-eyebrow text-brand-red">Primary phone</span><span className="mt-2 block font-display text-[clamp(1.8rem,3.2vw,3.3rem)] leading-[0.9] tracking-[-0.055em] text-primary">{settings.contact.primaryPhone.display}</span></span></a>
                <a aria-label={`Call ${settings.name} secondary number ${settings.contact.secondaryPhone.display}`} className="contact-page-detail" href={settings.contact.secondaryPhone.href}><Phone aria-hidden="true" className="text-gold-ink" size={18} /><span><span className="type-eyebrow text-brand-red">Secondary phone</span><span className="mt-2 block font-display text-[clamp(1.8rem,3.2vw,3.3rem)] leading-[0.9] tracking-[-0.055em] text-primary">{settings.contact.secondaryPhone.display}</span></span></a>
                <div className="contact-page-detail"><Clock3 aria-hidden="true" className="text-gold-ink" size={18} /><span><span className="type-eyebrow text-brand-red">Office hours</span><span className="mt-2 block font-display text-[clamp(1.8rem,3.2vw,3.3rem)] leading-[0.9] tracking-[-0.055em] text-primary">{settings.contact.officeHours}</span></span></div>
                <a aria-label={`Visit ${settings.social.instagram.handle} on Instagram`} className="contact-page-detail" href={settings.social.instagram.href} rel="noreferrer" target="_blank"><InstagramIcon aria-hidden="true" className="text-gold-ink" size={18} /><span><span className="type-eyebrow text-brand-red">Instagram</span><span className="mt-2 block text-base font-semibold text-primary">{settings.social.instagram.handle}</span></span></a>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-primary py-16 text-white sm:py-24 lg:py-32">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.94fr)_minmax(17rem,0.72fr)] lg:items-center lg:gap-20">
              <div>
                <p className="type-eyebrow text-gold">Directions</p>
                <h2 className="mt-5 font-display text-[clamp(3rem,5vw,5.7rem)] leading-[0.82] tracking-[-0.07em] text-white">Find Your Way<br /><span className="text-gold">to the School.</span></h2>
                <p className="mt-7 max-w-md text-base leading-7 text-white/68">{settings.location.googleMapsUrl ? "Use the verified Google Maps link below for directions to the school." : "The verified Google Maps link will appear here as soon as it is supplied by the school. Until then, the written address remains the reliable reference."}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <DirectionsAction className="contact-page-directions" settings={settings} />
                  <span className="inline-flex items-center gap-2 text-sm leading-6 text-white/72"><MapPin aria-hidden="true" className="text-gold" size={16} />{settings.address.formatted}</span>
                </div>
              </div>
              <MapReady className="min-h-[20rem] sm:min-h-[27rem]" settings={settings} />
            </div>
          </Container>
        </section>

        <section className="relative overflow-hidden bg-background py-16 sm:py-24 lg:py-32" id="contact-enquiry">
          <div aria-hidden="true" className="contact-form-ghost">WRITE</div>
          <Container className="relative">
            <div className="grid gap-10 lg:grid-cols-[minmax(14rem,0.5fr)_minmax(0,1.5fr)] lg:gap-20">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p className="type-eyebrow text-brand-red">Send an enquiry</p>
                <h2 className="mt-5 font-display text-[clamp(3rem,5.3vw,5.9rem)] leading-[0.82] tracking-[-0.07em] text-primary">Let’s Begin<br /><span className="text-brand-red">Here.</span></h2>
                <p className="mt-7 max-w-sm text-base leading-7 text-muted">Share only the essentials. This general contact form is separate from the school’s detailed admission enquiry.</p>
              </div>
              <div className="border-t border-brand-indigo/16 pt-8 sm:pt-10"><ContactEnquiryForm /></div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
