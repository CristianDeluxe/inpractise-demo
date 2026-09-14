-- Managed Supabase Auth objects cannot be granted by the project postgres role.
-- Inherit the existing authenticated role's Auth access without making the
-- writer role available to authenticated callers or granting RLS bypass.
grant authenticated to request_usage_writer;
alter role request_usage_writer inherit;
