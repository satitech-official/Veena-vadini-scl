"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu, MessageCircle, Phone, X } from "lucide-react";

import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { usePublicSchoolSettings } from "@/components/settings/public-school-settings-provider";
import { admissionRoute, primaryNavigation } from "@/config/navigation";
import { getPublicWhatsAppEnquiryUrl } from "@/lib/settings/public-school-settings";
import { cn } from "@/lib/utils/cn";

type SiteHeaderProps = {
  isIntroComplete: boolean;
};

const mobileMenuVariants = {
  closed: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
  open: {
    opacity: 1,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const mobileLinkVariants = {
  closed: { opacity: 0, y: 18 },
  open: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.12 + index * 0.045,
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function SiteHeader({ isIntroComplete }: SiteHeaderProps) {
  const settings = usePublicSchoolSettings();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    window.setTimeout(() => menuButtonRef.current?.focus(), 0);
  }, []);

  useEffect(() => {
    if (!isIntroComplete) {
      return;
    }

    let frameId: number | null = null;
    const updateScrollState = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 24);
        frameId = null;
      });
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [isIntroComplete]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || !menuRef.current) {
        return;
      }

      const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements.item(0);
      const lastElement = focusableElements.item(focusableElements.length - 1);

      if (!firstElement || !lastElement) {
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [closeMenu, isMenuOpen]);

  const whatsappHref = getPublicWhatsAppEnquiryUrl(
    settings,
    "Hello Veena Vadini Public School, I would like to make an enquiry.",
  );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,box-shadow,opacity,transform,padding] duration-500",
          isIntroComplete
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0",
          isScrolled
            ? "border-b border-brand-indigo/10 bg-surface/94 py-3 shadow-[0_10px_32px_rgba(27,27,76,0.08)] backdrop-blur-md"
            : "border-b border-transparent py-5",
        )}
      >
        <Container>
          <div className="flex items-center justify-between gap-5">
            <Link
              aria-label={`${settings.name} home`}
              className="group flex min-w-0 items-center gap-3.5 text-primary"
              href="/"
            >
              <span className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-full border border-brand-red/30 bg-surface p-1 transition-transform duration-300 group-hover:scale-105">
                <Image
                  alt=""
                  className="object-contain"
                  fill
                  sizes="40px"
                  src={settings.brand.temporaryLogoPath}
                />
              </span>
              <span className="leading-[0.94]">
                <span className="block font-display text-[1.13rem] font-semibold tracking-[-0.04em]">
                  Veena Vadini
                </span>
                <span className="mt-1.5 block text-[0.53rem] font-bold uppercase tracking-[0.2em] text-brand-red">
                  Public School
                </span>
              </span>
            </Link>

            <nav aria-label="Primary navigation" className="hidden xl:block">
              <ul className="flex items-center gap-4 2xl:gap-5">
                {primaryNavigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      className={cn(
                        "group relative block py-2 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-primary transition-colors hover:text-brand-red",
                        pathname === item.href && "text-brand-red",
                      )}
                      href={item.href}
                    >
                      {item.label}
                      <span
                        className={cn(
                          "absolute bottom-0 left-[10%] h-px w-[80%] origin-left scale-x-0 bg-brand-red transition-transform duration-300 group-hover:scale-x-100",
                          pathname === item.href && "scale-x-100",
                        )}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="hidden items-center gap-2 border-l border-brand-indigo/10 pl-3 xl:flex">
              <a
                aria-label="WhatsApp the school"
                className="grid size-10 place-items-center rounded-full border border-brand-indigo/15 text-primary transition-colors hover:border-brand-red hover:text-brand-red"
                href={whatsappHref}
                rel="noreferrer"
                target="_blank"
              >
                <MessageCircle aria-hidden="true" size={17} strokeWidth={1.8} />
              </a>
              <Link
                className={cn(buttonStyles({ size: "sm" }), "group whitespace-nowrap")}
                href={admissionRoute}
              >
                Apply for Admission
                <ArrowUpRight
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  size={16}
                />
              </Link>
            </div>

            <button
              aria-controls="mobile-navigation"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
              className="grid size-11 place-items-center rounded-full border border-brand-indigo/15 text-primary transition-colors hover:border-brand-red hover:text-brand-red xl:hidden"
              onClick={() => setIsMenuOpen(true)}
              ref={menuButtonRef}
              type="button"
            >
              <Menu aria-hidden="true" size={20} strokeWidth={1.8} />
            </button>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            animate="open"
            className="fixed inset-0 z-50 overflow-y-auto bg-primary text-white xl:hidden"
            exit="closed"
            id="mobile-navigation"
            initial="closed"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            variants={prefersReducedMotion ? undefined : mobileMenuVariants}
            style={prefersReducedMotion ? { opacity: 1 } : undefined}
          >
            <div aria-hidden="true" className="intro-grid absolute inset-0 opacity-20" />
            <Container className="relative flex min-h-[100svh] flex-col py-5">
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-3">
                  <span className="relative grid size-10 overflow-hidden rounded-full bg-surface p-1">
                    <Image
                      alt=""
                      className="object-contain"
                      fill
                      sizes="40px"
                      src={settings.brand.temporaryLogoPath}
                    />
                  </span>
                  <span className="font-display text-xl tracking-[-0.03em]">Veena Vadini</span>
                </span>
                <button
                  aria-label="Close navigation"
                  className="grid size-11 place-items-center rounded-full border border-white/25 text-white transition-colors hover:border-gold hover:text-gold"
                  onClick={closeMenu}
                  ref={closeButtonRef}
                  type="button"
                >
                  <X aria-hidden="true" size={21} strokeWidth={1.8} />
                </button>
              </div>

              <nav aria-label="Mobile primary navigation" className="my-auto py-12">
                <ul className="space-y-1">
                  {primaryNavigation.map((item, index) => (
                    <motion.li
                      animate="open"
                      custom={index}
                      initial="closed"
                      key={item.href}
                      variants={prefersReducedMotion ? undefined : mobileLinkVariants}
                    >
                      <Link
                        className="group flex items-center justify-between border-b border-white/13 py-3 font-display text-[clamp(2rem,9vw,3.4rem)] leading-none tracking-[-0.045em] text-white transition-colors hover:text-gold"
                        href={item.href}
                        onClick={closeMenu}
                      >
                        {item.label}
                        <ArrowUpRight
                          aria-hidden="true"
                          className="opacity-45 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100"
                          size={22}
                          strokeWidth={1.5}
                        />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="border-t border-white/18 pt-5">
                <p className="type-eyebrow text-gold">{settings.motto.replaceAll(". ", " • ").replace(".", "")}</p>
                <div className="mt-5 grid gap-2 sm:grid-cols-3">
                  <Link
                    className={cn(
                      buttonStyles({ size: "md" }),
                      "border-gold bg-gold text-primary hover:border-white hover:bg-white",
                    )}
                    href={admissionRoute}
                    onClick={closeMenu}
                  >
                    Admissions
                    <ArrowUpRight aria-hidden="true" size={16} />
                  </Link>
                  <a
                    className={cn(
                      buttonStyles({ size: "md", variant: "secondary" }),
                      "border-white/25 bg-transparent text-white hover:border-gold hover:bg-transparent hover:text-gold",
                    )}
                    href={settings.contact.primaryPhone.href}
                  >
                    <Phone aria-hidden="true" size={16} />
                    Call
                  </a>
                  <a
                    className={cn(
                      buttonStyles({ size: "md", variant: "secondary" }),
                      "border-white/25 bg-transparent text-white hover:border-gold hover:bg-transparent hover:text-gold",
                    )}
                    href={whatsappHref}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <MessageCircle aria-hidden="true" size={16} />
                    WhatsApp
                  </a>
                </div>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
