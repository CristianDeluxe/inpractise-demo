-- Resolve live membership without recursive policies or caller-supplied identities.
create function private.can_access_org(target_org text, premium_required boolean default false)
returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.memberships m join public.organisations o using(org_id)
 where m.user_id=(select auth.uid()) and m.org_id=target_org and m.active and o.active
 and (not premium_required or m.premium));
$$;
create function private.can_access_document(target_org text,target_document text)
returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.documents d where d.org_id=target_org and d.document_id=target_document
 and private.can_access_org(d.org_id,d.required_tier='premium'));
$$;
create function private.can_access_revision(target_org text,target_document text,target_revision text)
returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.document_revisions r where r.org_id=target_org
 and r.document_id=target_document and r.revision_id=target_revision and r.published
 and not r.withdrawn and r.rights_status='approved'
 and private.can_access_document(r.org_id,r.document_id));
$$;
revoke all on function private.can_access_org(text,boolean),private.can_access_document(text,text),private.can_access_revision(text,text,text) from public,anon,authenticated;
grant usage on schema private to authenticated,service_role;
grant execute on function private.can_access_org(text,boolean),private.can_access_document(text,text),private.can_access_revision(text,text,text) to authenticated,service_role;
create policy organisation_read on public.organisations for select to authenticated using(private.can_access_org(org_id));
create policy membership_read on public.memberships for select to authenticated using(user_id=(select auth.uid()) and private.can_access_org(org_id));
create policy document_read on public.documents for select to authenticated using(
 private.can_access_document(org_id,document_id) and exists(select 1 from public.document_revisions r
 where r.org_id=documents.org_id and r.document_id=documents.document_id and r.published and not r.withdrawn and r.rights_status='approved'));
create policy revision_read on public.document_revisions for select to authenticated using(private.can_access_revision(org_id,document_id,revision_id));
create policy passage_read on public.passages for select to authenticated using(private.can_access_revision(org_id,document_id,revision_id));
grant select on public.organisations,public.memberships,public.documents,public.document_revisions,public.passages to authenticated;
