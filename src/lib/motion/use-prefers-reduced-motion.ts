"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";

export function usePrefersReducedMotion(): boolean {
  const preference = useReducedMotion() ?? false;
  const hasMounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  return hasMounted && preference;
}
