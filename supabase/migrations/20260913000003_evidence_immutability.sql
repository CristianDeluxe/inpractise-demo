-- Publication and child changes lock the same parent, preserving immutable evidence.
create function private.guard_revision() returns trigger language plpgsql set search_path='' as $$
begin
 if old.published then
  if tg_op='DELETE' then raise exception 'Published revision cannot be deleted'; end if;
  if (to_jsonb(new)-'is_current'-'withdrawn'-'rights_status') is distinct from
     (to_jsonb(old)-'is_current'-'withdrawn'-'rights_status') then
   raise exception 'Published revision is immutable';
  end if;
 end if;
 if tg_op='DELETE' then return old; end if;
 return new;
end; $$;
create trigger revision_immutable before update or delete on public.document_revisions for each row execute function private.guard_revision();
create function private.guard_passage() returns trigger language plpgsql security definer set search_path='' as $$
declare r record;
begin
 for r in select v.published from public.document_revisions v
 where (tg_op<>'INSERT' and (v.org_id,v.document_id,v.revision_id)=(old.org_id,old.document_id,old.revision_id))
 or (tg_op<>'DELETE' and (v.org_id,v.document_id,v.revision_id)=(new.org_id,new.document_id,new.revision_id))
 order by v.org_id,v.document_id,v.revision_id for update
 loop
  if r.published then raise exception 'Published passage is immutable'; end if;
 end loop;
 if tg_op='DELETE' then return old; end if;
 return new;
end; $$;
create trigger passage_immutable before insert or update or delete on public.passages for each row execute function private.guard_passage();
revoke all on function private.guard_revision(),private.guard_passage() from public,anon,authenticated;
