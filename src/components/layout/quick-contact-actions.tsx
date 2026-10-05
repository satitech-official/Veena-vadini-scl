import Link from "next/link";
import { GraduationCap, MessageCircle, Phone } from "lucide-react";

import { usePublicSchoolSettings } from "@/components/settings/public-school-settings-provider";
import { getPublicWhatsAppEnquiryUrl } from "@/lib/settings/public-school-settings";

export function QuickContactActions() {
  const settings = usePublicSchoolSettings();
  const whatsappHref = getPublicWhatsAppEnquiryUrl(settings, "Hello Veena Vadini Public School, I would like to know more about the school.");

  return (
    <>
      <a aria-label={`WhatsApp ${settings.name}`} className="floating-whatsapp" href={whatsappHref} rel="noreferrer" target="_blank">
        <MessageCircle aria-hidden="true" size={19} strokeWidth={1.8} />
        <span>WhatsApp</span>
      </a>
      <nav aria-label="Quick mobile contact actions" className="mobile-action-bar">
        <a aria-label={`Call ${settings.name}`} href={settings.contact.primaryPhone.href}><Phone aria-hidden="true" size={17} /><span>Call</span></a>
        <a aria-label={`WhatsApp ${settings.name}`} href={whatsappHref} rel="noreferrer" target="_blank"><MessageCircle aria-hidden="true" size={17} /><span>WhatsApp</span></a>
        <Link aria-label="Open admissions" href="/admissions"><GraduationCap aria-hidden="true" size={17} /><span>Admissions</span></Link>
      </nav>
    </>
  );
}
