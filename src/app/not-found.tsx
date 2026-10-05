import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { InternalSiteHeader } from "@/components/layout/internal-site-header";
import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils/cn";

export default function NotFound() {
  return (
    <>
      <InternalSiteHeader />
      <main className="flex-1 bg-surface pt-28 sm:pt-36">
        <Container>
          <section className="content-not-found border-y border-brand-indigo/15 py-20 sm:py-28 lg:py-36">
            <p className="type-eyebrow text-brand-red">Page not found</p>
            <h1 className="mt-5 font-display text-[clamp(3rem,6vw,6.6rem)] leading-[0.82] tracking-[-0.075em] text-primary">
              This page isn’t
              <br />
              <span className="text-brand-red">available right now.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-muted">
              The address may be outdated, or the page may not be part of the current school website.
            </p>
            <Link className={cn(buttonStyles({ size: "lg", variant: "secondary" }), "mt-9 group")} href="/">
              <ArrowLeft aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1" size={17} />
              Back to Home
            </Link>
          </section>
        </Container>
      </main>
    </>
  );
}
