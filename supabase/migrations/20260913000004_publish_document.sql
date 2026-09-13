-- Service-only publication validates persisted evidence before switching current revision.
create function public.publish_document(org_id text,document_id text,revision_id text,expected_passages integer,expected_hash text)
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
 or (target.index_mode='lexical_only' and vector_count<>0) then raise exception 'Publication validation failed'; end if;
 if target.published then return 'unchanged'; end if;
 update public.document_revisions r set is_current=false where r.org_id=$1 and r.document_id=$2 and r.is_current;
 update public.document_revisions r set published=true,is_current=true where r.org_id=$1 and r.document_id=$2 and r.revision_id=$3;
 return 'published';
end; $$;
revoke all on function public.publish_document(text,text,text,integer,text) from public,anon,authenticated;
grant execute on function public.publish_document(text,text,text,integer,text) to service_role;
