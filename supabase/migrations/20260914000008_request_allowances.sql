-- One Ask debit per principal per UTC day, committed before provider work.
create table public.request_usage (
 request_id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 usage_day date not null default (now() at time zone 'UTC')::date,
 prompt_tokens bigint,
 completion_tokens bigint,
 total_tokens bigint,
 check ((prompt_tokens is null and completion_tokens is null and total_tokens is null)
   or (prompt_tokens >= 0 and completion_tokens >= 0 and total_tokens = prompt_tokens + completion_tokens))
);
create index request_usage_principal_day on public.request_usage(user_id, usage_day);
alter table public.request_usage enable row level security;
revoke all on public.request_usage from public, anon, authenticated;
grant select on public.request_usage to authenticated;
create policy request_usage_read on public.request_usage for select to authenticated
 using(user_id=(select auth.uid()) and exists(select 1 from public.memberships m where m.user_id=(select auth.uid()) and private.can_access_org(m.org_id)));

-- A non-login, non-bypass role owns only the narrow mutation functions.
create role request_usage_writer nologin noinherit;
grant usage on schema public, private, auth to request_usage_writer;
grant execute on function auth.uid(),private.can_access_org(text,boolean) to request_usage_writer;
grant select on public.memberships to request_usage_writer;
create policy allowance_membership on public.memberships for select to request_usage_writer
 using(user_id=(select auth.uid()));
grant select,insert,update on public.request_usage to request_usage_writer;
create policy request_usage_mutation on public.request_usage to request_usage_writer
 using(user_id=(select auth.uid()) and exists(select 1 from public.memberships m where m.user_id=(select auth.uid()) and private.can_access_org(m.org_id)))
 with check(user_id=(select auth.uid()) and exists(select 1 from public.memberships m where m.user_id=(select auth.uid()) and private.can_access_org(m.org_id)));

-- The owner may serialize mutation, but identity always comes from the JWT.
-- No arbitrary identity or allowance amount is accepted from callers.
create function public.debit_request() returns uuid
language plpgsql security definer set search_path='' as $$
declare principal uuid := auth.uid(); request uuid;
begin
 if principal is null or not exists(select 1 from public.memberships m where m.user_id=principal and private.can_access_org(m.org_id)) then
   raise exception 'unauthenticated' using errcode='42501';
 end if;
 perform pg_advisory_xact_lock(hashtextextended(principal::text, 0));
 if (select count(*) from public.request_usage where user_id=principal and usage_day=(now() at time zone 'UTC')::date) >= 100 then
   raise exception 'allowance_exhausted' using errcode='P0001';
 end if;
 insert into public.request_usage(user_id) values(principal) returning request_id into request;
 return request;
end;
$$;
create function public.record_request_usage(request uuid, prompt bigint, completion bigint, total bigint) returns void
language plpgsql security definer set search_path='' as $$
begin
 if prompt is null or completion is null or total is null or prompt < 0 or completion < 0 or total <> prompt + completion then
   raise exception 'invalid_usage' using errcode='22023';
 end if;
 update public.request_usage set prompt_tokens=prompt, completion_tokens=completion,total_tokens=total
 where request_id=request and user_id=auth.uid() and total_tokens is null
 and exists(select 1 from public.memberships m where m.user_id=auth.uid() and private.can_access_org(m.org_id));
 if not found then raise exception 'usage_not_available' using errcode='42501'; end if;
end;
$$;
revoke all on function public.debit_request(),public.record_request_usage(uuid,bigint,bigint,bigint) from public,anon;
grant execute on function public.debit_request(),public.record_request_usage(uuid,bigint,bigint,bigint) to authenticated;

grant request_usage_writer to postgres;
grant create on schema public to request_usage_writer;
alter function public.debit_request() owner to request_usage_writer;
alter function public.record_request_usage(uuid,bigint,bigint,bigint) owner to request_usage_writer;
revoke create on schema public from request_usage_writer;
