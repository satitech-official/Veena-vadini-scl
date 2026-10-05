# Veena Vadini Public School

The public website through Phase 11 is preserved as the approved visitor-facing experience. Phase 12 adds an intentionally unconfigured Supabase backend and secure `/admin` workspace. No real Supabase credentials, school administrators, faculty, documents, notices, events, or student media are included in this repository.

## Local preview

```bash
pnpm dev
```

Without Supabase configuration, public content continues using the existing labelled local development data where it exists. `/admin` shows a clear configuration message, and admission/contact submissions do not pretend to succeed.

## Required environment values

Copy `.env.example` to an ignored `.env.local` and fill in only values from the intended Supabase project:

```dotenv
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=
```

`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` is the modern public key from Supabase’s Connect dialog. It is safe to expose only because the migration enables RLS and limits grants. `SUPABASE_SERVICE_ROLE_KEY` is server-only: do not prefix it with `NEXT_PUBLIC_`, do not place it in browser code, do not log it, and never commit it. The service key is required here only for server-validated public enquiry inserts and short-lived signed URLs for private Storage objects.

For a multi-instance deployment, set `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` to one stable secret on every instance. Keep it out of Git.

## Connect an intentional Supabase project

1. Create or choose the school’s Supabase project. Do not connect a personal or unrelated project.
2. In the project’s Connect dialog, copy the Project URL and publishable key into `.env.local`.
3. Add the service-role key only to the server environment. Never expose it to a browser, client component, public runtime variable, or build log.
4. Review `supabase/migrations/20260905000000_phase_12_school_backend.sql` before applying it. It is a first-time schema migration: it creates the tables, policies, private buckets, indexes, and only the verified school-settings record. It does not drop, truncate, or seed sample school content.
5. Apply the migration through the connected Supabase CLI workflow or the project SQL Editor after review. Do not apply it blindly to a project that already has conflicting objects.
6. New Supabase projects may not expose new tables through the Data API automatically. In Supabase Data API settings, intentionally expose only the tables this application uses, then keep the migration’s grants and RLS policies in place. Exposure and RLS are separate controls.
7. In Supabase Auth, enable email/password sign-in for staff and disable public self-registration. Add the local and production admin URLs to the Auth redirect allow-list.
8. Restart the Next.js server after changing `.env.local`.

## Provision the first administrator

There is no public sign-up route. Create the first Auth user intentionally in Supabase Auth (Dashboard or a controlled owner process), then use the SQL Editor to create the matching active profile. Replace the placeholder values before execution:

```sql
insert into public.admin_profiles (user_id, display_name, role, active)
select id, 'Verified administrator name', 'admin', true
from auth.users
where email = 'verified-admin-email@example.invalid';
```

Use the administrator’s real email only in the SQL Editor; do not put it in source code. A signed-in user without an active `admin_profiles` row is redirected away from `/admin`.

## Data and access model

The migration creates:

- `admin_profiles` for intentional administrator provisioning.
- `school_settings` with current verified values only; email, Facebook, and Maps remain empty.
- `admission_enquiries` and `contact_enquiries` as private records.
- `notices`, `events`, `gallery_items`, `faculty`, `downloads`, and `announcements` for managed content.
- Private `gallery`, `faculty`, `events`, and `documents` Storage buckets.

All application tables enable RLS. Anonymous users can read only published public content; gallery rows additionally require `approved_for_public_use`. They cannot read or write enquiries, drafts, hidden content, admin profiles, or Storage objects. Authenticated users can read their own admin profile only. Active administrators must pass an RLS profile check for every management operation. Private enquiry writes occur only in validated server route handlers using the server-only service key.

Storage buckets are private. The public repository signs a URL only after a published record passes its public-content query. Admin uploads are authenticated, authorized, typed, size-limited, and use a generated safe path. Deleting a content record deliberately retains its Storage object for manual review.

## Admin routes

- `/admin/login`
- `/admin`
- `/admin/admissions`
- `/admin/enquiries`
- `/admin/notices`
- `/admin/events`
- `/admin/gallery`
- `/admin/faculty`
- `/admin/downloads`
- `/admin/announcements`
- `/admin/settings`

Every protected page and every server action separately calls the server-side admin verifier. The Next.js `proxy.ts` refreshes cookie sessions, but it is not the authorization boundary.

## Verify before production

After connecting the project, test a real but non-sensitive record in each workflow:

1. An unauthenticated visitor cannot read any enquiry, draft, hidden row, or storage object.
2. A signed-in non-admin cannot access `/admin` or mutate any management table.
3. An active administrator can manage content and change enquiry status.
4. A gallery record cannot be publicly published without `approved_for_public_use`.
5. A public notice/event/faculty/download/gallery query returns only published public rows.
6. Admission and contact forms return success only after an insert succeeds.
7. Run `pnpm lint`, `pnpm typecheck`, and `pnpm build`.
