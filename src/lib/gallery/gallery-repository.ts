import { gallerySeed, videoSeed } from "@/content/gallery/gallery-seed";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getSupabaseGalleryResult } from "@/lib/supabase/public-content";
import type { PublicContentResult } from "@/lib/content/public-content-result";
import type { GalleryCategory, GalleryItemCategory, GalleryMediaItem, GalleryVideo } from "@/types/gallery";

export type GalleryRepository = {
  getGalleryItems(): Promise<GalleryMediaItem[]>;
  getGalleryItemsByCategory(category: GalleryCategory): Promise<GalleryMediaItem[]>;
  getFeaturedGalleryItems(limit?: number): Promise<GalleryMediaItem[]>;
  getGalleryItemBySlug(slug: string): Promise<GalleryMediaItem | null>;
  getVideos(): Promise<GalleryVideo[]>;
};

function visiblePublished<T extends { order: number; status: string; visibility: string }>(items: readonly T[]) {
  return items
    .filter((item) => item.visibility === "public" && item.status === "published")
    .toSorted((left, right) => left.order - right.order);
}

/**
 * Local development implementation. A future Supabase repository can implement
 * this same contract so pages and gallery components remain unchanged.
 */
class LocalGalleryRepository implements GalleryRepository {
  async getGalleryItems() {
    return visiblePublished(gallerySeed);
  }

  async getGalleryItemsByCategory(category: GalleryCategory) {
    const items = await this.getGalleryItems();
    return category === "All" ? items : items.filter((item) => item.category === category);
  }

  async getFeaturedGalleryItems(limit = 6) {
    return (await this.getGalleryItems()).filter((item) => item.featured).slice(0, limit);
  }

  async getGalleryItemBySlug(slug: string) {
    return (await this.getGalleryItems()).find((item) => item.slug === slug) ?? null;
  }

  async getVideos() {
    return visiblePublished(videoSeed);
  }
}

class SupabaseGalleryRepository implements GalleryRepository {
  async getGalleryItems() {
    return (await getSupabaseGalleryResult()).data.items;
  }

  async getGalleryItemsByCategory(category: GalleryCategory) {
    const items = await this.getGalleryItems();
    return category === "All" ? items : items.filter((item) => item.category === category);
  }

  async getFeaturedGalleryItems(limit = 6) {
    return (await this.getGalleryItems()).filter((item) => item.featured).slice(0, limit);
  }

  async getGalleryItemBySlug(slug: string) {
    return (await this.getGalleryItems()).find((item) => item.slug === slug) ?? null;
  }

  async getVideos() {
    return (await getSupabaseGalleryResult()).data.videos;
  }
}

export const galleryRepository: GalleryRepository = isSupabaseConfigured()
  ? new SupabaseGalleryRepository()
  : new LocalGalleryRepository();

export async function getGalleryContentResult(): Promise<PublicContentResult<{ items: GalleryMediaItem[]; videos: GalleryVideo[] }>> {
  if (isSupabaseConfigured()) {
    const result = await getSupabaseGalleryResult();
    return { records: result.data, hasLoadError: result.hasError };
  }

  const [items, videos] = await Promise.all([galleryRepository.getGalleryItems(), galleryRepository.getVideos()]);
  return { records: { items, videos }, hasLoadError: false };
}

export const getGalleryItems = async () => (await getGalleryContentResult()).records.items;
export const getGalleryItemsByCategory = (category: GalleryItemCategory | "All") =>
  galleryRepository.getGalleryItemsByCategory(category);
export const getFeaturedGalleryItems = (limit?: number) => galleryRepository.getFeaturedGalleryItems(limit);
export const getGalleryItemBySlug = (slug: string) => galleryRepository.getGalleryItemBySlug(slug);
export const getVideos = () => galleryRepository.getVideos();
