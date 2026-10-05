import "server-only";

import type { DownloadDocument } from "@/types/downloads";
import type { FacultyProfile } from "@/types/faculty";
import type { GalleryMediaItem, GalleryVideo } from "@/types/gallery";
import type { Notice, SchoolEvent } from "@/types/content";
import { isSupabaseConfigured, isSupabaseServiceRoleConfigured } from "@/lib/supabase/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createServiceRoleSupabaseClient } from "@/lib/supabase/service-role";

type NoticeRow = {
  id: string; title: string; slug: string; summary: string; description: string; publish_date: string;
  category: Notice["category"]; attachment_path: string | null; attachment_label: string | null;
  is_important: boolean; is_new: boolean; visibility: Notice["visibility"]; status: Notice["status"];
  created_at: string; updated_at: string;
};

type EventRow = {
  id: string; title: string; slug: string; summary: string; description: string; event_date: string;
  start_time: string | null; end_time: string | null; category: SchoolEvent["category"]; location: string | null;
  image_path: string | null; registration_url: string | null; is_featured: boolean; visibility: SchoolEvent["visibility"]; status: SchoolEvent["status"];
  created_at: string; updated_at: string;
};

type GalleryRow = {
  id: string; title: string; slug: string; caption: string; alt: string; category: GalleryMediaItem["category"];
  media_type: "image" | "video"; src: string; thumbnail_src: string | null; width: number | null; height: number | null;
  featured: boolean; display_order: number; capture_date: string | null; visibility: GalleryMediaItem["visibility"];
  status: GalleryMediaItem["status"]; approved_for_public_use: boolean;
};

type FacultyRow = {
  id: string; name: string; slug: string; designation: string | null; subjects: string[]; classes: string[];
  bio: string | null; image_path: string | null; experience: string | null; qualification: string | null;
  display_order: number; visibility: FacultyProfile["visibility"]; status: FacultyProfile["status"];
};

type DownloadRow = {
  id: string; title: string; description: string | null; category: DownloadDocument["category"]; file_path: string;
  file_type: string | null; file_size: number | null; publish_date: string | null;
  visibility: DownloadDocument["visibility"]; status: DownloadDocument["status"];
};

export type SupabasePublicResult<T> = {
  data: T;
  hasError: boolean;
};

function isExternalUrl(value: string) {
  return /^https:\/\//i.test(value);
}

async function publicAssetUrl(bucket: "gallery" | "faculty" | "events" | "documents", path: string | null) {
  if (!path) return null;
  if (isExternalUrl(path)) return path;
  if (!isSupabaseServiceRoleConfigured()) return null;

  const { data, error } = await createServiceRoleSupabaseClient().storage.from(bucket).createSignedUrl(path, 60 * 60);
  return error ? null : data.signedUrl;
}

export async function getSupabaseNoticesResult(): Promise<SupabasePublicResult<Notice[]>> {
  if (!isSupabaseConfigured()) return { data: [], hasError: false };
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.from("notices").select("*").order("publish_date", { ascending: false });
    if (error || !data) return { data: [], hasError: true };

    return { data: await Promise.all((data as NoticeRow[]).map(async (notice) => ({
      id: notice.id, title: notice.title, slug: notice.slug, summary: notice.summary, description: notice.description,
      publishDate: notice.publish_date, category: notice.category,
      attachmentUrl: await publicAssetUrl("documents", notice.attachment_path), attachmentLabel: notice.attachment_label,
      isImportant: notice.is_important, isNew: notice.is_new, visibility: notice.visibility, status: notice.status,
      createdAt: notice.created_at, updatedAt: notice.updated_at, isDemo: false,
    }))), hasError: false };
  } catch {
    return { data: [], hasError: true };
  }
}

export async function getSupabaseNotices(): Promise<Notice[]> {
  return (await getSupabaseNoticesResult()).data;
}

export async function getSupabaseEventsResult(): Promise<SupabasePublicResult<SchoolEvent[]>> {
  if (!isSupabaseConfigured()) return { data: [], hasError: false };
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.from("events").select("*").order("event_date", { ascending: true });
    if (error || !data) return { data: [], hasError: true };

    return { data: await Promise.all((data as EventRow[]).map(async (event) => ({
      id: event.id, title: event.title, slug: event.slug, summary: event.summary, description: event.description,
      date: event.event_date, startTime: event.start_time, endTime: event.end_time, category: event.category,
      location: event.location, registrationUrl: event.registration_url, image: await publicAssetUrl("events", event.image_path), isFeatured: event.is_featured,
      visibility: event.visibility, status: event.status, createdAt: event.created_at, updatedAt: event.updated_at, isDemo: false,
    }))), hasError: false };
  } catch {
    return { data: [], hasError: true };
  }
}

export async function getSupabaseEvents(): Promise<SchoolEvent[]> {
  return (await getSupabaseEventsResult()).data;
}

export async function getSupabaseGalleryResult(): Promise<SupabasePublicResult<{ items: GalleryMediaItem[]; videos: GalleryVideo[] }>> {
  if (!isSupabaseConfigured()) return { data: { items: [], videos: [] }, hasError: false };
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.from("gallery_items").select("*").order("display_order", { ascending: true });
    if (error || !data) return { data: { items: [], videos: [] }, hasError: true };

    const rows = data as GalleryRow[];
    const items = await Promise.all(rows.filter((row) => row.media_type === "image").map(async (item) => ({
      id: item.id, slug: item.slug, title: item.title, caption: item.caption, alt: item.alt, category: item.category,
      mediaType: "image" as const, src: await publicAssetUrl("gallery", item.src), thumbnailSrc: await publicAssetUrl("gallery", item.thumbnail_src),
      width: item.width ?? 1600, height: item.height ?? 1067, featured: item.featured, order: item.display_order,
      captureDate: item.capture_date, visibility: item.visibility, status: item.status, layout: "landscape" as const,
      approvedForPublicUse: item.approved_for_public_use, isPlaceholder: false,
    })));
    const videos = await Promise.all(rows.filter((row) => row.media_type === "video").map(async (item) => ({
      id: item.id, slug: item.slug, title: item.title, caption: item.caption, alt: item.alt,
      thumbnail: await publicAssetUrl("gallery", item.thumbnail_src), videoUrl: await publicAssetUrl("gallery", item.src),
      provider: isExternalUrl(item.src) ? "external" as const : "local" as const, duration: null, category: item.category,
      visibility: item.visibility, status: item.status, order: item.display_order, featured: item.featured, isPlaceholder: false,
    })));
    return { data: { items, videos }, hasError: false };
  } catch {
    return { data: { items: [], videos: [] }, hasError: true };
  }
}

export async function getSupabaseGallery(): Promise<{ items: GalleryMediaItem[]; videos: GalleryVideo[] }> {
  return (await getSupabaseGalleryResult()).data;
}

export async function getSupabaseFacultyResult(): Promise<SupabasePublicResult<FacultyProfile[]>> {
  if (!isSupabaseConfigured()) return { data: [], hasError: false };
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.from("faculty").select("*").order("display_order", { ascending: true });
    if (error || !data) return { data: [], hasError: true };
    return { data: await Promise.all((data as FacultyRow[]).map(async (profile) => ({
      id: profile.id, name: profile.name, slug: profile.slug, designation: profile.designation ?? undefined,
      subjects: profile.subjects, classes: profile.classes, bio: profile.bio ?? undefined,
      image: await publicAssetUrl("faculty", profile.image_path), experience: profile.experience ?? undefined,
      qualification: profile.qualification ?? undefined, order: profile.display_order,
      visibility: profile.visibility, status: profile.status,
    }))), hasError: false };
  } catch {
    return { data: [], hasError: true };
  }
}

export async function getSupabaseFaculty(): Promise<FacultyProfile[]> {
  return (await getSupabaseFacultyResult()).data;
}

export async function getSupabaseDownloadsResult(): Promise<SupabasePublicResult<DownloadDocument[]>> {
  if (!isSupabaseConfigured()) return { data: [], hasError: false };
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.from("downloads").select("*").order("publish_date", { ascending: false });
    if (error || !data) return { data: [], hasError: true };
    return { data: await Promise.all((data as DownloadRow[]).map(async (document) => ({
      id: document.id, title: document.title, description: document.description ?? undefined, category: document.category,
      fileUrl: await publicAssetUrl("documents", document.file_path), fileType: document.file_type ?? undefined,
      fileSize: document.file_size ? `${document.file_size} bytes` : undefined, publishDate: document.publish_date,
      visibility: document.visibility, status: document.status,
    }))), hasError: false };
  } catch {
    return { data: [], hasError: true };
  }
}

export async function getSupabaseDownloads(): Promise<DownloadDocument[]> {
  return (await getSupabaseDownloadsResult()).data;
}
