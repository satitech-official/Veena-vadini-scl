"use client";

import { useActionState } from "react";
import { LoaderCircle, LockKeyhole } from "lucide-react";

import { loginAdmin, type LoginActionState } from "@/app/admin/auth-actions";

const initialState: LoginActionState = {};

export function AdminLoginForm({ configured }: { configured: boolean }) {
  const [state, action, pending] = useActionState(loginAdmin, initialState);
  return <form action={action} className="mt-8 space-y-5"><div><label className="block text-sm font-semibold text-primary" htmlFor="admin-email">Email address</label><input autoComplete="email" className="mt-2 w-full rounded-lg border border-brand-indigo/18 bg-white px-3 py-3 text-sm outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/15" disabled={!configured || pending} id="admin-email" name="email" required type="email" /></div><div><label className="block text-sm font-semibold text-primary" htmlFor="admin-password">Password</label><input autoComplete="current-password" className="mt-2 w-full rounded-lg border border-brand-indigo/18 bg-white px-3 py-3 text-sm outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/15" disabled={!configured || pending} id="admin-password" name="password" required type="password" /></div>{state.message ? <p aria-live="assertive" className="rounded-lg border-l-2 border-brand-red bg-brand-red/5 px-4 py-3 text-sm leading-6 text-primary">{state.message}</p> : null}<button className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-red disabled:cursor-not-allowed disabled:opacity-55" disabled={!configured || pending} type="submit">{pending ? <LoaderCircle aria-hidden="true" className="animate-spin" size={16} /> : <LockKeyhole aria-hidden="true" size={16} />}{pending ? "Signing in…" : "Sign in to admin"}</button></form>;
}
