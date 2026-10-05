import type { HTMLAttributes } from "react";

import type { PlaceholderMedia } from "@/content/homepage";
import { cn } from "@/lib/utils/cn";

type SchoolMediaPlaceholderProps = HTMLAttributes<HTMLElement> & {
  media: PlaceholderMedia;
  index?: string;
};

export function SchoolMediaPlaceholder({
  className,
  index = "01",
  media,
  ...props
}: SchoolMediaPlaceholderProps) {
  return (
    <figure
      aria-label={`${media.label} placeholder`}
      className={cn("school-media-placeholder", className)}
      data-media={media.key}
      {...props}
    >
      <div aria-hidden="true" className="school-media-placeholder-grid absolute inset-0" />
      <div aria-hidden="true" className="school-media-placeholder-plane absolute inset-y-0 right-0 w-[46%]" />
      <div aria-hidden="true" className="school-media-placeholder-orbit school-media-placeholder-orbit-one" />
      <div aria-hidden="true" className="school-media-placeholder-orbit school-media-placeholder-orbit-two" />
      <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <span className="type-eyebrow text-brand-red">{media.category}</span>
          <span className="font-display text-2xl tracking-[-0.06em] text-gold-ink">{index}</span>
        </div>
        <div className="max-w-[14rem] border-l border-brand-indigo/25 pl-4">
          <p className="font-display text-2xl leading-[0.95] tracking-[-0.04em] text-primary">
            {media.label}
          </p>
          <p className="mt-3 text-sm leading-6 text-muted">Replace with approved school media.</p>
        </div>
      </div>
      <figcaption className="sr-only">{media.description}</figcaption>
    </figure>
  );
}
