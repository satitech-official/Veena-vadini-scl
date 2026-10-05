"use client";

import { createBrowserClient } from "@supabase/ssr";

import { getSupabasePublicConfig } from "@/lib/supabase/env";

/** Creates the one browser-side client only when public credentials exist. */
export function createBrowserSupabaseClient() {
  const config = getSupabasePublicConfig();

  if (!config) {
    throw new Error("Supabase browser configuration is missing.");
  }

  return createBrowserClient(config.url, config.publishableKey);
}
