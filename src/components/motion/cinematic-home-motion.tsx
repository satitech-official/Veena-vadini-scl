"use client";

import { useEffect } from "react";

import { getGsap } from "@/lib/motion/gsap";
import { useMotionProfile } from "@/lib/motion/use-motion-profile";

/** Desktop-only, scroll-linked accents for the two narrative home chapters. */
export function CinematicHomeMotion() {
  const { isCompactMotion, prefersReducedMotion } = useMotionProfile();

  useEffect(() => {
    if (isCompactMotion || prefersReducedMotion) {
      return;
    }

    const root = document.querySelector<HTMLElement>("main[data-cinematic-home]");
    if (!root) {
      return;
    }

    const gsap = getGsap();
    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add(
        {
          desktop: "(min-width: 64rem)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (motionContext) => {
          const { desktop, reduce } = motionContext.conditions as { desktop: boolean; reduce: boolean };
          if (!desktop || reduce) {
            return;
          }

          const facilityVisual = root.querySelector<HTMLElement>(".facilities-story-visual");
          if (facilityVisual) {
            gsap.fromTo(
              facilityVisual,
              { autoAlpha: 0.9, y: 22 },
              {
                autoAlpha: 1,
                ease: "none",
                scrollTrigger: {
                  end: "bottom 34%",
                  scrub: 0.45,
                  start: "top 78%",
                  trigger: "#facilities",
                },
                y: -10,
              },
            );
          }

          const studentMoments = gsap.utils.toArray<HTMLElement>(".student-life-collage .student-life-moment", root);
          if (studentMoments.length) {
            gsap.fromTo(
              studentMoments,
              { autoAlpha: 0, y: (index) => (index === 0 ? 30 : 18) },
              {
                autoAlpha: 1,
                duration: 0.86,
                ease: "power3.out",
                scrollTrigger: {
                  once: true,
                  start: "top 76%",
                  trigger: ".student-life-collage",
                },
                stagger: { amount: 0.34, from: "start" },
                y: 0,
              },
            );
          }

          const transitionRules = gsap.utils.toArray<HTMLElement>(
            ".vision-entry-rule, .student-life-transition-rule",
            root,
          );
          transitionRules.forEach((rule) => {
            gsap.fromTo(
              rule,
              { scaleX: 0, transformOrigin: "left center" },
              {
                ease: "none",
                scaleX: 1,
                scrollTrigger: {
                  end: "top 40%",
                  scrub: 0.35,
                  start: "top 82%",
                  trigger: rule.parentElement,
                },
              },
            );
          });
        },
      );

      return () => media.revert();
    }, root);

    return () => context.revert();
  }, [isCompactMotion, prefersReducedMotion]);

  return null;
}
