"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";

import { FacebookIcon, InstagramIcon } from "@/components/ui/instagram-icon";
import { usePublicSchoolSettings } from "@/components/settings/public-school-settings-provider";
import { getPublicWhatsAppEnquiryUrl } from "@/lib/settings/public-school-settings";
import { getCmsText } from "@/lib/settings/cms-content";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/#about" },
  { label: "Academics", href: "/#academics-preview" },
  { label: "Admissions", href: "/admissions" },
  { label: "Facilities", href: "/#facilities" },
  { label: "Student Life", href: "/#student-life" },
  { label: "Gallery", href: "/gallery" },
  { label: "Events", href: "/events" },
  { label: "Notices", href: "/notices" },
  { label: "Faculty", href: "/faculty" },
  { label: "Downloads", href: "/downloads" },
  { label: "Contact", href: "/contact" },
] as const;

/** Reserved for future configured pages; intentionally not rendered while unavailable. */
export const futureFooterDestinations = ["Faculty", "Downloads", "Privacy Policy"] as const;

export function SiteFooter() {
  const settings = usePublicSchoolSettings();
  const footerText = getCmsText(settings.cmsContent, "site", "footerText", "");
  const socialLinks = [
    { href: settings.social.instagram.href, icon: InstagramIcon, label: `Visit ${settings.social.instagram.handle} on Instagram` },
    { href: getPublicWhatsAppEnquiryUrl(settings, "Hello Veena Vadini Public School, I would like to know more about the school."), icon: MessageCircle, label: `WhatsApp ${settings.name}` },
    ...(settings.social.facebook ? [{ href: settings.social.facebook, icon: FacebookIcon, label: `Visit ${settings.name} on Facebook` }] : []),
    ...(settings.contact.email ? [{ href: `mailto:${settings.contact.email}`, icon: Mail, label: `Email ${settings.name}` }] : []),
  ];

  return (
    <footer className="site-footer bg-primary text-white">
      <div className="mx-auto w-full max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <div className="site-footer-opening border-b border-white/16 py-12 sm:py-16 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.45fr)] lg:items-end lg:gap-20">
            <div>
              <div className="flex items-center gap-4">
                <span className="relative grid size-14 shrink-0 overflow-hidden rounded-full border border-gold/50 bg-surface p-1.5">
                  <Image alt={`${settings.name} logo`} className="object-contain" fill sizes="56px" src={settings.brand.temporaryLogoPath} />
                </span>
                <span className="font-display text-[clamp(1.9rem,3vw,3.1rem)] leading-[0.87] tracking-[-0.055em] text-white">{settings.name}</span>
              </div>
              <p className="mt-8 max-w-xl font-display text-[clamp(2.7rem,5.4vw,6.2rem)] leading-[0.82] tracking-[-0.07em] text-white">{settings.motto}</p>
            </div>
            <div className="lg:justify-self-end">
              <p className="type-eyebrow text-gold">A brighter tomorrow</p>
              <p className="mt-4 max-w-sm text-base leading-7 text-white/68">{settings.tagline}</p>
              <p className="mt-5 text-sm font-semibold text-white/82">{settings.motto}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-10 py-10 sm:py-14 lg:grid-cols-[minmax(16rem,0.62fr)_minmax(17rem,0.7fr)_minmax(16rem,0.58fr)] lg:gap-16">
          <div>
            <p className="type-eyebrow text-gold">Visit &amp; connect</p>
            <address className="mt-5 not-italic text-sm leading-6 text-white/70">{settings.address.lines.map((line) => <span className="block" key={line}>{line}</span>)}</address>
            <p className="mt-6 flex items-center gap-2 text-sm text-white/70"><span className="text-gold">Office hours</span><span aria-hidden="true" className="size-1 rotate-45 bg-gold" />{settings.contact.officeHours}</p>
          </div>

          <nav aria-label="Footer navigation">
            <p className="type-eyebrow text-gold">Explore</p>
            <ul className="footer-link-list mt-5">
              {footerLinks.map((link) => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}
            </ul>
          </nav>

          <div>
            <p className="type-eyebrow text-gold">Speak with the school</p>
            <div className="mt-5 space-y-3">
              <a aria-label={`Call ${settings.name} at ${settings.contact.primaryPhone.display}`} className="footer-contact-link" href={settings.contact.primaryPhone.href}><Phone aria-hidden="true" size={16} />{settings.contact.primaryPhone.display}</a>
              <a aria-label={`Call ${settings.name} at ${settings.contact.secondaryPhone.display}`} className="footer-contact-link" href={settings.contact.secondaryPhone.href}><Phone aria-hidden="true" size={16} />{settings.contact.secondaryPhone.display}</a>
            </div>
            <div className="mt-7 flex flex-wrap gap-2">
              {socialLinks.map(({ href, icon: Icon, label }) => <a aria-label={label} className="footer-social-link" href={href} key={href} rel="noreferrer" target="_blank"><Icon aria-hidden="true" size={17} /></a>)}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/14 py-5 text-xs leading-5 text-white/48 sm:flex-row sm:items-center sm:justify-between">
          <p>{footerText || `© ${new Date().getFullYear()} ${settings.name}. All rights reserved.`}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:justify-end">
            {settings.developerCredit ? <p>{settings.developerCredit}</p> : null}
            <Link className="footer-admin-link" href="/admin/login">Admin Panel</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
