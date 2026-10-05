import type { Metadata } from "next";

import { AnnouncementRail } from "@/components/announcements/announcement-rail";
import { FirstExperience } from "@/components/home/first-experience";
import { HomeStory } from "@/components/home/home-story";
import { CinematicHomeMotion } from "@/components/motion/cinematic-home-motion";
import { createPageMetadata } from "@/config/site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Veena Vadini Public School | Padhar, Betul",
  description:
    "Veena Vadini Public School in Padhar, District Betul, Madhya Pradesh offers Hindi and English medium education from Nursery to Class 8 following a CBSE Pattern.",
  pathname: "/",
});

export default function Home() {
  return (
    <main className="flex-1" data-cinematic-home>
      <CinematicHomeMotion />
      <FirstExperience />
      <AnnouncementRail />
      <HomeStory />
    </main>
  );
}
