-- Cross-referencing retrieves interview and filing passages separately, so both
-- retrieval RPCs accept an optional document kind. The filter joins the same
-- permitted set the caller's RLS already bounds; it narrows, never widens.
-- Existing four-argument callers keep working through the default.
drop function public.search_candidates(text,extensions.vector,text,integer);
drop function public.search_candidates_scoped(text,extensions.vector,text,integer);
-- Both branches execute with the caller's RLS permissions; exact cosine search is intentional.
create function public.search_candidates(query_text text,query_embedding extensions.vector(1536) default null,company_filter text default null,candidate_limit integer default 30,kind_filter text default null)
returns table(org_id text,document_id text,revision_id text,passage_id text,branch text,rank bigint,lexical_score real,cosine_distance double precision)
language plpgsql stable security invoker set search_path='' as $$
begin
 if query_text is null or char_length(trim(query_text)) not between 1 and 2000
 or candidate_limit is null or candidate_limit not between 1 and 30
 or char_length(company_filter)>80 or char_length(kind_filter)>40
 or (query_embedding is not null and extensions.vector_norm(query_embedding)=0)
 then raise exception 'Invalid search input' using errcode='22023'; end if;
 return query with permitted as materialized (
  select p.* from public.passages p join public.document_revisions r using(org_id,document_id,revision_id)
  where r.is_current and (company_filter is null or r.company=company_filter)
  and (kind_filter is null or r.kind=kind_filter)
 ), lexical as (
  select p.org_id,p.document_id,p.revision_id,p.passage_id,
  ts_rank_cd(p.search_vector,websearch_to_tsquery('english'::regconfig,query_text)) score
  from permitted p where p.search_vector @@ websearch_to_tsquery('english'::regconfig,query_text)
  order by score desc,p.document_id,p.revision_id,p.passage_id limit candidate_limit
 ), vectors as (
  select p.org_id,p.document_id,p.revision_id,p.passage_id,p.embedding operator(extensions.<=>) query_embedding distance
  from permitted p where query_embedding is not null and p.embedding is not null
  order by distance,p.document_id,p.revision_id,p.passage_id limit candidate_limit
 )
 select l.org_id,l.document_id,l.revision_id,l.passage_id,'fts'::text,
 row_number() over(order by l.score desc,l.document_id,l.revision_id,l.passage_id),l.score,null::double precision from lexical l
 union all
 select v.org_id,v.document_id,v.revision_id,v.passage_id,'vector'::text,
 row_number() over(order by v.distance,v.document_id,v.revision_id,v.passage_id),null::real,v.distance from vectors v;
end; $$;
revoke all on function public.search_candidates(text,extensions.vector,text,integer,text) from public,anon,authenticated;
grant execute on function public.search_candidates(text,extensions.vector,text,integer,text) to authenticated;
-- Restricted retrieval excludes premium documents before ranking and branch limits.
-- This function only narrows caller RLS; it cannot elevate access.
create function public.search_candidates_scoped(query_text text,query_embedding extensions.vector(1536) default null,company_filter text default null,candidate_limit integer default 30,kind_filter text default null)
returns table(org_id text,document_id text,revision_id text,passage_id text,branch text,rank bigint,lexical_score real,cosine_distance double precision)
language plpgsql stable security invoker set search_path='' as $$
begin
 if query_text is null or char_length(trim(query_text)) not between 1 and 2000
 or candidate_limit is null or candidate_limit not between 1 and 30
 or char_length(company_filter)>80 or char_length(kind_filter)>40
 or (query_embedding is not null and extensions.vector_norm(query_embedding)=0)
 then raise exception 'Invalid search input' using errcode='22023'; end if;
 return query with permitted as materialized (
  select p.* from public.passages p join public.document_revisions r using(org_id,document_id,revision_id)
  join public.documents d using(org_id,document_id)
  where d.required_tier='basic' and r.is_current and (company_filter is null or r.company=company_filter)
  and (kind_filter is null or r.kind=kind_filter)
 ), lexical as (
  select p.org_id,p.document_id,p.revision_id,p.passage_id,
  ts_rank_cd(p.search_vector,websearch_to_tsquery('english'::regconfig,query_text)) score
  from permitted p where p.search_vector @@ websearch_to_tsquery('english'::regconfig,query_text)
  order by score desc,p.document_id,p.revision_id,p.passage_id limit candidate_limit
 ), vectors as (
  select p.org_id,p.document_id,p.revision_id,p.passage_id,p.embedding operator(extensions.<=>) query_embedding distance
  from permitted p where query_embedding is not null and p.embedding is not null
  order by distance,p.document_id,p.revision_id,p.passage_id limit candidate_limit
 )
 select l.org_id,l.document_id,l.revision_id,l.passage_id,'fts'::text,
 row_number() over(order by l.score desc,l.document_id,l.revision_id,l.passage_id),l.score,null::double precision from lexical l
 union all
 select v.org_id,v.document_id,v.revision_id,v.passage_id,'vector'::text,
 row_number() over(order by v.distance,v.document_id,v.revision_id,v.passage_id),null::real,v.distance from vectors v;
end; $$;
revoke all on function public.search_candidates_scoped(text,extensions.vector,text,integer,text) from public,anon,authenticated;
grant execute on function public.search_candidates_scoped(text,extensions.vector,text,integer,text) to authenticated;
