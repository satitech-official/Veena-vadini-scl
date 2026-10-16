"use client";

import { Languages } from "lucide-react";
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
  }
}

const SCRIPT_ID = "vv-google-translate-script";
const ELEMENT_ID = "google_translate_element";
const STORAGE_KEY = "vvps-language";

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

  select.value = language;
  select.dispatchEvent(new Event("change", { bubbles: true }));
  return true;
}

export function LanguageToggle({ mobile = false }: { mobile?: boolean }) {
  const [language, setLanguage] = useState<Language>("en");
  const [ready, setReady] = useState(false);

  const initialiseTranslator = useCallback(() => {
    if (!window.google?.translate?.TranslateElement) return;

    const mount = document.getElementById(ELEMENT_ID);
    if (!mount || mount.dataset.ready === "true") {
      setReady(true);
      return;
    }

    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "en,hi",
        autoDisplay: false,
      },
      ELEMENT_ID,
    );

    mount.dataset.ready = "true";
    setReady(true);

    const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (saved === "hi") {
      window.setTimeout(() => {
        setGoogleTranslateCookie("hi");
        setDocumentLanguage("hi");
        applyGoogleLanguage("hi");
        setLanguage("hi");
      }, 450);
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "hi") {
      setLanguage("hi");
      setDocumentLanguage("hi");
    } else {
      setDocumentLanguage("en");
    }

    let mount = document.getElementById(ELEMENT_ID);
    if (!mount) {
      mount = document.createElement("div");
      mount.id = ELEMENT_ID;
      mount.setAttribute("aria-hidden", "true");
      mount.style.display = "none";
      document.body.appendChild(mount);
    }

    window.googleTranslateElementInit = initialiseTranslator;

    if (window.google?.translate?.TranslateElement) {
      initialiseTranslator();
      return;
    }

    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.onerror = () => setReady(false);
      document.head.appendChild(script);
    }

    return () => {
      // Keep the translator instance alive across client-side route changes.
    };
  }, [initialiseTranslator]);

  const switchLanguage = useCallback(
    (nextLanguage: Language) => {
      localStorage.setItem(STORAGE_KEY, nextLanguage);
      setGoogleTranslateCookie(nextLanguage);
      setDocumentLanguage(nextLanguage);
      setLanguage(nextLanguage);

      if (applyGoogleLanguage(nextLanguage)) return;

      if (nextLanguage === "en") {
        window.location.reload();
        return;
      }

      if (!ready) {
        window.setTimeout(() => {
          if (!applyGoogleLanguage(nextLanguage)) window.location.reload();
        }, 700);
      }
    },
    [ready],
  );

  const nextLanguage: Language = language === "en" ? "hi" : "en";
  const label = language === "en" ? "हिंदी" : "English";

  return (
    <button
      aria-label={language === "en" ? "Translate website to Hindi" : "Translate website to English"}
      className={
        mobile
          ? "inline-flex h-11 items-center gap-1.5 rounded-full border border-brand-indigo/15 px-3 text-[0.61rem] font-bold uppercase tracking-[0.06em] text-primary transition-colors hover:border-brand-red hover:text-brand-red"
          : "inline-flex h-10 items-center gap-2 rounded-full border border-brand-indigo/15 px-3.5 text-[0.63rem] font-bold uppercase tracking-[0.08em] text-primary transition-colors hover:border-brand-red hover:text-brand-red"
      }
      onClick={() => switchLanguage(nextLanguage)}
      type="button"
      data-vv-language-toggle="true"
      translate="no"
    >
      <Languages aria-hidden="true" size={16} strokeWidth={1.8} />
      <span translate="no">{label}</span>
    </button>
  );
}
