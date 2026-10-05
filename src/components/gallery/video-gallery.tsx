"use client";

import { Play, X } from "lucide-react";
import { useRef, useState, type RefObject } from "react";
import { AnimatePresence, motion } from "motion/react";

import { useAccessibleDialog } from "@/components/gallery/use-accessible-dialog";
import { IconButton } from "@/components/ui/icon-button";
import { usePrefersReducedMotion } from "@/lib/motion/use-prefers-reduced-motion";
import type { GalleryVideo } from "@/types/gallery";

type VideoGalleryProps = { videos: GalleryVideo[] };

export function VideoGallery({ videos }: VideoGalleryProps) {
  const [activeVideo, setActiveVideo] = useState<GalleryVideo | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  if (videos.length === 0) {
    return null;
  }

  return (
    <section className="gallery-video-chapter" id="video-gallery">
      <div className="grid gap-6 border-t border-white/18 pt-8 sm:grid-cols-[minmax(0,1fr)_minmax(14rem,0.5fr)] sm:items-end">
        <div>
          <p className="type-eyebrow text-gold">Video gallery</p>
          <h2 className="mt-4 font-display text-[clamp(2.7rem,4.5vw,5rem)] leading-[0.84] tracking-[-0.065em] text-white">Stories Ready to<br /><span className="text-gold">Move &amp; Be Heard.</span></h2>
        </div>
        <p className="max-w-sm text-sm leading-6 text-white/64 sm:justify-self-end">{videos.some((video) => video.isPlaceholder) ? "A future home for approved school films, activity highlights and campus tours. No video is published yet." : "Approved school films, activity highlights, and campus stories."}</p>
      </div>
      <div className="gallery-video-grid mt-10">
        {videos.map((video, index) => (
          <button
            className="gallery-video-card group text-left"
            key={video.id}
            onClick={(event) => {
              triggerRef.current = event.currentTarget;
              setActiveVideo(video);
            }}
            type="button"
          >
            <div aria-label={video.alt} className="gallery-video-poster" role="img">
              <div aria-hidden="true" className="gallery-video-poster-grid" />
              <span className="type-eyebrow text-gold">{video.isPlaceholder ? "Sample video" : "School video"} {String(index + 1).padStart(2, "0")}</span>
              <span aria-hidden="true" className="gallery-video-play"><Play fill="currentColor" size={17} /></span>
              <span className="max-w-[13rem] font-display text-3xl leading-[0.9] tracking-[-0.055em] text-white">{video.title}</span>
            </div>
            <span className="mt-4 flex items-center justify-between gap-4">
              <span>
                <span className="type-eyebrow text-gold">{video.category}</span>
                <span className="mt-2 block text-sm leading-6 text-white/64">{video.caption}</span>
              </span>
              <span className="gallery-view-indicator">View</span>
            </span>
          </button>
        ))}
      </div>
      <AnimatePresence initial={false}>
        {activeVideo ? <VideoDialog onClose={() => setActiveVideo(null)} returnFocusRef={triggerRef} video={activeVideo} /> : null}
      </AnimatePresence>
    </section>
  );
}

type VideoDialogProps = {
  video: GalleryVideo;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
};

function VideoDialog({ video, onClose, returnFocusRef }: VideoDialogProps) {
  const { closeButtonRef, dialogRef } = useAccessibleDialog({ isOpen: true, onClose, returnFocusRef });
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="gallery-lightbox"
      exit={{ opacity: 0 }}
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ opacity: 1, scale: 1, y: 0 }}
        aria-describedby="video-dialog-caption"
        aria-label={`${video.title} video placeholder`}
        aria-modal="true"
        className="gallery-video-dialog"
        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.985, y: 8 }}
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.985, y: 12 }}
        ref={dialogRef}
        role="dialog"
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="gallery-lightbox-topbar">
          <p className="type-eyebrow text-gold">Video gallery</p>
          <IconButton className="gallery-lightbox-icon-button" label="Close video dialog" onClick={onClose} ref={closeButtonRef} variant="secondary">
            <X aria-hidden="true" size={19} />
          </IconButton>
        </div>
        {video.videoUrl && !video.isPlaceholder ? (
          <video aria-label={video.alt} className="gallery-video-dialog-poster object-cover" controls playsInline poster={video.thumbnail ?? undefined} preload="metadata" src={video.videoUrl} />
        ) : (
          <div aria-label={video.alt} className="gallery-video-dialog-poster" role="img">
            <div aria-hidden="true" className="gallery-video-poster-grid" />
            <Play aria-hidden="true" className="text-gold" fill="currentColor" size={33} />
            <p className="mt-5 font-display text-[clamp(2.5rem,5vw,5rem)] leading-[0.84] tracking-[-0.065em] text-white">Approved video<br /><span className="text-gold">coming soon.</span></p>
          </div>
        )}
        <div id="video-dialog-caption" className="mt-7">
          <p className="font-display text-2xl leading-[0.9] tracking-[-0.055em] text-white">{video.title}</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/66">{video.caption}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
