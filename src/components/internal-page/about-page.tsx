import Link from "next/link";
import { ArrowRight, Check, MapPin } from "lucide-react";

import { InternalPageHero } from "@/components/internal-page/internal-page-hero";
import { SchoolMediaPlaceholder } from "@/components/home/school-media-placeholder";
import { InternalSiteHeader } from "@/components/layout/internal-site-header";
import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { aboutHighlights, editableValueThemes, placeholderMedia, visionMission } from "@/content/homepage";
import { internalPageFacts } from "@/content/internal-pages";
import { schoolConfig } from "@/config/school";
import { getCmsText } from "@/lib/settings/cms-content";
import { getPublicSchoolSettings } from "@/lib/settings/settings-repository";
import { cn } from "@/lib/utils/cn";

export async function AboutPage() {
  const settings = await getPublicSchoolSettings();
  const aboutDescription = getCmsText(settings.cmsContent, "about", "description", "Veena Vadini Public School aims to provide a nurturing educational environment where children can learn, explore, develop confidence, and build a strong foundation for their future.");
  const aboutHeading = getCmsText(settings.cmsContent, "about", "heading", "A Place to Learn,");
  const aboutHighlight = getCmsText(settings.cmsContent, "about", "highlight", "Grow & Believe.");
  const leadershipHeading = getCmsText(settings.cmsContent, "leadership", "heading", "Guidance, ready to");
  const leadershipDescription = getCmsText(settings.cmsContent, "leadership", "description", "Leadership profiles will appear here when approved names, designations, messages, signatures, and photographs are supplied by the school.");
  const leaderName = getCmsText(settings.cmsContent, "leadership", "name", "");
  const leaderDesignation = getCmsText(settings.cmsContent, "leadership", "designation", "");
  const leaderMessage = getCmsText(settings.cmsContent, "leadership", "message", "");
  return (
    <>
      <InternalSiteHeader />
      <main className="flex-1">
        <InternalPageHero
          description={aboutDescription}
          eyebrow="Our school"
          facts={internalPageFacts.school}
          mark="VV"
          media={placeholderMedia.campus}
          title={<>{aboutHeading}<br /><span>{aboutHighlight}</span></>}
          variant="about"
        />

        <section className="internal-about-introduction bg-surface py-20 sm:py-28 lg:py-36">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.84fr)_minmax(20rem,0.76fr)] lg:items-center lg:gap-24">
              <div>
                <p className="type-eyebrow text-brand-red">School introduction</p>
                <h2>A considered place<br /><span>for growing minds.</span></h2>
              </div>
              <div className="internal-about-introduction-copy">
                <p>{settings.name} is shaped around the everyday experience of learning: children are encouraged to participate, communicate, explore, and grow with care.</p>
                <p>The current school story is intentionally grounded in the information supplied by the school. Details can be refined as approved content becomes available.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="internal-inline-fact"><MapPin aria-hidden="true" size={15} />Padhar, District Betul</span>
                  <span className="internal-inline-fact">{schoolConfig.medium} Medium</span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="internal-about-philosophy bg-background py-20 sm:py-28 lg:py-36">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[minmax(16rem,0.56fr)_minmax(0,1.44fr)] lg:gap-20">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p className="type-eyebrow text-brand-red">Learning philosophy</p>
                <h2>Learning that<br /><span>has room to unfold.</span></h2>
              </div>
              <div className="internal-philosophy-list">
                {[
                  "A child-focused environment where learning and participation can develop together.",
                  "A balanced emphasis on academics, creativity, values, communication, and holistic development.",
                  "A school experience shaped around confidence, curiosity, and a steady foundation for the future.",
                ].map((item, index) => (
                  <article key={item}>
                    <span>0{index + 1}</span>
                    <p>{item}</p>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="internal-about-direction bg-primary py-20 text-white sm:py-28 lg:py-36">
          <Container>
            <div className="grid gap-14 lg:grid-cols-[minmax(17rem,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
              <div>
                <p className="type-eyebrow text-gold">Vision &amp; mission</p>
                <h2>The direction<br /><span>we hold.</span></h2>
                <p>These are current editable website themes and can be refined when the school confirms official wording.</p>
              </div>
              <div className="internal-direction-list">
                {visionMission.map((item) => (
                  <article key={item.number}>
                    <span>{item.number}</span>
                    <div>
                      <p className="type-eyebrow text-gold">{item.label}</p>
                      <h3>{item.title}</h3>
                      <p>{item.copy}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="internal-about-values bg-surface py-20 sm:py-28 lg:py-36">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[minmax(15rem,0.48fr)_minmax(0,1.52fr)] lg:items-end lg:gap-20">
              <div>
                <p className="type-eyebrow text-brand-red">Values in focus</p>
                <h2>Qualities that<br /><span>shape the day.</span></h2>
                <p>Editable school-value themes; confirm official wording before publication.</p>
              </div>
              <ol className="internal-values-sequence">
                {editableValueThemes.map((value, index) => <li key={value}><span>0{index + 1}</span><strong>{value}</strong></li>)}
              </ol>
            </div>
          </Container>
        </section>

        <section className="internal-about-environment bg-background py-20 sm:py-28 lg:py-36">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.62fr)] lg:items-center lg:gap-20">
              <SchoolMediaPlaceholder className="aspect-[16/10] min-h-[23rem]" index="04" media={placeholderMedia.classrooms} />
              <div>
                <p className="type-eyebrow text-brand-red">School environment</p>
                <h2>Space for learning,<br /><span>movement &amp; expression.</span></h2>
                <ul>
                  {aboutHighlights.map((item) => <li key={item}><Check aria-hidden="true" size={15} />{item}</li>)}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        <section className="internal-leadership-placeholder bg-primary py-16 text-white sm:py-20">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(16rem,0.64fr)] lg:items-center lg:gap-20">
              <div>
                <p className="type-eyebrow text-gold">School leadership</p>
                <h2>{leadershipHeading}<br /><span>{leaderName ? "School leadership." : "be introduced."}</span></h2>
              </div>
              <div>
                {leaderName ? <p className="font-display text-3xl tracking-[-0.05em] text-gold">{leaderName}{leaderDesignation ? ` · ${leaderDesignation}` : ""}</p> : null}
                <p className={leaderName ? "mt-4" : ""}>{leaderMessage || leadershipDescription}</p>
                <Link className={cn(buttonStyles({ size: "lg", variant: "secondary" }), "mt-7 border-white/25 bg-transparent text-white hover:border-gold hover:bg-transparent hover:text-gold")} href="/contact">Contact the School<ArrowRight aria-hidden="true" size={17} /></Link>
              </div>
            </div>
          </Container>
        </section>

        <section className="internal-page-closing bg-surface py-16 sm:py-20">
          <Container className="flex flex-wrap items-center justify-between gap-7">
            <div><p className="type-eyebrow text-brand-red">Continue the journey</p><h2>Explore what comes next.</h2></div>
            <div className="flex flex-wrap gap-3"><Link className={buttonStyles({ size: "lg" })} href="/academics">Explore Academics</Link><Link className={buttonStyles({ size: "lg", variant: "secondary" })} href="/contact">Visit the School</Link><Link className={buttonStyles({ size: "lg", variant: "quiet" })} href="/admissions">Admissions</Link></div>
          </Container>
        </section>
      </main>
    </>
  );
}
