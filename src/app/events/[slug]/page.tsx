import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EventDetailPage } from "@/components/content/event-detail-page";
import { BreadcrumbStructuredData } from "@/components/ui/structured-data";
import { createPageMetadata } from "@/config/site-metadata";
import { getEventBySlug, getEvents } from "@/lib/content/events-repository";

type EventDetailRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return (await getEvents()).map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: EventDetailRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return createPageMetadata({
      title: "Event Not Found",
      description: "The requested event could not be found.",
      pathname: `/events/${slug}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: event.title,
    description: event.isDemo ? `${event.summary} Sample event content only; this is not an official school announcement.` : event.summary,
    pathname: `/events/${event.slug}`,
    noIndex: event.isDemo,
  });
}

export default async function EventDetail({ params }: EventDetailRouteProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "Events", pathname: "/events" },
          { name: event.title, pathname: `/events/${event.slug}` },
        ]}
      />
      <EventDetailPage event={event} relatedEvents={(await getEvents()).filter((item) => item.id !== event.id).slice(0, 2)} />
    </>
  );
}
