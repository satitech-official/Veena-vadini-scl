"use client";

import { useMemo, useState } from "react";

import { DemoContentLabel } from "@/components/content/demo-content-label";
import { EventDate } from "@/components/content/event-date";
import { EventVisualPlaceholder } from "@/components/content/event-visual-placeholder";
import { Button } from "@/components/ui/button";
import { formatEventTimeRange } from "@/lib/content/date";
import { eventCategories, type EventCategory, type SchoolEvent } from "@/types/content";
import Link from "next/link";
import { ArrowRight, Clock3, MapPin } from "lucide-react";

type EventFilter = "All" | EventCategory;

type EventsExplorerProps = {
  events: readonly SchoolEvent[];
  hasLoadError?: boolean;
};

export function EventsExplorer({ events, hasLoadError = false }: EventsExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<EventFilter>("All");
  const isDemoCollection = events.some((event) => event.isDemo);
  const filteredEvents = useMemo(
    () => events.filter((event) => activeCategory === "All" || event.category === activeCategory),
    [activeCategory, events],
  );
  const filters: readonly EventFilter[] = ["All", ...eventCategories];

  if (hasLoadError) {
    return <section className="content-empty-state content-empty-state-dark" role="status"><p className="type-eyebrow text-gold">Events</p><h2 className="mt-4 font-display text-[clamp(2.3rem,4vw,4.3rem)] leading-[0.88] tracking-[-0.06em] text-white">Events are temporarily unavailable.</h2><p className="mt-4 max-w-lg text-base leading-7 text-white/68">Please refresh this page or contact the school directly for urgent event information.</p></section>;
  }

  return (
    <div className="events-explorer">
      {isDemoCollection ? <DemoContentLabel /> : null}
      <div aria-label="Filter school events by category" className="event-filter-list mt-7 border-y border-white/18 py-5 sm:mt-9 sm:py-6" role="group">
        {filters.map((filter) => (
          <button
            aria-pressed={activeCategory === filter}
            className={activeCategory === filter ? "event-filter-active" : undefined}
            key={filter}
            onClick={() => setActiveCategory(filter)}
            type="button"
          >
            {filter}
          </button>
        ))}
      </div>

      <p aria-live="polite" className="mt-6 text-sm leading-6 text-white/62">
        {filteredEvents.length} {filteredEvents.length === 1 ? (isDemoCollection ? "sample event" : "event") : (isDemoCollection ? "sample events" : "events")} shown.
      </p>

      {filteredEvents.length ? (
        <ol className="mt-6 grid gap-5 lg:grid-cols-2" id="event-results">
          {filteredEvents.map((event, index) => (
            <li className={index === 0 ? "lg:col-span-2" : undefined} key={event.id}>
              <article className={index === 0 ? "event-index-featured" : "event-index-item"}>
                {index === 0 ? <EventVisualPlaceholder event={event} /> : <EventDate date={event.date} tone="dark" />}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="content-category-label text-gold">{event.category}</span>
                    {event.isDemo ? <span className="content-demo-badge content-demo-badge-dark">Sample event</span> : null}
                  </div>
                  <h2 className="mt-4 font-display text-[clamp(2rem,3.4vw,3.8rem)] leading-[0.88] tracking-[-0.06em] text-white">
                    <Link className="transition-colors hover:text-gold focus-visible:text-gold" href={`/events/${event.slug}`}>{event.title}</Link>
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-6 text-white/68 sm:text-base sm:leading-7">{event.summary}</p>
                  <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm leading-6 text-white/66">
                    <span className="inline-flex items-center gap-2"><Clock3 aria-hidden="true" size={15} />{formatEventTimeRange(event.startTime, event.endTime)}</span>
                    {event.location ? <span className="inline-flex items-center gap-2"><MapPin aria-hidden="true" size={15} />{event.location}</span> : null}
                  </div>
                  <Link className="group mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-white" href={`/events/${event.slug}`}>
                    View {event.isDemo ? "Sample" : "Event"}
                    <ArrowRight aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" size={17} />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ol>
      ) : (
        <section className="content-empty-state content-empty-state-dark mt-8" id="event-results">
          <p className="type-eyebrow text-gold">Events</p>
          <h2 className="mt-4 font-display text-[clamp(2.3rem,4vw,4.3rem)] leading-[0.88] tracking-[-0.06em] text-white">No events match this filter.</h2>
          <p className="mt-4 max-w-lg text-base leading-7 text-white/68">{events.length ? "Clear the selected category to return to the event index." : "Published school events will appear here when they are ready to share."}</p>
          <Button className="mt-7 border-white/25 bg-transparent text-white hover:border-gold hover:bg-transparent hover:text-gold" onClick={() => setActiveCategory("All")} size="md" type="button" variant="secondary">Reset filters</Button>
        </section>
      )}
    </div>
  );
}
