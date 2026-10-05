"use client";

import { useCallback, useState } from "react";

import { IntroPreloader } from "@/components/experience/intro-preloader";
import { Hero } from "@/components/home/hero";
import { SiteHeader } from "@/components/layout/site-header";

export function FirstExperience() {
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const handleIntroComplete = useCallback(() => setIsIntroComplete(true), []);

  return (
    <>
      <SiteHeader isIntroComplete={isIntroComplete} />
      <Hero isReady={isIntroComplete} />
      <IntroPreloader onComplete={handleIntroComplete} />
    </>
  );
}
