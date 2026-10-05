import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { getActiveAnnouncementsResult } from "@/lib/announcements/announcement-repository";

function AnnouncementAction({ href, label }: { href: string; label: string }) {
  const className = "inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red transition-colors hover:text-primary focus-visible:text-primary";

  if (href.startsWith("/")) {
    return <Link className={className} href={href}>{label}<ArrowUpRight aria-hidden="true" size={15} /></Link>;
  }

  if (/^https:\/\//.test(href)) {
    return <a className={className} href={href} rel="noreferrer" target="_blank">{label}<ArrowUpRight aria-hidden="true" size={15} /></a>;
  }

  return null;
}

/** Renders only active, date-valid CMS announcements. Empty is intentionally quiet. */
export async function AnnouncementRail() {
  const { announcements, hasLoadError } = await getActiveAnnouncementsResult();
  if (hasLoadError) {
    return (
      <aside aria-live="polite" className="border-y border-brand-indigo/12 bg-surface py-4 sm:py-5">
        <Container>
          <p className="text-sm leading-6 text-muted">School announcements are temporarily unavailable. Please check again shortly.</p>
        </Container>
      </aside>
    );
  }
  if (!announcements.length) return null;

  return (
    <section aria-label="School announcements" className="border-y border-brand-indigo/12 bg-surface py-4 sm:py-5">
      <Container>
        <ol className="grid gap-3 lg:grid-cols-3 lg:gap-5">
          {announcements.map((announcement) => (
            <li className="border-l-2 border-gold-ink/55 pl-4" key={announcement.id}>
              <p className="type-eyebrow text-brand-red">School announcement</p>
              <h2 className="mt-1 font-display text-[clamp(1.5rem,2.3vw,2.1rem)] leading-[0.92] tracking-[-0.045em] text-primary">{announcement.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{announcement.message}</p>
              {announcement.ctaLabel && announcement.ctaUrl ? <div className="mt-3"><AnnouncementAction href={announcement.ctaUrl} label={announcement.ctaLabel} /></div> : null}
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
