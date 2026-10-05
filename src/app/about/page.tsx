import { AboutPage } from "@/components/internal-page/about-page";
import { createPageMetadata } from "@/config/site-metadata";
import { schoolConfig } from "@/config/school";

export const metadata = createPageMetadata({
  title: "About",
  description: `Learn about the nurturing educational environment at ${schoolConfig.name} in Padhar, District Betul.`,
  pathname: "/about",
});

export default function About() {
  return <AboutPage />;
}
