export const downloadCategories = [
  "All",
  "Admission",
  "Academic",
  "Circular",
  "Calendar",
  "Holiday",
  "Syllabus",
  "Prospectus",
  "Examination",
  "Other",
] as const;

export type DownloadCategory = (typeof downloadCategories)[number];
export type DownloadDocumentCategory = Exclude<DownloadCategory, "All">;
export type DownloadVisibility = "public" | "hidden";
export type DownloadStatus = "draft" | "published" | "archived";

/** A verified, future storage-ready school document record. */
export type DownloadDocument = {
  id: string;
  title: string;
  description?: string;
  category: DownloadDocumentCategory;
  fileUrl: string | null;
  fileType?: string;
  fileSize?: string;
  publishDate: string | null;
  visibility: DownloadVisibility;
  status: DownloadStatus;
};
