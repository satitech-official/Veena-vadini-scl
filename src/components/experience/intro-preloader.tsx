"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { usePublicSchoolSettings } from "@/components/settings/public-school-settings-provider";

type IntroPreloaderProps = {
  onComplete: () => void;
};

const INTRO_SESSION_KEY = "vvps-intro-seen";

export function IntroPreloader({ onComplete }: IntroPreloaderProps) {
  const settings = usePublicSchoolSettings();
  const [isVisible, setIsVisible] = useState(true);
  const hasCompleted = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  const complete = useCallback(() => {
    if (hasCompleted.current) {
      return;
    }

    hasCompleted.current = true;
    window.sessionStorage.setItem(INTRO_SESSION_KEY, "true");
    setIsVisible(false);
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const hasSeenIntro = window.sessionStorage.getItem(INTRO_SESSION_KEY) === "true";
    const duration = hasSeenIntro || prefersReducedMotion ? 260 : 2150;
    const timer = window.setTimeout(complete, duration);

    return () => window.clearTimeout(timer);
  }, [complete, prefersReducedMotion]);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isVisible]);

  const introTransition = prefersReducedMotion
    ? { duration: 0.18, ease: "easeOut" as const }
    : { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.section
          animate={{ opacity: 1 }}
          aria-label="Loading Veena Vadini Public School"
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-primary px-6 text-white"
          exit={{ opacity: 0, transition: { duration: prefersReducedMotion ? 0.16 : 0.48 } }}
          initial={{ opacity: 1 }}
          role="status"
        >
          <div aria-hidden="true" className="intro-grid absolute inset-0 opacity-35" />
          <motion.div
            animate={{ scale: 1, opacity: 1 }}
            className="relative flex w-full max-w-md flex-col items-center text-center"
            initial={{ scale: 0.97, opacity: 0 }}
            transition={introTransition}
          >
            <motion.div
              animate={{ scale: 1, opacity: 1 }}
              className="relative grid size-28 place-items-center rounded-full border border-gold/75 sm:size-32"
              initial={{ scale: 0.72, opacity: 0 }}
              transition={{ ...introTransition, delay: prefersReducedMotion ? 0 : 0.08 }}
            >
              <span className="absolute inset-[0.4rem] rounded-full border border-white/30" />
              <span className="absolute inset-[-0.4rem] rounded-full border border-gold/30" />
              <div className="relative size-[4.7rem] overflow-hidden rounded-full bg-surface p-1.5 sm:size-[5.25rem]">
                <Image
                  alt=""
                  className="object-contain"
                  fill
                  sizes="84px"
                  src={settings.brand.temporaryLogoPath}
                />
              </div>
            </motion.div>

            <div className="mt-9 overflow-hidden">
              <motion.p
                animate={{ y: 0, opacity: 1 }}
                className="font-display text-[clamp(2rem,5vw,3.1rem)] leading-[0.83] tracking-[-0.045em]"
                initial={{ y: "110%", opacity: 0 }}
                transition={{ ...introTransition, delay: prefersReducedMotion ? 0 : 0.34 }}
              >
                <span className="block">VEENA VADINI</span>
                <span className="block">PUBLIC SCHOOL</span>
              </motion.p>
            </div>

            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-gold"
              initial={{ opacity: 0, y: 8 }}
              transition={{ ...introTransition, delay: prefersReducedMotion ? 0 : 0.62 }}
            >
              {settings.motto.replaceAll(". ", " • ").replace(".", "")}
            </motion.p>
          </motion.div>

          <motion.div
            animate={{ scaleX: 1 }}
            className="absolute bottom-[17%] left-[12%] right-[12%] h-px origin-left bg-gold sm:left-[18%] sm:right-[18%]"
            initial={{ scaleX: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.15 : 0.72, delay: prefersReducedMotion ? 0 : 0.98 }}
          />
          <motion.div
            animate={{ scaleX: 1 }}
            className="absolute inset-x-0 bottom-0 h-1 origin-left bg-brand-red"
            initial={{ scaleX: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.18 : 0.7, delay: prefersReducedMotion ? 0 : 1.36 }}
          />

          <button
            className="type-eyebrow absolute bottom-7 right-7 border-b border-white/40 pb-1 text-white/85 transition-colors hover:border-gold hover:text-gold"
            onClick={complete}
            type="button"
          >
            Skip intro
          </button>
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}
