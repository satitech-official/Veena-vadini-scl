"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useRef, useState } from "react";

import { GalleryLightbox } from "@/components/gallery/gallery-lightbox";
import { GalleryMediaVisual } from "@/components/gallery/gallery-media-visual";
import { VideoGallery } from "@/components/gallery/video-gallery";
import { galleryCategories, type GalleryCategory, type GalleryMediaItem, type GalleryVideo } from "@/types/gallery";
import { usePrefersReducedMotion } from "@/lib/motion/use-prefers-reduced-motion";

type GalleryExplorerProps = {
  items: GalleryMediaItem[];
  videos: GalleryVideo[];
  hasLoadError?: boolean;
};

export function GalleryExplorer({ hasLoadError = false, items, videos }: GalleryExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const reduceMotion = usePrefersReducedMotion();
  const isSampleCollection = items.some((item) => item.isPlaceholder) || videos.some((video) => video.isPlaceholder);

  const filteredItems = useMemo(
    () => (activeCategory === "All" ? items : items.filter((item) => item.category === activeCategory)),
    [activeCategory, items],
  );

  const transition = reduceMotion ? { duration: 0 } : { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const };

  if (hasLoadError) {
    return <section className="gallery-explorer-section bg-background py-20 sm:py-28 lg:py-36"><div className="mx-auto w-full max-w-[92rem] px-5 sm:px-8 lg:px-10"><div className="gallery-empty-state" role="status"><p className="type-eyebrow text-brand-red">Gallery</p><h2 className="mt-3 font-display text-[clamp(2.1rem,4vw,4rem)] leading-[0.88] tracking-[-0.06em] text-primary">The gallery is temporarily unavailable.</h2><p className="mt-4 max-w-md text-sm leading-6 text-muted">Please refresh this page and try again. No unpublished media is shown.</p></div></div></section>;
  }

  return (
    <>
      <section className="gallery-explorer-section bg-background py-20 sm:py-28 lg:py-36" id="gallery-collection">
        <div className="mx-auto w-full max-w-[92rem] px-5 sm:px-8 lg:px-10">
          <div className="grid gap-8 border-t border-brand-indigo/15 pt-8 lg:grid-cols-[minmax(13rem,0.36fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className="type-eyebrow text-brand-red">Explore the collection</p>
              <p className="mt-4 max-w-xs text-sm leading-6 text-muted">{isSampleCollection ? "Every sample frame is ready to be replaced with an approved school image, while keeping its category and composition." : "Explore approved school media by category. Open a frame for a closer view."}</p>
            </div>
            <div>
              <div aria-label="Filter gallery by category" className="gallery-filter-list" role="group">
                {galleryCategories.map((category) => (
                  <button
                    aria-pressed={activeCategory === category}
                    className={activeCategory === category ? "gallery-filter-active" : undefined}
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    type="button"
                  >
                    {category}
                  </button>
                ))}
              </div>
              <p aria-live="polite" className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-muted">
                {filteredItems.length === 1 ? `1 ${isSampleCollection ? "sample " : ""}media moment shown` : `${filteredItems.length} ${isSampleCollection ? "sample " : ""}media moments shown`}
              </p>
            </div>
          </div>

          {filteredItems.length > 0 ? (
            <div className="gallery-editorial-grid mt-10" id="gallery-results">
              {filteredItems.map((item, index) => (
                <motion.article
                  animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  className={`gallery-tile gallery-tile-${item.layout}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  key={`${activeCategory}-${item.id}`}
                  transition={{ ...transition, delay: reduceMotion ? 0 : Math.min(index * 0.045, 0.22) }}
                >
                  <button
                    aria-label={`View ${item.title}`}
                    className="gallery-tile-button group"
                    onClick={(event) => {
                      triggerRef.current = event.currentTarget;
                      setActiveIndex(index);
                    }}
                    type="button"
                  >
                    <span className="gallery-tile-media">
                      <GalleryMediaVisual item={item} />
                      <span aria-hidden="true" className="gallery-tile-view">View</span>
                    </span>
                    <span className="gallery-tile-caption">
                      <span className="type-eyebrow text-brand-red">{item.category}</span>
                      <span className="mt-2 block font-display text-[clamp(1.7rem,2.8vw,2.9rem)] leading-[0.9] tracking-[-0.055em] text-primary">{item.title}</span>
                      <span className="mt-2 block max-w-md text-sm leading-6 text-muted">{item.caption}</span>
                    </span>
                  </button>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="gallery-empty-state mt-10" id="gallery-results">
              <p className="type-eyebrow text-brand-red">No approved media yet</p>
              <h2 className="mt-3 font-display text-[clamp(2.1rem,4vw,4rem)] leading-[0.88] tracking-[-0.06em] text-primary">This category is waiting<br />for its first moment.</h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-muted">No approved media is available in this category yet. Achievements will appear only after verified school material is supplied.</p>
              <button className="gallery-reset-button mt-7" onClick={() => setActiveCategory("All")} type="button">View all gallery moments</button>
            </div>
          )}
        </div>
      </section>
      <section className="bg-primary py-20 text-white sm:py-28 lg:py-36">
        <div className="mx-auto w-full max-w-[92rem] px-5 sm:px-8 lg:px-10">
          <VideoGallery videos={videos} />
        </div>
      </section>
      <AnimatePresence initial={false}>
        {activeIndex !== null ? <GalleryLightbox activeIndex={activeIndex} items={filteredItems} onClose={() => setActiveIndex(null)} onNavigate={setActiveIndex} returnFocusRef={triggerRef} /> : null}
      </AnimatePresence>
    </>
  );
}
