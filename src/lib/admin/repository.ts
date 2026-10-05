import "server-only";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { AdminContentResource } from "@/lib/admin/resources";

export type AdminRecord = { id: string; [key: string]: unknown };
export type AdminLoadResult<T> = { records: T[]; hasLoadError: boolean };

const resourceTable: Record<AdminContentResource, string> = {
  announcements: "announcements", downloads: "downloads", events: "events", faculty: "faculty",
  gallery: "gallery_items", notices: "notices", settings: "school_settings",
};

export async function getAdminContentRecordsResult(resource: AdminContentResource): Promise<AdminLoadResult<AdminRecord>> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.from(resourceTable[resource]).select("*").order(resource === "events" ? "event_date" : "updated_at", { ascending: false }).limit(resource === "settings" ? 1 : 50);
  return error || !data ? { records: [], hasLoadError: true } : { records: data as AdminRecord[], hasLoadError: false };
}

export async function getAdminContentRecords(resource: AdminContentResource): Promise<AdminRecord[]> {
  return (await getAdminContentRecordsResult(resource)).records;
}

export type AdminEnquiryRecord = AdminRecord & {
  status: string;
  created_at: string;
};

export async function getAdmissionEnquiriesResult(): Promise<AdminLoadResult<AdminEnquiryRecord>> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.from("admission_enquiries").select("id, parent_name, student_name, applying_for_class, mobile, preferred_communication, status, created_at, date_of_birth, current_school, whatsapp, email, address, message").order("created_at", { ascending: false }).limit(50);
  return error || !data ? { records: [], hasLoadError: true } : { records: data as AdminEnquiryRecord[], hasLoadError: false };
}

export async function getAdmissionEnquiries(): Promise<AdminEnquiryRecord[]> {
  return (await getAdmissionEnquiriesResult()).records;
}

export async function getContactEnquiriesResult(): Promise<AdminLoadResult<AdminEnquiryRecord>> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.from("contact_enquiries").select("id, name, phone, whatsapp, email, enquiry_type, message, status, created_at").order("created_at", { ascending: false }).limit(50);
  return error || !data ? { records: [], hasLoadError: true } : { records: data as AdminEnquiryRecord[], hasLoadError: false };
}

export async function getContactEnquiries(): Promise<AdminEnquiryRecord[]> {
  return (await getContactEnquiriesResult()).records;
}

export type AdminMetric = { label: string; value: number | null; href: string };

export async function getAdminMetrics(): Promise<AdminMetric[]> {
  const supabase = await createServerSupabaseClient();
  const count = async (table: string, href: string, label: string, filters?: Record<string, string>) => {
    let query = supabase.from(table).select("id", { count: "exact", head: true });
    Object.entries(filters ?? {}).forEach(([column, value]) => { query = query.eq(column, value); });
    const { count: result, error } = await query;
    return { label, value: error ? null : result ?? 0, href };
  };

  return Promise.all([
    count("admission_enquiries", "/admin/admissions", "New admission enquiries", { status: "New" }),
    count("contact_enquiries", "/admin/enquiries", "New contact enquiries", { status: "New" }),
    count("notices", "/admin/notices", "Published notices", { status: "published" }),
    count("events", "/admin/events", "Published events", { status: "published" }),
    count("gallery_items", "/admin/gallery", "Gallery items"),
    count("downloads", "/admin/downloads", "Downloads"),
  ]);
}
