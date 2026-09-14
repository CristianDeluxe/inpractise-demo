-- The smallest faithful stand-in for the Supabase primitives the migrations
-- depend on: the three request roles, an auth schema with a users table the
-- membership foreign key can point at, and auth.uid() reading the same JWT
-- claim setting PostgREST uses. Nothing here grants access; every policy under
-- test is defined by the repository's own migrations.
create role anon nologin noinherit;
create role authenticated nologin noinherit;
create role service_role nologin noinherit bypassrls;
grant anon, authenticated, service_role to postgres;

-- Supabase ships the extensions schema with usage already granted to the
-- request roles; the migrations only add extensions to it. Without this grant
-- a policy-correct function call fails on the schema instead of the policy.
create schema extensions;
grant usage on schema extensions to anon, authenticated, service_role;

create schema auth;
create table auth.users (
  id uuid primary key,
  email text
);

create function auth.uid() returns uuid language sql stable as $$
  select nullif(
    current_setting('request.jwt.claims', true)::json ->> 'sub',
    ''
  )::uuid
$$;

grant usage on schema auth to anon, authenticated, service_role;
grant execute on function auth.uid() to anon, authenticated, service_role;
grant usage on schema public to anon, authenticated, service_role;
