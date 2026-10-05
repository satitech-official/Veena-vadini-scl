import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { GalleryMediaVisual } from "@/components/gallery/gallery-media-visual";
import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getGalleryContentResult } from "@/lib/gallery/gallery-repository";
import { cn } from "@/lib/utils/cn";

export async function GalleryPreview() {
  const { records, hasLoadError } = await getGalleryContentResult();
  const items = records.items.filter((item) => item.featured).slice(0, 6);
  const isSampleCollection = items.some((item) => item.isPlaceholder);

  return (
    <section className="gallery-preview-section relative overflow-hidden bg-background py-20 sm:py-28 lg:py-36" id="gallery-preview">
      <div aria-hidden="true" className="gallery-preview-ghost">LIFE</div>
      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,0.45fr)] lg:items-end lg:gap-16">
          <div>
            <p className="type-eyebrow text-brand-red">School life</p>
            <h2 className="mt-5 font-display text-[clamp(3rem,5.7vw,6.35rem)] leading-[0.82] tracking-[-0.07em] text-primary">Life at<br /><span className="text-brand-red">Veena Vadini.</span></h2>
          </div>
          <div className="lg:justify-self-end">
            <p className="max-w-sm text-base leading-7 text-muted">A growing visual archive for learning, creativity, movement and the moments that shape each school day.</p>
            <Link className={cn(buttonStyles({ size: "lg" }), "group mt-7")} href="/gallery">
              Explore Full Gallery
              <ArrowRight aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" size={17} />
            </Link>
          </div>
        </div>
        {items.length ? <div className="gallery-preview-collage mt-12 sm:mt-16">
          {items.map((item, index) => (
            <Link aria-label={`Explore the full gallery, including ${item.title}`} className={`gallery-preview-frame gallery-preview-frame-${item.layout}`} href="/gallery" key={item.id}>
              <span className="gallery-preview-media"><GalleryMediaVisual item={item} priority={index < 2} /></span>
              <span className="gallery-preview-meta">
                <span className="font-display text-xl tracking-[-0.06em] text-gold-ink">{String(item.order).padStart(2, "0")}</span>
                <span className="type-eyebrow text-primary">{item.category}</span>
              </span>
            </Link>
          ))}
        </div> : <p className="mt-12 max-w-xl border-l-2 border-gold-ink pl-5 text-base leading-7 text-muted">{hasLoadError ? "The gallery is temporarily unavailable. Please refresh this page and try again." : "No approved gallery moments are published yet. The school’s visual archive will appear here when ready."}</p>}
        {isSampleCollection ? <p className="mt-7 max-w-xl text-xs font-semibold leading-5 text-muted">Sample placeholders only — approved school photography will replace these frames before publication.</p> : null}
      </Container>
    </section>
  );
}
