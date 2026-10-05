import "server-only";

import { createClient } from "@supabase/supabase-js";

import { getSupabasePublicConfig, getSupabaseServiceRoleKey } from "@/lib/supabase/env";

/**
 * This client bypasses RLS and must remain server-only. It is intentionally
 * limited to public enquiry writes and signing storage paths after server-side
 * validation; it must never be imported by a Client Component.
 */
export function createServiceRoleSupabaseClient() {
  const config = getSupabasePublicConfig();
  const serviceRoleKey = getSupabaseServiceRoleKey();

  if (!config || !serviceRoleKey) {
    throw new Error("Supabase service-role configuration is missing.");
  }

  return createClient(config.url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}
