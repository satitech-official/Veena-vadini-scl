import { EnquiryManager } from "@/components/admin/enquiry-manager";
import { requireAdmin } from "@/lib/admin/auth";
import { getAdmissionEnquiriesResult } from "@/lib/admin/repository";

export default async function AdmissionsAdminPage() { await requireAdmin(); const result = await getAdmissionEnquiriesResult(); return <EnquiryManager hasLoadError={result.hasLoadError} kind="admission" records={result.records} />; }
