export type PublicContentVisibility = "public" | "hidden";
export type PublicContentStatus = "draft" | "published" | "archived";
export type SocialPostSource = "manual" | "instagram-api";

/**
 * A display-ready social post boundary. The current implementation is manually
 * curated and intentionally does not contact Instagram or imply a live feed.
 */
export type SocialPost = {
  id: string;
  title: string;
  caption: string;
  thumbnail: string | null;
  postUrl: string | null;
  postDate: string | null;
  visibility: PublicContentVisibility;
  status: PublicContentStatus;
  source: SocialPostSource;
  galleryMediaSlug: string | null;
  order: number;
  isPlaceholder: boolean;
};
