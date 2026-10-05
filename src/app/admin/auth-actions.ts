"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type LoginActionState = { message?: string };

export async function loginAdmin(_: LoginActionState, formData: FormData): Promise<LoginActionState> {
  if (!isSupabaseConfigured()) return { message: "Supabase is not configured. Add the required values to .env.local first." };
  const parsed = z.object({ email: z.email(), password: z.string().min(1) }).safeParse({ email: formData.get("email"), password: formData.get("password") });
  if (!parsed.success) return { message: "Enter a valid email address and password." };

  const { error } = await (await createServerSupabaseClient()).auth.signInWithPassword(parsed.data);
  if (error) {
    const detail = error.code ? `${error.code}: ${error.message}` : error.message;
    return { message: `Sign-in failed: ${detail}` };
  }
  redirect("/admin");
}

export async function logoutAdmin() {
  if (isSupabaseConfigured()) await (await createServerSupabaseClient()).auth.signOut();
  redirect("/admin/login");
}
