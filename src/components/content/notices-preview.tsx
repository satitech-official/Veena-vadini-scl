import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { DemoContentLabel } from "@/components/content/demo-content-label";
import { NoticeRow } from "@/components/content/notice-row";
import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getNoticesResult } from "@/lib/content/notices-repository";
import { cn } from "@/lib/utils/cn";

export async function NoticesPreview() {
  const { records, hasLoadError } = await getNoticesResult();
  const notices = records.slice(0, 4);
  const isDemoCollection = notices.some((notice) => notice.isDemo);

  return (
    <section className="relative overflow-hidden bg-surface py-20 sm:py-28 lg:py-36" id="notices-preview">
      <Container>
        <div className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-[minmax(0,1fr)_minmax(19rem,0.52fr)] lg:items-end">
          <div>
            <p className="type-eyebrow text-brand-red">School notice board</p>
            <h2 className="mt-5 font-display text-[clamp(3rem,5.7vw,6.35rem)] leading-[0.82] tracking-[-0.07em] text-primary">
              Latest Notices,
              <br />
              <span className="text-brand-red">Clearly Shared.</span>
            </h2>
          </div>
          <div className="lg:justify-self-end">
            <p className="max-w-sm text-base leading-7 text-muted">{notices.length ? "A calm, easy-to-scan place for important school updates." : "Published school updates will appear here when they are ready to share."}</p>
            {isDemoCollection ? <DemoContentLabel className="mt-5" /> : null}
          </div>
        </div>

        <ol className="border-t border-brand-indigo/15">
          {notices.map((notice, index) => (
            <li className="border-b border-brand-indigo/15" key={notice.id}>
              <NoticeRow notice={notice} priority={index === 0 ? "featured" : "standard"} />
            </li>
          ))}
          {hasLoadError ? <li className="py-9 text-sm leading-6 text-muted">The notice board is temporarily unavailable. Please refresh or contact the school for urgent information.</li> : null}
          {!hasLoadError && !notices.length ? <li className="py-9 text-sm leading-6 text-muted">No published notices are available yet.</li> : null}
        </ol>

        <Link className={cn(buttonStyles({ size: "lg", variant: "secondary" }), "group mt-10")} href="/notices">
          View All Notices
          <ArrowRight aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" size={17} />
        </Link>
      </Container>
    </section>
  );
}
