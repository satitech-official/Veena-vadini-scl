"use client";

import { useEffect, useState, useTransition } from "react";
import { Check, FileUp, LoaderCircle, Pencil, Plus, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";

import { deleteAdminResource, saveAdminResource, uploadAdminAsset } from "@/app/admin/actions";
import type { AdminContentResource, AdminField, AdminResourceDefinition } from "@/lib/admin/resources";
import type { AdminRecord } from "@/lib/admin/repository";

function valueForField(value: unknown, kind: AdminField["kind"]) {
  if (Array.isArray(value)) return value.join("\n");
  if (kind === "date" && typeof value === "string") return value.slice(0, 10);
  return typeof value === "string" || typeof value === "number" ? String(value) : "";
}

function AssetField({ field, defaultValue }: { field: AdminField; defaultValue: unknown }) {
  const [path, setPath] = useState(valueForField(defaultValue, field.kind));
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [selectedFileName, setSelectedFileName] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [pending, startTransition] = useTransition();
  useEffect(() => () => { if (previewUrl) URL.revokeObjectURL(previewUrl); }, [previewUrl]);
  const upload = (file: File | null) => {
    if (!file || !field.bucket) return;
    setSelectedFileName(file.name);
    if (file.type.startsWith("image/")) setPreviewUrl(URL.createObjectURL(file));
    const data = new FormData(); data.set("bucket", field.bucket); data.set("file", file);
    startTransition(async () => { const result = await uploadAdminAsset(data); setMessage(result.message); if (result.ok && result.path) setPath(result.path); });
  };
  return <div className="space-y-2"><input className="w-full rounded-lg border border-brand-indigo/18 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/15" name={field.name} onChange={(event) => setPath(event.target.value)} required={field.required} value={path} /><div className="flex flex-wrap items-center gap-3"><label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-brand-indigo/15 bg-white px-3 py-2 text-xs font-semibold text-primary hover:border-brand-red"><FileUp aria-hidden="true" size={14} />{pending ? "Uploading…" : "Upload file"}<input accept={field.bucket === "documents" ? "application/pdf" : "image/jpeg,image/png,image/webp"} className="sr-only" onChange={(event) => upload(event.currentTarget.files?.[0] ?? null)} type="file" /></label>{selectedFileName ? <span className="text-xs text-muted">Selected: {selectedFileName}</span> : null}{message ? <span aria-live="polite" className="text-xs text-muted">{message}</span> : null}</div>{previewUrl ? <div aria-label="Selected upload preview" className="h-36 max-w-sm rounded-lg border border-brand-indigo/12 bg-cover bg-center" role="img" style={{ backgroundImage: `url(${previewUrl})` }} /> : null}</div>;
}

function Field({ field, record }: { field: AdminField; record: AdminRecord | null }) {
  const value = record?.[field.name];
  const id = `admin-field-${field.name}`;
  return <label className={field.kind === "textarea" ? "sm:col-span-2" : ""} htmlFor={id}>
    <span className="block text-sm font-semibold text-primary">{field.label}{field.required ? <em className="ml-1 not-italic text-brand-red">*</em> : null}</span>
    {field.kind === "textarea" ? <textarea className="mt-2 w-full rounded-lg border border-brand-indigo/18 bg-white px-3 py-2.5 text-sm leading-6 outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/15" defaultValue={valueForField(value, field.kind)} id={id} name={field.name} required={field.required} rows={field.rows ?? 4} /> : null}
    {field.kind === "select" ? <select className="mt-2 w-full rounded-lg border border-brand-indigo/18 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/15" defaultValue={valueForField(value, field.kind) || (field.required ? field.options?.[0] : "")} id={id} name={field.name} required={field.required}>{!field.required ? <option value="">Not set</option> : null}{field.options?.map((option) => <option key={option} value={option}>{option}</option>)}</select> : null}
    {field.kind === "boolean" ? <span className="mt-3 flex items-center gap-2 text-sm text-muted"><input className="size-4 accent-brand-red" defaultChecked={Boolean(value)} id={id} name={field.name} type="checkbox" />Yes</span> : null}
    {field.kind === "asset" ? <div className="mt-2" key={`${record?.id ?? "new"}-${field.name}`}><AssetField defaultValue={value} field={field} /></div> : null}
    {["text", "date", "time", "number"].includes(field.kind) ? <input className="mt-2 w-full rounded-lg border border-brand-indigo/18 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/15" defaultValue={valueForField(value, field.kind)} id={id} min={field.kind === "number" ? 0 : undefined} name={field.name} required={field.required} type={field.kind} /> : null}
    {field.help ? <small className="mt-1.5 block text-xs leading-5 text-muted">{field.help}</small> : null}
  </label>;
}

export function AdminContentManager({ definition, hasLoadError = false, records, resource }: { definition: AdminResourceDefinition; hasLoadError?: boolean; records: AdminRecord[]; resource: AdminContentResource }) {
  const router = useRouter();
  const [editing, setEditing] = useState<AdminRecord | null>(resource === "settings" ? records[0] ?? null : null);
  const [showEditor, setShowEditor] = useState(resource === "settings" || records.length === 0);
  const [message, setMessage] = useState<string>();
  const [pending, startTransition] = useTransition();
  const submit = (formData: FormData) => {
    formData.set("resource", resource); if (editing?.id) formData.set("id", editing.id); if (typeof editing?.slug === "string") formData.set("current_slug", editing.slug);
    startTransition(async () => { const result = await saveAdminResource(formData); setMessage(result.message); if (result.ok) { if (resource !== "settings") { setEditing(null); setShowEditor(false); } router.refresh(); } });
  };
  const remove = (record: AdminRecord) => { if (!window.confirm(`Delete this ${definition.singular.toLowerCase()}? This cannot be undone.`)) return; const data = new FormData(); data.set("resource", resource); data.set("id", record.id); startTransition(async () => { const result = await deleteAdminResource(data); setMessage(result.message); if (result.ok) { setEditing(null); router.refresh(); } }); };

  return <div className="space-y-6"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="type-eyebrow text-brand-red">Content management</p><h1 className="mt-2 font-display text-[clamp(2.8rem,5vw,4.7rem)] leading-[0.86] tracking-[-0.065em]">{definition.label}</h1><p className="mt-4 max-w-2xl text-sm leading-6 text-muted">{definition.description}</p></div>{resource !== "settings" ? <button className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary" onClick={() => { setEditing(null); setShowEditor(true); }} type="button"><Plus aria-hidden="true" size={16} />New {definition.singular}</button> : null}</div>
    {message ? <p aria-live="polite" className="rounded-lg border border-brand-indigo/12 bg-white px-4 py-3 text-sm text-primary">{message}</p> : null}
    {hasLoadError ? <p className="rounded-lg border border-brand-red/20 bg-brand-red/5 px-4 py-3 text-sm leading-6 text-primary" role="status">Existing records could not be loaded. You can retry the page; no data has been replaced with an empty result.</p> : null}
    {showEditor ? <section className="rounded-2xl border border-brand-indigo/12 bg-white p-5 shadow-sm sm:p-7"><div className="flex items-start justify-between gap-4"><div><h2 className="font-display text-3xl tracking-[-0.05em]">{editing ? `Edit ${definition.singular}` : `New ${definition.singular}`}</h2><p className="mt-2 text-sm text-muted">Fields marked with an asterisk are required.</p></div>{resource !== "settings" ? <button aria-label="Close editor" className="rounded-lg p-2 text-muted hover:bg-brand-indigo/7 hover:text-primary" onClick={() => setShowEditor(false)} type="button"><X aria-hidden="true" size={19} /></button> : null}</div><form action={submit} className="mt-7 grid gap-5 sm:grid-cols-2" key={editing?.id ?? "new"}>{definition.fields.map((field) => <Field field={field} key={field.name} record={editing} />)}<div className="flex flex-wrap gap-3 border-t border-brand-indigo/12 pt-6 sm:col-span-2"><button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60" disabled={pending} type="submit">{pending ? <LoaderCircle aria-hidden="true" className="animate-spin" size={16} /> : <Check aria-hidden="true" size={16} />}{pending ? "Saving…" : "Save changes"}</button>{resource !== "settings" ? <button className="rounded-lg border border-brand-indigo/15 px-4 py-2.5 text-sm font-semibold text-primary" onClick={() => setShowEditor(false)} type="button">Cancel</button> : null}</div></form></section> : null}
    <section aria-label={`${definition.label} records`} className="overflow-hidden rounded-2xl border border-brand-indigo/12 bg-white shadow-sm"><div className="border-b border-brand-indigo/12 px-5 py-4"><p className="text-sm font-semibold text-primary">Recent records</p><p className="mt-1 text-xs text-muted">Showing up to 50 records. Uploaded files remain in private storage when a record is deleted.</p></div>{records.length ? <div className="divide-y divide-brand-indigo/10">{records.map((record) => <article className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between" key={record.id}><div className="min-w-0"><h2 className="truncate font-semibold text-primary">{String(record.title ?? record.name ?? record.school_name ?? "Untitled record")}</h2><p className="mt-1 text-sm text-muted">{String(record.status ?? record.category ?? "Settings")} {typeof record.updated_at === "string" ? `· updated ${new Date(record.updated_at).toLocaleDateString()}` : ""}</p></div><div className="flex shrink-0 items-center gap-2"><button className="inline-flex items-center gap-2 rounded-lg border border-brand-indigo/15 px-3 py-2 text-sm font-semibold text-primary hover:border-brand-red" onClick={() => { setEditing(record); setShowEditor(true); }} type="button"><Pencil aria-hidden="true" size={14} />Edit</button>{resource !== "settings" ? <button aria-label={`Delete ${String(record.title ?? record.name ?? "record")}`} className="rounded-lg border border-brand-red/20 p-2 text-brand-red hover:bg-brand-red hover:text-white" onClick={() => remove(record)} type="button"><Trash2 aria-hidden="true" size={15} /></button> : null}</div></article>)}</div> : <div className="px-5 py-10 text-sm leading-6 text-muted">No records have been added yet.</div>}</section>
  </div>;
}
