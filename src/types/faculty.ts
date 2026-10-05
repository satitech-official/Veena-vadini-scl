export type FacultyVisibility = "public" | "hidden";
export type FacultyStatus = "draft" | "published" | "archived";

/**
 * A content-ready faculty profile. These fields intentionally remain optional
 * until the school supplies verified staff details and approved portraits.
 */
export type FacultyProfile = {
  id: string;
  name?: string;
  slug?: string;
  designation?: string;
  subjects?: string[];
  classes?: string[];
  bio?: string;
  image?: string | null;
  experience?: string;
  qualification?: string;
  order: number;
  visibility: FacultyVisibility;
  status: FacultyStatus;
};
