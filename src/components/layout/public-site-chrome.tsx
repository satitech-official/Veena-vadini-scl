"use client";

import { usePathname } from "next/navigation";

import { QuickContactActions } from "@/components/layout/quick-contact-actions";
import { SiteFooter } from "@/components/layout/site-footer";

/** Keeps the approved public footer and mobile actions out of private admin routes. */
export function PublicSiteChrome() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return <><SiteFooter /><QuickContactActions /></>;
}
