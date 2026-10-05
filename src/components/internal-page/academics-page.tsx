import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AcademicStageExplorer } from "@/components/internal-page/academic-stage-explorer";
import { InternalPageHero } from "@/components/internal-page/internal-page-hero";
import { InternalSiteHeader } from "@/components/layout/internal-site-header";
import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { internalLearningApproach, internalPageFacts } from "@/content/internal-pages";
import { placeholderMedia } from "@/content/homepage";
import { getCmsText } from "@/lib/settings/cms-content";
import { getPublicSchoolSettings } from "@/lib/settings/settings-repository";
import { cn } from "@/lib/utils/cn";

export async function AcademicsPage() {
  const settings = await getPublicSchoolSettings();
  const eyebrow = getCmsText(settings.cmsContent, "academics", "eyebrow", "Academics");
  const heading = getCmsText(settings.cmsContent, "academics", "heading", "Learning Designed");
  const highlight = getCmsText(settings.cmsContent, "academics", "highlight", "for Every Stage.");
  const description = getCmsText(settings.cmsContent, "academics", "description", "A considered learning journey from the early years through Class 8, with space for academic foundations, communication, creativity, and growing confidence.");
  return (
    <>
      <InternalSiteHeader />
      <main className="flex-1">
        <InternalPageHero description={description} eyebrow={eyebrow} facts={internalPageFacts.academics} mark="LEARN" media={placeholderMedia.smartClass} title={<>{heading}<br /><span>{highlight}</span></>} variant="academics" />
        <section className="internal-academics-introduction bg-surface py-20 sm:py-28 lg:py-36">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.74fr)_minmax(0,1.26fr)] lg:items-end lg:gap-20">
              <div><p className="type-eyebrow text-brand-red">{eyebrow}</p><h2>{heading}<br /><span>{highlight}</span></h2></div>
              <p>{description}</p>
            </div>
            <div className="mt-12 sm:mt-16"><AcademicStageExplorer /></div>
          </Container>
        </section>
        <section className="internal-learning-approach bg-background py-20 sm:py-28 lg:py-36">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[minmax(16rem,0.57fr)_minmax(0,1.43fr)] lg:gap-20">
              <div className="lg:sticky lg:top-28 lg:self-start"><p className="type-eyebrow text-brand-red">Learning approach</p><h2>Beyond a single<br /><span>way of learning.</span></h2><p>These are editable educational approach themes, ready to be refined as school-approved detail grows.</p></div>
              <ol className="internal-approach-list">{internalLearningApproach.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>)}</ol>
            </div>
          </Container>
        </section>
        <section className="internal-academics-cta bg-primary py-16 text-white sm:py-20"><Container className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"><div><p className="type-eyebrow text-gold">Admissions</p><h2>Begin the conversation<br /><span>with the school.</span></h2></div><Link className={cn(buttonStyles({ size: "lg" }), "border-gold bg-gold text-primary hover:border-white hover:bg-white")} href="/admissions">Explore Admissions<ArrowRight aria-hidden="true" size={17} /></Link></Container></section>
      </main>
    </>
  );
}
