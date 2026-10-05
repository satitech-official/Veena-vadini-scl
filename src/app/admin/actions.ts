"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requireAdmin } from "@/lib/admin/auth";
import { adminContentResources, type AdminContentResource } from "@/lib/admin/resources";
import { adminSiteContentDefinitions } from "@/lib/admin/site-content";
import { readCmsContent } from "@/lib/settings/cms-content";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { cmsContentSections } from "@/types/settings";

type ActionResult = { ok: boolean; message: string };

const resourceSchema = z.enum(adminContentResources);
const cmsSectionSchema = z.enum(cmsContentSections);
const idSchema = z.string().uuid();
const visibilitySchema = z.enum(["public", "hidden"]);
const statusSchema = z.enum(["draft", "published", "archived"]);
const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const optionalDateSchema = z.union([dateSchema, z.literal("")]);
const optionalText = (max = 2000) => z.string().trim().max(max);
const safePathOrUrl = z.string().trim().max(1000).refine((value) => value === "" || /^https:\/\//.test(value) || (!value.includes("..") && !value.startsWith("/")), "Use a private storage path or HTTPS URL.");
const safeCtaUrl = z.string().trim().max(1000).refine((value) => value === "" || value.startsWith("/") || /^https:\/\//.test(value), "Use a relative path or HTTPS URL.");

const resourceSchemas = {
  notices: z.object({
    title: optionalText(180).min(3), slug: optionalText(180), summary: optionalText(500).min(8), description: optionalText(6000).min(8),
    publish_date: dateSchema, category: optionalText(80).min(2), attachment_path: safePathOrUrl, attachment_label: optionalText(180),
    is_important: z.boolean(), is_new: z.boolean(), visibility: visibilitySchema, status: statusSchema,
  }),
  events: z.object({
    title: optionalText(180).min(3), slug: optionalText(180), summary: optionalText(500).min(8), description: optionalText(6000).min(8),
    event_date: dateSchema, start_time: z.string().regex(/^$|^\d{2}:\d{2}$/), end_time: z.string().regex(/^$|^\d{2}:\d{2}$/),
    category: optionalText(80).min(2), location: optionalText(240), image_path: safePathOrUrl, registration_url: safeCtaUrl, is_featured: z.boolean(), visibility: visibilitySchema, status: statusSchema,
  }),
  gallery: z.object({
    title: optionalText(180).min(3), slug: optionalText(180), caption: optionalText(1000), alt: optionalText(500).min(5), category: optionalText(80).min(2),
    media_type: z.enum(["image", "video"]), src: safePathOrUrl.refine((value) => value.length > 0, "A media source is required."), thumbnail_src: safePathOrUrl,
    width: z.coerce.number().int().positive().optional(), height: z.coerce.number().int().positive().optional(), display_order: z.coerce.number().int().min(0),
    capture_date: optionalDateSchema, featured: z.boolean(), approved_for_public_use: z.boolean(), visibility: visibilitySchema, status: statusSchema,
  }),
  faculty: z.object({
    name: optionalText(160).min(2), slug: optionalText(180), designation: optionalText(160), subjects: optionalText(1000), classes: optionalText(1000),
    bio: optionalText(4000), image_path: safePathOrUrl, experience: optionalText(160), qualification: optionalText(240), display_order: z.coerce.number().int().min(0),
    visibility: visibilitySchema, status: statusSchema,
  }),
  downloads: z.object({
    title: optionalText(180).min(3), description: optionalText(1000), category: optionalText(80).min(2), file_path: safePathOrUrl.refine((value) => value.length > 0, "A document is required."),
    file_type: optionalText(80), file_size: z.union([z.literal(""), z.coerce.number().int().min(0)]), publish_date: optionalDateSchema,
    visibility: visibilitySchema, status: statusSchema,
  }),
  announcements: z.object({
    title: optionalText(180).min(3), message: optionalText(1000).min(3), cta_label: optionalText(80), cta_url: safeCtaUrl,
    starts_at: optionalDateSchema, ends_at: optionalDateSchema, priority: z.coerce.number().int().min(0), enabled: z.boolean(),
  }),
  settings: z.object({
    school_name: optionalText(180).min(3), tagline: optionalText(300), motto: optionalText(300), address: optionalText(1000), primary_phone: optionalText(40), secondary_phone: optionalText(40),
    whatsapp: optionalText(40), email: z.union([z.literal(""), z.email().max(254)]), instagram: safeCtaUrl, facebook: safeCtaUrl,
    office_hours: optionalText(160), google_maps_url: safeCtaUrl, google_maps_embed_url: safeCtaUrl,
  }),
};

function asFormObject(formData: FormData) {
  const value = (name: string) => String(formData.get(name) ?? "");
  const checked = (name: string) => formData.get(name) === "on";
  return { value, checked };
}

function slugify(value: string) {
  return value.toLowerCase().trim().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 120);
}

function nullable(value: string) {
  return value || null;
}

function publicPathsFor(resource: AdminContentResource) {
  const paths = ["/"];
  if (resource === "notices") paths.push("/notices");
  if (resource === "events") paths.push("/events");
  if (resource === "gallery") paths.push("/gallery");
  if (resource === "faculty") paths.push("/faculty");
  if (resource === "downloads") paths.push("/downloads");
  return paths;
}

function databasePayload(resource: AdminContentResource, raw: FormData, currentSlug?: string) {
  const { value, checked } = asFormObject(raw);
  const common = {
    visibility: value("visibility"), status: value("status"),
  };
  const values = {
    notices: { ...common, title: value("title"), slug: value("slug"), summary: value("summary"), description: value("description"), publish_date: value("publish_date"), category: value("category"), attachment_path: value("attachment_path"), attachment_label: value("attachment_label"), is_important: checked("is_important"), is_new: checked("is_new") },
    events: { ...common, title: value("title"), slug: value("slug"), summary: value("summary"), description: value("description"), event_date: value("event_date"), start_time: value("start_time"), end_time: value("end_time"), category: value("category"), location: value("location"), image_path: value("image_path"), registration_url: value("registration_url"), is_featured: checked("is_featured") },
    gallery: { ...common, title: value("title"), slug: value("slug"), caption: value("caption"), alt: value("alt"), category: value("category"), media_type: value("media_type"), src: value("src"), thumbnail_src: value("thumbnail_src"), width: value("width") || undefined, height: value("height") || undefined, display_order: value("display_order"), capture_date: value("capture_date"), featured: checked("featured"), approved_for_public_use: checked("approved_for_public_use") },
    faculty: { ...common, name: value("name"), slug: value("slug"), designation: value("designation"), subjects: value("subjects"), classes: value("classes"), bio: value("bio"), image_path: value("image_path"), experience: value("experience"), qualification: value("qualification"), display_order: value("display_order") },
    downloads: { ...common, title: value("title"), description: value("description"), category: value("category"), file_path: value("file_path"), file_type: value("file_type"), file_size: value("file_size"), publish_date: value("publish_date") },
    announcements: { title: value("title"), message: value("message"), cta_label: value("cta_label"), cta_url: value("cta_url"), starts_at: value("starts_at"), ends_at: value("ends_at"), priority: value("priority"), enabled: checked("enabled") },
    settings: { school_name: value("school_name"), tagline: value("tagline"), motto: value("motto"), address: value("address"), primary_phone: value("primary_phone"), secondary_phone: value("secondary_phone"), whatsapp: value("whatsapp"), email: value("email"), instagram: value("instagram"), facebook: value("facebook"), office_hours: value("office_hours"), google_maps_url: value("google_maps_url"), google_maps_embed_url: value("google_maps_embed_url") },
  }[resource];

  const parsed = resourceSchemas[resource].safeParse(values);
  if (!parsed.success) return { error: "Check the required fields and use valid values." } as const;
  const data = parsed.data as Record<string, unknown>;

  if (resource === "gallery" && data.status === "published" && data.visibility === "public" && data.approved_for_public_use !== true) {
    return { error: "Gallery items must be approved for public use before public publication." } as const;
  }

  if (resource === "events" && typeof data.start_time === "string" && typeof data.end_time === "string" && data.start_time && data.end_time && data.end_time < data.start_time) {
    return { error: "An event end time cannot be earlier than its start time." } as const;
  }

  const prepared: Record<string, unknown> = (() => {
    switch (resource) {
      case "notices": return { ...data, slug: slugify(String(data.slug || currentSlug || data.title)), attachment_path: nullable(String(data.attachment_path || "")), attachment_label: nullable(String(data.attachment_label || "")) };
      case "events": return { ...data, slug: slugify(String(data.slug || currentSlug || data.title)), start_time: nullable(String(data.start_time || "")), end_time: nullable(String(data.end_time || "")), location: nullable(String(data.location || "")), image_path: nullable(String(data.image_path || "")), registration_url: nullable(String(data.registration_url || "")) };
      case "gallery": return { ...data, slug: slugify(String(data.slug || currentSlug || data.title)), thumbnail_src: nullable(String(data.thumbnail_src || "")), capture_date: nullable(String(data.capture_date || "")), width: data.width ?? null, height: data.height ?? null };
      case "faculty": return { ...data, slug: slugify(String(data.slug || currentSlug || data.name)), designation: nullable(String(data.designation || "")), subjects: String(data.subjects || "").split("\n").map((item) => item.trim()).filter(Boolean), classes: String(data.classes || "").split("\n").map((item) => item.trim()).filter(Boolean), bio: nullable(String(data.bio || "")), image_path: nullable(String(data.image_path || "")), experience: nullable(String(data.experience || "")), qualification: nullable(String(data.qualification || "")) };
      case "downloads": return { ...data, description: nullable(String(data.description || "")), file_type: nullable(String(data.file_type || "")), file_size: data.file_size === "" ? null : data.file_size, publish_date: nullable(String(data.publish_date || "")) };
      case "announcements": return { ...data, cta_label: nullable(String(data.cta_label || "")), cta_url: nullable(String(data.cta_url || "")), starts_at: data.starts_at ? `${String(data.starts_at)}T00:00:00.000Z` : null, ends_at: data.ends_at ? `${String(data.ends_at)}T23:59:59.999Z` : null };
      case "settings": return { ...data, tagline: nullable(String(data.tagline || "")), motto: nullable(String(data.motto || "")), address: nullable(String(data.address || "")), primary_phone: nullable(String(data.primary_phone || "")), secondary_phone: nullable(String(data.secondary_phone || "")), whatsapp: nullable(String(data.whatsapp || "")), email: nullable(String(data.email || "")), instagram: nullable(String(data.instagram || "")), facebook: nullable(String(data.facebook || "")), office_hours: nullable(String(data.office_hours || "")), google_maps_url: nullable(String(data.google_maps_url || "")), google_maps_embed_url: nullable(String(data.google_maps_embed_url || "")) };
    }
  })();

  if (resource !== "settings" && (typeof prepared.slug !== "string" || prepared.slug.length < 2)) {
    return { error: "Use a title that can produce a stable slug." } as const;
  }
  return { data: prepared } as const;
}

const tableFor: Record<AdminContentResource, string> = {
  announcements: "announcements", downloads: "downloads", events: "events", faculty: "faculty", gallery: "gallery_items", notices: "notices", settings: "school_settings",
};

export async function saveAdminResource(formData: FormData): Promise<ActionResult> {
  await requireAdmin();
  const resourceResult = resourceSchema.safeParse(formData.get("resource"));
  if (!resourceResult.success) return { ok: false, message: "Unknown content type." };
  const resource = resourceResult.data;
  const id = String(formData.get("id") ?? "");
  if (id && !idSchema.safeParse(id).success) return { ok: false, message: "Invalid record reference." };

  const prepared = databasePayload(resource, formData, String(formData.get("current_slug") ?? ""));
  if (typeof prepared.error === "string") return { ok: false, message: prepared.error };

  const supabase = await createServerSupabaseClient();
  const table = tableFor[resource];
  const query = id ? supabase.from(table).update(prepared.data as never).eq("id", id) : supabase.from(table).insert(prepared.data as never);
  const { error } = await query;
  if (error) return { ok: false, message: "The change could not be saved. Check required values or the record slug and try again." };

  publicPathsFor(resource).forEach((path) => revalidatePath(path));
  // Settings are consumed by the root public layout. Revalidating the layout
  // lets a verified CMS edit reach every public route, not only the homepage.
  if (resource === "settings") revalidatePath("/", "layout");
  revalidatePath(`/admin/${resource === "settings" ? "settings" : resource}`);
  return { ok: true, message: id ? "Updated successfully." : "Saved successfully." };
}

export async function deleteAdminResource(formData: FormData): Promise<ActionResult> {
  await requireAdmin();
  const resourceResult = resourceSchema.safeParse(formData.get("resource"));
  const idResult = idSchema.safeParse(formData.get("id"));
  if (!resourceResult.success || !idResult.success || resourceResult.data === "settings") return { ok: false, message: "This record cannot be deleted." };

  const resource = resourceResult.data;
  const { error } = await (await createServerSupabaseClient()).from(tableFor[resource]).delete().eq("id", idResult.data);
  if (error) return { ok: false, message: "The record could not be deleted." };

  publicPathsFor(resource).forEach((path) => revalidatePath(path));
  return { ok: true, message: "Deleted successfully. Its uploaded file was retained for manual review." };
}

/** Saves a small, validated page-specific content group on the existing settings row. */
export async function saveAdminSiteContent(formData: FormData): Promise<ActionResult> {
  await requireAdmin();
  const sectionResult = cmsSectionSchema.safeParse(formData.get("section"));
  if (!sectionResult.success) return { ok: false, message: "Unknown settings section." };

  const section = sectionResult.data;
  const definition = adminSiteContentDefinitions[section];
  const nextSection: Record<string, string> = {};

  for (const field of definition.fields) {
    const value = String(formData.get(field.key) ?? "").trim();
    if (value.length > (field.kind === "textarea" ? 6000 : 1000)) {
      return { ok: false, message: `${field.label} is too long.` };
    }
    if (field.kind === "url" && value && !safeCtaUrl.safeParse(value).success) {
      return { ok: false, message: `${field.label} must be a relative path or HTTPS URL.` };
    }
    if (section === "contact" && field.key === "email" && value && !z.email().safeParse(value).success) {
      return { ok: false, message: "Use a valid email address." };
    }
    nextSection[field.key] = value;
  }

  const supabase = await createServerSupabaseClient();
  const { data: current, error: loadError } = await supabase.from("school_settings").select("id, cms_content").limit(1).maybeSingle();
  if (loadError || !current) return { ok: false, message: "School settings could not be loaded. Refresh and try again." };

  const cmsContent = { ...readCmsContent(current.cms_content), [section]: nextSection };
  const { error } = await supabase.from("school_settings").update({ cms_content: cmsContent }).eq("id", current.id);
  if (error) return { ok: false, message: "The change could not be saved. Confirm the latest CMS migration has been applied, then try again." };

  revalidatePath("/", "layout");
  ["/", "/about", "/academics", "/facilities", "/contact"].forEach((path) => revalidatePath(path));
  revalidatePath(`/admin/content/${section}`);
  return { ok: true, message: "Saved successfully." };
}

export async function updateEnquiryStatus(formData: FormData): Promise<ActionResult> {
  await requireAdmin();
  const kind = z.enum(["admission", "contact"]).safeParse(formData.get("kind"));
  const id = idSchema.safeParse(formData.get("id"));
  if (!kind.success || !id.success) return { ok: false, message: "Invalid enquiry reference." };
  const statuses = kind.data === "admission"
    ? z.enum(["New", "Contacted", "Follow Up", "Visit Scheduled", "Admitted", "Closed"])
    : z.enum(["New", "Contacted", "Closed"]);
  const status = statuses.safeParse(formData.get("status"));
  if (!status.success) return { ok: false, message: "Invalid enquiry status." };

  const table = kind.data === "admission" ? "admission_enquiries" : "contact_enquiries";
  const { error } = await (await createServerSupabaseClient()).from(table).update({ status: status.data }).eq("id", id.data);
  return error ? { ok: false, message: "The status could not be updated." } : { ok: true, message: "Updated successfully." };
}

export async function uploadAdminAsset(formData: FormData): Promise<ActionResult & { path?: string }> {
  const admin = await requireAdmin();
  const bucketResult = z.enum(["gallery", "faculty", "events", "documents"]).safeParse(formData.get("bucket"));
  const file = formData.get("file");
  if (!bucketResult.success || !(file instanceof File) || file.size === 0) return { ok: false, message: "Choose a file to upload." };

  const bucket = bucketResult.data;
  const allowedTypes = bucket === "documents" ? ["application/pdf"] : ["image/jpeg", "image/png", "image/webp"];
  const sizeLimit = bucket === "documents" ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
  if (!allowedTypes.includes(file.type) || file.size > sizeLimit) {
    return { ok: false, message: bucket === "documents" ? "Upload a PDF no larger than 10 MB." : "Upload a JPEG, PNG, or WebP image no larger than 5 MB." };
  }

  const extension = file.name.toLowerCase().match(/\.[a-z0-9]{1,8}$/)?.[0] ?? "";
  const baseName = file.name.slice(0, file.name.length - extension.length).replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").slice(0, 80) || "upload";
  const path = `${admin.userId}/${crypto.randomUUID()}-${baseName}${extension}`;
  const { error } = await (await createServerSupabaseClient()).storage.from(bucket).upload(path, file, { cacheControl: "3600", contentType: file.type, upsert: false });
  return error ? { ok: false, message: "The upload could not be completed." } : { ok: true, message: "Upload complete.", path };
}
