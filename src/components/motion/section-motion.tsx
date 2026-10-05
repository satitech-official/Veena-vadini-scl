"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { useMotionProfile } from "@/lib/motion/use-motion-profile";

const excludedSectionIds = new Set(["facilities", "student-life"]);
// Facilities is a long-form scroller. Its chapters must never wait behind a
// percentage-based observer threshold, which can otherwise present warm-paper
// space before the next chapter has enough viewport area to reveal.
const alwaysVisibleSectionClasses = new Set([
  "internal-facilities-intro",
  "internal-facilities-chapters",
  "internal-facilities-cta",
]);

/**
 * Adds one measured entrance per chapter rather than animating individual body
 * copy. Elements begin visible without JavaScript and settle immediately when
 * reduced motion is requested.
 */
export function SectionMotion() {
  const pathname = usePathname();
  const { prefersReducedMotion } = useMotionProfile();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const page = document.querySelector(".page-transition-shell");
    if (!page) {
      return;
    }

    const sections = Array.from(
      page.querySelectorAll<HTMLElement>("main > section:not(.hero-section):not(.internal-page-hero)"),
    ).filter(
      (section) =>
        !excludedSectionIds.has(section.id) &&
        !Array.from(section.classList).some((className) => alwaysVisibleSectionClasses.has(className)),
    );
    const footer = document.querySelector<HTMLElement>(".site-footer");
    const targets = footer ? [...sections, footer] : sections;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const target = entry.target as HTMLElement;
          target.classList.add("motion-section-visible");
          observer.unobserve(target);
        });
      },
      { rootMargin: "0px 0px -9% 0px", threshold: 0.12 },
    );
    // Streaming route content can still be hydrating when this layout effect
    // becomes eligible. Deferring one short task prevents class mutations from
    // racing React hydration while preserving the existing reveal timing.
    const timer = window.setTimeout(() => {
      targets.forEach((target) => {
        target.classList.add("motion-section-pending");
        observer.observe(target);
      });
    }, 80);

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
      targets.forEach((target) => {
        target.classList.remove("motion-section-pending", "motion-section-visible");
      });
    };
  }, [pathname, prefersReducedMotion]);

  return null;
}
