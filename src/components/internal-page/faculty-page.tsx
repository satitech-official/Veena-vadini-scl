import Image from "next/image";
import Link from "next/link";
import { ArrowRight, UserRound } from "lucide-react";

import { InternalPageHero } from "@/components/internal-page/internal-page-hero";
import { InternalSiteHeader } from "@/components/layout/internal-site-header";
import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getFacultyProfilesResult } from "@/lib/faculty/faculty-repository";
import type { FacultyProfile } from "@/types/faculty";
import { cn } from "@/lib/utils/cn";

import styles from "./faculty-page.module.css";

function FacultyProfileCard({ profile }: { profile: FacultyProfile }) {
  return (
    <article className="faculty-profile-card">
      <div className="faculty-profile-portrait">
        {profile.image ? <Image alt={profile.name ? `${profile.name} portrait` : "Faculty portrait"} className="object-cover" fill sizes="(min-width: 64rem) 28vw, 90vw" src={profile.image} /> : <UserRound aria-hidden="true" />}
      </div>
      <p className="type-eyebrow text-brand-red">{profile.designation}</p>
      <h2>{profile.name}</h2>
      {profile.subjects?.length ? <p>{profile.subjects.join(" · ")}</p> : null}
      {profile.bio ? <p>{profile.bio}</p> : null}
    </article>
  );
}

export async function FacultyPage() {
  const { records: profiles, hasLoadError } = await getFacultyProfilesResult();
  return (
    <>
      <InternalSiteHeader />
      <main className="flex-1">
        <InternalPageHero className={styles.hero} description="A future home for approved school educator profiles, presented with the same care and clarity as the school’s wider story." eyebrow="Faculty" mark="PEOPLE" title={<>Meet Our<br /><span>Educators.</span></>} variant="faculty" />
        <section className="faculty-page-body bg-surface py-20 sm:py-28 lg:py-36"><Container>{hasLoadError ? <div className="faculty-empty-state" role="status"><div aria-hidden="true" className="faculty-empty-mark">VV</div><UserRound aria-hidden="true" className="text-gold-ink" size={30} /><p className="type-eyebrow text-brand-red">Faculty directory</p><h2 className={styles.announcement}>Faculty profiles are temporarily unavailable.</h2><p className={styles.supportingCopy}>Please refresh this page and try again. No unpublished faculty information is displayed.</p></div> : profiles.length ? <div className="faculty-profile-grid">{profiles.map((profile) => <FacultyProfileCard key={profile.id} profile={profile} />)}</div> : <div className="faculty-empty-state"><div aria-hidden="true" className="faculty-empty-mark">VV</div><UserRound aria-hidden="true" className="text-gold-ink" size={30} /><p className="type-eyebrow text-brand-red">Content-ready faculty directory</p><h2 className={styles.announcement}>Faculty profiles will appear here as approved school information is added.</h2><p className={styles.supportingCopy}>No teacher names, portraits, qualifications, subjects, or designations have been published because the school has not supplied verified faculty information yet.</p><div><span>Future profile fields</span><span>Name · Designation · Subjects · Classes · Bio · Portrait</span></div></div>}</Container></section>
        <section className="internal-faculty-cta bg-background py-16 sm:py-20"><Container className="flex flex-wrap items-center justify-between gap-7"><div><p className="type-eyebrow text-brand-red">A question for the school?</p><h2>Start a conversation.</h2></div><Link className={cn(buttonStyles({ size: "lg" }), "group")} href="/contact">Contact the School<ArrowRight aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" size={17} /></Link></Container></section>
      </main>
    </>
  );
}
