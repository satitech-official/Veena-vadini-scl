"use client";

import { createContext, useContext, type ReactNode } from "react";

import { defaultPublicSchoolSettings } from "@/lib/settings/public-school-settings";
import type { PublicSchoolSettings } from "@/types/settings";

const PublicSchoolSettingsContext = createContext<PublicSchoolSettings>(defaultPublicSchoolSettings);

export function PublicSchoolSettingsProvider({ children, settings }: { children: ReactNode; settings: PublicSchoolSettings }) {
  return <PublicSchoolSettingsContext.Provider value={settings}>{children}</PublicSchoolSettingsContext.Provider>;
}

export function usePublicSchoolSettings() {
  return useContext(PublicSchoolSettingsContext);
}
