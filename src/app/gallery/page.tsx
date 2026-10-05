import { GalleryPage } from "@/components/gallery/gallery-page";
import { createPageMetadata } from "@/config/site-metadata";

export const metadata = createPageMetadata({
  title: "Gallery",
  description: "A future-facing Veena Vadini Public School gallery. Current media frames are placeholders awaiting approved school photographs and videos.",
  pathname: "/gallery",
});

export default function Gallery() {
  return <GalleryPage />;
}
