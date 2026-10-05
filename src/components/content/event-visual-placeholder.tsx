import Image from "next/image";
import { CalendarDays } from "lucide-react";

import { EventDate } from "@/components/content/event-date";
import type { SchoolEvent } from "@/types/content";

type EventVisualPlaceholderProps = {
  event: SchoolEvent;
};

export function EventVisualPlaceholder({ event }: EventVisualPlaceholderProps) {
  if (event.image) {
    return (
      <div className="event-visual-placeholder overflow-hidden">
        <Image alt={`${event.title} event image`} className="object-cover" fill sizes="(max-width: 63.99rem) 100vw, 42vw" src={event.image} />
      </div>
    );
  }

  return (
    <div aria-label="Branded placeholder for approved school event media" className="event-visual-placeholder" role="img">
      <div aria-hidden="true" className="event-visual-grid" />
      <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <span className="content-category-label text-gold">{event.category}</span>
          <CalendarDays aria-hidden="true" className="text-gold" size={18} strokeWidth={1.5} />
        </div>
        <div className="max-w-[15rem] border-l border-white/25 pl-5">
          <p className="type-eyebrow text-white/58">{event.isDemo ? "Sample event media" : "Event media"}</p>
          <p className="mt-3 font-display text-3xl leading-[0.88] tracking-[-0.055em] text-white">{event.isDemo ? "Approved school media will appear here." : "No event image was published."}</p>
        </div>
        <EventDate className="self-end" date={event.date} tone="dark" />
      </div>
    </div>
  );
}
