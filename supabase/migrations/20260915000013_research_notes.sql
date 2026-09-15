-- A member's private research notebook: one row per saved citation. The row
-- names the passage by its three server-owned ids and keeps the question it
-- answered and one short note. The quotation, speaker and dates are never
-- copied here: they are re-read from the passage under the caller's own
-- policies whenever the notebook is listed, so a note can never carry evidence
-- its owner may no longer read.
create table public.research_notes (
 note_id uuid primary key default gen_random_uuid(),
 user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
 org_id text not null references public.organisations(org_id),
 document_id text not null,
 revision_id text not null,
 passage_id text not null,
 question text check(question is null or char_length(question) between 1 and 2000),
 note text check(note is null or char_length(note) between 1 and 300),
 created_at timestamptz not null default now(),
 foreign key(org_id,document_id,revision_id,passage_id)
  references public.passages(org_id,document_id,revision_id,passage_id)
);
create index research_notes_owner_recent on public.research_notes(user_id, created_at desc);
alter table public.research_notes enable row level security;
revoke all on public.research_notes from public, anon, authenticated;
grant all on public.research_notes to service_role;
grant select, insert, delete on public.research_notes to authenticated;

-- Reading and deleting are owner-only. Saving is owner-only and additionally
-- requires the passage to be visible through passage_read: the subquery runs as
-- the caller, so the same tier and rights policies that gate a read gate the
-- save. A reviewer role, a caller-supplied user_id or org_id, and the Edge
-- function's own view of the caller can none of them widen it; a note for a
-- passage the caller cannot read is a policy violation, not a row.
create policy research_note_read on public.research_notes for select to authenticated
 using(user_id=(select auth.uid()));
create policy research_note_delete on public.research_notes for delete to authenticated
 using(user_id=(select auth.uid()));
create policy research_note_save on public.research_notes for insert to authenticated
 with check(user_id=(select auth.uid())
  and exists(select 1 from public.passages p
   where p.org_id=research_notes.org_id and p.document_id=research_notes.document_id
   and p.revision_id=research_notes.revision_id and p.passage_id=research_notes.passage_id));
