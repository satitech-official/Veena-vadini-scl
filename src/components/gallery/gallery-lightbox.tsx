"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, type PointerEvent, type RefObject } from "react";
import { motion } from "motion/react";

import { GalleryMediaVisual } from "@/components/gallery/gallery-media-visual";
import { useAccessibleDialog } from "@/components/gallery/use-accessible-dialog";
import { IconButton } from "@/components/ui/icon-button";
import { usePrefersReducedMotion } from "@/lib/motion/use-prefers-reduced-motion";
import type { GalleryMediaItem } from "@/types/gallery";

type GalleryLightboxProps = {
  activeIndex: number;
  items: GalleryMediaItem[];
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
  returnFocusRef: RefObject<HTMLElement | null>;
};

export function GalleryLightbox({ activeIndex, items, onClose, onNavigate, returnFocusRef }: GalleryLightboxProps) {
  const pointerStartX = useRef<number | null>(null);
  const { closeButtonRef, dialogRef } = useAccessibleDialog({ isOpen: true, onClose, returnFocusRef });
  const prefersReducedMotion = usePrefersReducedMotion();
  const itemCount = Math.max(items.length, 1);
  const previousIndex = (activeIndex - 1 + itemCount) % itemCount;
  const nextIndex = (activeIndex + 1) % itemCount;

  useEffect(() => {
    const handleArrowNavigation = (event: KeyboardEvent) => {
      if (items.length < 2) {
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onNavigate(previousIndex);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onNavigate(nextIndex);
      }
    };
    document.addEventListener("keydown", handleArrowNavigation);
    return () => document.removeEventListener("keydown", handleArrowNavigation);
  }, [items.length, nextIndex, onNavigate, previousIndex]);

  const item = items[activeIndex];
  if (!item) {
    return null;
  }

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null) {
      return;
    }
    const delta = event.clientX - pointerStartX.current;
    pointerStartX.current = null;
    if (Math.abs(delta) < 52 || items.length < 2) {
      return;
    }
    onNavigate(delta < 0 ? nextIndex : previousIndex);
  };

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
        aria-describedby="gallery-lightbox-caption"
        aria-label={`${item.title}, image ${activeIndex + 1} of ${items.length}`}
        aria-modal="true"
        className="gallery-lightbox-dialog"
        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.985, y: 8 }}
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.985, y: 12 }}
        ref={dialogRef}
        role="dialog"
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="gallery-lightbox-topbar">
          <p className="type-eyebrow text-gold">{item.category}</p>
          <IconButton className="gallery-lightbox-icon-button" label="Close gallery image" onClick={onClose} ref={closeButtonRef} variant="secondary">
            <X aria-hidden="true" size={19} />
          </IconButton>
        </div>

        <div className="gallery-lightbox-stage" onPointerDown={(event) => { pointerStartX.current = event.clientX; }} onPointerUp={handlePointerUp}>
          <div className="gallery-lightbox-media">
            <GalleryMediaVisual item={item} priority showReplacementNote={false} />
          </div>
        </div>

        <div className="gallery-lightbox-footer">
          <div id="gallery-lightbox-caption">
            <p className="font-display text-[clamp(1.7rem,3.3vw,3rem)] leading-[0.9] tracking-[-0.055em] text-white">{item.title}</p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/66">{item.caption}</p>
          </div>
          <div className="flex items-center gap-3">
            <span aria-live="polite" className="text-xs font-bold tracking-[0.12em] text-gold">{String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
            <div className="flex gap-2">
              <IconButton className="gallery-lightbox-icon-button" disabled={items.length < 2} label="Previous gallery image" onClick={() => onNavigate(previousIndex)} variant="secondary">
                <ChevronLeft aria-hidden="true" size={19} />
              </IconButton>
              <IconButton className="gallery-lightbox-icon-button" disabled={items.length < 2} label="Next gallery image" onClick={() => onNavigate(nextIndex)} variant="secondary">
                <ChevronRight aria-hidden="true" size={19} />
              </IconButton>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
