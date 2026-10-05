import { DownloadsPage } from "@/components/internal-page/downloads-page";
import { createPageMetadata } from "@/config/site-metadata";
import { schoolConfig } from "@/config/school";

export const metadata = createPageMetadata({
  title: "Downloads",
  description: `Approved school documents from ${schoolConfig.name}, available when published.`,
  pathname: "/downloads",
});

export default function Downloads() {
  return <DownloadsPage />;
}
