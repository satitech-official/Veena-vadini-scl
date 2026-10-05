import Link from "next/link";
import { ArrowLeft, Clock3, MapPin } from "lucide-react";

import { DemoContentLabel } from "@/components/content/demo-content-label";
import { EventDate } from "@/components/content/event-date";
import { EventVisualPlaceholder } from "@/components/content/event-visual-placeholder";
import { InternalSiteHeader } from "@/components/layout/internal-site-header";
import { Container } from "@/components/ui/container";
import { buttonStyles } from "@/components/ui/button";
import { formatEventTimeRange, formatLongContentDate } from "@/lib/content/date";
import type { SchoolEvent } from "@/types/content";

type EventDetailPageProps = {
  event: SchoolEvent;
  relatedEvents: readonly SchoolEvent[];
};

export function EventDetailPage({ event, relatedEvents }: EventDetailPageProps) {
  return (
    <>
      <InternalSiteHeader />
      <main className="flex-1 bg-primary text-white">
        <section className="content-detail-hero relative overflow-hidden pb-20 pt-36 sm:pb-28 sm:pt-44 lg:pb-36 lg:pt-48">
          <div aria-hidden="true" className="content-page-hero-grid" />
          <div aria-hidden="true" className="content-detail-mark">EVENT</div>
          <Container className="relative">
            <Link className="content-back-link" href="/events"><ArrowLeft aria-hidden="true" size={16} />Back to Events</Link>
            <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,0.54fr)] lg:items-end lg:gap-20">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="content-category-label text-gold">{event.category}</span>
                  {event.isDemo ? <span className="content-demo-badge content-demo-badge-dark">Sample event</span> : null}
                </div>
                <h1 className="mt-6 max-w-4xl font-display text-[clamp(3.25rem,6.5vw,7.2rem)] leading-[0.8] tracking-[-0.08em] text-white">{event.title}</h1>
                <p className="mt-6 max-w-2xl text-[1.05rem] leading-8 text-white/72">{event.summary}</p>
              </div>
              <div className="grid grid-cols-[4.75rem_minmax(0,1fr)] gap-5 border-y border-white/18 py-6">
                <EventDate date={event.date} tone="dark" />
                <div className="space-y-3 text-sm leading-6 text-white/72">
                  <p>{event.isDemo ? "Sample" : "Event"} date · {formatLongContentDate(event.date)}</p>
                  <p className="inline-flex items-center gap-2"><Clock3 aria-hidden="true" size={15} />{formatEventTimeRange(event.startTime, event.endTime)}</p>
                  {event.location ? <p className="inline-flex items-start gap-2"><MapPin aria-hidden="true" className="mt-1 shrink-0" size={15} />{event.location}</p> : null}
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-surface py-20 text-primary sm:py-28 lg:py-36">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[minmax(15rem,0.6fr)_minmax(0,1fr)] lg:gap-20">
              <EventVisualPlaceholder event={event} />
              <div className="max-w-2xl lg:py-8">
                {event.isDemo ? <DemoContentLabel /> : <p className="type-eyebrow text-brand-red">School event</p>}
                <div className="mt-8 space-y-6">
                  {event.description.split("\n\n").map((paragraph) => <p className="text-[1.05rem] leading-8 text-primary/82 sm:text-[1.12rem]" key={paragraph}>{paragraph}</p>)}
                </div>
                {event.registrationUrl ? <a className={`${buttonStyles({ size: "md" })} mt-8`} href={event.registrationUrl} rel={event.registrationUrl.startsWith("https://") ? "noreferrer" : undefined} target={event.registrationUrl.startsWith("https://") ? "_blank" : undefined}>Registration or contact</a> : null}
              </div>
            </div>
          </Container>
        </section>

        {relatedEvents.length ? (
          <section className="bg-primary py-20 sm:py-28">
            <Container>
              <p className="type-eyebrow text-gold">More {event.isDemo ? "sample" : "school"} events</p>
              <h2 className="mt-5 font-display text-[clamp(2.7rem,4.8vw,5.2rem)] leading-[0.84] tracking-[-0.065em] text-white">See the Event<br /><span className="text-gold">Index.</span></h2>
              <ol className="mt-10 grid gap-5 border-t border-white/18 pt-6 sm:grid-cols-2">
                {relatedEvents.map((relatedEvent) => (
                  <li className="border-b border-white/18 pb-6" key={relatedEvent.id}>
                    <article className="grid grid-cols-[4rem_minmax(0,1fr)] gap-4"><EventDate date={relatedEvent.date} tone="dark" /><div><p className="content-category-label text-gold">{relatedEvent.category}{relatedEvent.isDemo ? " · Sample event" : ""}</p><h3 className="mt-3 font-display text-2xl leading-[0.9] tracking-[-0.05em] text-white"><Link className="transition-colors hover:text-gold focus-visible:text-gold" href={`/events/${relatedEvent.slug}`}>{relatedEvent.title}</Link></h3></div></article>
                  </li>
                ))}
              </ol>
            </Container>
          </section>
        ) : null}
      </main>
    </>
  );
}
