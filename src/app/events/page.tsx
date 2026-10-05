import { EventsPage } from "@/components/content/events-page";
import { createPageMetadata } from "@/config/site-metadata";

export const metadata = createPageMetadata({
  title: "Events",
  description: "A demonstration of the future Veena Vadini Public School events experience. Official school events will replace this sample content.",
  pathname: "/events",
});

export default function Events() {
  return <EventsPage />;
}
