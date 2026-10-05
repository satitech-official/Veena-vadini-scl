"use client";

import { useSyncExternalStore } from "react";

import { usePrefersReducedMotion } from "@/lib/motion/use-prefers-reduced-motion";

const compactMotionQuery = "(max-width: 47.99rem), (pointer: coarse)";

function subscribeToCompactMotion(callback: () => void) {
  const query = window.matchMedia(compactMotionQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getCompactMotionSnapshot() {
  return window.matchMedia(compactMotionQuery).matches;
}

/**
 * Keeps continuous or scroll-linked movement off compact and touch-first
 * devices, while retaining short feedback transitions for direct interactions.
 */
export function useMotionProfile() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isCompactMotion = useSyncExternalStore(
    subscribeToCompactMotion,
    getCompactMotionSnapshot,
    () => false,
  );

  return { isCompactMotion, prefersReducedMotion };
}
