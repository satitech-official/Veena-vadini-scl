import { downloadCategories } from "@/types/downloads";
import { eventCategories, noticeCategories } from "@/types/content";
import { galleryCategories } from "@/types/gallery";

export const adminContentResources = ["notices", "events", "gallery", "faculty", "downloads", "announcements", "settings"] as const;
export type AdminContentResource = (typeof adminContentResources)[number];

export type AdminField = {
  name: string;
  label: string;
  kind: "text" | "textarea" | "date" | "time" | "number" | "select" | "boolean" | "asset";
  required?: boolean;
  help?: string;
  options?: readonly string[];
  bucket?: "gallery" | "faculty" | "events" | "documents";
  rows?: number;
};

export type AdminResourceDefinition = {
  label: string;
  singular: string;
  description: string;
  fields: readonly AdminField[];
};

const visibilityOptions = ["public", "hidden"] as const;
const statusOptions = ["draft", "published", "archived"] as const;

export const adminResourceDefinitions: Record<AdminContentResource, AdminResourceDefinition> = {
  notices: {
    label: "Notices", singular: "Notice", description: "Create, publish, archive, and remove verified school notices.",
    fields: [
      { name: "title", label: "Title", kind: "text", required: true },
      { name: "slug", label: "Slug", kind: "text", help: "Leave blank to generate from the title. Keep this stable after publishing." },
      { name: "summary", label: "Summary", kind: "textarea", required: true, rows: 3 },
      { name: "description", label: "Full description", kind: "textarea", required: true, rows: 7 },
      { name: "publish_date", label: "Publish date", kind: "date", required: true },
      { name: "category", label: "Category", kind: "select", required: true, options: noticeCategories },
      { name: "attachment_path", label: "Attachment", kind: "asset", bucket: "documents", help: "PDF only; upload first to store a private path." },
      { name: "attachment_label", label: "Attachment label", kind: "text" },
      { name: "is_important", label: "Mark as important", kind: "boolean" },
      { name: "is_new", label: "Mark as new", kind: "boolean" },
      { name: "visibility", label: "Visibility", kind: "select", required: true, options: visibilityOptions },
      { name: "status", label: "Status", kind: "select", required: true, options: statusOptions },
    ],
  },
  events: {
    label: "Events", singular: "Event", description: "Manage verified events, dates, featured treatment, and public visibility.",
    fields: [
      { name: "title", label: "Title", kind: "text", required: true },
      { name: "slug", label: "Slug", kind: "text", help: "Leave blank to generate from the title." },
      { name: "summary", label: "Summary", kind: "textarea", required: true, rows: 3 },
      { name: "description", label: "Full description", kind: "textarea", required: true, rows: 7 },
      { name: "event_date", label: "Event date", kind: "date", required: true },
      { name: "start_time", label: "Start time", kind: "time" },
      { name: "end_time", label: "End time", kind: "time" },
      { name: "category", label: "Category", kind: "select", required: true, options: eventCategories },
      { name: "location", label: "Location", kind: "text" },
      { name: "image_path", label: "Event image", kind: "asset", bucket: "events" },
      { name: "registration_url", label: "Registration or contact link", kind: "text", help: "Use a relative path or approved HTTPS URL." },
      { name: "is_featured", label: "Feature this event", kind: "boolean" },
      { name: "visibility", label: "Visibility", kind: "select", required: true, options: visibilityOptions },
      { name: "status", label: "Status", kind: "select", required: true, options: statusOptions },
    ],
  },
  gallery: {
    label: "Gallery", singular: "Gallery item", description: "Only items explicitly approved for public use can be published to the public gallery.",
    fields: [
      { name: "title", label: "Title", kind: "text", required: true },
      { name: "slug", label: "Slug", kind: "text", help: "Leave blank to generate from the title." },
      { name: "caption", label: "Caption", kind: "textarea", rows: 3 },
      { name: "alt", label: "Alt text", kind: "textarea", required: true, help: "Describe what is visible for screen-reader users.", rows: 2 },
      { name: "category", label: "Category", kind: "select", required: true, options: galleryCategories.filter((category) => category !== "All") },
      { name: "media_type", label: "Media type", kind: "select", required: true, options: ["image", "video"] },
      { name: "src", label: "Image path or approved video URL", kind: "asset", required: true, bucket: "gallery", help: "For external video, enter an approved HTTPS URL in this field." },
      { name: "thumbnail_src", label: "Video thumbnail", kind: "asset", bucket: "gallery" },
      { name: "width", label: "Media width", kind: "number" },
      { name: "height", label: "Media height", kind: "number" },
      { name: "display_order", label: "Display order", kind: "number", required: true },
      { name: "capture_date", label: "Capture date", kind: "date" },
      { name: "featured", label: "Feature this item", kind: "boolean" },
      { name: "approved_for_public_use", label: "Approved for public use", kind: "boolean", required: true, help: "Required before this item can be published publicly." },
      { name: "visibility", label: "Visibility", kind: "select", required: true, options: visibilityOptions },
      { name: "status", label: "Status", kind: "select", required: true, options: statusOptions },
    ],
  },
  faculty: {
    label: "Faculty", singular: "Faculty profile", description: "Add only verified faculty information and approved portraits.",
    fields: [
      { name: "name", label: "Name", kind: "text", required: true },
      { name: "slug", label: "Slug", kind: "text", help: "Leave blank to generate from the name." },
      { name: "designation", label: "Designation", kind: "text" },
      { name: "subjects", label: "Subjects", kind: "textarea", help: "One subject per line.", rows: 3 },
      { name: "classes", label: "Classes", kind: "textarea", help: "One class per line.", rows: 3 },
      { name: "bio", label: "Biography", kind: "textarea", rows: 6 },
      { name: "image_path", label: "Portrait", kind: "asset", bucket: "faculty" },
      { name: "experience", label: "Experience", kind: "text" },
      { name: "qualification", label: "Qualification", kind: "text" },
      { name: "display_order", label: "Display order", kind: "number", required: true },
      { name: "visibility", label: "Visibility", kind: "select", required: true, options: visibilityOptions },
      { name: "status", label: "Status", kind: "select", required: true, options: statusOptions },
    ],
  },
  downloads: {
    label: "Downloads", singular: "Document", description: "Upload real school documents only; private storage paths are signed on the public site after publication.",
    fields: [
      { name: "title", label: "Title", kind: "text", required: true },
      { name: "description", label: "Description", kind: "textarea", rows: 4 },
      { name: "category", label: "Category", kind: "select", required: true, options: downloadCategories.filter((category) => category !== "All") },
      { name: "file_path", label: "Document", kind: "asset", required: true, bucket: "documents" },
      { name: "file_type", label: "File type", kind: "text", help: "For example: PDF" },
      { name: "file_size", label: "File size in bytes", kind: "number" },
      { name: "publish_date", label: "Publish date", kind: "date" },
      { name: "visibility", label: "Visibility", kind: "select", required: true, options: visibilityOptions },
      { name: "status", label: "Status", kind: "select", required: true, options: statusOptions },
    ],
  },
  announcements: {
    label: "Announcements", singular: "Announcement", description: "Prepare and schedule concise school announcements without changing the approved homepage UI.",
    fields: [
      { name: "title", label: "Title", kind: "text", required: true },
      { name: "message", label: "Message", kind: "textarea", required: true, rows: 5 },
      { name: "cta_label", label: "CTA label", kind: "text" },
      { name: "cta_url", label: "CTA URL", kind: "text", help: "Use a relative path or approved HTTPS URL." },
      { name: "starts_at", label: "Starts at", kind: "date" },
      { name: "ends_at", label: "Ends at", kind: "date" },
      { name: "priority", label: "Priority", kind: "number", required: true },
      { name: "enabled", label: "Enabled", kind: "boolean" },
    ],
  },
  settings: {
    label: "School Settings", singular: "School settings", description: "Keep school-wide information verified. Leave email, Facebook, and Maps blank until official values are supplied.",
    fields: [
      { name: "school_name", label: "School name", kind: "text", required: true },
      { name: "tagline", label: "Tagline", kind: "text" },
      { name: "motto", label: "Motto", kind: "text" },
      { name: "address", label: "Address", kind: "textarea", rows: 3 },
      { name: "primary_phone", label: "Primary phone", kind: "text" },
      { name: "secondary_phone", label: "Secondary phone", kind: "text" },
      { name: "whatsapp", label: "WhatsApp", kind: "text" },
      { name: "email", label: "Email", kind: "text" },
      { name: "instagram", label: "Instagram URL", kind: "text" },
      { name: "facebook", label: "Facebook URL", kind: "text" },
      { name: "office_hours", label: "Office hours", kind: "text" },
      { name: "google_maps_url", label: "Google Maps URL", kind: "text" },
      { name: "google_maps_embed_url", label: "Google Maps embed URL", kind: "text" },
    ],
  },
};
