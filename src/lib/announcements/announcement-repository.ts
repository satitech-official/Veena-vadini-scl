import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Announcement } from "@/types/settings";

export type AnnouncementResult = {
  announcements: Announcement[];
  hasLoadError: boolean;
};

/** Active, date-valid announcements for the public homepage only. */
export async function getActiveAnnouncementsResult(): Promise<AnnouncementResult> {
  if (!isSupabaseConfigured()) return { announcements: [], hasLoadError: false };
  try {
    const { data, error } = await (await createServerSupabaseClient()).from("announcements").select("id, title, message, cta_label, cta_url, starts_at, ends_at, priority").order("priority", { ascending: false }).limit(3);
    if (error || !data) return { announcements: [], hasLoadError: true };
    return {
      announcements: data.map((item) => ({ id: item.id, title: item.title, message: item.message, ctaLabel: item.cta_label, ctaUrl: item.cta_url, startsAt: item.starts_at, endsAt: item.ends_at, priority: item.priority })),
      hasLoadError: false,
    };
  } catch {
    return { announcements: [], hasLoadError: true };
  }
}

export async function getActiveAnnouncements(): Promise<Announcement[]> {
  return (await getActiveAnnouncementsResult()).announcements;
}
