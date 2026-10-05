import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { requireAdmin } from "@/lib/admin/auth";
import { getAdminMetrics } from "@/lib/admin/repository";

export default async function AdminDashboardPage() {
  const admin = await requireAdmin();
  const metrics = await getAdminMetrics();
  return <AdminDashboard displayName={admin.displayName} metrics={metrics} />;
}
