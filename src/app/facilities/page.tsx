import { FacilitiesPage } from "@/components/internal-page/facilities-page";
import { createPageMetadata } from "@/config/site-metadata";
import { schoolConfig } from "@/config/school";

export const metadata = createPageMetadata({
  title: "Facilities",
  description: `Explore the learning spaces and environment at ${schoolConfig.name}.`,
  pathname: "/facilities",
});

export default function Facilities() {
  return <FacilitiesPage />;
}
