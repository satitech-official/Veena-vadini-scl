import "server-only";

import { cache } from "react";

import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { readCmsContent } from "@/lib/settings/cms-content";
import { resolvePublicSchoolSettings } from "@/lib/settings/public-school-settings";
import type { PublicSchoolSettings, SchoolSettingsRecord } from "@/types/settings";

/**
 * A server-only source for dynamic school information. The locked public shell
 * continues using the verified static configuration until Phase 13 explicitly
 * approves where database-backed settings should replace each public value.
 */
export const getPublishedSchoolSettings = cache(async (): Promise<SchoolSettingsRecord | null> => {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await (await createServerSupabaseClient()).from("school_settings").select("*").limit(1).maybeSingle();
    if (error || !data) return null;
    return {
      id: data.id, schoolName: data.school_name, tagline: data.tagline, motto: data.motto, address: data.address,
      primaryPhone: data.primary_phone, secondaryPhone: data.secondary_phone, whatsapp: data.whatsapp, email: data.email,
      instagram: data.instagram, facebook: data.facebook, officeHours: data.office_hours,
      googleMapsUrl: data.google_maps_url, googleMapsEmbedUrl: data.google_maps_embed_url,
      cmsContent: readCmsContent(data.cms_content),
    };
  } catch {
    return null;
  }
});

/** Public, serializable settings for approved site-wide presentation only. */
export const getPublicSchoolSettings = cache(async (): Promise<PublicSchoolSettings> =>
  resolvePublicSchoolSettings(await getPublishedSchoolSettings()),
);
