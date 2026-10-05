"use client";

import Link from "next/link";
import { Check, ExternalLink, LoaderCircle } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { saveAdminSiteContent } from "@/app/admin/actions";
import type { AdminSiteContentDefinition } from "@/lib/admin/site-content";
import type { CmsContent, CmsContentSection } from "@/types/settings";

export function AdminSiteContentManager({
  content,
  definition,
  hasLoadError,
  section,
}: {
  content: CmsContent;
  definition: AdminSiteContentDefinition;
  hasLoadError: boolean;
  section: CmsContentSection;
}) {
  const router = useRouter();
  const [message, setMessage] = useState<string>();
  const [pending, startTransition] = useTransition();
  const values = content[section] ?? {};

  const submit = (formData: FormData) => {
    formData.set("section", section);
    startTransition(async () => {
      const result = await saveAdminSiteContent(formData);
      setMessage(result.message);
      if (result.ok) router.refresh();
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="type-eyebrow text-brand-red">{definition.eyebrow}</p>
          <h1 className="mt-2 font-display text-[clamp(2.8rem,5vw,4.7rem)] leading-[0.86] tracking-[-0.065em] text-primary">{definition.label}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">{definition.description}</p>
        </div>
        {definition.previewHref ? <Link className="inline-flex items-center gap-2 rounded-lg border border-brand-indigo/15 bg-white px-4 py-2.5 text-sm font-semibold text-primary hover:border-brand-red" href={definition.previewHref} target="_blank"><ExternalLink aria-hidden="true" size={16} />Preview public page</Link> : null}
      </div>

      {hasLoadError ? <p className="rounded-lg border border-brand-red/20 bg-brand-red/5 px-4 py-3 text-sm leading-6 text-primary" role="status">Current settings could not be loaded. Nothing has been replaced; refresh and try again.</p> : null}
      {message ? <p aria-live="polite" className="rounded-lg border border-brand-indigo/12 bg-white px-4 py-3 text-sm text-primary">{message}</p> : null}

      <section className="rounded-2xl border border-brand-indigo/12 bg-white p-5 shadow-sm sm:p-7">
        <p className="text-sm leading-6 text-muted">Leave an optional field blank to keep the verified public fallback. Saving updates the live content cache for the relevant pages.</p>
        <form action={submit} className="mt-7 grid gap-5 sm:grid-cols-2">
          {definition.fields.map((field) => {
            const id = `site-content-${section}-${field.key}`;
            const value = values[field.key] ?? "";
            return <label className={field.kind === "textarea" ? "sm:col-span-2" : ""} htmlFor={id} key={field.key}>
              <span className="block text-sm font-semibold text-primary">{field.label}</span>
              {field.kind === "textarea" ? <textarea className="mt-2 w-full rounded-lg border border-brand-indigo/18 bg-white px-3 py-2.5 text-sm leading-6 outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/15" defaultValue={value} id={id} name={field.key} rows={field.rows ?? 4} /> : <input className="mt-2 w-full rounded-lg border border-brand-indigo/18 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/15" defaultValue={value} id={id} name={field.key} type={field.kind === "url" ? "url" : "text"} />}
              {field.help ? <small className="mt-1.5 block text-xs leading-5 text-muted">{field.help}</small> : null}
            </label>;
          })}
          <div className="border-t border-brand-indigo/12 pt-6 sm:col-span-2">
            <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60" disabled={pending} type="submit">{pending ? <LoaderCircle aria-hidden="true" className="animate-spin" size={16} /> : <Check aria-hidden="true" size={16} />}{pending ? "Saving…" : "Save changes"}</button>
          </div>
        </form>
      </section>
    </div>
  );
}
