import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { NoticeDetailPage } from "@/components/content/notice-detail-page";
import { BreadcrumbStructuredData } from "@/components/ui/structured-data";
import { createPageMetadata } from "@/config/site-metadata";
import { getLatestNotices, getNoticeBySlug, getNotices } from "@/lib/content/notices-repository";

type NoticeDetailRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return (await getNotices()).map((notice) => ({ slug: notice.slug }));
}

export async function generateMetadata({ params }: NoticeDetailRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const notice = await getNoticeBySlug(slug);

  if (!notice) {
    return createPageMetadata({
      title: "Notice Not Found",
      description: "The requested notice could not be found.",
      pathname: `/notices/${slug}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: notice.title,
    description: notice.isDemo ? `${notice.summary} Demo content only; this is not an official school announcement.` : notice.summary,
    pathname: `/notices/${notice.slug}`,
    noIndex: notice.isDemo,
  });
}

export default async function NoticeDetail({ params }: NoticeDetailRouteProps) {
  const { slug } = await params;
  const notice = await getNoticeBySlug(slug);

  if (!notice) {
    notFound();
  }

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "Notices", pathname: "/notices" },
          { name: notice.title, pathname: `/notices/${notice.slug}` },
        ]}
      />
      <NoticeDetailPage notice={notice} relatedNotices={(await getLatestNotices(3)).filter((item) => item.id !== notice.id).slice(0, 2)} />
    </>
  );
}
