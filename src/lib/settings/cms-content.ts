import { cmsContentSections, type CmsContent, type CmsContentSection } from "@/types/settings";

/** Keeps malformed or unexpected JSON from changing the public presentation. */
export function readCmsContent(value: unknown): CmsContent {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  const source = value as Record<string, unknown>;
  return Object.fromEntries(
    cmsContentSections.flatMap((section) => {
      const candidate = source[section];
      if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) return [];

      const entries = Object.entries(candidate as Record<string, unknown>)
        .filter((entry): entry is [string, string] => typeof entry[1] === "string")
        .map(([key, text]) => [key, text.trim().slice(0, 6000)] as const);

      return entries.length ? [[section, Object.fromEntries(entries)] as const] : [];
    }),
  ) as CmsContent;
}

export function getCmsText(
  content: CmsContent | undefined,
  section: CmsContentSection,
  field: string,
  fallback: string,
) {
  return content?.[section]?.[field]?.trim() || fallback;
}
