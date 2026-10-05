import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";

type ContentPageHeroProps = {
  children?: ReactNode;
  description: string;
  eyebrow: string;
  mark: string;
  title: ReactNode;
};

export function ContentPageHero({ children, description, eyebrow, mark, title }: ContentPageHeroProps) {
  return (
    <section className="content-page-hero relative overflow-hidden bg-primary pb-16 pt-36 text-white sm:pb-24 sm:pt-44 lg:pb-28 lg:pt-48">
      <div aria-hidden="true" className="content-page-hero-grid" />
      <div aria-hidden="true" className="content-page-hero-mark">{mark}</div>
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.52fr)] lg:items-end lg:gap-20">
          <div>
            <p className="type-eyebrow text-gold">{eyebrow}</p>
            <h1 className="mt-6 max-w-4xl font-display text-[clamp(3.5rem,7vw,7.8rem)] leading-[0.8] tracking-[-0.08em] text-white">{title}</h1>
          </div>
          <div className="border-t border-white/18 pt-6 lg:justify-self-end lg:border-y lg:py-7">
            <p className="max-w-md text-base leading-7 text-white/72 sm:text-[1.05rem]">{description}</p>
            {children}
          </div>
        </div>
      </Container>
    </section>
  );
}
