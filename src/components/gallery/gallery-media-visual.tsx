import Image from "next/image";

import type { GalleryMediaItem } from "@/types/gallery";

type GalleryMediaVisualProps = {
  item: GalleryMediaItem;
  priority?: boolean;
  showReplacementNote?: boolean;
};

export function GalleryMediaVisual({ item, priority = false, showReplacementNote = true }: GalleryMediaVisualProps) {
  if (!item.isPlaceholder && item.src) {
    return (
      <Image
        alt={item.alt}
        className="object-cover"
        fill
        priority={priority}
        sizes="(max-width: 47.99rem) 100vw, (max-width: 63.99rem) 50vw, 42vw"
        src={item.thumbnailSrc ?? item.src}
        style={{ objectPosition: item.objectPosition ?? "center" }}
      />
    );
  }

  return (
    <div aria-label={item.alt} className="gallery-media-placeholder" role="img">
      <div aria-hidden="true" className="gallery-media-placeholder-grid" />
      <div aria-hidden="true" className="gallery-media-placeholder-disc" />
      <div className="relative flex h-full flex-col justify-between p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <span className="type-eyebrow text-brand-red">{item.category}</span>
          <span className="font-display text-2xl tracking-[-0.06em] text-gold-ink">{String(item.order).padStart(2, "0")}</span>
        </div>
        <div className="max-w-[15rem] border-l border-brand-indigo/22 pl-4">
          <p className="font-display text-[clamp(1.7rem,3vw,3rem)] leading-[0.9] tracking-[-0.055em] text-primary">{item.title}</p>
          {showReplacementNote ? <p className="mt-3 text-xs font-semibold leading-5 text-muted">Approved school media will replace this sample frame.</p> : null}
        </div>
      </div>
    </div>
  );
}
