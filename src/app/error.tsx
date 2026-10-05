"use client";

import Link from "next/link";
import { RefreshCw } from "lucide-react";

import { buttonStyles } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

export default function ErrorPage({ reset }: Readonly<{ error: Error & { digest?: string }; reset: () => void }>) {
  return (
    <main className="flex flex-1 items-center bg-surface px-5 py-28 sm:px-8 sm:py-36">
      <section className="mx-auto w-full max-w-3xl border-y border-brand-indigo/15 py-16 sm:py-24">
        <p className="type-eyebrow text-brand-red">Something went wrong</p>
        <h1 className="mt-5 font-display text-[clamp(3rem,6vw,6.6rem)] leading-[0.82] tracking-[-0.075em] text-primary">
          Let’s try that
          <br />
          <span className="text-brand-red">once more.</span>
        </h1>
        <p className="mt-7 max-w-xl text-base leading-7 text-muted">
          The page could not load as expected. You can try again or return to the school homepage.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <button className={cn(buttonStyles({ size: "lg" }), "group")} onClick={reset} type="button">
            <RefreshCw aria-hidden="true" className="transition-transform duration-300 group-hover:rotate-90" size={17} />
            Try again
          </button>
          <Link className={buttonStyles({ size: "lg", variant: "secondary" })} href="/">
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
