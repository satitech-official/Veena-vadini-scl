"use client";

import Link from "next/link";
import { type KeyboardEvent, useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";

import { academicLevels } from "@/content/homepage";
import { buttonStyles } from "@/components/ui/button";
import { usePrefersReducedMotion } from "@/lib/motion/use-prefers-reduced-motion";
import { cn } from "@/lib/utils/cn";

export function AcademicsPreview() {
  const [activeId, setActiveId] = useState<(typeof academicLevels)[number]["id"]>(academicLevels[0].id);
  const prefersReducedMotion = usePrefersReducedMotion();
  const tabGroupId = useId();
  const activeLevel = academicLevels.find((level) => level.id === activeId) ?? academicLevels[0];

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const keyActions: Record<string, number> = {
      ArrowLeft: (index - 1 + academicLevels.length) % academicLevels.length,
      ArrowRight: (index + 1) % academicLevels.length,
      End: academicLevels.length - 1,
      Home: 0,
    };
    const nextIndex = keyActions[event.key];

    if (nextIndex === undefined) return;

    event.preventDefault();
    const nextLevel = academicLevels[nextIndex];
    setActiveId(nextLevel.id);
    document.getElementById(`${tabGroupId}-${nextLevel.id}-tab`)?.focus();
  }

  return (
    <div className="academics-shell">
      <div aria-label="Academic levels" className="academics-tabs" role="tablist">
        {academicLevels.map((level, index) => {
          const isActive = level.id === activeLevel.id;

          return (
            <button
              aria-controls={`${tabGroupId}-${level.id}`}
              aria-selected={isActive}
              className={cn("academics-tab", isActive && "academics-tab-active")}
              id={`${tabGroupId}-${level.id}-tab`}
              key={level.id}
              onClick={() => setActiveId(level.id)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              role="tab"
              tabIndex={isActive ? 0 : -1}
              type="button"
            >
              <span className="academics-tab-number">0{index + 1}</span>
              <span>{level.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence initial={false} mode="wait">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          aria-labelledby={`${tabGroupId}-${activeLevel.id}-tab`}
          className="academics-panel"
          id={`${tabGroupId}-${activeLevel.id}`}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          key={activeLevel.id}
          role="tabpanel"
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="academics-panel-mark" aria-hidden="true">
            <span>{activeLevel.classes}</span>
            <strong>{activeLevel.label}</strong>
          </div>
          <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(15rem,0.72fr)] lg:gap-12 lg:p-12">
            <div>
              <p className="type-eyebrow text-gold">Learning focus</p>
              <p className="mt-5 font-display text-[clamp(2rem,3.35vw,3.55rem)] leading-[0.96] tracking-[-0.05em] text-white">
                {activeLevel.focus}
              </p>
              <Link className={cn(buttonStyles({ size: "lg" }), "group mt-9 border-gold bg-gold text-primary hover:border-white hover:bg-white")} href="/academics">
                Explore Academics
                <ArrowRight
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  size={17}
                />
              </Link>
            </div>
            <div className="border-t border-white/18 pt-6 lg:border-l lg:border-t-0 lg:pl-9 lg:pt-0">
              <p className="type-eyebrow text-gold">Learning approach</p>
              <ul className="mt-5 space-y-3">
                {activeLevel.approach.map((item) => (
                  <li className="flex gap-3 text-sm leading-6 text-white/82" key={item}>
                    <Check aria-hidden="true" className="mt-1 shrink-0 text-gold" size={14} strokeWidth={2.2} />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-t border-white/15 pt-5">
                <p className="type-eyebrow text-white/55">Skills developed</p>
                <p className="mt-2 text-sm leading-6 text-white/85">{activeLevel.skills}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
