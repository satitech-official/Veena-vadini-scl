import { notFound } from "next/navigation";

import { AdminSiteContentManager } from "@/components/admin/admin-site-content-manager";
import { requireAdmin } from "@/lib/admin/auth";
import { adminSiteContentDefinitions } from "@/lib/admin/site-content";
import { getAdminContentRecordsResult } from "@/lib/admin/repository";
import { readCmsContent } from "@/lib/settings/cms-content";
import { cmsContentSections, type CmsContentSection } from "@/types/settings";

export default async function AdminSiteContentPage({ params }: { params: Promise<{ section: string }> }) {
  await requireAdmin();
  const { section } = await params;
  if (!cmsContentSections.includes(section as CmsContentSection)) notFound();

  const result = await getAdminContentRecordsResult("settings");
  const content = readCmsContent(result.records[0]?.cms_content);
  const contentSection = section as CmsContentSection;
  return <AdminSiteContentManager content={content} definition={adminSiteContentDefinitions[contentSection]} hasLoadError={result.hasLoadError} section={contentSection} />;
}
