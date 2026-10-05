"use client";

import { motion } from "motion/react";

import { admissionProcess } from "@/config/admissions";
import { usePrefersReducedMotion } from "@/lib/motion/use-prefers-reduced-motion";
import { cn } from "@/lib/utils/cn";

type AdmissionJourneyProps = {
  tone?: "dark" | "light";
};

export function AdmissionJourney({ tone = "dark" }: AdmissionJourneyProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <ol className={cn("admission-journey", tone === "dark" ? "admission-journey-dark" : "admission-journey-light")}>
      {admissionProcess.map((step, index) => (
        <motion.li
          className="admission-journey-step"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          key={step.number}
          transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ amount: 0.35, once: true }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        >
          <span className="admission-journey-number">{step.number}</span>
          <div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
