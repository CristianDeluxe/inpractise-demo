-- The five tables explicitly assigned by Briefing F.
create schema if not exists extensions;
create extension if not exists vector with schema extensions;
create extension if not exists pgcrypto with schema extensions;
create schema private;
revoke all on schema private from public, anon, authenticated;
alter default privileges in schema public revoke all on tables from anon, authenticated;
alter default privileges in schema public revoke execute on functions from public, anon, authenticated;
alter default privileges in schema private revoke execute on functions from public, anon, authenticated;

create table public.organisations (
 org_id text primary key check(org_id ~ '^[a-z0-9-]{1,80}$'),
 name text not null, active boolean not null default true
);
create table public.memberships (
 user_id uuid primary key references auth.users(id),
 org_id text not null references public.organisations(org_id),
 role text not null check(role in ('member','reviewer')),
 active boolean not null default true, premium boolean not null default false
);
create table public.documents (
 org_id text not null references public.organisations(org_id),
 document_id text not null check(document_id ~ '^[a-z0-9-]{1,80}$'),
 required_tier text not null check(required_tier in ('basic','premium')),
 primary key(org_id,document_id)
);
create table public.document_revisions (
 org_id text not null, document_id text not null,
 revision_id text not null check(revision_id ~ '^[a-f0-9]{64}$'),
 title text not null, company text not null,
 kind text not null check(kind in ('synthetic_interview','sec_filing')),
 origin text not null check(origin in ('synthetic','public')),
 source_url text, interview_date date, report_date date, published_at timestamptz not null,
 raw_sha256 text not null check(raw_sha256 ~ '^[a-f0-9]{64}$'),
 normalized_sha256 text not null check(normalized_sha256 ~ '^[a-f0-9]{64}$'),
 passage_sha256 text not null check(passage_sha256 ~ '^[a-f0-9]{64}$'),
 canonical_content text not null,
 parser_version text not null, chunker_version text not null,
 embedding_model text not null check(embedding_model='text-embedding-3-small'),
 index_mode text not null default 'hybrid' check(index_mode in ('hybrid','lexical_only')),
 coverage jsonb not null, rights_basis text not null check(length(rights_basis)>0),
 rights_status text not null check(rights_status in ('approved','review_required','withdrawn')),
 published boolean not null default false, is_current boolean not null default false,
 withdrawn boolean not null default false,
 primary key(org_id,document_id,revision_id),
 foreign key(org_id,document_id) references public.documents(org_id,document_id),
 check(not is_current or published),
 check(kind<>'sec_filing' or (origin='public' and source_url like 'https://www.sec.gov/Archives/edgar/data/%')),
 check(kind<>'synthetic_interview' or origin='synthetic')
);
create unique index document_current on public.document_revisions(org_id,document_id) where is_current;
create table public.passages (
 org_id text not null, document_id text not null, revision_id text not null,
 passage_id text not null check(length(passage_id) between 1 and 80),
 ordinal integer not null check(ordinal>=0), section text not null,
 speaker text, speaker_role text, text_content text not null check(char_length(text_content) between 1 and 1200),
 token_count integer not null check(token_count between 1 and 500),
 search_vector tsvector generated always as (to_tsvector('english'::regconfig,text_content)) stored,
 embedding extensions.vector(1536),
 embedding_model text not null check(embedding_model='text-embedding-3-small'),
 primary key(org_id,document_id,revision_id,passage_id),
 unique(org_id,document_id,revision_id,ordinal),
 foreign key(org_id,document_id,revision_id) references public.document_revisions(org_id,document_id,revision_id),
 check(embedding is null or extensions.vector_norm(embedding)>0)
);
create index passages_fts on public.passages using gin(search_vector);
alter table public.organisations enable row level security;
alter table public.memberships enable row level security;
alter table public.documents enable row level security;
alter table public.document_revisions enable row level security;
alter table public.passages enable row level security;
revoke all on public.organisations,public.memberships,public.documents,public.document_revisions,public.passages from public,anon,authenticated;
grant all on public.organisations,public.memberships,public.documents,public.document_revisions,public.passages to service_role;
