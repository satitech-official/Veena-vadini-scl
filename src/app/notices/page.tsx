import { NoticesPage } from "@/components/content/notices-page";
import { createPageMetadata } from "@/config/site-metadata";

export const metadata = createPageMetadata({
  title: "Notices",
  description: "A demonstration of the future Veena Vadini Public School notice board. Official school notices will replace this sample content.",
  pathname: "/notices",
});

export default function Notices() {
  return <NoticesPage />;
}
