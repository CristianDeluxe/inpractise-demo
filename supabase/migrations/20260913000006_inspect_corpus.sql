-- Reviewer diagnostics retain caller RLS, including the reviewer's basic tier.
create function public.inspect_corpus() returns jsonb language plpgsql stable security invoker set search_path='' as $$
begin
 if not exists(select 1 from public.memberships m where m.user_id=(select auth.uid()) and m.active and m.role='reviewer')
 then raise exception 'Reviewer required' using errcode='42501'; end if;
 return jsonb_build_object('documents',(select count(*) from public.document_revisions where is_current),
 'revisions',(select count(*) from public.document_revisions),'passages',(select count(*) from public.passages),
 'vectors',(select count(embedding) from public.passages),'report',null,'diagnosis','unclassified');
end; $$;
revoke all on function public.inspect_corpus() from public,anon,authenticated;
grant execute on function public.inspect_corpus() to authenticated;
