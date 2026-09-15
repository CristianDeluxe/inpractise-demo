-- Query vectors keyed by the embedding model and the normalised question, so a
-- repeated question skips the provider call. The table holds no evidence: only
-- the vectors of questions members asked. Any active member may read and add a
-- row through their own JWT; nothing here bypasses row level security and no
-- row can be changed once written.
create table public.query_embeddings (
 cache_key text primary key check(cache_key ~ '^[a-f0-9]{64}$'),
 model text not null check(model='text-embedding-3-small'),
 embedding extensions.vector(1536) not null,
 created_at timestamptz not null default now()
);
alter table public.query_embeddings enable row level security;
revoke all on public.query_embeddings from public, anon, authenticated;
grant select, insert on public.query_embeddings to authenticated;
create policy query_embeddings_read on public.query_embeddings for select to authenticated
 using(exists(select 1 from public.memberships m where m.user_id=(select auth.uid()) and private.can_access_org(m.org_id)));
create policy query_embeddings_insert on public.query_embeddings for insert to authenticated
 with check(exists(select 1 from public.memberships m where m.user_id=(select auth.uid()) and private.can_access_org(m.org_id)));
