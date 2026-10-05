export const galleryCategories = [
  "All",
  "Campus",
  "Classroom",
  "Students",
  "Sports",
  "Cultural Events",
  "Celebrations",
  "Activities",
  "Achievements",
] as const;

export type GalleryCategory = (typeof galleryCategories)[number];
export type GalleryItemCategory = Exclude<GalleryCategory, "All">;
export type GalleryMediaType = "image" | "video";
export type GalleryVisibility = "public" | "hidden";
export type GalleryStatus = "draft" | "published" | "archived";
export type GalleryLayout = "dominant" | "portrait" | "landscape" | "square" | "wide";

/**
 * Public gallery metadata. Approval fields are intentionally descriptive only:
 * the future admin workflow will be responsible for enforcing them.
 */
export type GalleryMediaItem = {
  id: string;
  slug: string;
  title: string;
  caption: string;
  alt: string;
  category: GalleryItemCategory;
  mediaType: GalleryMediaType;
  src: string | null;
  thumbnailSrc: string | null;
  width: number;
  height: number;
  featured: boolean;
  order: number;
  captureDate: string | null;
  visibility: GalleryVisibility;
  status: GalleryStatus;
  layout: GalleryLayout;
  objectPosition?: string;
  approvedForPublicUse?: boolean;
  consentStatus?: "unknown" | "approved" | "not-required";
  isPlaceholder: boolean;
};

export type VideoProvider = "youtube" | "vimeo" | "local" | "external";

export type GalleryVideo = {
  id: string;
  slug: string;
  title: string;
  caption: string;
  alt: string;
  thumbnail: string | null;
  videoUrl: string | null;
  provider: VideoProvider;
  duration: string | null;
  category: GalleryItemCategory;
  visibility: GalleryVisibility;
  status: GalleryStatus;
  order: number;
  featured: boolean;
  isPlaceholder: boolean;
};
