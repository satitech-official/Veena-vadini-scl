-- Veena Vadini Public School — Phase 12 backend foundation
-- Apply this migration only to an intentionally connected Supabase project.
-- It creates no Auth users and seeds no demo content, faculty, documents, or media.

create extension if not exists pgcrypto;

create type public.content_visibility as enum ('public', 'hidden');
create type public.content_status as enum ('draft', 'published', 'archived');
create type public.admin_role as enum ('admin', 'editor');
create type public.admission_enquiry_status as enum ('New', 'Contacted', 'Follow Up', 'Visit Scheduled', 'Admitted', 'Closed');
create type public.contact_enquiry_status as enum ('New', 'Contacted', 'Closed');
create type public.gallery_media_type as enum ('image', 'video');

create table public.admin_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  display_name text,
  role public.admin_role not null default 'admin',
  active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.school_settings (
  id uuid primary key default gen_random_uuid(),
  school_name text not null,
  tagline text,
  motto text,
  address text,
  primary_phone text,
  secondary_phone text,
  whatsapp text,
  email text,
  instagram text,
  facebook text,
  office_hours text,
  google_maps_url text,
  google_maps_embed_url text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.admission_enquiries (
  id uuid primary key default gen_random_uuid(),
  parent_name text not null,
  student_name text not null,
  date_of_birth date not null,
  applying_for_class text not null,
  current_school text,
  mobile text not null,
  whatsapp text,
  email text,
  address text not null,
  preferred_communication text not null check (preferred_communication in ('Phone', 'WhatsApp', 'Email')),
  message text,
  source text not null default 'website' check (source in ('website')),
  status public.admission_enquiry_status not null default 'New',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.contact_enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  whatsapp text,
  email text,
  enquiry_type text not null check (enquiry_type in ('General Information', 'Admission Enquiry', 'Campus Visit', 'Other')),
  message text not null,
  source text not null default 'website-contact' check (source in ('website-contact')),
  status public.contact_enquiry_status not null default 'New',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.notices (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text not null,
  description text not null,
  publish_date date not null,
  category text not null,
  attachment_path text,
  attachment_label text,
  is_important boolean not null default false,
  is_new boolean not null default false,
  visibility public.content_visibility not null default 'hidden',
  status public.content_status not null default 'draft',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text not null,
  description text not null,
  event_date date not null,
  start_time time,
  end_time time,
  category text not null,
  location text,
  image_path text,
  is_featured boolean not null default false,
  visibility public.content_visibility not null default 'hidden',
  status public.content_status not null default 'draft',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint events_time_order check (end_time is null or start_time is null or end_time >= start_time)
);

create table public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  caption text not null default '',
  alt text not null,
  category text not null,
  media_type public.gallery_media_type not null default 'image',
  src text not null,
  thumbnail_src text,
  width integer,
  height integer,
  featured boolean not null default false,
  display_order integer not null default 0,
  capture_date date,
  visibility public.content_visibility not null default 'hidden',
  status public.content_status not null default 'draft',
  approved_for_public_use boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint gallery_dimensions_positive check ((width is null or width > 0) and (height is null or height > 0))
);

create table public.faculty (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  designation text,
  subjects text[] not null default '{}',
  classes text[] not null default '{}',
  bio text,
  image_path text,
  experience text,
  qualification text,
  display_order integer not null default 0,
  visibility public.content_visibility not null default 'hidden',
  status public.content_status not null default 'draft',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.downloads (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text not null,
  file_path text not null,
  file_type text,
  file_size bigint,
  publish_date date,
  visibility public.content_visibility not null default 'hidden',
  status public.content_status not null default 'draft',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint downloads_file_size_positive check (file_size is null or file_size >= 0)
);

create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  message text not null,
  cta_label text,
  cta_url text,
  starts_at timestamptz,
  ends_at timestamptz,
  enabled boolean not null default false,
  priority integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint announcements_date_order check (ends_at is null or starts_at is null or ends_at >= starts_at)
);

-- Query patterns used by the public repositories and responsive admin tables.
create index notices_publication_idx on public.notices (status, visibility, publish_date desc);
create index events_publication_idx on public.events (status, visibility, event_date asc);
create index gallery_publication_idx on public.gallery_items (status, visibility, approved_for_public_use, display_order asc);
create index faculty_publication_idx on public.faculty (status, visibility, display_order asc);
create index downloads_publication_idx on public.downloads (status, visibility, publish_date desc);
create index announcements_active_idx on public.announcements (enabled, starts_at, ends_at, priority desc);
create index admission_enquiries_status_created_idx on public.admission_enquiries (status, created_at desc);
create index contact_enquiries_status_created_idx on public.contact_enquiries (status, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

revoke all on function public.set_updated_at() from public;

create trigger set_admin_profiles_updated_at before update on public.admin_profiles for each row execute function public.set_updated_at();
create trigger set_school_settings_updated_at before update on public.school_settings for each row execute function public.set_updated_at();
create trigger set_admission_enquiries_updated_at before update on public.admission_enquiries for each row execute function public.set_updated_at();
create trigger set_contact_enquiries_updated_at before update on public.contact_enquiries for each row execute function public.set_updated_at();
create trigger set_notices_updated_at before update on public.notices for each row execute function public.set_updated_at();
create trigger set_events_updated_at before update on public.events for each row execute function public.set_updated_at();
create trigger set_gallery_items_updated_at before update on public.gallery_items for each row execute function public.set_updated_at();
create trigger set_faculty_updated_at before update on public.faculty for each row execute function public.set_updated_at();
create trigger set_downloads_updated_at before update on public.downloads for each row execute function public.set_updated_at();
create trigger set_announcements_updated_at before update on public.announcements for each row execute function public.set_updated_at();

-- Verified current school values only. Email, Facebook and Maps remain empty
-- until the school supplies those verified values.
insert into public.school_settings (
  school_name, tagline, motto, address, primary_phone, secondary_phone,
  whatsapp, email, instagram, facebook, office_hours, google_maps_url,
  google_maps_embed_url
) values (
  'Veena Vadini Public School',
  'Empowering Young Minds for a Brighter Tomorrow.',
  'Dream. Believe. Achieve.',
  'Chhuri Road, Padhar, District Betul, Madhya Pradesh',
  '+91 95758 51407',
  '+91 88150 91010',
  '+91 95758 51407',
  null,
  'https://www.instagram.com/veena_vadini_public_school',
  null,
  '8:00 AM – 4:00 PM',
  null,
  null
);

-- Every table exposed through the Data API is explicitly protected.
alter table public.admin_profiles enable row level security;
alter table public.school_settings enable row level security;
alter table public.admission_enquiries enable row level security;
alter table public.contact_enquiries enable row level security;
alter table public.notices enable row level security;
alter table public.events enable row level security;
alter table public.gallery_items enable row level security;
alter table public.faculty enable row level security;
alter table public.downloads enable row level security;
alter table public.announcements enable row level security;

-- Start from no browser-accessible grants, then grant only exact operations.
revoke all on table public.admin_profiles, public.school_settings, public.admission_enquiries,
  public.contact_enquiries, public.notices, public.events, public.gallery_items,
  public.faculty, public.downloads, public.announcements from anon, authenticated;

grant select on table public.admin_profiles to authenticated;
grant select on table public.school_settings, public.notices, public.events,
  public.gallery_items, public.faculty, public.downloads, public.announcements to anon;
grant select, insert, update, delete on table public.school_settings, public.notices,
  public.events, public.gallery_items, public.faculty, public.downloads,
  public.announcements to authenticated;
grant select, update on table public.admission_enquiries, public.contact_enquiries to authenticated;

-- A signed-in user may only discover their own profile. No client can create
-- its own admin profile; provision profiles intentionally with an owner tool.
create policy "Admin can read own profile"
on public.admin_profiles for select to authenticated
using ((select auth.uid()) = user_id);

-- All management policies require both an authenticated identity and a matching
-- active profile. They do not rely on editable user metadata or client state.
create policy "Active admins manage school settings"
on public.school_settings for all to authenticated
using (exists (select 1 from public.admin_profiles where user_id = (select auth.uid()) and active and role in ('admin', 'editor')))
with check (exists (select 1 from public.admin_profiles where user_id = (select auth.uid()) and active and role in ('admin', 'editor')));
create policy "Public reads school settings"
on public.school_settings for select to anon, authenticated
using (true);

create policy "Active admins read admission enquiries"
on public.admission_enquiries for select to authenticated
using (exists (select 1 from public.admin_profiles where user_id = (select auth.uid()) and active and role in ('admin', 'editor')));
create policy "Active admins update admission enquiries"
on public.admission_enquiries for update to authenticated
using (exists (select 1 from public.admin_profiles where user_id = (select auth.uid()) and active and role in ('admin', 'editor')))
with check (exists (select 1 from public.admin_profiles where user_id = (select auth.uid()) and active and role in ('admin', 'editor')));

create policy "Active admins read contact enquiries"
on public.contact_enquiries for select to authenticated
using (exists (select 1 from public.admin_profiles where user_id = (select auth.uid()) and active and role in ('admin', 'editor')));
create policy "Active admins update contact enquiries"
on public.contact_enquiries for update to authenticated
using (exists (select 1 from public.admin_profiles where user_id = (select auth.uid()) and active and role in ('admin', 'editor')))
with check (exists (select 1 from public.admin_profiles where user_id = (select auth.uid()) and active and role in ('admin', 'editor')));

create policy "Public reads published notices"
on public.notices for select to anon, authenticated
using (status = 'published' and visibility = 'public');
create policy "Active admins manage notices"
on public.notices for all to authenticated
using (exists (select 1 from public.admin_profiles where user_id = (select auth.uid()) and active and role in ('admin', 'editor')))
with check (exists (select 1 from public.admin_profiles where user_id = (select auth.uid()) and active and role in ('admin', 'editor')));

create policy "Public reads published events"
on public.events for select to anon, authenticated
using (status = 'published' and visibility = 'public');
create policy "Active admins manage events"
on public.events for all to authenticated
using (exists (select 1 from public.admin_profiles where user_id = (select auth.uid()) and active and role in ('admin', 'editor')))
with check (exists (select 1 from public.admin_profiles where user_id = (select auth.uid()) and active and role in ('admin', 'editor')));

create policy "Public reads approved published gallery"
on public.gallery_items for select to anon, authenticated
using (status = 'published' and visibility = 'public' and approved_for_public_use);
create policy "Active admins manage gallery"
on public.gallery_items for all to authenticated
using (exists (select 1 from public.admin_profiles where user_id = (select auth.uid()) and active and role in ('admin', 'editor')))
with check (exists (select 1 from public.admin_profiles where user_id = (select auth.uid()) and active and role in ('admin', 'editor')));

create policy "Public reads published faculty"
on public.faculty for select to anon, authenticated
using (status = 'published' and visibility = 'public');
create policy "Active admins manage faculty"
on public.faculty for all to authenticated
using (exists (select 1 from public.admin_profiles where user_id = (select auth.uid()) and active and role in ('admin', 'editor')))
with check (exists (select 1 from public.admin_profiles where user_id = (select auth.uid()) and active and role in ('admin', 'editor')));

create policy "Public reads published downloads"
on public.downloads for select to anon, authenticated
using (status = 'published' and visibility = 'public');
create policy "Active admins manage downloads"
on public.downloads for all to authenticated
using (exists (select 1 from public.admin_profiles where user_id = (select auth.uid()) and active and role in ('admin', 'editor')))
with check (exists (select 1 from public.admin_profiles where user_id = (select auth.uid()) and active and role in ('admin', 'editor')));

create policy "Public reads active announcements"
on public.announcements for select to anon, authenticated
using (enabled and (starts_at is null or starts_at <= timezone('utc', now())) and (ends_at is null or ends_at >= timezone('utc', now())));
create policy "Active admins manage announcements"
on public.announcements for all to authenticated
using (exists (select 1 from public.admin_profiles where user_id = (select auth.uid()) and active and role in ('admin', 'editor')))
with check (exists (select 1 from public.admin_profiles where user_id = (select auth.uid()) and active and role in ('admin', 'editor')));

-- Storage buckets are intentionally private. Public repositories generate
-- short-lived URLs only for records that passed their public-content policy.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types) values
  ('gallery', 'gallery', false, 5242880, array['image/jpeg', 'image/png', 'image/webp']),
  ('faculty', 'faculty', false, 5242880, array['image/jpeg', 'image/png', 'image/webp']),
  ('events', 'events', false, 5242880, array['image/jpeg', 'image/png', 'image/webp']),
  ('documents', 'documents', false, 10485760, array['application/pdf'])
on conflict (id) do nothing;

create policy "Active admins manage school storage"
on storage.objects for all to authenticated
using (
  bucket_id in ('gallery', 'faculty', 'events', 'documents')
  and exists (select 1 from public.admin_profiles where user_id = (select auth.uid()) and active and role in ('admin', 'editor'))
)
with check (
  bucket_id in ('gallery', 'faculty', 'events', 'documents')
  and exists (select 1 from public.admin_profiles where user_id = (select auth.uid()) and active and role in ('admin', 'editor'))
);
