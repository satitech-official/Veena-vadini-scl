import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getContentDateParts, formatContentDate } from "@/lib/content/date";
import { cn } from "@/lib/utils/cn";
import type { Notice } from "@/types/content";

type NoticeRowProps = {
  notice: Notice;
  priority?: "featured" | "standard";
};

export function NoticeRow({ notice, priority = "standard" }: NoticeRowProps) {
  const dateParts = getContentDateParts(notice.publishDate);

  return (
    <article className={cn("notice-row", priority === "featured" && "notice-row-featured")}>
      <time aria-label={`${notice.isDemo ? "Sample" : "Publication"} date: ${formatContentDate(notice.publishDate)}`} className="notice-date" dateTime={notice.publishDate}>
        <span>{dateParts.day}</span>
        <span>{dateParts.month}</span>
      </time>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="content-category-label">{notice.category}</span>
          {notice.isDemo ? <span className="content-demo-badge">Demo notice</span> : null}
          {notice.isImportant ? <span className="content-status-badge">Important</span> : null}
          {notice.isNew ? <span className="content-status-badge">New</span> : null}
        </div>
        <h3 className="mt-4 font-display text-[clamp(1.75rem,3vw,3.25rem)] leading-[0.9] tracking-[-0.055em] text-primary">
          <Link className="transition-colors hover:text-brand-red focus-visible:text-brand-red" href={`/notices/${notice.slug}`}>
            {notice.title}
          </Link>
        </h3>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-muted sm:text-base sm:leading-7">{notice.summary}</p>
      </div>
      <Link aria-label={`View ${notice.title}`} className="notice-row-link" href={`/notices/${notice.slug}`}>
        <span>View Notice</span>
        <ArrowRight aria-hidden="true" size={17} />
      </Link>
    </article>
  );
}
