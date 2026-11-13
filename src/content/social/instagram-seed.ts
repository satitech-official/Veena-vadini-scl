import type { SocialPost } from "@/types/social";

/**
 * Curated development placeholders, not an Instagram feed. A future manual
 * curator or approved Instagram API adapter can populate the same contract.
 */
export const instagramSeed: readonly SocialPost[] = [
  {
    id: "social-campus-01",
    title: "A place to begin",
    caption: "A real Veena Vadini Public School moment from our growing school-life gallery.",
    thumbnail: null,
    postUrl: null,
    postDate: null,
    visibility: "public",
    status: "published",
    source: "manual",
    galleryMediaSlug: "sample-campus-perspective",
    order: 1,
    isPlaceholder: false,
  },
  {
    id: "social-classroom-01",
    title: "Everyday learning",
    caption: "A real Veena Vadini Public School moment from our growing school-life gallery.",
    thumbnail: null,
    postUrl: null,
    postDate: null,
    visibility: "public",
    status: "published",
    source: "manual",
    galleryMediaSlug: "sample-classroom-moment",
    order: 2,
    isPlaceholder: false,
  },
  {
    id: "social-activities-01",
    title: "Creative energy",
    caption: "A real Veena Vadini Public School moment from our growing school-life gallery.",
    thumbnail: null,
    postUrl: null,
    postDate: null,
    visibility: "public",
    status: "published",
    source: "manual",
    galleryMediaSlug: "sample-creative-activity",
    order: 3,
    isPlaceholder: false,
  },
  {
    id: "social-cultural-01",
    title: "Shared moments",
    caption: "A real Veena Vadini Public School moment from our growing school-life gallery.",
    thumbnail: null,
    postUrl: null,
    postDate: null,
    visibility: "public",
    status: "published",
    source: "manual",
    galleryMediaSlug: "sample-cultural-moment",
    order: 4,
    isPlaceholder: false,
  },
] as const;
