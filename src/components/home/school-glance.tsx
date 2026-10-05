"use client";

import { motion } from "motion/react";

import { schoolGlanceItems } from "@/content/homepage";
import { defaultTransition, motionEase } from "@/lib/motion/config";
import { usePrefersReducedMotion } from "@/lib/motion/use-prefers-reduced-motion";

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...defaultTransition, ease: motionEase },
  },
};

export function SchoolGlance() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.ol
      animate={prefersReducedMotion ? "visible" : undefined}
      className="school-glance-grid"
      initial={prefersReducedMotion ? false : "hidden"}
      variants={prefersReducedMotion ? undefined : listVariants}
      viewport={{ amount: 0.18, once: true }}
      whileInView={prefersReducedMotion ? undefined : "visible"}
    >
      {schoolGlanceItems.map((item) => (
        <motion.li className="school-glance-item" key={item.number} variants={itemVariants}>
          <span className="school-glance-number">{item.number}</span>
          <div>
            <h3 className="font-display text-[clamp(1.55rem,2.2vw,2.35rem)] leading-[0.95] tracking-[-0.045em] text-primary">
              {item.label}
            </h3>
            <p className="mt-3 max-w-xs text-sm leading-6 text-muted">{item.description}</p>
          </div>
        </motion.li>
      ))}
    </motion.ol>
  );
}
