import { instagramSeed } from "@/content/social/instagram-seed";
import type { SocialPost } from "@/types/social";

export type SocialRepository = {
  getInstagramPosts(limit?: number): Promise<SocialPost[]>;
};

/**
 * Local curation boundary. Replace with a manual CMS or approved Instagram API
 * adapter later; none of the UI needs to know how posts are sourced.
 */
class LocalSocialRepository implements SocialRepository {
  async getInstagramPosts(limit = 4) {
    return instagramSeed
      .filter((post) => post.visibility === "public" && post.status === "published")
      .toSorted((left, right) => left.order - right.order)
      .slice(0, limit);
  }
}

export const socialRepository: SocialRepository = new LocalSocialRepository();
export const getInstagramPosts = (limit?: number) => socialRepository.getInstagramPosts(limit);
