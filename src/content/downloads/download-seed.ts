import type { DownloadDocument } from "@/types/downloads";

/**
 * No documents are exposed until actual school files have been approved.
 * A later storage-backed repository can replace this local seed unchanged.
 */
export const downloadsSeed: readonly DownloadDocument[] = [];
