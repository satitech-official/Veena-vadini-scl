import { noticeSeed } from "@/content/notices/notice-seed";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getSupabaseNoticesResult } from "@/lib/supabase/public-content";
import type { PublicContentResult } from "@/lib/content/public-content-result";
import type { Notice } from "@/types/content";

export type NoticeRepository = {
  getNotices(): Promise<Notice[]>;
  getNoticeBySlug(slug: string): Promise<Notice | null>;
  getLatestNotices(limit?: number): Promise<Notice[]>;
};

class LocalNoticeRepository implements NoticeRepository {
  private readonly records = noticeSeed;

  async getNotices() {
    return [...this.records]
      .filter((notice) => notice.visibility === "public" && notice.status === "published")
      .sort((left, right) => right.publishDate.localeCompare(left.publishDate));
  }

  async getNoticeBySlug(slug: string) {
    return (await this.getNotices()).find((notice) => notice.slug === slug) ?? null;
  }

  async getLatestNotices(limit = 4) {
    return (await this.getNotices()).slice(0, limit);
  }
}

class SupabaseNoticeRepository implements NoticeRepository {
  getNotices() {
    return getSupabaseNoticesResult().then((result) => result.data);
  }

  async getNoticeBySlug(slug: string) {
    return (await this.getNotices()).find((notice) => notice.slug === slug) ?? null;
  }

  async getLatestNotices(limit = 4) {
    return (await this.getNotices()).slice(0, limit);
  }
}

/**
 * Pages depend on this interface rather than the seed records. A future
 * Supabase implementation can replace this instance without changing UI code.
 */
export const noticeRepository: NoticeRepository = isSupabaseConfigured()
  ? new SupabaseNoticeRepository()
  : new LocalNoticeRepository();

export async function getNoticesResult(): Promise<PublicContentResult<Notice[]>> {
  if (isSupabaseConfigured()) {
    const result = await getSupabaseNoticesResult();
    return { records: result.data, hasLoadError: result.hasError };
  }

  return { records: await noticeRepository.getNotices(), hasLoadError: false };
}

export const getNotices = async () => (await getNoticesResult()).records;
export const getNoticeBySlug = (slug: string) => noticeRepository.getNoticeBySlug(slug);
export const getLatestNotices = (limit?: number) => noticeRepository.getLatestNotices(limit);
