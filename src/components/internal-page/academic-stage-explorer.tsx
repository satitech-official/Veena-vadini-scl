"use client";

import { type KeyboardEvent, useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";

import { SchoolMediaPlaceholder } from "@/components/home/school-media-placeholder";
import { buttonStyles } from "@/components/ui/button";
import { internalAcademicStages } from "@/content/internal-pages";
import { usePrefersReducedMotion } from "@/lib/motion/use-prefers-reduced-motion";
import { cn } from "@/lib/utils/cn";

export function AcademicStageExplorer() {
  const [activeId, setActiveId] = useState<(typeof internalAcademicStages)[number]["id"]>(internalAcademicStages[0].id);
  const prefersReducedMotion = usePrefersReducedMotion();
  const tabGroupId = useId();
  const activeStage = internalAcademicStages.find((stage) => stage.id === activeId) ?? internalAcademicStages[0];

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const nextIndexByKey: Record<string, number> = {
      ArrowDown: (index + 1) % internalAcademicStages.length,
      ArrowUp: (index - 1 + internalAcademicStages.length) % internalAcademicStages.length,
      End: internalAcademicStages.length - 1,
      Home: 0,
    };
    const nextIndex = nextIndexByKey[event.key];
    if (nextIndex === undefined) return;

    event.preventDefault();
    const nextStage = internalAcademicStages[nextIndex];
    setActiveId(nextStage.id);
    document.getElementById(`${tabGroupId}-${nextStage.id}-tab`)?.focus();
  }

  return (
    <div className="academic-stage-explorer">
      <div aria-label="Academic stages" className="academic-stage-tabs" role="tablist">
        {internalAcademicStages.map((stage, index) => {
          const isActive = stage.id === activeStage.id;
          return (
            <button
              aria-controls={`${tabGroupId}-${stage.id}-panel`}
              aria-selected={isActive}
              className={cn("academic-stage-tab", isActive && "academic-stage-tab-active")}
              id={`${tabGroupId}-${stage.id}-tab`}
              key={stage.id}
              onClick={() => setActiveId(stage.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              role="tab"
              tabIndex={isActive ? 0 : -1}
              type="button"
            >
              <span>{stage.number}</span>
              <strong>{stage.label}</strong>
              <small>{stage.classes.join(" · ")}</small>
            </button>
          );
        })}
      </div>

      <AnimatePresence initial={false} mode="wait">
        <motion.section
          animate={{ opacity: 1, y: 0 }}
          aria-labelledby={`${tabGroupId}-${activeStage.id}-tab`}
          className="academic-stage-panel"
          id={`${tabGroupId}-${activeStage.id}-panel`}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          key={activeStage.id}
          role="tabpanel"
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="academic-stage-panel-media">
            <SchoolMediaPlaceholder className="h-full min-h-[22rem]" index={activeStage.number} media={activeStage.media} />
          </div>
          <div className="academic-stage-panel-copy">
            <p className="type-eyebrow text-gold">{activeStage.classes.join(" / ")}</p>
            <h2>{activeStage.title}</h2>
            <p>{activeStage.description}</p>
            <div className="academic-stage-focus">
              {activeStage.focus.map((item) => (
                <span key={item}><Check aria-hidden="true" size={14} />{item}</span>
              ))}
            </div>
            <a className={cn(buttonStyles({ size: "lg" }), "group mt-9 border-gold bg-gold text-primary hover:border-white hover:bg-white")} href="/admissions">
              Explore Admissions
              <ArrowRight aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" size={17} />
            </a>
          </div>
        </motion.section>
      </AnimatePresence>
    </div>
  );
}
