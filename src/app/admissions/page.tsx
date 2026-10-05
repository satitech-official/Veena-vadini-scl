import { AdmissionsPage } from "@/components/admissions/admissions-page";
import { createPageMetadata } from "@/config/site-metadata";
import { schoolConfig } from "@/config/school";

export const metadata = createPageMetadata({
  title: "Admissions",
  description: `Admissions enquiries for ${schoolConfig.classes} at ${schoolConfig.name}.`,
  pathname: "/admissions",
});

export default function Admissions() {
  return <AdmissionsPage />;
}
