"use client";

import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react";

import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { usePublicSchoolSettings } from "@/components/settings/public-school-settings-provider";
import { admissionRoute } from "@/config/navigation";
import { schoolConfig } from "@/config/school";
import { useMotionProfile } from "@/lib/motion/use-motion-profile";
import { getPublicWhatsAppEnquiryUrl } from "@/lib/settings/public-school-settings";
import { getCmsText } from "@/lib/settings/cms-content";
import { cn } from "@/lib/utils/cn";

type HeroProps = {
  isReady: boolean;
};

const entranceEase = [0.16, 1, 0.3, 1] as const;

const copyVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.66, ease: entranceEase },
  }),
};

const headingLineVariants = {
  hidden: { y: "108%" },
  visible: (delay: number) => ({
    y: "0%",
    transition: { delay, duration: 0.82, ease: entranceEase },
  }),
};

const heroFacts = [
  schoolConfig.board,
  schoolConfig.medium,
  schoolConfig.classes,
  "Padhar, Betul",
] as const;

export function Hero({ isReady }: HeroProps) {
  const settings = usePublicSchoolSettings();
  const userPrefersReducedMotion = useReducedMotion();
  const hasMounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const { isCompactMotion, prefersReducedMotion: profilePrefersReducedMotion } = useMotionProfile();
  const prefersReducedMotion = hasMounted && (userPrefersReducedMotion || profilePrefersReducedMotion);
  const isAnimated = isReady || prefersReducedMotion;
  const allowAmbientMotion = isReady && !prefersReducedMotion && !isCompactMotion;
  const whatsappHref = getPublicWhatsAppEnquiryUrl(
    settings,
    "Hello Veena Vadini Public School, I would like to know more about admissions.",
  );
  const homepage = settings.cmsContent;
  const heroEyebrow = getCmsText(homepage, "homepage", "heroEyebrow", "Welcome to");
  const heroTitleTop = getCmsText(homepage, "homepage", "heroTitleTop", "VEENA VADINI");
  const heroTitleBottom = getCmsText(homepage, "homepage", "heroTitleBottom", "PUBLIC SCHOOL");
  const heroDescription = getCmsText(homepage, "homepage", "heroDescription", "A nurturing learning environment where children are encouraged to learn, explore, grow and build a strong foundation for their future.");
  const primaryCtaLabel = getCmsText(homepage, "homepage", "primaryCtaLabel", "Explore Our School");
  const primaryCtaUrl = getCmsText(homepage, "homepage", "primaryCtaUrl", "#school-introduction");
  const secondaryCtaLabel = getCmsText(homepage, "homepage", "secondaryCtaLabel", "Admissions Open");
  const secondaryCtaUrl = getCmsText(homepage, "homepage", "secondaryCtaUrl", admissionRoute);

  return (
    <section
      aria-labelledby="hero-heading"
      className="hero-section relative isolate overflow-hidden bg-background text-primary"
    >
      <div aria-hidden="true" className="hero-grid absolute inset-0" />
      <div aria-hidden="true" className="hero-watermark">VVPS</div>
      <div aria-hidden="true" className="hero-ribbon hero-ribbon-one" />
      <div aria-hidden="true" className="hero-ribbon hero-ribbon-two" />
      <div aria-hidden="true" className="hero-sky-plane" />

      <Container className="relative">
        <div className="grid min-h-[100svh] items-center gap-10 pb-14 pt-32 sm:pt-36 lg:grid-cols-[minmax(0,1fr)_minmax(24rem,0.76fr)] lg:gap-12 lg:pb-24 lg:pt-36 xl:grid-cols-[minmax(0,1.03fr)_minmax(29rem,0.78fr)] xl:gap-16 xl:pt-40 2xl:grid-cols-[minmax(0,1.1fr)_minmax(27rem,0.63fr)]">
          <article className="relative z-10 max-w-4xl lg:pr-2">
            <motion.p
              animate={isAnimated ? "visible" : "hidden"}
              className="type-eyebrow mb-6 text-brand-red"
              custom={0.05}
              initial={false}
              variants={prefersReducedMotion ? undefined : copyVariants}
            >
              {heroEyebrow}
            </motion.p>

            <h1
              aria-label={`${heroTitleTop} ${heroTitleBottom}`}
              className="hero-title font-display text-primary"
              id="hero-heading"
            >
              <span className="block overflow-hidden">
                <motion.span
                  animate={isAnimated ? "visible" : "hidden"}
                  className="block"
                  custom={0.13}
                  initial={false}
                  variants={prefersReducedMotion ? undefined : headingLineVariants}
                >
                  {heroTitleTop}
                </motion.span>
              </span>
              <span className="block overflow-hidden text-brand-red">
                <motion.span
                  animate={isAnimated ? "visible" : "hidden"}
                  className="block"
                  custom={0.23}
                  initial={false}
                  variants={prefersReducedMotion ? undefined : headingLineVariants}
                >
                  {heroTitleBottom}
                </motion.span>
              </span>
            </h1>

            <motion.div
              animate={isAnimated ? "visible" : "hidden"}
              className="mt-7 max-w-xl"
              custom={0.41}
              initial={false}
              variants={prefersReducedMotion ? undefined : copyVariants}
            >
              <p className="type-h3 text-primary">{settings.tagline}</p>
              <p className="type-body mt-4 max-w-lg text-muted">
                {heroDescription}
              </p>
            </motion.div>

            <motion.div
              animate={isAnimated ? "visible" : "hidden"}
              className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3.5"
              custom={0.54}
              initial={false}
              variants={prefersReducedMotion ? undefined : copyVariants}
            >
              <Link
                className={cn(buttonStyles({ size: "lg" }), "group min-w-[13.5rem] justify-between")}
                href={primaryCtaUrl}
              >
                {primaryCtaLabel}
                <ArrowRight
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  size={17}
                />
              </Link>
              <Link
                className={cn(buttonStyles({ size: "lg", variant: "secondary" }), "group whitespace-nowrap")}
                href={secondaryCtaUrl}
              >
                {secondaryCtaLabel}
                <ArrowUpRight
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  size={17}
                />
              </Link>
              <a
                className="group inline-flex min-h-11 items-center justify-center gap-2 border-brand-indigo/12 px-2 text-sm font-semibold text-primary transition-colors duration-300 hover:text-brand-red sm:ml-1 sm:border-l sm:pl-5 sm:justify-start"
                href={whatsappHref}
                rel="noreferrer"
                target="_blank"
              >
                <span className="grid size-8 place-items-center rounded-full border border-brand-red/25 text-brand-red transition-[border-color,background-color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:border-brand-red group-hover:bg-brand-red group-hover:text-white">
                  <MessageCircle aria-hidden="true" size={15} />
                </span>
                WhatsApp Enquiry
              </a>
            </motion.div>

            <motion.p
              animate={isAnimated ? "visible" : "hidden"}
              className="type-eyebrow mt-8 text-gold-ink"
              custom={0.63}
              initial={false}
              variants={prefersReducedMotion ? undefined : copyVariants}
            >
              {settings.motto.replaceAll(". ", " • ").replace(".", "")}
            </motion.p>
          </article>

          <motion.div
            animate={isAnimated ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 24 }}
            className="hero-emblem-shell relative mx-auto w-full max-w-[28.5rem] self-center lg:justify-self-end xl:max-w-[30rem]"
            initial={false}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { delay: 0.4, duration: 1.05, ease: entranceEase }
            }
          >
            <div aria-hidden="true" className="hero-emblem-orbit hero-emblem-orbit-outer" />
            <div aria-hidden="true" className="hero-emblem-orbit hero-emblem-orbit-inner" />
            <div aria-hidden="true" className="hero-emblem-arc" />
            <motion.div
              animate={
                !allowAmbientMotion
                  ? { y: 0 }
                  : { y: [0, -5, 0] }
              }
              className="relative aspect-square"
              transition={
                !allowAmbientMotion
                  ? { duration: 0 }
                  : { delay: 1.4, duration: 8, ease: "easeInOut", repeat: Infinity }
              }
            >
              <div className="hero-emblem-disc absolute grid place-items-center rounded-full">
                <div className="hero-emblem-image-frame relative size-full overflow-hidden rounded-full">
                  <Image
                    alt="Temporary photographed reference of the Veena Vadini Public School emblem"
                    className="object-contain"
                    fill
                    priority
                    sizes="(min-width: 1024px) 31rem, 82vw"
                    src={settings.brand.temporaryLogoPath}
                  />
                </div>
              </div>
              <span aria-hidden="true" className="hero-gold-marker hero-gold-marker-top" />
              <span aria-hidden="true" className="hero-gold-marker hero-gold-marker-bottom" />
            </motion.div>
          </motion.div>

          <motion.ul
            animate={isAnimated ? "visible" : "hidden"}
            aria-label="School highlights"
            className="relative z-10 col-span-full grid grid-cols-2 border-y border-brand-indigo/12 lg:grid-cols-4"
            custom={0.72}
            initial={false}
            variants={prefersReducedMotion ? undefined : copyVariants}
          >
            {heroFacts.map((fact, index) => (
              <li
                className={cn(
                  "flex min-h-[4.75rem] items-center gap-3 py-5 pr-4 text-sm font-semibold tracking-[-0.01em] text-primary sm:text-[0.95rem]",
                  index % 2 === 0 && "border-r border-brand-indigo/12 pr-5",
                  index > 1 && "border-t border-brand-indigo/12 lg:border-t-0",
                  index > 0 && index % 2 === 1 && "pl-5 lg:border-r lg:border-brand-indigo/12",
                  index === 2 && "lg:pl-5",
                  index === 3 && "lg:border-r-0 lg:pl-5",
                )}
                key={fact}
              >
                <span className="hero-fact-number">0{index + 1}</span>
                <span className="hero-fact-label">{fact}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </Container>

      <motion.a
        animate={{ opacity: 1 }}
        className="absolute bottom-9 right-10 z-10 hidden items-center gap-3 text-[0.63rem] font-bold uppercase tracking-[0.17em] text-primary lg:flex xl:bottom-10 xl:right-16"
        href="#school-introduction"
        initial={false}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { delay: 1.16, duration: 0.4, ease: entranceEase }
        }
      >
        <span>Scroll to Discover</span>
        <motion.span
          animate={!allowAmbientMotion ? { y: 0 } : { y: [0, 3, 0] }}
          className="grid size-8 place-items-center rounded-full border border-brand-indigo/20"
          transition={
            !allowAmbientMotion
              ? { duration: 0 }
              : { delay: 1.6, duration: 2.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.9 }
          }
        >
          <ArrowDown aria-hidden="true" size={14} />
        </motion.span>
      </motion.a>
    </section>
  );
}
