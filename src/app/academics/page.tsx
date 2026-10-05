import { AcademicsPage } from "@/components/internal-page/academics-page";
import { createPageMetadata } from "@/config/site-metadata";
import { schoolConfig } from "@/config/school";

export const metadata = createPageMetadata({
  title: "Academics",
  description: `Explore the academic journey from ${schoolConfig.classes} at ${schoolConfig.name}.`,
  pathname: "/academics",
});

export default function Academics() {
  return <AcademicsPage />;
}
