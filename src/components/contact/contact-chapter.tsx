import { Clock3, MapPin, MessageCircle, Phone } from "lucide-react";

import { DirectionsAction, MapReady } from "@/components/contact/map-ready";
import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { getPublicSchoolSettings } from "@/lib/settings/settings-repository";
import { getPublicWhatsAppEnquiryUrl } from "@/lib/settings/public-school-settings";
import { cn } from "@/lib/utils/cn";

export async function ContactChapter() {
  const settings = await getPublicSchoolSettings();
  const whatsappHref = getPublicWhatsAppEnquiryUrl(settings, "Hello Veena Vadini Public School, I would like to know more about the school.");

  return (
    <section className="contact-chapter relative overflow-hidden bg-primary py-20 text-white sm:py-28 lg:py-36" id="contact">
      <div aria-hidden="true" className="contact-chapter-mark">VV</div>
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(19rem,0.85fr)] lg:items-stretch lg:gap-20">
          <div className="flex flex-col">
            <p className="type-eyebrow text-gold">Contact</p>
            <h2 className="mt-5 font-display text-[clamp(3.2rem,6vw,6.7rem)] leading-[0.8] tracking-[-0.075em] text-white">Come Visit<br /><span className="text-gold">Veena Vadini.</span></h2>
            <div className="mt-8 border-y border-white/17 py-6">
              <p className="font-display text-2xl leading-[0.92] tracking-[-0.05em] text-white">{settings.name}</p>
              <address className="mt-4 not-italic text-base leading-7 text-white/68">{settings.address.lines.map((line) => <span className="block" key={line}>{line}</span>)}</address>
            </div>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <a aria-label={`Call ${settings.name} on ${settings.contact.primaryPhone.display}`} className="contact-detail-link" href={settings.contact.primaryPhone.href}>
                <Phone aria-hidden="true" className="text-gold" size={17} />
                <span><span className="type-eyebrow text-white/52">Primary phone</span><span className="mt-1 block text-sm font-semibold text-white">{settings.contact.primaryPhone.display}</span></span>
              </a>
              <a aria-label={`Call ${settings.name} on ${settings.contact.secondaryPhone.display}`} className="contact-detail-link" href={settings.contact.secondaryPhone.href}>
                <Phone aria-hidden="true" className="text-gold" size={17} />
                <span><span className="type-eyebrow text-white/52">Secondary phone</span><span className="mt-1 block text-sm font-semibold text-white">{settings.contact.secondaryPhone.display}</span></span>
              </a>
              <span className="contact-detail-link sm:col-span-2">
                <Clock3 aria-hidden="true" className="text-gold" size={17} />
                <span><span className="type-eyebrow text-white/52">Office hours</span><span className="mt-1 block text-sm font-semibold text-white">{settings.contact.officeHours}</span></span>
              </span>
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <a className={cn(buttonStyles({ size: "lg" }), "border-gold bg-gold text-primary hover:border-white hover:bg-white")} href={settings.contact.primaryPhone.href}><Phone aria-hidden="true" size={17} />Call School</a>
              <a aria-label={`WhatsApp ${settings.name}`} className={cn(buttonStyles({ size: "lg", variant: "secondary" }), "border-white/25 bg-transparent text-white hover:border-gold hover:bg-transparent hover:text-gold")} href={whatsappHref} rel="noreferrer" target="_blank"><MessageCircle aria-hidden="true" size={17} />WhatsApp Us</a>
              <a aria-label={`Visit ${settings.social.instagram.handle} on Instagram`} className={cn(buttonStyles({ size: "lg", variant: "secondary" }), "border-white/25 bg-transparent text-white hover:border-gold hover:bg-transparent hover:text-gold")} href={settings.social.instagram.href} rel="noreferrer" target="_blank"><InstagramIcon aria-hidden="true" size={17} />Instagram</a>
            </div>
          </div>
          <div className="contact-map-panel">
            <MapReady className="min-h-[24rem] sm:min-h-[30rem]" settings={settings} />
            <div className="contact-map-caption">
              <span className="flex items-center gap-2 text-sm leading-6 text-white/68"><MapPin aria-hidden="true" className="shrink-0 text-gold" size={16} />{settings.address.formatted}</span>
              <DirectionsAction className="contact-directions-action" settings={settings} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
