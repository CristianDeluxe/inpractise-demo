-- Widen document_revisions.kind to admit a public, non-SEC PDF filing
-- (annual_report_pdf), alongside the existing synthetic_interview and
-- sec_filing kinds. The original migration is immutable, so this drops and
-- replaces its three kind-related check constraints by looking up their
-- current (auto-generated) names rather than assuming them.
do $$
declare
 constraint_name text;
begin
 select conname into constraint_name
 from pg_constraint
 where conrelid = 'public.document_revisions'::regclass
  and pg_get_constraintdef(oid) like '%kind = ANY%synthetic_interview%sec_filing%';
 if constraint_name is not null then
  execute format('alter table public.document_revisions drop constraint %I', constraint_name);
 end if;

 select conname into constraint_name
 from pg_constraint
 where conrelid = 'public.document_revisions'::regclass
  and pg_get_constraintdef(oid) like '%sec_filing%sec.gov%';
 if constraint_name is not null then
  execute format('alter table public.document_revisions drop constraint %I', constraint_name);
 end if;
end $$;

alter table public.document_revisions
 add constraint document_revisions_kind_check
  check(kind in ('synthetic_interview','sec_filing','annual_report_pdf'));

alter table public.document_revisions
 add constraint document_revisions_sec_filing_source_check
  check(kind<>'sec_filing' or (origin='public' and source_url like 'https://www.sec.gov/Archives/edgar/data/%'));

alter table public.document_revisions
 add constraint document_revisions_annual_report_source_check
  check(kind<>'annual_report_pdf' or (origin='public' and source_url like 'https://%'));
