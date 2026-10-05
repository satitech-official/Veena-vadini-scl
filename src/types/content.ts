export const noticeCategories = [
  "General",
  "Admissions",
  "Academic",
  "Examination",
  "Holiday",
  "Events",
  "Important",
] as const;

export const eventCategories = [
  "Academic",
  "Sports",
  "Cultural",
  "Celebration",
  "Meeting",
  "Competition",
  "School Activity",
] as const;

export type NoticeCategory = (typeof noticeCategories)[number];
export type EventCategory = (typeof eventCategories)[number];
export type ContentVisibility = "public" | "hidden";
export type ContentStatus = "draft" | "published" | "archived";

export type Notice = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  publishDate: string;
  category: NoticeCategory;
  attachmentUrl: string | null;
  attachmentLabel: string | null;
  isImportant: boolean;
  isNew: boolean;
  visibility: ContentVisibility;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
  isDemo: boolean;
};

export type SchoolEvent = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  date: string;
  startTime: string | null;
  endTime: string | null;
  category: EventCategory;
  location: string | null;
  registrationUrl?: string | null;
  image: string | null;
  isFeatured: boolean;
  visibility: ContentVisibility;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
  isDemo: boolean;
};
