"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { whySchoolItems } from "@/content/homepage";
import { SchoolMediaPlaceholder } from "@/components/home/school-media-placeholder";
import { usePrefersReducedMotion } from "@/lib/motion/use-prefers-reduced-motion";
import { cn } from "@/lib/utils/cn";

export function WhyVeenaVadini() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const activeItem = whySchoolItems[activeIndex];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(19rem,0.74fr)_minmax(0,1.26fr)] lg:items-start lg:gap-16">
      <div className="lg:sticky lg:top-28">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            key={activeItem.title}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <SchoolMediaPlaceholder
              className="aspect-[4/5] min-h-[24rem] sm:aspect-[5/4] lg:aspect-[4/5]"
              index={activeItem.number}
              media={activeItem.media}
            />
            <p className="mt-4 border-l border-brand-red/40 pl-4 text-sm leading-6 text-muted">
              {activeItem.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <ol className="border-t border-brand-indigo/15">
        {whySchoolItems.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <li className="border-b border-brand-indigo/15" key={item.number}>
              <button
                aria-pressed={isActive}
                className={cn(
                  "group grid w-full grid-cols-[2.6rem_minmax(0,1fr)_auto] items-center gap-3 py-5 text-left transition-colors duration-300 sm:grid-cols-[3.2rem_minmax(0,1fr)_auto] sm:py-6",
                  isActive ? "text-brand-red" : "text-primary hover:text-brand-red",
                )}
                onClick={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                type="button"
              >
                <span className="font-display text-xl tracking-[-0.05em] text-gold-ink">{item.number}</span>
                <span className="font-display text-[clamp(1.45rem,2.25vw,2.35rem)] leading-[0.94] tracking-[-0.045em]">
                  {item.title}
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className={cn(
                    "transition-all duration-300",
                    isActive ? "translate-x-0.5 -translate-y-0.5 opacity-100" : "opacity-35 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100",
                  )}
                  size={20}
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
