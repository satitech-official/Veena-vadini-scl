import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const metadata = { title: "Admin Login | Veena Vadini Public School", robots: { index: false, follow: false } };

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ reason?: string }> }) {
  const configured = isSupabaseConfigured();
  const { reason } = await searchParams;
  return <main className="grid min-h-screen place-items-center bg-[#f5f2ed] px-5 py-10"><section className="w-full max-w-md rounded-2xl border border-brand-indigo/12 bg-white p-6 shadow-xl shadow-brand-indigo/8 sm:p-8"><p className="type-eyebrow text-brand-red">Veena Vadini Public School</p><h1 className="mt-3 font-display text-[clamp(3rem,10vw,4.8rem)] leading-[0.82] tracking-[-0.07em] text-primary">Admin<br />Sign In.</h1><p className="mt-6 text-sm leading-6 text-muted">This area is for provisioned school administrators only. There is no public registration.</p>{reason === "unauthorized" ? <p aria-live="polite" className="mt-6 rounded-lg border-l-2 border-brand-red bg-brand-red/5 px-4 py-3 text-sm leading-6 text-primary">Sign in with a provisioned administrator account to continue.</p> : null}{!configured ? <div className="mt-6 rounded-lg border-l-2 border-brand-red bg-brand-red/5 px-4 py-3 text-sm leading-6 text-primary"><p className="font-semibold">Supabase connection required</p><p className="mt-1">Add the public URL and publishable key to <code>.env.local</code>. Add the server-only service-role key before enabling live enquiry submissions or private-media URLs.</p></div> : null}<AdminLoginForm configured={configured} /></section></main>;
}
