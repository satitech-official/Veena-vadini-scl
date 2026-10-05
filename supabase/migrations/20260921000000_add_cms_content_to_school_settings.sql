-- Adds a single extensible, non-destructive editorial payload to the existing
-- school settings row. Existing public content continues to use its checked-in
-- fallback until an administrator saves a verified value.
alter table public.school_settings
  add column if not exists cms_content jsonb not null default '{}'::jsonb;

comment on column public.school_settings.cms_content is
  'Validated, editor-managed copy for homepage, about, leadership, academics, facilities, contact, social, SEO, and site settings.';

alter table public.events
  add column if not exists registration_url text;
