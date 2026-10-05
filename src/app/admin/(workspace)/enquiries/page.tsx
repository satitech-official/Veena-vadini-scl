import { EnquiryManager } from "@/components/admin/enquiry-manager";
import { requireAdmin } from "@/lib/admin/auth";
import { getContactEnquiriesResult } from "@/lib/admin/repository";

export default async function ContactEnquiriesAdminPage() { await requireAdmin(); const result = await getContactEnquiriesResult(); return <EnquiryManager hasLoadError={result.hasLoadError} kind="contact" records={result.records} />; }
