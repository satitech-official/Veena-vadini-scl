import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { AdmissionsChapter } from "@/components/admissions/admissions-chapter";
import { EventsPreview } from "@/components/content/events-preview";
import { NoticesPreview } from "@/components/content/notices-preview";
import { ContactChapter } from "@/components/contact/contact-chapter";
import { AcademicsPreview } from "@/components/home/academics-preview";
import { AdmissionRibbon } from "@/components/home/admission-ribbon";
import { FacilitiesStory } from "@/components/home/facilities-story";
import { GalleryPreview } from "@/components/gallery/gallery-preview";
import { InstagramSection } from "@/components/social/instagram-section";
import { SchoolGlance } from "@/components/home/school-glance";
import { SchoolMediaPlaceholder } from "@/components/home/school-media-placeholder";
import { WhyVeenaVadini } from "@/components/home/why-veena-vadini";
import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  aboutHighlights,
  editableValueThemes,
  learningApproachItems,
  placeholderMedia,
  studentLifeMoments,
  visionMission,
} from "@/content/homepage";
import { cn } from "@/lib/utils/cn";
import { getCmsText } from "@/lib/settings/cms-content";
import { getPublicSchoolSettings } from "@/lib/settings/settings-repository";

export async function HomeStory() {
  const settings = await getPublicSchoolSettings();
  const aboutEyebrow = getCmsText(settings.cmsContent, "about", "eyebrow", "About our school");
  const aboutHeading = getCmsText(settings.cmsContent, "about", "heading", "A Special Place to");
  const aboutHighlight = getCmsText(settings.cmsContent, "about", "highlight", "Learn, Grow & Dream");
  const aboutDescription = getCmsText(settings.cmsContent, "about", "description", "Veena Vadini Public School is committed to creating a nurturing learning environment where children are encouraged to learn, explore, develop confidence and build a strong foundation for their future.");
  return (
    <>
      <AdmissionRibbon />

      <section className="relative overflow-hidden bg-surface py-20 sm:py-28 lg:py-36" id="school-introduction">
        <div aria-hidden="true" className="story-section-index">01</div>
        <Container className="relative">
          <div className="grid gap-10 lg:grid-cols-[minmax(16rem,0.64fr)_minmax(0,1.36fr)] lg:gap-16">
            <div>
              <p className="type-eyebrow text-brand-red">School at a glance</p>
              <h2 className="mt-5 font-display text-[clamp(3rem,5.2vw,5.8rem)] leading-[0.84] tracking-[-0.065em] text-primary">
                The Details
                <br />
                That Matter.
              </h2>
              <p className="mt-7 max-w-sm text-base leading-7 text-muted">
                A concise picture of the school experience, connected to the foundations introduced above.
              </p>
            </div>
            <SchoolGlance />
          </div>
        </Container>
      </section>

      <section className="about-section relative overflow-hidden bg-background py-20 sm:py-28 lg:py-36" id="about">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.94fr)_minmax(22rem,0.82fr)] lg:items-center lg:gap-20">
            <div className="relative">
              <SchoolMediaPlaceholder
                className="aspect-[5/4] min-h-[25rem] sm:aspect-[6/5]"
                index="02"
                media={placeholderMedia.campus}
              />
              <div className="about-media-note absolute -bottom-5 -right-2 hidden max-w-48 border border-brand-indigo/12 bg-surface px-5 py-4 shadow-[0_18px_45px_rgba(27,27,76,0.08)] sm:block">
                <p className="type-eyebrow text-brand-red">A place to belong</p>
                <p className="mt-2 text-sm leading-5 text-muted">A future home for approved campus photography.</p>
              </div>
            </div>
            <div className="lg:py-8">
              <p className="type-eyebrow text-brand-red">{aboutEyebrow}</p>
              <h2 className="mt-5 font-display text-[clamp(3rem,5.5vw,6.1rem)] leading-[0.82] tracking-[-0.07em] text-primary">
                {aboutHeading}
                <br />
                <span className="text-brand-red">{aboutHighlight}</span>
              </h2>
              <p className="mt-8 max-w-xl text-[1.05rem] leading-8 text-muted sm:text-[1.12rem]">
                {aboutDescription}
              </p>
              <ul className="mt-9 grid gap-x-7 gap-y-3 border-y border-brand-indigo/12 py-6 sm:grid-cols-2">
                {aboutHighlights.map((item) => (
                  <li className="flex items-start gap-3 text-sm font-semibold leading-6 text-primary" key={item}>
                    <Check aria-hidden="true" className="mt-1 shrink-0 text-gold" size={14} strokeWidth={2.4} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link className={cn(buttonStyles({ size: "lg" }), "group mt-9")} href="#vision-and-mission">
                Discover Our Story
                <ArrowRight
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  size={17}
                />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="vision-section relative overflow-hidden bg-primary py-20 text-white sm:py-28 lg:py-36" id="vision-and-mission">
        <div aria-hidden="true" className="vision-entry-rule" />
        <div aria-hidden="true" className="vision-watermark">VV</div>
        <Container className="relative">
          <div className="grid gap-14 lg:grid-cols-[minmax(16rem,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="type-eyebrow text-gold">Vision, mission &amp; values</p>
              <h2 className="mt-5 max-w-md font-display text-[clamp(3.1rem,5.7vw,6.4rem)] leading-[0.82] tracking-[-0.07em] text-white">
                The Direction
                <br />
                <span className="text-gold">We Hold.</span>
              </h2>
              <p className="mt-7 max-w-sm text-base leading-7 text-white/68">
                A considered progression from the school’s purpose to the everyday qualities that guide learning.
              </p>
            </div>
            <div className="vision-progress-line border-t border-white/20">
              {visionMission.map((item) => (
                <article className="relative border-b border-white/20 py-10 sm:py-12" key={item.number}>
                  <div className="grid gap-5 sm:grid-cols-[5rem_minmax(0,1fr)] sm:gap-8">
                    <span className="font-display text-3xl tracking-[-0.06em] text-gold">{item.number}</span>
                    <div>
                      <p className="type-eyebrow text-gold">{item.label}</p>
                      <h3 className="mt-4 font-display text-[clamp(2rem,3.7vw,4rem)] leading-[0.92] tracking-[-0.055em] text-white">
                        {item.title}
                      </h3>
                      <p className="mt-5 max-w-2xl text-base leading-7 text-white/74">{item.copy}</p>
                    </div>
                  </div>
                </article>
              ))}
              <article className="relative border-b border-white/20 py-10 sm:py-12">
                <div className="grid gap-5 sm:grid-cols-[5rem_minmax(0,1fr)] sm:gap-8">
                  <span className="font-display text-3xl tracking-[-0.06em] text-gold">03</span>
                  <div>
                    <p className="type-eyebrow text-gold">Values in focus</p>
                    <h3 className="mt-4 font-display text-[clamp(2rem,3.7vw,4rem)] leading-[0.92] tracking-[-0.055em] text-white">
                      The qualities that shape each day.
                    </h3>
                    <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 border-y border-white/14 py-5">
                      {editableValueThemes.map((value) => (
                        <span className="text-sm font-semibold text-white/82" key={value}>
                          <span className="mr-2 text-gold">/</span>
                          {value}
                        </span>
                      ))}
                    </div>
                    <p className="mt-4 text-sm leading-6 text-white/52">
                      Editable school-value themes; confirm official wording before publication.
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface py-20 sm:py-28 lg:py-36" id="why-veena-vadini">
        <Container>
          <div className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.56fr)] lg:items-end">
            <div>
              <p className="type-eyebrow text-brand-red">Why Veena Vadini</p>
              <h2 className="mt-5 font-display text-[clamp(3rem,5.7vw,6.35rem)] leading-[0.82] tracking-[-0.07em] text-primary">
                Everything Your Child
                <br />
                <span className="text-brand-red">Needs to Grow.</span>
              </h2>
            </div>
            <p className="max-w-md text-base leading-7 text-muted lg:justify-self-end">
              Explore the school experience through the priorities that help children learn with confidence and care.
            </p>
          </div>
          <WhyVeenaVadini />
        </Container>
      </section>

      <section className="relative overflow-hidden bg-background py-20 sm:py-28 lg:py-36" id="academics-preview">
        <div aria-hidden="true" className="academics-ghost-text">LEARN</div>
        <Container className="relative">
          <div className="mb-12 flex flex-col justify-between gap-6 sm:mb-16 lg:flex-row lg:items-end">
            <div>
              <p className="type-eyebrow text-brand-red">Academics</p>
              <h2 className="mt-5 max-w-3xl font-display text-[clamp(3rem,5.6vw,6.3rem)] leading-[0.82] tracking-[-0.07em] text-primary">
                Learning Designed
                <br />
                <span className="text-brand-red">for Every Stage.</span>
              </h2>
            </div>
            <p className="max-w-md text-base leading-7 text-muted">
              A simple academic journey from the early years through middle school, keeping learning purposeful at each stage.
            </p>
          </div>
          <AcademicsPreview />
        </Container>
      </section>

      <section className="relative overflow-hidden bg-brand-red py-20 text-white sm:py-28 lg:py-36" id="learning-approach">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(16rem,0.65fr)_minmax(0,1.35fr)] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="type-eyebrow text-gold">Learning approach</p>
              <h2 className="mt-5 font-display text-[clamp(3rem,5.6vw,6.2rem)] leading-[0.82] tracking-[-0.07em] text-white">
                Learning Beyond
                <br />
                <span className="text-gold">Textbooks.</span>
              </h2>
              <p className="mt-7 max-w-sm text-base leading-7 text-white/72">
                Learning experiences that give children room to think, make, communicate, move, and grow together.
              </p>
            </div>
            <ol className="learning-timeline grid border-t border-white/22 sm:grid-cols-2 lg:grid-cols-5">
              {learningApproachItems.map((item, index) => (
                <li className="relative min-h-36 border-b border-white/22 px-0 py-6 sm:min-h-44 sm:px-5 lg:min-h-52 lg:border-l lg:px-5" key={item}>
                  <span className="font-display text-2xl tracking-[-0.06em] text-gold">{String(index + 1).padStart(2, "0")}</span>
                  <p className="mt-7 max-w-32 font-display text-xl leading-[0.96] tracking-[-0.04em] text-white">{item}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-surface py-20 sm:py-28 lg:py-36" id="facilities">
        <Container>
          <div className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.56fr)] lg:items-end">
            <div>
              <p className="type-eyebrow text-brand-red">Facilities</p>
              <h2 className="mt-5 font-display text-[clamp(3rem,5.7vw,6.35rem)] leading-[0.82] tracking-[-0.07em] text-primary">
                Spaces Designed for
                <br />
                <span className="text-brand-red">Learning &amp; Growth.</span>
              </h2>
            </div>
            <p className="max-w-md text-base leading-7 text-muted lg:justify-self-end">
              A scroll-led look at the spaces and support systems that shape the daily learning environment.
            </p>
          </div>
          <FacilitiesStory />
        </Container>
      </section>

      <section className="student-life-section relative overflow-hidden bg-primary py-20 text-white sm:py-28 lg:py-36" id="student-life">
        <div aria-hidden="true" className="student-life-transition-rule" />
        <div aria-hidden="true" className="student-life-orbit student-life-orbit-one" />
        <div aria-hidden="true" className="student-life-orbit student-life-orbit-two" />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[minmax(16rem,0.58fr)_minmax(0,1.42fr)] lg:gap-16">
            <div className="lg:pt-8">
              <p className="type-eyebrow text-gold">Student life</p>
              <h2 className="mt-5 font-display text-[clamp(3.2rem,5.8vw,6.5rem)] leading-[0.82] tracking-[-0.07em] text-white">
                More Than
                <br />
                <span className="text-gold">a Classroom.</span>
              </h2>
              <p className="mt-7 max-w-sm text-base leading-7 text-white/68">
                A school day also makes room for creativity, movement, collaboration, culture, and shared moments.
              </p>
              <Link className={cn(buttonStyles({ size: "lg" }), "group mt-9 border-gold bg-gold text-primary hover:border-white hover:bg-white")} href="/student-life">
                Explore Student Life
                <ArrowRight
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  size={17}
                />
              </Link>
            </div>
            <div className="student-life-collage grid grid-cols-12 gap-3 sm:gap-5">
              {studentLifeMoments.map((item, index) => (
                <div
                  className={cn(
                    "student-life-moment col-span-6",
                    index === 0 && "student-life-moment-featured col-span-12",
                    index === 1 && "sm:col-span-7",
                    index === 2 && "student-life-moment-offset sm:col-span-5",
                    index === 3 && "sm:col-span-5",
                    index === 4 && "student-life-moment-raised sm:col-span-7",
                    index === 5 && "sm:col-span-4",
                    index === 6 && "student-life-moment-finale sm:col-span-8",
                  )}
                  key={item.number}
                >
                  <SchoolMediaPlaceholder
                    className={cn(
                      "min-h-44",
                      index === 0 && "aspect-[15/8] min-h-64 sm:min-h-72",
                      index === 1 && "aspect-[4/5]",
                      index === 2 && "aspect-[3/4]",
                      index === 3 && "aspect-[5/6]",
                      index === 4 && "aspect-[3/2]",
                      index === 5 && "aspect-[4/5]",
                      index === 6 && "aspect-[16/9]",
                    )}
                    index={item.number}
                    media={item.media}
                  />
                  <p className="mt-3 flex items-center gap-3 text-sm font-semibold text-white">
                    <span className="font-display text-xl tracking-[-0.06em] text-gold">{item.number}</span>
                    <span className="h-px w-5 bg-gold" />
                    <span className="min-w-0 leading-5">{item.label}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <GalleryPreview />

      <AdmissionsChapter />
      <NoticesPreview />
      <EventsPreview />
      <InstagramSection />
      <ContactChapter />
    </>
  );
}
