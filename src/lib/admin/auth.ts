import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";

import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type AdminIdentity = {
  userId: string;
  displayName: string | null;
  role: "admin" | "editor";
};

/**
 * Verifies the signed claim first and then verifies the active admin profile.
 * It deliberately does not trust user metadata or an unverified session value.
 */
export const getCurrentAdmin = cache(async (): Promise<AdminIdentity | null> => {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;

  if (claimsError || typeof userId !== "string") {
    return null;
  }

  const { data: profile, error: profileError } = await supabase
    .from("admin_profiles")
    .select("user_id, display_name, role, active")
    .eq("user_id", userId)
    .maybeSingle();

  if (profileError || !profile?.active || (profile.role !== "admin" && profile.role !== "editor")) {
    return null;
  }

  return {
    displayName: profile.display_name,
    role: profile.role,
    userId: profile.user_id,
  };
});

/** Use this inside every private Server Component, Action and Route Handler. */
export async function requireAdmin(): Promise<AdminIdentity> {
  if (!isSupabaseConfigured()) {
    redirect("/admin/login?reason=configuration");
  }

  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login?reason=unauthorized");
  }

  return admin;
}
