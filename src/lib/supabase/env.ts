const publicUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export type SupabasePublicConfig = {
  url: string;
  publishableKey: string;
};

/**
 * The public key can safely be present in browser code. Its scope is limited
 * by RLS and grants defined in the checked-in migration, not by secrecy.
 */
export function getSupabasePublicConfig(): SupabasePublicConfig | null {
  if (!publicUrl || !publishableKey) {
    return null;
  }

  return { url: publicUrl, publishableKey };
}

export function isSupabaseConfigured(): boolean {
  return getSupabasePublicConfig() !== null;
}

/** Server-only callers use this only for private form writes and signed media. */
export function getSupabaseServiceRoleKey(): string | null {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || null;
}

export function isSupabaseServiceRoleConfigured(): boolean {
  return Boolean(getSupabasePublicConfig() && getSupabaseServiceRoleKey());
}
