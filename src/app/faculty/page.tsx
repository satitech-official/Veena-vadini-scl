import { FacultyPage } from "@/components/internal-page/faculty-page";
import { createPageMetadata } from "@/config/site-metadata";
import { schoolConfig } from "@/config/school";

export const metadata = createPageMetadata({
  title: "Faculty",
  description: `Faculty information for ${schoolConfig.name} will appear as approved school profiles are added.`,
  pathname: "/faculty",
});

export default function Faculty() {
  return <FacultyPage />;
}
