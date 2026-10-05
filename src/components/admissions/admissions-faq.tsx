"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus } from "lucide-react";

import { admissionFaqs } from "@/config/admissions";
import { usePrefersReducedMotion } from "@/lib/motion/use-prefers-reduced-motion";
import { cn } from "@/lib/utils/cn";

export function AdmissionsFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const id = useId();
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="admissions-faq border-t border-brand-indigo/15">
      {admissionFaqs.map((item, index) => {
        const isOpen = openIndex === index;
        const headingId = `${id}-heading-${index}`;
        const panelId = `${id}-panel-${index}`;

        return (
          <article className="border-b border-brand-indigo/15" key={item.question}>
            <h3 id={headingId}>
              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                className="group flex w-full items-center justify-between gap-5 py-6 text-left sm:py-7"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                type="button"
              >
                <span className="flex min-w-0 items-center gap-4 sm:gap-6">
                  <span className="font-display text-2xl tracking-[-0.06em] text-gold-ink">{String(index + 1).padStart(2, "0")}</span>
                  <span className="font-display text-[clamp(1.45rem,2.6vw,2.35rem)] leading-[0.98] tracking-[-0.045em] text-primary">
                    {item.question}
                  </span>
                </span>
                <span className={cn("grid size-9 shrink-0 place-items-center border border-brand-indigo/16 text-primary transition-colors group-hover:border-brand-red group-hover:text-brand-red", isOpen && "border-brand-red text-brand-red")}>
                  {isOpen ? <Minus aria-hidden="true" size={17} /> : <Plus aria-hidden="true" size={17} />}
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  animate={{ height: "auto", opacity: 1 }}
                  aria-labelledby={headingId}
                  className="overflow-hidden"
                  exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  id={panelId}
                  initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                  role="region"
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="max-w-2xl pb-7 pl-[3.5rem] text-base leading-7 text-muted sm:pl-[4.55rem]">{item.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </article>
        );
      })}
    </div>
  );
}
