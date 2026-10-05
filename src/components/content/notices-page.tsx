import { ContentPageHero } from "@/components/content/content-page-hero";
import { NoticesExplorer } from "@/components/content/notices-explorer";
import { InternalSiteHeader } from "@/components/layout/internal-site-header";
import { Container } from "@/components/ui/container";
import { getNoticesResult } from "@/lib/content/notices-repository";

export async function NoticesPage() {
  const { records: notices, hasLoadError } = await getNoticesResult();
  const hasLiveNotices = notices.some((notice) => !notice.isDemo);

  return (
    <>
      <InternalSiteHeader />
      <main className="flex-1">
        <ContentPageHero
          description={hasLiveNotices ? "A parent-friendly home for verified school communications, arranged for clear reading and easy follow-up." : "A parent-friendly home for future verified school communications, arranged for clear reading and easy follow-up."}
          eyebrow="Notices"
          mark="NB"
          title={<>School Notice<br /><span className="text-gold">Board.</span></>}
        />
        <section className="bg-surface py-20 sm:py-28 lg:py-36">
          <Container>
            <div className="grid gap-9 lg:grid-cols-[minmax(15rem,0.4fr)_minmax(0,1.6fr)] lg:gap-20">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p className="type-eyebrow text-brand-red">Latest updates</p>
                <h2 className="mt-5 font-display text-[clamp(2.8rem,4.8vw,5.3rem)] leading-[0.84] tracking-[-0.07em] text-primary">
                  Read What<br /><span className="text-brand-red">Matters.</span>
                </h2>
                <p className="mt-6 max-w-xs text-base leading-7 text-muted">{hasLiveNotices ? "Search and filter verified notices, arranged for clear reading and easy follow-up." : "Official notices will appear here when the school publishes them."}</p>
              </div>
              <NoticesExplorer hasLoadError={hasLoadError} notices={notices} />
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
