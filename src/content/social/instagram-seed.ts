import type { SocialPost } from "@/types/social";

/**
 * Curated development placeholders, not an Instagram feed. A future manual
 * curator or approved Instagram API adapter can populate the same contract.
 */
export const instagramSeed: readonly SocialPost[] = [
  {
    id: "social-campus-01",
    title: "A place to begin",
    caption: "Sample social frame — approved school media can be curated here later.",
    thumbnail: null,
    postUrl: null,
    postDate: null,
    visibility: "public",
    status: "published",
    source: "manual",
    galleryMediaSlug: "sample-campus-perspective",
    order: 1,
    isPlaceholder: true,
  },
  {
    id: "social-classroom-01",
    title: "Everyday learning",
    caption: "Sample social frame — approved school media can be curated here later.",
    thumbnail: null,
    postUrl: null,
    postDate: null,
    visibility: "public",
    status: "published",
    source: "manual",
    galleryMediaSlug: "sample-classroom-moment",
    order: 2,
    isPlaceholder: true,
  },
  {
    id: "social-activities-01",
    title: "Creative energy",
    caption: "Sample social frame — approved school media can be curated here later.",
    thumbnail: null,
    postUrl: null,
    postDate: null,
    visibility: "public",
    status: "published",
    source: "manual",
    galleryMediaSlug: "sample-creative-activity",
    order: 3,
    isPlaceholder: true,
  },
  {
    id: "social-cultural-01",
    title: "Shared moments",
    caption: "Sample social frame — approved school media can be curated here later.",
    thumbnail: null,
    postUrl: null,
    postDate: null,
    visibility: "public",
    status: "published",
    source: "manual",
    galleryMediaSlug: "sample-cultural-moment",
    order: 4,
    isPlaceholder: true,
  },
] as const;
