"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

import { useMotionProfile } from "@/lib/motion/use-motion-profile";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { isCompactMotion, prefersReducedMotion } = useMotionProfile();
  const shouldReduce = prefersReducedMotion;

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="page-transition-shell flex flex-1 flex-col"
      initial={shouldReduce ? false : { opacity: 0, y: isCompactMotion ? 4 : 10 }}
      key={pathname}
      transition={shouldReduce ? { duration: 0 } : { duration: isCompactMotion ? 0.22 : 0.38, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
