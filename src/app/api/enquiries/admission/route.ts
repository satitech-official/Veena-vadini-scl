import { NextResponse, type NextRequest } from "next/server";

import { admissionEnquirySchema } from "@/lib/admissions/enquiry-schema";
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

  const parsed = admissionEnquirySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ code: "validation" }, { status: 400 });
  }

  const values = parsed.data;
  const { error } = await createServiceRoleSupabaseClient().from("admission_enquiries").insert({
    address: values.address,
    applying_for_class: values.applyingForClass,
    current_school: values.currentSchool || null,
    date_of_birth: values.dateOfBirth,
    email: values.email || null,
    message: values.message || null,
    mobile: values.mobile,
    parent_name: values.parentName,
    preferred_communication: values.preferredCommunication,
    source: "website",
    student_name: values.studentName,
    whatsapp: values.useMobileForWhatsapp ? values.mobile : values.whatsapp || null,
  });

  if (error) {
    return NextResponse.json({ code: "submission" }, { status: 502 });
  }

  return NextResponse.json({ submittedAt: new Date().toISOString() }, { status: 201 });
}
