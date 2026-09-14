-- Retrieval diagnostics for a reviewer's own requests: what ranked before
-- context selection, what selection kept, and the token budget it spent. The
-- ledger row already exists and is caller-scoped, so this adds a column rather
-- than a second table, and a recorded_at so the reviewer can read them in order.
alter table public.request_usage add column diagnostics jsonb;
alter table public.request_usage add column recorded_at timestamptz not null default now();
create index request_usage_principal_recent on public.request_usage(user_id, recorded_at desc);

-- Written once per request, by the same narrow non-bypass role that owns the
-- other mutations. Identity comes from the JWT; the caller names no user and no
-- other caller's request. A bounded object keeps an unbounded payload out of
-- the ledger.
create function public.record_request_diagnostics(request uuid, payload jsonb) returns void
language plpgsql security definer set search_path='' as $$
begin
 if payload is null or jsonb_typeof(payload) <> 'object' or pg_column_size(payload) > 4096 then
   raise exception 'invalid_diagnostics' using errcode='22023';
 end if;
 update public.request_usage set diagnostics=payload
 where request_id=request and user_id=auth.uid() and diagnostics is null
 and exists(select 1 from public.memberships m where m.user_id=auth.uid() and private.can_access_org(m.org_id));
 if not found then raise exception 'usage_not_available' using errcode='42501'; end if;
end;
$$;
revoke all on function public.record_request_diagnostics(uuid,jsonb) from public,anon;
grant execute on function public.record_request_diagnostics(uuid,jsonb) to authenticated;

grant create on schema public to request_usage_writer;
alter function public.record_request_diagnostics(uuid,jsonb) owner to request_usage_writer;
revoke create on schema public from request_usage_writer;
