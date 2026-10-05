import { AdminContentManager } from "@/components/admin/admin-content-manager";
import { requireAdmin } from "@/lib/admin/auth";
import { adminResourceDefinitions, type AdminContentResource } from "@/lib/admin/resources";
import { getAdminContentRecordsResult } from "@/lib/admin/repository";

export async function AdminContentPage({ resource }: { resource: AdminContentResource }) {
  await requireAdmin();
  const { records, hasLoadError } = await getAdminContentRecordsResult(resource);
  return <AdminContentManager definition={adminResourceDefinitions[resource]} hasLoadError={hasLoadError} records={records} resource={resource} />;
}
