import { downloadsSeed } from "@/content/downloads/download-seed";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getSupabaseDownloadsResult } from "@/lib/supabase/public-content";
import type { PublicContentResult } from "@/lib/content/public-content-result";
import type { DownloadDocument } from "@/types/downloads";

export interface DownloadsRepository {
  getPublicDocuments(): Promise<DownloadDocument[]>;
}

class LocalDownloadsRepository implements DownloadsRepository {
  async getPublicDocuments(): Promise<DownloadDocument[]> {
    return downloadsSeed
      .filter((document) => document.visibility === "public" && document.status === "published")
      .toSorted((first, second) => {
        if (!first.publishDate) return 1;
        if (!second.publishDate) return -1;
        return second.publishDate.localeCompare(first.publishDate);
      });
  }
}

const downloadsRepository = new LocalDownloadsRepository();

export function getDownloadDocuments(): Promise<DownloadDocument[]> {
  return getDownloadDocumentsResult().then((result) => result.records);
}

export async function getDownloadDocumentsResult(): Promise<PublicContentResult<DownloadDocument[]>> {
  if (isSupabaseConfigured()) {
    const result = await getSupabaseDownloadsResult();
    return { records: result.data, hasLoadError: result.hasError };
  }

  return { records: await downloadsRepository.getPublicDocuments(), hasLoadError: false };
}
