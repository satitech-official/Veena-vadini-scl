"use client";

import { Languages } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type Language = "en" | "hi";

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement?: new (
          options: Record<string, unknown>,
          elementId: string,
        ) => unknown;
      };
    };
    googleTranslateElementInit?: () => void;
    __vvTranslatorBootstrapped?: boolean;
  }
}

const SCRIPT_ID = "vv-google-translate-script";
const ELEMENT_ID = "google_translate_element";
const STORAGE_KEY = "vvps-language";
const CHANGE_EVENT = "vvps-language-change";

function getSavedLanguage(): Language {
  return localStorage.getItem(STORAGE_KEY) === "hi" ? "hi" : "en";
}

function setDocumentLanguage(language: Language) {
  document.documentElement.lang = language === "hi" ? "hi" : "en";
  document.documentElement.dataset.vvLanguage = language;
}

function setGoogleTranslateCookie(language: Language) {
  const value = language === "hi" ? "/en/hi" : "/en/en";
  const maxAge = 60 * 60 * 24 * 365;

  document.cookie = `googtrans=${value};path=/;max-age=${maxAge};SameSite=Lax`;

  const hostname = window.location.hostname;
  if (hostname.includes(".")) {
    document.cookie = `googtrans=${value};path=/;domain=.${hostname};max-age=${maxAge};SameSite=Lax`;
  }
}

function applyGoogleLanguage(language: Language) {
  const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (!select) return false;

  if (select.value !== language) {
    select.value = language;
    select.dispatchEvent(new Event("change", { bubbles: true }));
  }

  return true;
}

function enforceLanguage(language: Language) {
  setDocumentLanguage(language);
  setGoogleTranslateCookie(language);

  const delays = [0, 120, 300, 600, 1000, 1600, 2400, 3400];
  delays.forEach((delay) => {
    window.setTimeout(() => {
      setDocumentLanguage(language);
      applyGoogleLanguage(language);
    }, delay);
  });
}

function ensureTranslateMount() {
  let mount = document.getElementById(ELEMENT_ID);
  if (!mount) {
    mount = document.createElement("div");
    mount.id = ELEMENT_ID;
    mount.setAttribute("aria-hidden", "true");
    mount.style.display = "none";
    document.body.appendChild(mount);
  }
  return mount;
}

function initialiseGoogleTranslator() {
  const TranslateElement = window.google?.translate?.TranslateElement;
  if (!TranslateElement) return false;

  const mount = ensureTranslateMount();

  if (mount.dataset.ready !== "true") {
    new TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "en,hi",
        autoDisplay: false,
      },
      ELEMENT_ID,
    );
    mount.dataset.ready = "true";
  }

  window.__vvTranslatorBootstrapped = true;
  enforceLanguage(getSavedLanguage());
  return true;
}

export function LanguageToggle({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const syncFromStorage = () => {
      const saved = getSavedLanguage();
      setLanguage(saved);
      setDocumentLanguage(saved);
      setGoogleTranslateCookie(saved);
      return saved;
    };

    const saved = syncFromStorage();
    ensureTranslateMount();

    const handleLanguageChange = (event: Event) => {
      const next = (event as CustomEvent<Language>).detail;
      if (next !== "en" && next !== "hi") return;
      setLanguage(next);
      enforceLanguage(next);
    };

    window.addEventListener(CHANGE_EVENT, handleLanguageChange);

    window.googleTranslateElementInit = () => {
      initialiseGoogleTranslator();
    };

    if (window.google?.translate?.TranslateElement) {
      initialiseGoogleTranslator();
    } else {
      if (!document.getElementById(SCRIPT_ID)) {
        const script = document.createElement("script");
        script.id = SCRIPT_ID;
        script.src =
          "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.head.appendChild(script);
      }

      let attempts = 0;
      const waitForGoogle = window.setInterval(() => {
        attempts += 1;
        if (initialiseGoogleTranslator() || attempts >= 30) {
          window.clearInterval(waitForGoogle);
        }
      }, 150);

      window.setTimeout(() => window.clearInterval(waitForGoogle), 5000);
    }

    enforceLanguage(saved);

    return () => {
      window.removeEventListener(CHANGE_EVENT, handleLanguageChange);
    };
  }, [pathname]);

  const switchLanguage = useCallback((nextLanguage: Language) => {
    localStorage.setItem(STORAGE_KEY, nextLanguage);
    setLanguage(nextLanguage);
    enforceLanguage(nextLanguage);
    window.dispatchEvent(
      new CustomEvent<Language>(CHANGE_EVENT, { detail: nextLanguage }),
    );
  }, []);

  const nextLanguage: Language = language === "en" ? "hi" : "en";
  const label = language === "en" ? "हिंदी" : "English";

  return (
    <button
      aria-label={
        language === "en"
          ? "Translate website to Hindi"
          : "Translate website to English"
      }
      className={
        mobile
          ? "inline-flex h-11 items-center gap-1.5 rounded-full border border-brand-indigo/15 px-3 text-[0.61rem] font-bold uppercase tracking-[0.06em] text-primary transition-colors hover:border-brand-red hover:text-brand-red"
          : "inline-flex h-10 items-center gap-2 rounded-full border border-brand-indigo/15 px-3.5 text-[0.63rem] font-bold uppercase tracking-[0.08em] text-primary transition-colors hover:border-brand-red hover:text-brand-red"
      }
      data-vv-language-toggle="true"
      onClick={() => switchLanguage(nextLanguage)}
      translate="no"
      type="button"
    >
      <Languages aria-hidden="true" size={16} strokeWidth={1.8} />
      <span translate="no">{label}</span>
    </button>
  );
}
