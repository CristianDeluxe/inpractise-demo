-- Admit public podcast interviews (public_interview) as a document kind and
-- hide every other kind from every reader. The earlier
-- migrations are immutable, so the kind check is replaced here by its
-- explicit name (set in 20260916000016) and the access functions are
-- re-created with the added kind condition.
alter table public.document_revisions
 drop constraint document_revisions_kind_check;

alter table public.document_revisions
 add constraint document_revisions_kind_check
  check(kind in ('synthetic_interview','sec_filing','annual_report_pdf','public_interview'));

alter table public.document_revisions
 add constraint document_revisions_public_interview_source_check
  check(kind<>'public_interview' or (origin='public' and source_url like 'https://www.youtube.com/%'));

-- Only public podcast interviews are readable. Synthetic interviews, filings
-- and annual reports stay stored and immutable but no policy, search function
-- or inspection path can surface them, because every reader reaches revisions
-- and passages through this function.
create or replace function private.can_access_revision(target_org text,target_document text,target_revision text)
returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.document_revisions r where r.org_id=target_org
 and r.document_id=target_document and r.revision_id=target_revision and r.published
 and not r.withdrawn and r.rights_status='approved'
 and r.kind='public_interview'
 and private.can_access_document(r.org_id,r.document_id));
$$;

-- The document row policy checks revisions directly, so it carries the same
-- kind condition; otherwise a hidden document's title would still be listed.
drop policy document_read on public.documents;
create policy document_read on public.documents for select to authenticated using(
 private.can_access_document(org_id,document_id) and exists(select 1 from public.document_revisions r
 where r.org_id=documents.org_id and r.document_id=documents.document_id and r.published and not r.withdrawn and r.rights_status='approved'
 and r.kind='public_interview'));
