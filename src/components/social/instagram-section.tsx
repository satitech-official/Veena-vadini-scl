import { ArrowUpRight } from "lucide-react";

import { GalleryMediaVisual } from "@/components/gallery/gallery-media-visual";
import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { getGalleryItems } from "@/lib/gallery/gallery-repository";
import { getPublicSchoolSettings } from "@/lib/settings/settings-repository";
import { getCmsText } from "@/lib/settings/cms-content";
import { getInstagramPosts } from "@/lib/social/social-repository";
import { cn } from "@/lib/utils/cn";

export async function InstagramSection() {
  const [posts, galleryItems, settings] = await Promise.all([getInstagramPosts(), getGalleryItems(), getPublicSchoolSettings()]);
  const galleryBySlug = new Map(galleryItems.map((item) => [item.slug, item]));
  const curatedFrames = posts.flatMap((post) => {
    const item = post.galleryMediaSlug ? galleryBySlug.get(post.galleryMediaSlug) : undefined;
    return item ? [{ item, post }] : [];
  });
  const heading = getCmsText(settings.cmsContent, "social", "heading", "Follow Our");
  const description = getCmsText(settings.cmsContent, "social", "description", "A considered, future-ready space for the school’s approved visual moments. This is not a live Instagram feed.");

  return (
    <section className="instagram-section relative overflow-hidden bg-surface py-20 sm:py-28 lg:py-36" id="instagram">
      <div aria-hidden="true" className="instagram-ghost">FOLLOW</div>
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[minmax(15rem,0.55fr)_minmax(0,1.45fr)] lg:items-end lg:gap-20">
          <div>
            <p className="type-eyebrow text-brand-red">Social journey</p>
            <h2 className="mt-5 font-display text-[clamp(3rem,5.7vw,6.35rem)] leading-[0.82] tracking-[-0.07em] text-primary">{heading}<br /><span className="text-brand-red">School Journey.</span></h2>
            <p className="mt-7 max-w-sm text-base leading-7 text-muted">{description}</p>
            <a aria-label={`Follow ${settings.name} on Instagram`} className={cn(buttonStyles({ size: "lg" }), "group mt-8")} href={settings.social.instagram.href} rel="noreferrer" target="_blank">
              <InstagramIcon aria-hidden="true" size={17} />
              Follow on Instagram
              <ArrowUpRight aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={16} />
            </a>
          </div>
          <div className="instagram-composition">
            {curatedFrames.map(({ item, post }, index) => (
              <div className={`instagram-frame instagram-frame-${index + 1}`} key={post.id}>
                <GalleryMediaVisual item={item} priority={index === 0} />
                <div className="instagram-frame-meta">
                  <span className="type-eyebrow text-brand-red">{post.title}</span>
                  <span className="font-display text-xl tracking-[-0.06em] text-gold-ink">{String(index + 1).padStart(2, "0")}</span>
                </div>
              </div>
            ))}
            <div className="instagram-handle-panel">
              <InstagramIcon aria-hidden="true" className="text-gold-ink" size={20} />
              <p className="mt-4 font-display text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[0.9] tracking-[-0.06em] text-primary">{settings.social.instagram.handle}</p>
              <p className="mt-3 text-xs font-semibold leading-5 text-muted">Curated placeholder composition · approved media can replace each frame.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
