import { NextResponse, type NextRequest } from "next/server";

import { contactEnquirySchema } from "@/lib/contact/contact-schema";
import { hasTrustedFormOrigin } from "@/lib/enquiries/request-security";
import { isSupabaseServiceRoleConfigured } from "@/lib/supabase/env";
import { createServiceRoleSupabaseClient } from "@/lib/supabase/service-role";

export async function POST(request: NextRequest) {
  if (!hasTrustedFormOrigin(request)) {
    return NextResponse.json({ code: "validation" }, { status: 403 });
  }
  if (!isSupabaseServiceRoleConfigured()) {
    return NextResponse.json({ code: "configuration" }, { status: 503 });
  }

  const parsed = contactEnquirySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ code: "validation" }, { status: 400 });
  }

  const values = parsed.data;
  const { error } = await createServiceRoleSupabaseClient().from("contact_enquiries").insert({
    email: values.email || null,
    enquiry_type: values.enquiryType,
    message: values.message,
    name: values.name,
    phone: values.phone,
    source: "website-contact",
    whatsapp: values.whatsapp || null,
  });

  if (error) {
    return NextResponse.json({ code: "submission" }, { status: 502 });
  }

  return NextResponse.json({ submittedAt: new Date().toISOString() }, { status: 201 });
}
