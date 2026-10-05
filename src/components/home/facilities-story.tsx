"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { facilities } from "@/content/homepage";
import { SchoolMediaPlaceholder } from "@/components/home/school-media-placeholder";
import { usePrefersReducedMotion } from "@/lib/motion/use-prefers-reduced-motion";
import { cn } from "@/lib/utils/cn";

export function FacilitiesStory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const prefersReducedMotion = usePrefersReducedMotion();
  const activeFacility = facilities[activeIndex];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (!visibleEntry) return;

        const index = itemRefs.current.findIndex((element) => element === visibleEntry.target);
        if (index >= 0) setActiveIndex(index);
      },
      { rootMargin: "-24% 0px -54% 0px", threshold: [0.18, 0.4, 0.65] },
    );

    itemRefs.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(18rem,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="facilities-story-visual"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            key={activeFacility.title}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <SchoolMediaPlaceholder
              className="aspect-[5/4] min-h-[22rem] lg:aspect-[4/5] lg:min-h-[31rem]"
              index={activeFacility.number}
              media={activeFacility.media}
            />
            <div className="mt-5 flex items-start gap-4">
              <span className="mt-3 h-px w-10 bg-gold" />
              <p className="max-w-sm text-sm leading-6 text-muted">{activeFacility.description}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <ol className="facilities-list border-t border-brand-indigo/15">
        {facilities.map((facility, index) => {
          const isActive = index === activeIndex;

          return (
            <li
              className={cn("facilities-item border-b border-brand-indigo/15", isActive && "facilities-item-active")}
              key={facility.number}
              ref={(element) => {
                itemRefs.current[index] = element;
              }}
            >
              <button
                aria-current={isActive ? "true" : undefined}
                className="grid w-full grid-cols-[3rem_minmax(0,1fr)_auto] gap-3 py-7 text-left sm:grid-cols-[4rem_minmax(0,1fr)_auto] sm:gap-5 sm:py-9"
                onClick={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                type="button"
              >
                <span className="font-display text-2xl tracking-[-0.06em] text-gold-ink">{facility.number}</span>
                <span>
                  <span className="block font-display text-[clamp(1.7rem,3vw,3.25rem)] leading-[0.92] tracking-[-0.055em] text-primary">
                    {facility.title}
                  </span>
                  <span className="mt-4 block max-w-xl text-sm leading-6 text-muted">{facility.description}</span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className={cn(
                    "mt-1 transition-all duration-300",
                    isActive ? "translate-x-0.5 -translate-y-0.5 text-brand-red" : "text-primary/35",
                  )}
                  size={21}
                  strokeWidth={1.5}
                />
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
