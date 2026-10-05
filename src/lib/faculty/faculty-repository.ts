import { facultySeed } from "@/content/faculty/faculty-seed";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getSupabaseFacultyResult } from "@/lib/supabase/public-content";
import type { PublicContentResult } from "@/lib/content/public-content-result";
import type { FacultyProfile } from "@/types/faculty";

export interface FacultyRepository {
  getPublicProfiles(): Promise<FacultyProfile[]>;
}

class LocalFacultyRepository implements FacultyRepository {
  async getPublicProfiles(): Promise<FacultyProfile[]> {
    return facultySeed
      .filter((profile) => profile.visibility === "public" && profile.status === "published")
      .toSorted((first, second) => first.order - second.order);
  }
}

const facultyRepository = new LocalFacultyRepository();

export function getFacultyProfiles(): Promise<FacultyProfile[]> {
  return getFacultyProfilesResult().then((result) => result.records);
}

export async function getFacultyProfilesResult(): Promise<PublicContentResult<FacultyProfile[]>> {
  if (isSupabaseConfigured()) {
    const result = await getSupabaseFacultyResult();
    return { records: result.data, hasLoadError: result.hasError };
  }

  return { records: await facultyRepository.getPublicProfiles(), hasLoadError: false };
}
