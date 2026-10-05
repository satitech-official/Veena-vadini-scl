import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SchoolMediaPlaceholder } from "@/components/home/school-media-placeholder";
import { InternalPageHero } from "@/components/internal-page/internal-page-hero";
import { InternalSiteHeader } from "@/components/layout/internal-site-header";
import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { placeholderMedia } from "@/content/homepage";
import { internalStudentLifeMoments } from "@/content/internal-pages";
import { cn } from "@/lib/utils/cn";

export function StudentLifePage() {
  return (
    <>
      <InternalSiteHeader />
      <main className="flex-1">
        <InternalPageHero description="Education also makes room for creative, physical, collaborative, and shared experiences alongside classroom learning." eyebrow="Student life" mark="LIFE" media={placeholderMedia.studentLife} title={<>More Than<br /><span>a Classroom.</span></>} variant="student-life" />
        <section className="internal-student-life-intro bg-brand-red py-20 text-white sm:py-28 lg:py-36"><Container><div className="grid gap-8 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] lg:items-end lg:gap-20"><div><p className="type-eyebrow text-gold">A balanced school day</p><h2>Moments that help<br /><span>children participate.</span></h2></div><p>Students are encouraged to take part in creative, physical, and collaborative experiences alongside classroom learning. The themes below remain general until approved school activity content is provided.</p></div></Container></section>
        <section className="internal-student-life-collage bg-surface py-16 sm:py-24 lg:py-32"><Container><ol>{internalStudentLifeMoments.map((moment, index) => <li className={cn("student-life-moment", `student-life-moment-${index + 1}`)} key={moment.number}><SchoolMediaPlaceholder className="h-full min-h-[18rem]" index={moment.number} media={moment.media} /><div className="student-life-moment-copy"><span>{moment.number}</span><h2>{moment.label}</h2><p>{moment.description}</p></div></li>)}</ol></Container></section>
        <section className="internal-student-life-cta bg-primary py-16 text-white sm:py-20"><Container className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"><div><p className="type-eyebrow text-gold">Continue exploring</p><h2>See the school story<br /><span>in more detail.</span></h2></div><div className="flex flex-wrap gap-3"><Link className={cn(buttonStyles({ size: "lg" }), "border-gold bg-gold text-primary hover:border-white hover:bg-white")} href="/gallery">Explore School Gallery<ArrowRight aria-hidden="true" size={17} /></Link><Link className={cn(buttonStyles({ size: "lg", variant: "secondary" }), "border-white/25 bg-transparent text-white hover:border-gold hover:bg-transparent hover:text-gold")} href="/events">View Events</Link></div></Container></section>
      </main>
    </>
  );
}
