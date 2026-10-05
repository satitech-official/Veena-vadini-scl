import { ContactPage } from "@/components/contact/contact-page";
import { createPageMetadata } from "@/config/site-metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description: "Contact Veena Vadini Public School by phone or WhatsApp for admissions, school information, or a campus visit.",
  pathname: "/contact",
});

export default function Contact() {
  return <ContactPage />;
}
