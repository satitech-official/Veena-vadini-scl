import type { Transition, Variants } from "motion/react";

export const motionDuration = {
  fast: 0.18,
  base: 0.3,
  slow: 0.65,
  cinematic: 0.9,
} as const;

export const motionEase = [0.22, 1, 0.36, 1] as [
  number,
  number,
  number,
  number,
];

export const defaultTransition: Transition = {
  duration: motionDuration.slow,
  ease: motionEase,
};

export const fadeReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: defaultTransition },
};

export const staggerReveal: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.04,
    },
  },
};

export const maskedTextReveal: Variants = {
  hidden: { y: "104%" },
  visible: { y: "0%", transition: defaultTransition },
};

export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: { opacity: 1, scale: 1, transition: defaultTransition },
};

export const subtleScaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.985 },
  visible: { opacity: 1, scale: 1, transition: defaultTransition },
};
