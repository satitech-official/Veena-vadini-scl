import Link from "next/link";
import { ArrowRight, Clock3, MapPin } from "lucide-react";

import { DemoContentLabel } from "@/components/content/demo-content-label";
import { EventDate } from "@/components/content/event-date";
import { EventVisualPlaceholder } from "@/components/content/event-visual-placeholder";
import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { formatEventTimeRange } from "@/lib/content/date";
import { getUpcomingEventsResult } from "@/lib/content/events-repository";
import { cn } from "@/lib/utils/cn";

export async function EventsPreview() {
  const { records: events, hasLoadError } = await getUpcomingEventsResult();
  const featuredEvent = events.find((event) => event.isFeatured) ?? events[0];
  const supportingEvents = featuredEvent ? events.filter((event) => event.id !== featuredEvent.id) : [];
  const isDemoCollection = events.some((event) => event.isDemo);

  if (!featuredEvent) {
    return (
      <section className="events-preview-section relative overflow-hidden bg-primary py-20 text-white sm:py-28 lg:py-36" id="events-preview">
        <Container className="relative">
          <p className="type-eyebrow text-gold">School events</p>
          <h2 className="mt-5 font-display text-[clamp(3rem,5.7vw,6.35rem)] leading-[0.82] tracking-[-0.07em] text-white">Upcoming Events,<br /><span className="text-gold">Ready to Discover.</span></h2>
          <p className="mt-8 max-w-xl border-l-2 border-gold pl-5 text-base leading-7 text-white/70">{hasLoadError ? "Upcoming events are temporarily unavailable. Please refresh this page or contact the school for urgent information." : "No upcoming events are published yet. New school activities will appear here when they are ready to share."}</p>
        </Container>
      </section>
    );
  }

  return (
    <section className="events-preview-section relative overflow-hidden bg-primary py-20 text-white sm:py-28 lg:py-36" id="events-preview">
      <Container className="relative">
        <div className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-[minmax(0,1fr)_minmax(19rem,0.5fr)] lg:items-end">
          <div>
            <p className="type-eyebrow text-gold">School events</p>
            <h2 className="mt-5 font-display text-[clamp(3rem,5.7vw,6.35rem)] leading-[0.82] tracking-[-0.07em] text-white">
              Upcoming Events,
              <br />
              <span className="text-gold">Ready to Discover.</span>
            </h2>
          </div>
          <div className="lg:justify-self-end">
            <p className="max-w-sm text-base leading-7 text-white/70">Discover upcoming school activities and important dates in one clear place.</p>
            {isDemoCollection ? <DemoContentLabel className="mt-5" tone="dark" /> : null}
          </div>
        </div>

        <div className="grid gap-8 border-t border-white/18 pt-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.72fr)] lg:gap-14 lg:pt-12">
          <article className="grid gap-7 lg:grid-cols-[minmax(15rem,0.84fr)_minmax(0,1fr)] lg:items-center">
            <EventVisualPlaceholder event={featuredEvent} />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="content-category-label text-gold">{featuredEvent.category}</span>
                {featuredEvent.isDemo ? <span className="content-demo-badge content-demo-badge-dark">Sample event</span> : null}
              </div>
              <h3 className="mt-5 font-display text-[clamp(2.5rem,4.2vw,4.8rem)] leading-[0.84] tracking-[-0.065em] text-white">
                <Link className="transition-colors hover:text-gold focus-visible:text-gold" href={`/events/${featuredEvent.slug}`}>{featuredEvent.title}</Link>
              </h3>
              <p className="mt-5 max-w-lg text-base leading-7 text-white/72">{featuredEvent.summary}</p>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 border-y border-white/16 py-5 text-sm leading-6 text-white/72">
                <span className="inline-flex items-center gap-2"><Clock3 aria-hidden="true" size={15} />{formatEventTimeRange(featuredEvent.startTime, featuredEvent.endTime)}</span>
                <span className="inline-flex items-center gap-2"><MapPin aria-hidden="true" size={15} />{featuredEvent.location}</span>
              </div>
              <Link className="group mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-white" href={`/events/${featuredEvent.slug}`}>
                View {featuredEvent.isDemo ? "Sample" : "Event"}
                <ArrowRight aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" size={17} />
              </Link>
            </div>
          </article>

          <ol className="border-t border-white/18 lg:border-t-0 lg:border-l lg:pl-8">
            {supportingEvents.map((event) => (
              <li className="border-b border-white/18 py-6 first:pt-0" key={event.id}>
                <article className="grid grid-cols-[4.4rem_minmax(0,1fr)] gap-4">
                  <EventDate date={event.date} tone="dark" />
                  <div>
                    <p className="content-category-label text-gold">{event.category}{event.isDemo ? " · Sample event" : ""}</p>
                    <h3 className="mt-3 font-display text-2xl leading-[0.9] tracking-[-0.05em] text-white"><Link className="transition-colors hover:text-gold focus-visible:text-gold" href={`/events/${event.slug}`}>{event.title}</Link></h3>
                    <p className="mt-3 text-sm leading-6 text-white/66">{event.summary}</p>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>

        <Link className={cn(buttonStyles({ size: "lg", variant: "secondary" }), "group mt-10 border-white/25 bg-transparent text-white hover:border-gold hover:bg-transparent hover:text-gold")} href="/events">
          View All Events
          <ArrowRight aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" size={17} />
        </Link>
      </Container>
    </section>
  );
}
