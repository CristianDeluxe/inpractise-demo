-- Bind every published metadata field and passage to the canonical source identity.
create function private.canonical_json(value jsonb) returns text
language plpgsql immutable strict set search_path='' as $$
declare result text;
begin
 if jsonb_typeof(value)='object' then
  select '{'||coalesce(string_agg(to_jsonb(e.key)::text||':'||private.canonical_json(e.value),',' order by e.key collate "C"),'')||'}'
  into result from jsonb_each(value) e;
 elsif jsonb_typeof(value)='array' then
  select '['||coalesce(string_agg(private.canonical_json(e.value),',' order by e.ordinality),'')||']'
  into result from jsonb_array_elements(value) with ordinality e;
 else result=value::text;
 end if;
 return result;
end; $$;
revoke all on function private.canonical_json(jsonb) from public,anon,authenticated;
grant execute on function private.canonical_json(jsonb) to service_role;
create function private.validate_canonical_revision(target public.document_revisions) returns boolean
language plpgsql stable security invoker set search_path='' as $$
declare content jsonb;
begin
 content=target.canonical_content::jsonb;
 if target.canonical_content<>private.canonical_json(content)||E'\n'
 or target.normalized_sha256<>encode(extensions.digest(private.canonical_json(content||jsonb_build_object('revisionId',target.revision_id))||E'\n','sha256'),'hex')
 or (content->>'documentId') is distinct from target.document_id
 or (content->>'title') is distinct from target.title
 or (content->>'companySlug') is distinct from target.company
 or (content->>'kind') is distinct from target.kind
 or (content->>'origin') is distinct from target.origin
 or (content->>'sourceUrl') is distinct from target.source_url
 or (content->>'interviewDate')::date is distinct from target.interview_date
 or (content->>'publishedAt')::timestamptz is distinct from target.published_at
 or (content->'configuration'->>'parser') is distinct from target.parser_version
 or (content->'configuration'->>'chunker') is distinct from target.chunker_version
 or (content->'configuration'->>'embeddingModel') is distinct from target.embedding_model
 or (content->'configuration'->>'embeddingDimensions')::integer is distinct from 1536
 or not exists(select 1 from public.documents d where d.org_id=target.org_id and d.document_id=target.document_id and d.required_tier=content->>'requiredTier')
 then return false; end if;
 return jsonb_array_length(content->'passages')=(select count(*) from public.passages p where p.org_id=target.org_id and p.document_id=target.document_id and p.revision_id=target.revision_id)
 and not exists(select 1 from jsonb_array_elements(content->'passages') e where not exists(
 select 1 from public.passages p where p.org_id=target.org_id and p.document_id=target.document_id and p.revision_id=target.revision_id
 and p.passage_id=e->>'passageId' and p.ordinal=(e->>'ordinal')::integer and p.section=e->>'section'
 and p.speaker is not distinct from e->>'speaker' and p.speaker_role is not distinct from e->>'speakerRole'
 and p.text_content=e->>'text' and p.token_count=(e->>'tokenCount')::integer+coalesce((e->>'metadataTokenCount')::integer,0)));
end; $$;
revoke all on function private.validate_canonical_revision(public.document_revisions) from public,anon,authenticated;
grant execute on function private.validate_canonical_revision(public.document_revisions) to service_role;

create or replace function public.publish_document(org_id text,document_id text,revision_id text,expected_passages integer,expected_hash text)
returns text language plpgsql security invoker set search_path='' as $$
declare target public.document_revisions; actual_count integer; vector_count integer; body_hash text;
begin
 if expected_passages is null or expected_passages<1 or expected_hash is null then raise exception 'Invalid publication input'; end if;
 perform 1 from public.documents d where d.org_id=$1 and d.document_id=$2 for update;
 perform 1 from public.document_revisions r where r.org_id=$1 and r.document_id=$2 order by r.revision_id for update;
 select * into strict target from public.document_revisions r where r.org_id=$1 and r.document_id=$2 and r.revision_id=$3;
 select count(*),count(p.embedding),encode(extensions.digest(string_agg(
  char_length(p.passage_id)::text||':'||p.passage_id||char_length(p.ordinal::text)::text||':'||p.ordinal::text||
  char_length(p.section)::text||':'||p.section||char_length(coalesce(p.speaker,''))::text||':'||coalesce(p.speaker,'')||
  char_length(coalesce(p.speaker_role,''))::text||':'||coalesce(p.speaker_role,'')||
  char_length(p.text_content)::text||':'||p.text_content||char_length(p.token_count::text)::text||':'||p.token_count::text,
  '' order by p.ordinal),'sha256'),'hex') into actual_count,vector_count,body_hash
 from public.passages p where p.org_id=$1 and p.document_id=$2 and p.revision_id=$3;
 if target.rights_status<>'approved' or target.withdrawn or target.normalized_sha256<>expected_hash
 or encode(extensions.digest(target.canonical_content,'sha256'),'hex')<>target.revision_id
 or body_hash is distinct from target.passage_sha256 or actual_count<>expected_passages
 or (target.index_mode='hybrid' and vector_count<>actual_count)
 or (target.index_mode='lexical_only' and vector_count<>0)
 or private.validate_canonical_revision(target) is distinct from true
 then raise exception 'Publication validation failed'; end if;
 if target.published then return 'unchanged'; end if;
 update public.document_revisions r set is_current=false where r.org_id=$1 and r.document_id=$2 and r.is_current;
 update public.document_revisions r set published=true,is_current=true where r.org_id=$1 and r.document_id=$2 and r.revision_id=$3;
 return 'published';
end; $$;
