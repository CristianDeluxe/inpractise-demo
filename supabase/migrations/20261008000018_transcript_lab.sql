-- Transcript review lab on Supabase. Authorization lives in the database:
-- every table is row-level secured by organisation membership, only an active
-- reviewer may record decisions, and the episode audio sits in a private
-- bucket readable only through the caller's own session. Earlier migrations
-- are immutable, so everything here is new.

-- Reviewer test shared by the lab policies. Same shape as can_access_org: the
-- membership is resolved from the JWT inside a definer function so no policy
-- has to read memberships under the caller's own row restrictions.
create function private.is_org_reviewer(target_org text)
returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.memberships m join public.organisations o using(org_id)
 where m.user_id=(select auth.uid()) and m.org_id=target_org and m.active and o.active
 and m.role='reviewer');
$$;
revoke all on function private.is_org_reviewer(text) from public,anon,authenticated;
grant execute on function private.is_org_reviewer(text) to authenticated,service_role;

-- One row per episode and organisation. The heavy documents (transcript,
-- correction, peaks) are separate jsonb columns so the list and cost screens
-- select only the small summary columns next to them.
create table public.lab_transcripts (
 org_id text not null references public.organisations(org_id),
 transcript_id text not null check(transcript_id ~ '^[A-Za-z0-9_-]{1,64}$'),
 title text not null check(length(title) between 1 and 300),
 source jsonb not null check(jsonb_typeof(source)='object'),
 stats jsonb not null check(jsonb_typeof(stats)='object'),
 duration_seconds numeric not null check(duration_seconds>0),
 asr_model text not null,
 asr_seconds numeric not null check(asr_seconds>=0),
 transcript jsonb not null check(jsonb_typeof(transcript)='object'),
 correction jsonb check(correction is null or jsonb_typeof(correction)='object'),
 correction_model text,
 correction_input_tokens bigint check(correction_input_tokens is null or correction_input_tokens>=0),
 correction_output_tokens bigint check(correction_output_tokens is null or correction_output_tokens>=0),
 edit_count integer not null default 0 check(edit_count>=0),
 peaks jsonb check(peaks is null or jsonb_typeof(peaks)='object'),
 audio_object text check(audio_object is null or audio_object like org_id||'/%'),
 published_at timestamptz not null default now(),
 primary key(org_id,transcript_id)
);

-- Decisions of the organisation's reviewers on one episode, replaced as a whole.
create table public.lab_reviews (
 org_id text not null,
 transcript_id text not null,
 decisions jsonb not null default '[]'::jsonb
  check(jsonb_typeof(decisions)='array' and pg_column_size(decisions)<262144),
 updated_at timestamptz not null default now(),
 updated_by uuid not null default auth.uid() references auth.users(id),
 primary key(org_id,transcript_id),
 foreign key(org_id,transcript_id) references public.lab_transcripts(org_id,transcript_id)
);

-- Learned memory shown on /app/memory: the glossary and the example count.
create table public.lab_memory (
 org_id text primary key references public.organisations(org_id),
 glossary jsonb not null default '[]'::jsonb check(jsonb_typeof(glossary)='array'),
 example_count integer not null default 0 check(example_count>=0),
 updated_at timestamptz not null default now()
);

-- Identity and time come from the session, never from the request body.
create function public.stamp_lab_review() returns trigger
language plpgsql set search_path='' as $$
begin
 new.updated_by := auth.uid();
 new.updated_at := pg_catalog.now();
 return new;
end;
$$;
revoke all on function public.stamp_lab_review() from public,anon,authenticated;
create trigger lab_reviews_stamp before insert or update on public.lab_reviews
 for each row execute function public.stamp_lab_review();

alter table public.lab_transcripts enable row level security;
alter table public.lab_reviews enable row level security;
alter table public.lab_memory enable row level security;
revoke all on public.lab_transcripts,public.lab_reviews,public.lab_memory from public,anon,authenticated;
grant all on public.lab_transcripts,public.lab_reviews,public.lab_memory to service_role;
grant select on public.lab_transcripts,public.lab_memory to authenticated;
grant select,insert,update on public.lab_reviews to authenticated;

create policy lab_transcripts_read on public.lab_transcripts for select to authenticated
 using(private.can_access_org(org_id,false));
create policy lab_memory_read on public.lab_memory for select to authenticated
 using(private.can_access_org(org_id,false));
create policy lab_reviews_read on public.lab_reviews for select to authenticated
 using(private.can_access_org(org_id,false));
create policy lab_reviews_insert on public.lab_reviews for insert to authenticated
 with check(updated_by=(select auth.uid()) and private.is_org_reviewer(org_id));
create policy lab_reviews_update on public.lab_reviews for update to authenticated
 using(private.is_org_reviewer(org_id))
 with check(updated_by=(select auth.uid()) and private.is_org_reviewer(org_id));

-- Private audio bucket. Objects are named <org_id>/<transcript_id>.m4a and
-- written only with the service key; members read through signed URLs, which
-- need the select policy below under the caller's session.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('lab-audio','lab-audio',false,52428800,array['audio/mp4','audio/mpeg'])
on conflict(id) do update set public=false,file_size_limit=52428800,
 allowed_mime_types=array['audio/mp4','audio/mpeg'];

create policy lab_audio_read on storage.objects for select to authenticated
 using(bucket_id='lab-audio' and private.can_access_org((storage.foldername(name))[1],false));

-- Reviewer-only daily Ask usage for the organisation, summed over its members.
-- Definer so a reviewer sees colleagues' totals without a policy opening the
-- per-user ledger; only aggregates leave the function.
create function public.usage_summary()
returns table(day date, request_count bigint, input_tokens bigint, output_tokens bigint, tokens_total bigint)
language plpgsql stable security definer set search_path='' as $$
declare caller_org text;
begin
 select m.org_id into caller_org from public.memberships m
 where m.user_id=auth.uid() and m.role='reviewer' and m.active
 and private.can_access_org(m.org_id,false);
 if caller_org is null then
  raise exception 'reviewer_required' using errcode='42501';
 end if;
 return query
 select u.usage_day, count(*), coalesce(sum(u.prompt_tokens),0)::bigint,
  coalesce(sum(u.completion_tokens),0)::bigint, coalesce(sum(u.total_tokens),0)::bigint
 from public.request_usage u join public.memberships c on c.user_id=u.user_id
 where c.org_id=caller_org
 group by u.usage_day order by u.usage_day;
end;
$$;
revoke all on function public.usage_summary() from public,anon;
grant execute on function public.usage_summary() to authenticated;
