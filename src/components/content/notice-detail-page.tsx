import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";

import { DemoContentLabel } from "@/components/content/demo-content-label";
import { NoticeRow } from "@/components/content/notice-row";
import { InternalSiteHeader } from "@/components/layout/internal-site-header";
import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { formatLongContentDate } from "@/lib/content/date";
import { cn } from "@/lib/utils/cn";
import type { Notice } from "@/types/content";

type NoticeDetailPageProps = {
  notice: Notice;
  relatedNotices: readonly Notice[];
};

export function NoticeDetailPage({ notice, relatedNotices }: NoticeDetailPageProps) {
  return (
    <>
      <InternalSiteHeader />
      <main className="flex-1">
        <section className="content-detail-hero relative overflow-hidden bg-primary pb-16 pt-36 text-white sm:pb-24 sm:pt-44 lg:pb-28 lg:pt-48">
          <div aria-hidden="true" className="content-page-hero-grid" />
          <div aria-hidden="true" className="content-detail-mark">NOTICE</div>
          <Container className="relative">
            <Link className="content-back-link" href="/notices"><ArrowLeft aria-hidden="true" size={16} />Back to Notices</Link>
            <div className="mt-12 max-w-5xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="content-category-label text-gold">{notice.category}</span>
                {notice.isDemo ? <span className="content-demo-badge content-demo-badge-dark">Demo notice</span> : null}
                {notice.isImportant ? <span className="content-status-badge content-status-badge-dark">Important</span> : null}
                {notice.isNew ? <span className="content-status-badge content-status-badge-dark">New</span> : null}
              </div>
              <h1 className="mt-6 font-display text-[clamp(3.25rem,6.5vw,7.2rem)] leading-[0.8] tracking-[-0.08em] text-white">{notice.title}</h1>
              <time className="mt-7 block text-sm font-semibold text-gold" dateTime={notice.publishDate}>{notice.isDemo ? "Sample" : "Publication"} date · {formatLongContentDate(notice.publishDate)}</time>
              <p className="mt-6 max-w-2xl text-[1.05rem] leading-8 text-white/72">{notice.summary}</p>
            </div>
          </Container>
        </section>

        <article className="bg-surface py-20 sm:py-28 lg:py-36">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[minmax(14rem,0.38fr)_minmax(0,1fr)] lg:gap-20">
              <aside className="lg:sticky lg:top-28 lg:self-start">{notice.isDemo ? <DemoContentLabel /> : <p className="type-eyebrow text-brand-red">School notice</p>}</aside>
              <div className="max-w-3xl">
                {notice.description.split("\n\n").map((paragraph) => <p className="text-[1.05rem] leading-8 text-primary/82 sm:text-[1.12rem]" key={paragraph}>{paragraph}</p>)}
                {notice.attachmentUrl && notice.attachmentLabel ? (
                  <section className="mt-12 border-y border-brand-indigo/15 py-7">
                    <p className="type-eyebrow text-brand-red">Attachment</p>
                    <a className={cn(buttonStyles({ size: "md", variant: "secondary" }), "mt-5")} href={notice.attachmentUrl}>
                      <Download aria-hidden="true" size={16} />{notice.attachmentLabel}
                    </a>
                  </section>
                ) : null}
              </div>
            </div>
          </Container>
        </article>

        {relatedNotices.length ? (
          <section className="bg-background py-20 sm:py-28">
            <Container>
              <p className="type-eyebrow text-brand-red">More from the notice board</p>
              <h2 className="mt-5 font-display text-[clamp(2.7rem,4.8vw,5.2rem)] leading-[0.84] tracking-[-0.065em] text-primary">Latest {notice.isDemo ? "Demo" : "School"}<br /><span className="text-brand-red">Notices.</span></h2>
              <ol className="mt-10 border-t border-brand-indigo/15">
                {relatedNotices.map((relatedNotice) => <li className="border-b border-brand-indigo/15" key={relatedNotice.id}><NoticeRow notice={relatedNotice} /></li>)}
              </ol>
            </Container>
          </section>
        ) : null}
      </main>
    </>
  );
}
