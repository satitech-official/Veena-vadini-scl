import type { ReactNode } from "react";

import { SchoolMediaPlaceholder } from "@/components/home/school-media-placeholder";
import { Container } from "@/components/ui/container";
import type { PlaceholderMedia } from "@/content/homepage";
import { cn } from "@/lib/utils/cn";

type InternalHeroFact = {
  label: string;
  value: string;
};

type InternalPageHeroProps = {
  children?: ReactNode;
  className?: string;
  description: string;
  eyebrow: string;
  facts?: readonly InternalHeroFact[];
  mark: string;
  media?: PlaceholderMedia;
  title: ReactNode;
  variant: "about" | "academics" | "facilities" | "student-life" | "faculty" | "downloads";
};

/**
 * Shared typography and information architecture for Phase 8, with layouts
 * that intentionally adapt to the narrative of each internal route.
 */
export function InternalPageHero({
  children,
  className,
  description,
  eyebrow,
  facts = [],
  mark,
  media,
  title,
  variant,
}: InternalPageHeroProps) {
  return (
    <section className={cn("internal-page-hero", `internal-page-hero-${variant}`, className)}>
      <div aria-hidden="true" className="internal-page-hero-grid" />
      <div aria-hidden="true" className="internal-page-hero-mark">{mark}</div>
      <Container className="relative">
        <div className="internal-page-hero-layout">
          <div className="internal-page-hero-copy">
            <p className="type-eyebrow internal-page-hero-eyebrow">{eyebrow}</p>
            <h1 className="internal-page-hero-title">{title}</h1>
            <p className="internal-page-hero-description">{description}</p>
            {children}
          </div>
          {media ? (
            <div className="internal-page-hero-media">
              <SchoolMediaPlaceholder className="h-full min-h-[19rem]" index="08" media={media} />
            </div>
          ) : null}
          {facts.length ? (
            <dl className="internal-page-hero-facts">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
