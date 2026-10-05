import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdmin } from "@/lib/admin/auth";

export default async function AdminWorkspaceLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Guard the entire route group so a newly added workspace route cannot
  // accidentally render its shell before its own page-level authorization.
  const admin = await requireAdmin();
  return <AdminShell displayName={admin?.displayName}>{children}</AdminShell>;
}
