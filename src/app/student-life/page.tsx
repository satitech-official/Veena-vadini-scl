import { StudentLifePage } from "@/components/internal-page/student-life-page";
import { createPageMetadata } from "@/config/site-metadata";
import { schoolConfig } from "@/config/school";

export const metadata = createPageMetadata({
  title: "Student Life",
  description: `Explore the creative, physical, and collaborative dimensions of student life at ${schoolConfig.name}.`,
  pathname: "/student-life",
});

export default function StudentLife() {
  return <StudentLifePage />;
}
