"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let isScrollTriggerRegistered = false;

/**
 * Register ScrollTrigger lazily from the client component that genuinely needs it.
 * This avoids a global scroll listener during the foundation phase.
 */
export function getGsap() {
  if (typeof window !== "undefined" && !isScrollTriggerRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    isScrollTriggerRegistered = true;
  }

  return gsap;
}
