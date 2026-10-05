import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SchoolMediaPlaceholder } from "@/components/home/school-media-placeholder";
import { InternalPageHero } from "@/components/internal-page/internal-page-hero";
import { InternalSiteHeader } from "@/components/layout/internal-site-header";
import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { facilities, placeholderMedia } from "@/content/homepage";
import { getCmsText } from "@/lib/settings/cms-content";
import { getPublicSchoolSettings } from "@/lib/settings/settings-repository";
import { cn } from "@/lib/utils/cn";

export async function FacilitiesPage() {
  const settings = await getPublicSchoolSettings();
  const eyebrow = getCmsText(settings.cmsContent, "facilities", "eyebrow", "Facilities");
  const heading = getCmsText(settings.cmsContent, "facilities", "heading", "Spaces Designed for");
  const highlight = getCmsText(settings.cmsContent, "facilities", "highlight", "Learning & Growth.");
  const description = getCmsText(settings.cmsContent, "facilities", "description", "A look at the spaces and everyday supports that shape learning, movement, participation, and a settled school day.");
  return (
    <>
      <InternalSiteHeader />
      <main className="flex-1">
        <InternalPageHero description={description} eyebrow={eyebrow} mark="SPACE" media={placeholderMedia.playground} title={<>{heading}<br /><span>{highlight}</span></>} variant="facilities" />
        <section className="internal-facilities-intro bg-surface py-20 sm:py-28 lg:py-36"><Container><div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-end lg:gap-20"><div><p className="type-eyebrow text-brand-red">{eyebrow}</p><h2>{heading}<br /><span>{highlight}</span></h2></div><p>{description}</p></div></Container></section>
        <section className="internal-facilities-chapters bg-background py-8 sm:py-12 lg:py-16"><Container><ol>{facilities.map((facility, index) => <li className={cn("internal-facility-chapter", index % 2 === 1 && "internal-facility-chapter-reverse")} key={facility.number}><div className="internal-facility-media"><SchoolMediaPlaceholder className={cn("h-full min-h-[22rem]", index % 3 === 0 ? "aspect-[6/5]" : index % 3 === 1 ? "aspect-[5/6]" : "aspect-[16/10]")} index={facility.number} media={facility.media} /></div><div className="internal-facility-copy"><p className="type-eyebrow text-brand-red">{facility.number} / environment</p><h2>{facility.title}</h2><p>{facility.description}</p><span>Approved school media can replace this placeholder.</span></div></li>)}</ol></Container></section>
        <section className="internal-facilities-cta bg-primary py-16 text-white sm:py-20"><Container className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"><div><p className="type-eyebrow text-gold">School life in view</p><h2>See the visual story<br /><span>take shape.</span></h2></div><Link className={cn(buttonStyles({ size: "lg" }), "border-gold bg-gold text-primary hover:border-white hover:bg-white")} href="/gallery">Explore School Gallery<ArrowRight aria-hidden="true" size={17} /></Link></Container></section>
      </main>
    </>
  );
}
