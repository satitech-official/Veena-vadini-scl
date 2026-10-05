import { ContentPageHero } from "@/components/content/content-page-hero";
import { EventsExplorer } from "@/components/content/events-explorer";
import { InternalSiteHeader } from "@/components/layout/internal-site-header";
import { Container } from "@/components/ui/container";
import { getEventsResult } from "@/lib/content/events-repository";

export async function EventsPage() {
  const { records: events, hasLoadError } = await getEventsResult();
  const hasLiveEvents = events.some((event) => !event.isDemo);

  return (
    <>
      <InternalSiteHeader />
      <main className="flex-1">
        <ContentPageHero
          description="A future-facing space for the school’s confirmed activities, important dates, and shared moments."
          eyebrow="Events"
          mark="EV"
          title={<>Events That Bring<br /><span className="text-gold">School Life Together.</span></>}
        />
        <section className="events-page-index relative overflow-hidden bg-primary py-20 text-white sm:py-28 lg:py-36">
          <Container className="relative">
            <div className="grid gap-9 lg:grid-cols-[minmax(15rem,0.4fr)_minmax(0,1.6fr)] lg:gap-20">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p className="type-eyebrow text-gold">{hasLiveEvents ? "School schedule" : "Sample schedule"}</p>
                <h2 className="mt-5 font-display text-[clamp(2.8rem,4.8vw,5.3rem)] leading-[0.84] tracking-[-0.07em] text-white">
                  Moments<br /><span className="text-gold">to Look For.</span>
                </h2>
                <p className="mt-6 max-w-xs text-base leading-7 text-white/68">{hasLiveEvents ? "Verified school events, activities, and important dates are organised here for easy follow-up." : "These labelled examples show how approved events will be organised once the school confirms them."}</p>
              </div>
              <EventsExplorer events={events} hasLoadError={hasLoadError} />
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
