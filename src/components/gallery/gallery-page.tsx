import Link from "next/link";
import { ArrowDown } from "lucide-react";

import { GalleryExplorer } from "@/components/gallery/gallery-explorer";
import { GalleryMediaVisual } from "@/components/gallery/gallery-media-visual";
import { ContentPageHero } from "@/components/content/content-page-hero";
import { DemoContentLabel } from "@/components/content/demo-content-label";
import { InternalSiteHeader } from "@/components/layout/internal-site-header";
import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getGalleryContentResult } from "@/lib/gallery/gallery-repository";
import { cn } from "@/lib/utils/cn";

export async function GalleryPage() {
  const { records: { items, videos }, hasLoadError } = await getGalleryContentResult();
  const featuredItems = items.filter((item) => item.featured).slice(0, 1);
  const feature = featuredItems[0] ?? items[0];
  const isSampleCollection = [...items, ...videos].some((item) => item.isPlaceholder);

  return (
    <>
      <InternalSiteHeader />
      <main className="flex-1">
        <ContentPageHero description={isSampleCollection ? "A considered gallery structure for school life, activities and important moments. The current frames are labelled placeholders until the school approves photography or video." : "A considered gallery of approved school life, activities, and important moments."} eyebrow="School life" mark="VV" title={<>Moments of Learning,<br /><span className="text-gold">Creativity &amp; Growth.</span></>}>
          {isSampleCollection ? <DemoContentLabel className="mt-6" tone="dark" /> : null}
        </ContentPageHero>

        {feature ? (
          <section className="gallery-feature-section bg-surface py-20 sm:py-28 lg:py-36">
            <Container>
              <div className="grid gap-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(16rem,0.54fr)] lg:items-end lg:gap-20">
                <div className="gallery-feature-visual">
                  <GalleryMediaVisual item={feature} priority />
                </div>
                <div>
                  <p className="type-eyebrow text-brand-red">Featured frame</p>
                  <h2 className="mt-5 font-display text-[clamp(3rem,5vw,5.75rem)] leading-[0.82] tracking-[-0.07em] text-primary">A Visual Story,<br /><span className="text-brand-red">Ready to Grow.</span></h2>
                  <p className="mt-7 max-w-sm text-base leading-7 text-muted">{isSampleCollection ? "The gallery is arranged to let real school photography take the lead later, while its rhythm and captions remain intentional today." : "Approved school photography takes the lead, with categories and captions kept clear for families."}</p>
                  <Link className={cn(buttonStyles({ size: "lg" }), "group mt-8")} href="#gallery-collection">
                    Browse Gallery Moments
                    <ArrowDown aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-1" size={17} />
                  </Link>
                </div>
              </div>
            </Container>
          </section>
        ) : null}

        <GalleryExplorer hasLoadError={hasLoadError} items={items} videos={videos} />
      </main>
    </>
  );
}
