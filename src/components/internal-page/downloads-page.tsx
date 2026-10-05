import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { DownloadsExplorer } from "@/components/internal-page/downloads-explorer";
import { InternalPageHero } from "@/components/internal-page/internal-page-hero";
import { InternalSiteHeader } from "@/components/layout/internal-site-header";
import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getDownloadDocumentsResult } from "@/lib/downloads/download-repository";
import { cn } from "@/lib/utils/cn";

import styles from "./downloads-page.module.css";

export async function DownloadsPage() {
  const { records: documents, hasLoadError } = await getDownloadDocumentsResult();
  return (
    <>
      <InternalSiteHeader />
      <main className="flex-1">
        <InternalPageHero className={styles.hero} description="A parent-friendly future document centre for approved school information, organised clearly and published only when files are ready." eyebrow="Downloads" mark="FILES" title={<>School Information,<br /><span>Clearly Shared.</span></>} variant="downloads" />
        <section className="downloads-page-body bg-surface py-20 sm:py-28 lg:py-36"><Container><div className="grid gap-8 lg:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)] lg:items-end lg:gap-20"><div><p className="type-eyebrow text-brand-red">Document centre</p><h2 className={styles.editorialHeading}>Useful school documents,<br /><span>when approved.</span></h2></div><p>This area is ready for future admission, academic, calendar, circular, holiday, syllabus, prospectus, and examination documents. No file is presented until it is verified.</p></div><div className="mt-12 sm:mt-16"><DownloadsExplorer documents={documents} hasLoadError={hasLoadError} /></div></Container></section>
        <section className="internal-downloads-cta bg-background py-16 sm:py-20"><Container className="flex flex-wrap items-center justify-between gap-7"><div><p className="type-eyebrow text-brand-red">School updates</p><h2>Looking for a current notice?</h2></div><Link className={cn(buttonStyles({ size: "lg", variant: "secondary" }), "group")} href="/notices">View Notices<ArrowRight aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" size={17} /></Link></Container></section>
      </main>
    </>
  );
}
