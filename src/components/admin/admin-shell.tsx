"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, BookOpen, CalendarDays, ChevronRight, FileText, GalleryHorizontal, GraduationCap, LayoutDashboard, LogOut, Menu, MessageSquareText, Settings2, UsersRound, X } from "lucide-react";

import { logoutAdmin } from "@/app/admin/auth-actions";
import { cn } from "@/lib/utils/cn";

const navigation = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/settings", label: "School Information", icon: Settings2 },
  { href: "/admin/content/homepage", label: "Homepage", icon: LayoutDashboard },
  { href: "/admin/content/about", label: "About School", icon: BookOpen },
  { href: "/admin/content/leadership", label: "Principal & Leadership", icon: UsersRound },
  { href: "/admin/content/academics", label: "Classes & Academics", icon: GraduationCap },
  { href: "/admin/content/facilities", label: "Facilities", icon: GalleryHorizontal },
  { href: "/admin/faculty", label: "Faculty & Teachers", icon: UsersRound },
  { href: "/admin/gallery", label: "Gallery", icon: GalleryHorizontal },
  { href: "/admin/events", label: "Events", icon: CalendarDays },
  { href: "/admin/announcements", label: "Announcements", icon: BookOpen },
  { href: "/admin/notices", label: "Notices", icon: Bell },
  { href: "/admin/admissions", label: "Admissions", icon: GraduationCap },
  { href: "/admin/downloads", label: "Downloads", icon: FileText },
  { href: "/admin/content/contact", label: "Contact Information", icon: MessageSquareText },
  { href: "/admin/enquiries", label: "Contact Enquiries", icon: MessageSquareText },
  { href: "/admin/content/social", label: "Social Media", icon: GalleryHorizontal },
  { href: "/admin/content/seo", label: "SEO Settings", icon: Settings2 },
  { href: "/admin/content/site", label: "Site Settings", icon: Settings2 },
];

function AdminNavigation({ onNavigate, pathname }: { onNavigate?: () => void; pathname: string | null }) {
  return <nav aria-label="Admin navigation" className="space-y-1">{navigation.map(({ href, label, icon: Icon }) => {
    const active = href === "/admin" ? pathname === href : pathname?.startsWith(href);
    return <Link className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors", active ? "bg-brand-red text-white shadow-sm" : "text-primary/70 hover:bg-brand-indigo/7 hover:text-primary")} href={href} key={href} onClick={onNavigate}>
      <Icon aria-hidden="true" size={17} strokeWidth={1.8} />
      <span>{label}</span>
      {active ? <ChevronRight aria-hidden="true" className="ml-auto" size={15} /> : null}
    </Link>;
  })}</nav>;
}

export function AdminShell({ children, displayName }: { children: React.ReactNode; displayName?: string | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f2ed] text-primary">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col overflow-y-auto border-r border-brand-indigo/12 bg-white px-5 py-6 lg:flex">
        <Link className="block border-b border-brand-indigo/12 pb-6" href="/admin"><p className="type-eyebrow text-brand-red">Veena Vadini</p><p className="mt-2 font-display text-3xl leading-none tracking-[-0.055em] text-primary">School Admin</p></Link>
        <div className="flex-1 py-6"><AdminNavigation pathname={pathname} /></div>
        <div className="border-t border-brand-indigo/12 pt-5"><p className="text-sm font-semibold text-primary">{displayName || "Authorized administrator"}</p><p className="mt-1 text-xs text-muted">Secure school workspace</p><form action={logoutAdmin}><button className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-red hover:text-primary" type="submit"><LogOut aria-hidden="true" size={15} />Sign out</button></form></div>
      </aside>
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-brand-indigo/12 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <Link href="/admin"><p className="type-eyebrow text-brand-red">VV</p><p className="font-display text-2xl leading-none tracking-[-0.05em]">School Admin</p></Link>
        <button aria-controls="admin-mobile-navigation" aria-expanded={open} aria-label={open ? "Close admin navigation" : "Open admin navigation"} className="rounded-lg border border-brand-indigo/15 p-2 text-primary" onClick={() => setOpen((current) => !current)} type="button">{open ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}</button>
      </header>
      {open ? <div className="fixed inset-0 z-20 bg-primary/20 lg:hidden" onClick={() => setOpen(false)}><aside className="h-full w-[min(19rem,88vw)] overflow-y-auto bg-white px-5 py-6 shadow-2xl" id="admin-mobile-navigation" onClick={(event) => event.stopPropagation()}><div className="mb-6 flex items-center justify-between"><p className="font-display text-3xl tracking-[-0.055em]">Navigation</p><button aria-label="Close admin navigation" className="rounded-lg border border-brand-indigo/15 p-2" onClick={() => setOpen(false)} type="button"><X aria-hidden="true" size={18} /></button></div><AdminNavigation onNavigate={() => setOpen(false)} pathname={pathname} /><form action={logoutAdmin}><button className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-red" type="submit"><LogOut aria-hidden="true" size={15} />Sign out</button></form></aside></div> : null}
      <main className="min-w-0 lg:pl-72"><div className="mx-auto w-full max-w-[100rem] px-4 py-7 sm:px-6 sm:py-9 lg:px-10">{children}</div></main>
    </div>
  );
}
