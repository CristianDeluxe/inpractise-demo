# Members and administration specification

Status: proposed implementation contract, 2026-09-13. The SQL and TypeScript below define a new isolated demo, not In Practise's private implementation or a migration to an existing repository. No production migration, deployment or payment integration is performed. Hosted Supabase, live OAuth and provider behavior remain UNVERIFIED. Public and synthetic sources only. Verification results and limitations are recorded in 06.

## 1. Architecture, reuse and scope

Lovable generates all visual surfaces in React/Vite/Tailwind/shadcn, responsive shells, forms, tables, source panels and typed API adapters. Handwritten code owns authorization, transactional mutations, ingestion, retrieval, validated generation, admin projections and MCP. Use one Supabase Auth/Postgres/Storage project, a Node API/MCP service and one durable worker. Edge functions are optional thin adapters for upload initiation or HTTP routing; do not duplicate retrieval logic across edge and Node runtimes.

Every demo organization owns its own copy of the small corpus. This deliberately trades storage duplication for obvious tenant isolation. There is no nullable-tenant “global document” shortcut. The public landing uses a separately bundled, explicitly public synthetic fixture. Adding a shared licensed publisher corpus later requires a new access model and tests, not removing an organization predicate.

| ID  | Source pattern from 02                                                                                                                                                                                     | Adaptation in this specification                                                                               |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| R1  | CaseGPT feature data services, auth-state handling and source cards, [02 §2, §4](02-reusable-assets.md); source `casegpt/src/features/auth/AuthProvider.tsx`, `src/services/chat-aui/streamChatMessage.ts` | Separate screen, hook, request function and types; backend rechecks auth; explicit NDJSON final state.         |
| R2  | CaseGPT `/admin/documents` and `/admin/chunks`, [02 §5](02-reusable-assets.md)                                                                                                                             | Small paginated master/detail panels for document versions, spans and actual pipeline state.                   |
| R3  | ATC retrieval-time permissions and Shoutouts explicit tenant scoping, [02 §4, §6](02-reusable-assets.md)                                                                                                   | Filter tenant, published revision and entitlement before candidate retrieval and before model input.           |
| R4  | Shoutouts durable queue and keyset sync, [02 §6](02-reusable-assets.md)                                                                                                                                    | Leased Postgres jobs, deterministic keys, bounded batches, retry/reconciliation; no in-memory-only ingestion.  |
| R5  | CaseGPT feedback and eval scaffolding, [02 §2, §5](02-reusable-assets.md)                                                                                                                                  | New review UI, labeled retrieval fixtures, real run histories; no invented quality tiles.                      |
| R6  | CaseGPT singleton/auth/cache defects, [02 §6](02-reusable-assets.md)                                                                                                                                       | New org model; client role writes denied; raw storage denied; no shared answer cache; strict final validation. |
| R7  | Shoutouts/ATC admin and audit concepts, [02 §5](02-reusable-assets.md)                                                                                                                                     | Separate platform staff from organization admins; audit staff reads; no impersonation feature.                 |

These are pattern references, not permission to redistribute client source. Implement equivalent small units from the contracts. Exact versions must be pinned from the Lovable export; CaseGPT manifest ranges in 02 are not a verified lockfile for this project. Current RLS guidance was checked through Context7 and [Supabase documentation](https://supabase.com/docs/guides/database/postgres/row-level-security). It supports the private-schema helper and restricted-grant approach used below. Supabase service credentials bypass RLS; they must never reach the browser.

## 2. Auth, roles, seats and entitlements

Sign-in: Supabase email OTP with PKCE, exact redirect allowlist and no open redirects. Bootstrap profiles on verified signup through a server function; never make the first arbitrary registrant staff. Pre-provision demo personas privately. Passwordless email delivery depends on configured SMTP; the minimum tier may use local demo credentials and local mail capture, explicitly labeled. No emails are sent by this specification.

The SPA refreshes its session using Supabase's auth client, validates protected requests on the server and resets selected org and query cache on sign-out/401. On org switch cancel pending streams and clear all previous-org cached data. `GET /me` returns memberships; if more than one is active, show a chooser and require a deliberate selection. Every organization endpoint includes the selected org in its URL. Never infer org from email domain. Supabase Auth establishes user identity; database rows establish current membership and capabilities.

| Actor                          | Rights                                                                                                                                                                                                                                                                                            |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Public visitor                 | Static public/synthetic landing example only. No database reads or live inference.                                                                                                                                                                                                                |
| Read-only member (`read_only`) | Active seat required; entitled library, source spans, own saved items, own follows and own ask threads. May add/remove personal bookmarks and run read-only questions when `ask` is granted; cannot edit shared collections or manage seats. “Read-only” refers to shared organization resources. |
| Analyst (`analyst`)            | Read-only rights plus create/edit own collections and add/remove items in organization-visible collections. Cannot rename/delete another person's collection.                                                                                                                                     |
| Organization admin (`admin`)   | Analyst rights plus invitations, member suspension/role changes and simulated billing overview. No ingestion, staff conversation review, platform flags or entitlement overrides.                                                                                                                 |
| Platform editor                | Corpus creation, inspection, ingestion and publication within the explicitly selected organization. No billing overrides or private chat access.                                                                                                                                                  |
| Platform reviewer              | Audited conversation/feedback inspection, evals and retrieval diagnosis in selected org. No seat or entitlement mutation.                                                                                                                                                                         |
| Platform admin                 | Staff management outside demo UI, organization administration, overrides, flags and audited review. Requires an active independently assigned staff grant and MFA (`aal2`) on privileged routes.                                                                                                  |

Platform grants do not imply a member seat or bypass member UI constraints. Staff handlers use a separate authorization check, specify org scope and insert an audit event before returning private review content. There is no staff SELECT policy on messages; reviewers cannot bypass this audited route through PostgREST.

Capabilities: `library`, `premium`, `ask`, `mcp`. An active organization and active membership are always necessary. A nonexpired override wins for its capability, including a deny. Otherwise an active, unexpired simulated subscription grants its plan capabilities. Premium reading requires both `library` and `premium`; asking and MCP additionally require their respective capability. An override cannot resurrect a suspended seat. Expiration is checked against database time, not only `access_version`. An expired subscription removes research access but keeps the organization admin's account and billing screen available.

Seat capacity counts active memberships plus unexpired pending invitations. Reserve/revoke/accept/change-seat-limit operations lock the organization row in one transaction. Under the lock: mark elapsed invitations expired; recompute capacity; validate last-active-admin protection; change rows; increment `access_version`; insert audit event; commit. Invites store only a SHA-256 hash of a cryptographically random 32-byte token, expire after 48 hours, and bind to verified normalized email. Acceptance consumes the reservation, not an additional seat; existing members cannot be silently demoted by accepting an invite. Capacity reduction below current usage returns `409 SEAT_LIMIT_CONFLICT` with counts. Revocation takes effect on the next protected call and during generation finalization. Role changes never rely on a stale JWT role claim.

SSO/SCIM is stretch only. Preserve the Supabase user UUID as app identity and map verified IdP identity to an explicit invitation/membership. Domain ownership and SSO configuration cannot auto-promote users or increase seats. No “SSO ready” label unless an actual configured IdP flow passes. Consult [Supabase Auth sessions](https://supabase.com/docs/guides/auth/sessions) during implementation for chosen session settings; refresh-token storage in a SPA requires strong XSS controls. The demo uses no raw HTML rendering or third-party session replay.

## 3. Members area screens

All screens use a persistent demo/corpus notice, visible selected organization, keyboard navigation and 03's visual tokens. Query pages preserve state in the URL except private question text. Server errors are never empty arrays. Every list uses cursor pagination and an ID tiebreaker. Skeletons preserve geometry, and loading announces once.

| Route / purpose                                               | Data and interactions                                                                                                                                                                | Empty / loading / error                                                                                                                                                                                          | Entitlement and reuse                                                                                                                                                                                     |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/app/library` — find research                                | Search, company/type/date filters; title, source type, interview/publication dates, active revision; cursor results; clear filters; open reader                                      | “No research matches these filters”; row skeleton; “Search unavailable” with retry and preserved filters                                                                                                         | `library`, only authorized published docs. Hidden premium docs omitted; account page explains premium status. R1/R3.                                                                                      |
| `/app/documents/:id/revisions/:revisionId` — inspect evidence | Title, origin, speaker role, interview/publication dates, source URL, revision, section TOC, paragraphs with stable IDs, source-span highlight and Copy link; save/add-to-collection | Missing/denied both “This document is unavailable”; skeleton; “Source could not be loaded” retry. Superseded published revision remains readable with an “Older revision” notice; withdrawn revision unavailable | `library` plus document capability. No new raw-file download feature; external source link only where rights allow. R1/R2/R6.                                                                             |
| `/app/saved` and `/app/collections/:id` — retain research     | Personal bookmarks; collection name, owner, private/org visibility, authorized item metadata; explicit collection selection; remove/rename permissions                               | “No saved research yet”; skeleton; failed mutation rolls back with error. Revoked content represented by a server-generated “Unavailable item” placeholder without title/text                                    | Active seat; add requires current doc access. Analyst/admin shared editing as above. R1/R3; collections new.                                                                                              |
| `/app/alerts` — monitor additions                             | Company/query follows, enabled state, unread in-app alerts, publication time, source link, mark seen                                                                                 | “Follow a company to see new research here”; skeleton; delivery state unknown on dependency failure                                                                                                              | Active seat and library for research payload. Recheck revision access when generating and reading alert; in-app only, no email. R4.                                                                       |
| `/app/ask` and `/app/ask/:id` — ask and revisit               | Explicit submit, cancel, validated statuses/citations, latest messages, thread titles, source panel, feedback; archive own thread                                                    | “Ask a question about this corpus”; pending/provisional label; failed/cancelled separate from `not_found`; revoked-source answers become “This answer is no longer available under your access”                  | `ask` + library, active seat; own threads only. All roles may ask. R1/R5/R6.                                                                                                                              |
| `/app/account` — identity and membership                      | Display name, session sign-out, active org selector, role/capabilities; organization admins see used/reserved seats, invitations and member management                               | No memberships → access unavailable and invite instructions; skeleton; session expired → sign-in                                                                                                                 | Self profile only; seat changes admin only; role cannot be edited on profile. R1/R6.                                                                                                                      |
| `/app/billing` — explain access                               | Admin: simulated plan, status, period, seat limit, capabilities, overrides and expiry. Others: access summary and “Ask your organization administrator”                              | No subscription → “No demo subscription configured”; skeleton; “Billing information unavailable”                                                                                                                 | Org admin may simulate expiry/renewal of current plan through allowed demo action; cannot grant arbitrary capabilities or override limits. Prominent “Simulation — no payment is taken.” R6; billing new. |

Saved-item placeholders come from the guarded server projection; direct RLS reads omit inaccessible document references. Answers are conservatively withheld in full if any cited revision becomes inaccessible, avoiding residual paraphrases. Historical prompts remain visible only to their owner while their conversation is accessible; the model never receives hidden earlier answers. Admin review requires separate audited authority, not the member history query.

## 4. Admin panel screens

| Route / purpose                   | Data and actions                                                                                                                                              | Empty / loading / error                                                                                                         | Authorization / pattern                                                                                      |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `/admin/ingestion`                | Intake filename/type/hash/source URL/rights; queued/running job stage, attempts, completed units/known total; retry failed job                                | “No ingestion jobs”; poll actual state; failed stage/code plus Retry. Unknown total shown as indeterminate, no invented percent | Editor/platform admin. R2/R4.                                                                                |
| `/admin/documents/:id`            | Metadata, company associations, raw rights metadata, revision list, paragraph/chunk inspector, extraction preview; publish/reindex/archive; compare revisions | No selected document → explicit selection; preview skeleton; parser error retains previous active revision                      | Editor/platform admin. New revision for text changes, R2/R6.                                                 |
| `/admin/organizations/:id/seats`  | Selected organization, active/suspended members, reservations, expiry, role and usage counts; org selection never defaults silently                           | No organization selected; skeleton; conflict shows server counts and refresh                                                    | Platform admin; org admins use restricted account route. R7/R4.                                              |
| `/admin/organizations/:id/access` | Simulated subscription and capability overrides, reason, expiry, version; preview effective grants                                                            | “No override” is normal; skeleton; stale version 409 preserves editor values                                                    | Platform admin only. R6/R7.                                                                                  |
| `/admin/review`                   | Conversation metadata, audited inspect action, exact answer/source revisions, feedback vote/comment/state; assign reviewer, mark resolved/eval added          | “No feedback for these filters”; skeleton; review audit failure prevents content return                                         | Reviewer/platform admin. R5/R7.                                                                              |
| `/admin/evals`                    | Dataset/config/corpus versions, baseline, real run state, per-case expected vs retrieved spans, latency and cost including unknown amounts; trigger/retry     | “No completed evaluation runs”; queued/running state; failed run shown, excluded from success denominator                       | Reviewer/platform admin. R5; CLI-to-UI new.                                                                  |
| `/admin/retrieval`                | Explicit test persona from the selected org, query, lexical/vector/fused/reranked IDs, scores in separate columns, evidence decision                          | No query yet; phase loading; dependency failure; redaction when reviewer lacks selected scope                                   | Reviewer/platform admin; queries use selected persona's permissions, never reviewer's broader rights. R2/R3. |
| `/admin/flags`                    | `ask_enabled`, `mcp_enabled`, `rerank_enabled`; current value/version, affected org and reason                                                                | Missing flags use documented safe defaults (all false); skeleton; version conflict                                              | Platform admin, optimistic concurrency; backend and UI both gate. R7.                                        |
| `/admin/audit`                    | Actor, action, target, org, reason, time, request ID; cursor/time filters; no raw prompt or credentials                                                       | “No events in this period”; skeleton; unavailable is not zero events                                                            | Platform admin; immutable append-only API with no delete/edit routes. R7.                                    |

No fake analytics tiles. The dashboard reports completed run/sample counts and their time window. Unknown costs remain null; failed queries remain errors. Organization-wide aggregates are server SQL over an explicitly authorized org, never a capped browser list sum. Admin pages are lazy loaded separately from landing/member routes.

## 5. Full PostgreSQL schema and RLS

Apply only to an empty dedicated Supabase project. Types use UUID identifiers and UTC timestamps. All foreign keys joining tenant entities include organization ID. Content revisions and paragraph text become immutable after publication; corrections create a new revision. Published revision withdrawal is permitted as an access-control operation, audited separately. Immutable-content triggers are supplied in section 9; transactional service guards are specified in section 6. Both belong in new demo migrations and reviewed handlers. Never edit an existing migration.

Tables intentionally default-deny client writes. Privileged server code may bypass RLS only after checking the authenticated actor, current org/role/capability and target parent within the transaction. Direct SQL and PostgREST misuse are part of the tests. Client SELECT grants are limited and do not include staff review, token hashes or raw object keys. Keep `private` out of exposed API schemas; helper functions use an empty search path, accept no arbitrary user ID and read `auth.uid()`.

SQL verification boundary: the full script is syntactically and relationally checkable; hosted Supabase Auth, Storage and pgvector extension compatibility need their own integration gate in 06. An RLS declaration is not itself proof of production isolation.

```sql
-- Proposed fresh-install schema; never apply to CaseGPT or the portfolio database.
create schema if not exists extensions;
create extension if not exists vector with schema extensions;
create schema if not exists private;
revoke all on schema private from public;
create type public.member_role as enum ('admin','analyst','read_only');
create type public.capability as enum ('library','premium','ask','mcp');
create type public.job_state as enum ('queued','running','succeeded','failed','cancelled');
create table public.profiles (
 id uuid primary key references auth.users(id), display_name text not null default '',
 locale text not null default 'en' check(locale='en'), created_at timestamptz not null default now()
);
create table public.organizations (
 id uuid primary key default gen_random_uuid(), name text not null,
 status text not null default 'active' check(status in ('active','suspended')),
 seat_limit integer not null check(seat_limit between 1 and 100),
 access_version bigint not null default 1, created_at timestamptz not null default now()
);
create table public.memberships (
 organization_id uuid not null references public.organizations(id),
 user_id uuid not null references public.profiles(id), role public.member_role not null,
 status text not null check(status in ('active','suspended')), activated_at timestamptz not null default now(),
 primary key(organization_id,user_id)
);
create index memberships_user on public.memberships(user_id,organization_id);
create table public.staff_grants (
 user_id uuid primary key references public.profiles(id),
 role text not null check(role in ('editor','reviewer','platform_admin')),
 active boolean not null default true
);
create table public.invitations (
 id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations(id),
 email text not null check(email=lower(trim(email))), role public.member_role not null,
 token_hash text not null unique, invited_by uuid not null references public.profiles(id),
 expires_at timestamptz not null, state text not null default 'pending' check(state in ('pending','accepted','revoked','expired')),
 accepted_by uuid references public.profiles(id), created_at timestamptz not null default now()
);
create unique index invitations_pending_email on public.invitations(organization_id,email) where state='pending';
create index invitations_expiry on public.invitations(organization_id,state,expires_at);
create table public.plans (
 id text primary key, label text not null, simulated boolean not null default true check(simulated)
);
create table public.plan_capabilities (
 plan_id text not null references public.plans(id), capability public.capability not null,
 primary key(plan_id,capability)
);
create table public.subscriptions (
 organization_id uuid primary key references public.organizations(id), plan_id text not null references public.plans(id),
 status text not null check(status in ('active','expired','cancelled')),
 current_period_end timestamptz not null, version bigint not null default 1,
 simulated boolean not null default true check(simulated)
);
create table public.entitlement_overrides (
 organization_id uuid not null references public.organizations(id), capability public.capability not null,
 allowed boolean not null, expires_at timestamptz not null, reason text not null,
 changed_by uuid not null references public.profiles(id), primary key(organization_id,capability)
);
create table public.companies (
 id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations(id),
 name text not null, ticker text, cik text check(cik ~ '^[0-9]{10}$'), fictional boolean not null,
 unique(id,organization_id), unique(organization_id,name)
);
create table public.entities (
 id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations(id),
 company_id uuid, kind text not null check(kind in ('company','person','product')), name text not null,
 aliases text[] not null default '{}', fictional boolean not null,
 unique(id,organization_id), foreign key(company_id,organization_id) references public.companies(id,organization_id)
);
create index entities_aliases on public.entities using gin(aliases);
create table public.documents (
 id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations(id),
 slug text not null, title text not null,
 kind text not null check(kind in ('interview','filing','public_record')),
 origin text not null check(origin in ('synthetic','public')),
 required_capability public.capability not null default 'library' check(required_capability in ('library','premium')),
 status text not null default 'draft' check(status in ('draft','published','archived')),
 active_revision_id uuid, published_at timestamptz, interview_date date,
 source_url text, created_at timestamptz not null default now(),
 unique(id,organization_id), unique(organization_id,slug)
);
create index documents_listing on public.documents(organization_id,status,published_at desc,id);
create table public.document_companies (
 organization_id uuid not null, document_id uuid not null, company_id uuid not null,
 primary key(document_id,company_id),
 foreign key(document_id,organization_id) references public.documents(id,organization_id),
 foreign key(company_id,organization_id) references public.companies(id,organization_id)
);
create index document_companies_company on public.document_companies(organization_id,company_id,document_id);
create table public.document_revisions (
 id uuid primary key default gen_random_uuid(), organization_id uuid not null, document_id uuid not null,
 revision_number integer not null check(revision_number>0), content_sha256 text not null check(content_sha256 ~ '^[0-9a-f]{64}$'),
 parser_version text not null, raw_object_key text not null unique,
 rights_status text not null check(rights_status in ('review_required','approved','withdrawn')),
 rights_basis text not null, retrieved_at timestamptz not null, source_url text,
 accession text, fiscal_period_end date, published_once_at timestamptz, withdrawn_at timestamptz,
 created_at timestamptz not null default now(), unique(id,organization_id), unique(id,document_id,organization_id),
 unique(document_id,revision_number), foreign key(document_id,organization_id) references public.documents(id,organization_id)
);
alter table public.documents add foreign key(active_revision_id,id,organization_id)
 references public.document_revisions(id,document_id,organization_id) deferrable initially deferred;
create table public.paragraphs (
 revision_id uuid not null, organization_id uuid not null, paragraph_id text not null,
 ordinal integer not null check(ordinal>=0), speaker text, speaker_role text, section text not null,
 page_number integer check(page_number>0), text_content text not null check(length(text_content)>0),
 primary key(revision_id,paragraph_id), unique(revision_id,ordinal), unique(revision_id,paragraph_id,organization_id),
 foreign key(revision_id,organization_id) references public.document_revisions(id,organization_id)
);
create table public.chunks (
 id uuid primary key default gen_random_uuid(), organization_id uuid not null, revision_id uuid not null,
 ordinal integer not null check(ordinal>=0), text_content text not null,
 token_count integer not null check(token_count between 1 and 700), chunker_version text not null,
 search_vector tsvector generated always as (to_tsvector('english'::regconfig,text_content)) stored,
 unique(id,organization_id), unique(id,revision_id,organization_id), unique(revision_id,ordinal),
 foreign key(revision_id,organization_id) references public.document_revisions(id,organization_id)
);
create index chunks_fts on public.chunks using gin(search_vector);
create index chunks_revision on public.chunks(organization_id,revision_id,id);
create table public.chunk_spans (
 chunk_id uuid not null, revision_id uuid not null, organization_id uuid not null,
 paragraph_id text not null, start_char integer not null check(start_char>=0), end_char integer not null,
 primary key(chunk_id,paragraph_id,start_char), check(end_char>start_char),
 foreign key(chunk_id,revision_id,organization_id) references public.chunks(id,revision_id,organization_id),
 foreign key(revision_id,paragraph_id,organization_id) references public.paragraphs(revision_id,paragraph_id,organization_id)
);
create table public.embeddings (
 chunk_id uuid primary key, organization_id uuid not null, model text not null,
 model_revision text not null, dimensions integer not null default 1536 check(dimensions=1536),
 embedding extensions.vector(1536) not null, created_at timestamptz not null default now(),
 foreign key(chunk_id,organization_id) references public.chunks(id,organization_id)
);
-- Exact vector search is the demo baseline. Enable ANN only after filtered-recall comparison.
-- create index embeddings_hnsw on public.embeddings using hnsw (embedding extensions.vector_cosine_ops);
create table public.corpus_state (
 organization_id uuid primary key references public.organizations(id), version bigint not null default 1,
 updated_at timestamptz not null default now()
);
create table public.collections (
 id uuid primary key default gen_random_uuid(), organization_id uuid not null, owner_id uuid not null,
 name text not null, visibility text not null check(visibility in ('private','organization')),
 created_at timestamptz not null default now(), unique(id,organization_id),
 foreign key(organization_id,owner_id) references public.memberships(organization_id,user_id)
);
create index collections_owner on public.collections(organization_id,owner_id,created_at desc,id);
create table public.collection_items (
 organization_id uuid not null, collection_id uuid not null, document_id uuid not null,
 added_by uuid not null, added_at timestamptz not null default now(), primary key(collection_id,document_id),
 foreign key(collection_id,organization_id) references public.collections(id,organization_id),
 foreign key(document_id,organization_id) references public.documents(id,organization_id),
 foreign key(organization_id,added_by) references public.memberships(organization_id,user_id)
);
create table public.saved_items (
 organization_id uuid not null, user_id uuid not null, document_id uuid not null,
 created_at timestamptz not null default now(), primary key(organization_id,user_id,document_id),
 foreign key(organization_id,user_id) references public.memberships(organization_id,user_id),
 foreign key(document_id,organization_id) references public.documents(id,organization_id)
);
create table public.follows (
 id uuid primary key default gen_random_uuid(), organization_id uuid not null, user_id uuid not null,
 company_id uuid, query_text text, enabled boolean not null default true,
 created_at timestamptz not null default now(), unique(id,organization_id,user_id),
 check((company_id is null)<>(query_text is null)), check(query_text is null or length(query_text) between 1 and 200),
 foreign key(organization_id,user_id) references public.memberships(organization_id,user_id),
 foreign key(company_id,organization_id) references public.companies(id,organization_id)
);
create unique index follows_company on public.follows(organization_id,user_id,company_id) where company_id is not null;
create unique index follows_query on public.follows(organization_id,user_id,query_text) where query_text is not null;
create table public.alerts (
 id uuid primary key default gen_random_uuid(), organization_id uuid not null, user_id uuid not null, follow_id uuid not null,
 document_id uuid not null, revision_id uuid not null, seen_at timestamptz, created_at timestamptz not null default now(),
 unique(follow_id,revision_id),
 foreign key(follow_id,organization_id,user_id) references public.follows(id,organization_id,user_id),
 foreign key(revision_id,document_id,organization_id) references public.document_revisions(id,document_id,organization_id)
);
create index alerts_user on public.alerts(organization_id,user_id,created_at desc,id);
create table public.conversations (
 id uuid primary key default gen_random_uuid(), organization_id uuid not null, owner_id uuid not null,
 title text not null, created_at timestamptz not null default now(), archived_at timestamptz,
 unique(id,organization_id), foreign key(organization_id,owner_id) references public.memberships(organization_id,user_id)
);
create index conversations_owner on public.conversations(organization_id,owner_id,created_at desc,id);
create table public.messages (
 id uuid primary key default gen_random_uuid(), organization_id uuid not null, conversation_id uuid not null,
 role text not null check(role in ('user','assistant')), body text not null, answer_payload jsonb,
 answer_status text check(answer_status in ('answered','partial','conflict','not_found')),
 run_state text not null check(run_state in ('pending','complete','failed','cancelled')),
 corpus_version bigint, trace_id uuid, model text, prompt_version text,
 request_key uuid not null, created_at timestamptz not null default now(),
 unique(id,organization_id), unique(conversation_id,request_key,role),
 foreign key(conversation_id,organization_id) references public.conversations(id,organization_id)
);
create index messages_history on public.messages(conversation_id,created_at,id);
create unique index messages_one_pending on public.messages(conversation_id) where role='assistant' and run_state='pending';
create table public.message_citations (
 id uuid primary key default gen_random_uuid(), organization_id uuid not null, message_id uuid not null,
 revision_id uuid not null, chunk_id uuid not null, paragraph_id text not null, start_char integer not null check(start_char>=0),
 end_char integer not null, check(end_char>start_char), unique(id,organization_id),
 foreign key(message_id,organization_id) references public.messages(id,organization_id),
 foreign key(chunk_id,revision_id,organization_id) references public.chunks(id,revision_id,organization_id),
 foreign key(revision_id,paragraph_id,organization_id) references public.paragraphs(revision_id,paragraph_id,organization_id)
);
create index message_citations_message on public.message_citations(message_id,revision_id);
create table public.feedback (
 id uuid primary key default gen_random_uuid(), organization_id uuid not null, user_id uuid not null, message_id uuid not null,
 vote smallint not null check(vote in (-1,1)), comment text not null default '',
 state text not null default 'new' check(state in ('new','reviewing','resolved','eval_added')),
 reviewer_id uuid references public.profiles(id), review_note text, created_at timestamptz not null default now(),
 unique(user_id,message_id), foreign key(organization_id,user_id) references public.memberships(organization_id,user_id),
 foreign key(message_id,organization_id) references public.messages(id,organization_id)
);
create index feedback_triage on public.feedback(organization_id,state,created_at,id);
create table public.jobs (
 id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations(id),
 kind text not null check(kind in ('ingest','eval','alerts')), state public.job_state not null default 'queued',
 revision_id uuid, idempotency_key uuid not null, requested_by uuid not null references public.profiles(id),
 attempt integer not null default 0 check(attempt between 0 and 3), lease_until timestamptz,
 stage text not null default 'queued', error_code text, completed_units integer not null default 0,
 total_units integer, created_at timestamptz not null default now(), finished_at timestamptz,
 unique(organization_id,kind,idempotency_key), unique(id,organization_id),
 foreign key(revision_id,organization_id) references public.document_revisions(id,organization_id)
);
create index jobs_claim on public.jobs(state,lease_until,created_at,id);
create table public.eval_runs (
 id uuid primary key default gen_random_uuid(), organization_id uuid not null, job_id uuid not null,
 dataset_version text not null, corpus_version bigint not null, configuration_hash text not null,
 baseline_run_id uuid, status public.job_state not null default 'queued',
 created_at timestamptz not null default now(), unique(id,organization_id),
 foreign key(job_id,organization_id) references public.jobs(id,organization_id),
 foreign key(baseline_run_id,organization_id) references public.eval_runs(id,organization_id)
);
create table public.eval_cases (
 run_id uuid not null, organization_id uuid not null, case_id text not null,
 expected_status text not null, actual_status text,
 expected_spans jsonb not null check(jsonb_typeof(expected_spans)='array'),
 retrieved_spans jsonb not null check(jsonb_typeof(retrieved_spans)='array'),
 recall_at_10 numeric, ndcg_at_5 numeric, citation_valid boolean, supported boolean,
 latency_ms integer, cost_usd numeric(12,8), failure_code text,
 primary key(run_id,case_id), foreign key(run_id,organization_id) references public.eval_runs(id,organization_id)
);
create table public.feature_flags (
 organization_id uuid not null references public.organizations(id), key text not null check(key in ('ask_enabled','mcp_enabled','rerank_enabled')),
 enabled boolean not null, version bigint not null default 1, updated_by uuid not null references public.profiles(id),
 primary key(organization_id,key)
);
create table public.audit_events (
 id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations(id),
 actor_id uuid references public.profiles(id), action text not null, target_type text not null, target_id text not null,
 reason text, request_id uuid not null, created_at timestamptz not null default now()
);
create index audit_org_time on public.audit_events(organization_id,created_at desc,id);
create table public.usage_events (
 id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations(id),
 actor_id uuid not null references public.profiles(id), request_id uuid not null,
 phase text not null check(phase in ('embed','rerank','generate','search','fetch')),
 model text, input_tokens integer, output_tokens integer, cost_usd numeric(12,8),
 price_version text, latency_ms integer not null, status text not null check(status in ('ok','error','cancelled')),
 created_at timestamptz not null default now(), unique(request_id,phase)
);
create index usage_org_time on public.usage_events(organization_id,created_at);
create table public.quota_windows (
 organization_id uuid not null references public.organizations(id), principal_key text not null,
 bucket text not null check(bucket in ('ask_minute','ask_day','read_minute','budget_month')),
 starts_at timestamptz not null, used integer not null default 0 check(used>=0),
 reserved_usd numeric(12,8) not null default 0 check(reserved_usd>=0),
 primary key(organization_id,principal_key,bucket,starts_at)
);
-- No billing_events table in the target: there is no payment provider or webhook.

create function private.is_member(org uuid) returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.memberships m join public.organizations o on o.id=m.organization_id
 where m.organization_id=org and m.user_id=(select auth.uid()) and m.status='active' and o.status='active'
 and (nullif(current_setting('request.jwt.claims',true),'')::jsonb->>'selected_org_id' is null
 or nullif(current_setting('request.jwt.claims',true),'')::jsonb->>'selected_org_id'=org::text));
$$;
create function private.is_org_admin(org uuid) returns boolean language sql stable security definer set search_path='' as $$
 select private.is_member(org) and exists(select 1 from public.memberships m where m.organization_id=org
 and m.user_id=(select auth.uid()) and m.role='admin');
$$;
create function private.has_cap(org uuid, cap public.capability) returns boolean language sql stable security definer set search_path='' as $$
 select private.is_member(org) and coalesce(
 (select e.allowed from public.entitlement_overrides e where e.organization_id=org and e.capability=cap and e.expires_at>now()),
 exists(select 1 from public.subscriptions s join public.plan_capabilities pc on pc.plan_id=s.plan_id
 where s.organization_id=org and s.status='active' and s.current_period_end>now() and pc.capability=cap));
$$;
create function private.can_read_document(doc uuid) returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.documents d where d.id=doc and d.status='published'
 and private.has_cap(d.organization_id,'library') and private.has_cap(d.organization_id,d.required_capability));
$$;
create function private.can_read_revision(rev uuid) returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.document_revisions r where r.id=rev and r.published_once_at is not null
 and r.withdrawn_at is null and r.rights_status='approved' and private.can_read_document(r.document_id));
$$;
create function private.can_read_collection(cid uuid) returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.collections c where c.id=cid and private.is_member(c.organization_id)
 and (c.owner_id=(select auth.uid()) or c.visibility='organization'));
$$;
create function private.owns_conversation(cid uuid) returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.conversations c where c.id=cid and c.owner_id=(select auth.uid())
 and private.has_cap(c.organization_id,'ask'));
$$;
create function private.can_read_message(mid uuid) returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.messages m where m.id=mid and private.owns_conversation(m.conversation_id)
 and not exists(select 1 from public.message_citations c where c.message_id=m.id and not private.can_read_revision(c.revision_id)));
$$;
-- All ordinary browser mutations go through reviewed server handlers, except profile text.
-- This also denies browser-created assistant messages and self-assigned staff/membership roles.
revoke all on all tables in schema public from anon, authenticated;
revoke all on all functions in schema private from public, anon, authenticated;
grant usage on schema private to authenticated;
grant execute on all functions in schema private to authenticated;

alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.memberships enable row level security;
alter table public.staff_grants enable row level security;
alter table public.invitations enable row level security;
alter table public.plans enable row level security;
alter table public.plan_capabilities enable row level security;
alter table public.subscriptions enable row level security;
alter table public.entitlement_overrides enable row level security;
alter table public.companies enable row level security;
alter table public.entities enable row level security;
alter table public.documents enable row level security;
alter table public.document_companies enable row level security;
alter table public.document_revisions enable row level security;
alter table public.paragraphs enable row level security;
alter table public.chunks enable row level security;
alter table public.chunk_spans enable row level security;
alter table public.embeddings enable row level security;
alter table public.corpus_state enable row level security;
alter table public.collections enable row level security;
alter table public.collection_items enable row level security;
alter table public.saved_items enable row level security;
alter table public.follows enable row level security;
alter table public.alerts enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.message_citations enable row level security;
alter table public.feedback enable row level security;
alter table public.jobs enable row level security;
alter table public.eval_runs enable row level security;
alter table public.eval_cases enable row level security;
alter table public.feature_flags enable row level security;
alter table public.audit_events enable row level security;
alter table public.usage_events enable row level security;
alter table public.quota_windows enable row level security;

create policy profile_read on public.profiles for select to authenticated using(id=(select auth.uid()));
create policy profile_edit on public.profiles for update to authenticated using(id=(select auth.uid())) with check(id=(select auth.uid()));
grant select on public.profiles to authenticated;
grant update(display_name,locale) on public.profiles to authenticated;
create policy org_read on public.organizations for select to authenticated using(private.is_member(id));
create policy membership_read on public.memberships for select to authenticated
 using(private.is_member(organization_id) and (user_id=(select auth.uid()) or private.is_org_admin(organization_id)));
create policy subscription_read on public.subscriptions for select to authenticated using(private.is_org_admin(organization_id));
create policy overrides_read on public.entitlement_overrides for select to authenticated using(private.is_org_admin(organization_id));
create policy companies_read on public.companies for select to authenticated using(private.has_cap(organization_id,'library'));
create policy entities_read on public.entities for select to authenticated using(private.has_cap(organization_id,'library'));
create policy documents_read on public.documents for select to authenticated using(private.can_read_document(id));
create policy document_companies_read on public.document_companies for select to authenticated using(private.can_read_document(document_id));
create policy revisions_read on public.document_revisions for select to authenticated using(private.can_read_revision(id));
create policy paragraphs_read on public.paragraphs for select to authenticated using(private.can_read_revision(revision_id));
create policy chunks_read on public.chunks for select to authenticated using(private.can_read_revision(revision_id));
create policy chunk_spans_read on public.chunk_spans for select to authenticated using(private.can_read_revision(revision_id));
create policy corpus_read on public.corpus_state for select to authenticated using(private.has_cap(organization_id,'library'));
create policy collections_read on public.collections for select to authenticated using(private.can_read_collection(id));
create policy collection_items_read on public.collection_items for select to authenticated
 using(private.can_read_collection(collection_id) and private.can_read_document(document_id));
create policy saved_read on public.saved_items for select to authenticated
 using(user_id=(select auth.uid()) and private.is_member(organization_id) and private.can_read_document(document_id));
create policy follows_read on public.follows for select to authenticated using(user_id=(select auth.uid()) and private.is_member(organization_id));
create policy alerts_read on public.alerts for select to authenticated
 using(user_id=(select auth.uid()) and private.is_member(organization_id) and private.can_read_revision(revision_id));
create policy conversations_read on public.conversations for select to authenticated using(private.owns_conversation(id));
create policy messages_read on public.messages for select to authenticated using(private.can_read_message(id));
create policy citations_read on public.message_citations for select to authenticated using(private.can_read_message(message_id));
create policy feedback_read on public.feedback for select to authenticated
 using(user_id=(select auth.uid()) and private.can_read_message(message_id));
-- Explicit default deny: staff_grants, invitations (token hashes), plans, plan_capabilities,
-- embeddings, jobs, eval_runs, eval_cases, feature_flags, audit_events, usage_events, quota_windows.
-- They have RLS enabled and no client grants/policies; server returns purpose-built projections.
grant select on public.organizations, public.memberships, public.subscriptions, public.entitlement_overrides,
 public.companies, public.entities, public.documents, public.document_companies, public.document_revisions,
 public.paragraphs, public.chunks, public.chunk_spans, public.corpus_state, public.collections,
 public.collection_items, public.saved_items, public.follows, public.alerts, public.conversations,
 public.messages, public.message_citations, public.feedback to authenticated;
-- Even allowed revisions cannot expose internal object-storage keys via the browser.
revoke select on public.document_revisions from authenticated;
grant select(id,organization_id,document_id,revision_number,content_sha256,parser_version,rights_status,
 rights_basis,retrieved_at,source_url,accession,fiscal_period_end,published_once_at,withdrawn_at,created_at)
 on public.document_revisions to authenticated;
grant all on all tables in schema public to service_role;
grant usage on schema private to service_role;
grant execute on all functions in schema private to service_role;
```

## 6. Server transaction and storage contracts

The API validates Supabase access tokens with `auth.getUser()`; the MCP adapter validates its own audience-bound token as specified in 05. Both produce an internal `Principal` with a server-derived user UUID. For member reads, use one SQL transaction with `SET LOCAL ROLE authenticated` and parameterized `set_config('request.jwt.claims', claimsJson, true)` after identity validation; only the trusted backend connection can establish that context. Include server-validated `sub` and `selected_org_id` in this transaction context; the RLS membership helper enforces the selected org when present. An ordinary Supabase browser JWT without that field can read only its own legitimate memberships; an MCP request always supplies the verified selected org. Never accept a client-supplied claims object. This permits the shared SQL service to use the same RLS for web and MCP without passing an MCP token to Supabase as if it were a Supabase token. Reset transaction context on commit/rollback; no context survives pooling. Server writes use a separate restricted backend pool; no browser endpoint accepts raw SQL, table names or role names. Local DB credentials are server secrets.

All mutation handlers accept an `Idempotency-Key` UUID and compare request payload hash on retry; mismatch returns 409. A durable request ledger is required for mutations without an existing unique natural key. In the target, use a single ledger table below. Store sanitized response IDs/status, not tokens or raw content. All responses are reread under current permissions on replay.

```sql
create table public.mutation_requests (
 organization_id uuid not null references public.organizations(id), actor_id uuid not null references public.profiles(id),
 request_key uuid not null, operation text not null, payload_sha256 text not null,
 target_id uuid, http_status integer, created_at timestamptz not null default now(),
 primary key(organization_id,actor_id,request_key)
);
alter table public.mutation_requests enable row level security;
revoke all on public.mutation_requests from anon,authenticated;
grant all on public.mutation_requests to service_role;
```

| Operation                      | Required transaction, validation and failure behavior                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Invite/reserve seat            | Authenticate admin; lock organization; expire old reservations; count active memberships and pending unexpired reservations; reject duplicate active member/email; require usage below limit; insert invitation/token hash and audit; return invitation ID. Demo does not send mail; acceptance tokens are issued only into a local test harness, not logged or persisted as plaintext.                           |
| Accept invitation              | Verify authenticated user's email against Supabase's verified identity, not the request body. Lock org then invitation; verify hash/state/expiry; recheck org active; reservation must exist; insert membership or return existing membership unchanged; mark accepted; increment access version; audit. Single use, constant-time hash comparison; expired returns 410 without email disclosure.                 |
| Change role/suspend/seat limit | Lock org; require current admin; cannot remove/demote last active admin; suspension clears active capacity; capacity reduction cannot drop below active+reserved; increment access version, audit; revoke in-flight finalizations on next permission check.                                                                                                                                                       |
| Save/collection mutation       | Derive user; verify org membership, target collection access and role rule; check same-org document and current access; unique constraints provide idempotency. Collection owner may rename/delete; analyst/admin members may mutate items in organization-visible collections. Explicit IDs required.                                                                                                            |
| Publish                        | Lock document and corpus_state; verify revision belongs to doc/org, rights approved, parser/chunker success, nonzero paragraphs/chunks, complete embeddings of selected model/dimension, exact span bounds and hashes. Set published_once_at, active_revision_id, document status/published_at; increment corpus version; insert audit and alerts job in same transaction. Old published revision remains intact. |
| Revise/withdraw/archive        | New body always creates new revision; deny UPDATE/DELETE of paragraph/chunk/embedding content once published. Withdraw changes only access metadata; archive hides all revisions for members. Increment corpus and access versions; never silently rewrite old quotes. Permanent deletion is outside demo UI.                                                                                                     |
| Ask                            | Lock/claim conversation turn using unique request key; check own conversation, role, caps, flags and quota; write user/pending assistant; release transaction before model call; collect provisional answer in memory; recheck permissions/corpus before committing validated answer/citation spans. No concurrent interleaved answers in one thread; second active turn returns 409.                             |
| Feedback/review                | Member can vote only on own currently readable assistant message; server validates vote/comment length. Staff inspection and feedback-list reads insert audit before returning body/comment content. Triage state transitions are new→reviewing→resolved/eval_added; eval_added requires a fixture case reference in review_note.                                                                                 |
| Quota                          | Lock org for shared budget and all user windows in a fixed order. Atomically check/increment minute/day counters and reserve worst-case turn cost; reject before provider work on excess. Reconcile reservation with measured cost once. Unknown price rejects generation instead of treating cost as zero. Unavailable quota DB returns 503.                                                                     |
| Worker claim/retry             | `FOR UPDATE SKIP LOCKED` on queued or expired-lease job; set running, lease=now()+60s, increment attempt; heartbeat every 20s; maximum 3 attempts. Output keys include revision ID+stage. Retry cannot republish a different revision or duplicate alerts. Worker restarts reconcile leased work.                                                                                                                 |
| Simulated billing              | Admin may set current plan subscription expired/active only; active extends period by 30 days, no payment. Platform admin controls plans, caps/overrides and seat limit. Compare subscription version; increment access_version; audit. No real webhook, charge or checkout redirect.                                                                                                                             |

Enforce revision immutability with BEFORE UPDATE/DELETE triggers on paragraphs, chunks and embeddings, looking up the parent's `published_once_at`; block body/hash/parser/source replacement in published document_revisions. Permit only explicit rights withdrawal metadata updates on the revision. The concrete triggers are supplied in section 9; their concurrency behavior remains a required implementation gate.

Storage: use a new private `corpus` bucket. Anonymous/authenticated roles have **no** object policies for that bucket and no upload/download URLs are issued to members. The Node ingestion worker uploads raw objects using its server credential to `organizationId/documentId/revisionId/raw`. Member source text is streamed from authorized paragraph rows; admin preview comes through audited/staff-authorized API. Do not create a broad “authenticated users can read corpus” policy or use a service key in Lovable. Public synthetic fixture files are separate static assets. Source URL ingestion accepts only approved HTTPS SEC URLs, validates DNS/IP and every redirect, denies loopback/private/link-local/metadata addresses and limits bytes/time; upload parsing runs without network. No arbitrary-URL proxy.

## 7. TypeScript API contract

The following block is a compileable contract catalog, not one intended source module. During implementation, extract each named exported type into its own file with explicit imports; keep route registrations separate from handlers. All paths below are relative to `/api/v1`; routes starting `/orgs/:orgId` require explicit selected organization and revalidate membership. Staff routes require current staff scope and audited content access. Body limits: question 4,000 characters; names 120; comments/review notes 2,000; query 200; limit 1–50 default 20. IDs must be UUIDs, timestamps ISO 8601 UTC, cursor opaque. Reject unknown request fields and invalid enums with 422. Pagination cursors bind filter hash, org, actor, access version and corpus version; 15-minute expiry. Time-based entitlement changes also reauthorize at fetch.

```ts
export type Id = string
export type Timestamp = string
export type Role = 'admin' | 'analyst' | 'read_only'
export type Capability = 'library' | 'premium' | 'ask' | 'mcp'
export type JobState =
  'queued' | 'running' | 'succeeded' | 'failed' | 'cancelled'
export type AnswerStatus = 'answered' | 'partial' | 'conflict' | 'not_found'
export type ErrorCode =
  | 'UNAUTHENTICATED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'INVALID_INPUT'
  | 'CONFLICT'
  | 'SEAT_LIMIT_CONFLICT'
  | 'CURSOR_STALE'
  | 'RATE_LIMITED'
  | 'BUDGET_EXCEEDED'
  | 'DEPENDENCY_UNAVAILABLE'
  | 'INVALID_ANSWER'
  | 'EXPIRED'
export type ApiError = {
  error: {
    code: ErrorCode
    message: string
    retryable: boolean
    retryAfterSeconds?: number
  }
  requestId: Id
}
export type PageQuery = { cursor?: string; limit?: number }
export type Page<T> = { items: T[]; nextCursor: string | null }
export type OrgPath = { orgId: Id }
export type ObjectPath = OrgPath & { id: Id }
export type Ack = { ok: true; requestId: Id }
export type VersionChange = { expectedVersion: number; reason: string }
export type Membership = {
  organizationId: Id
  organizationName: string
  role: Role
  status: 'active' | 'suspended'
}
export type Access = {
  capabilities: Capability[]
  accessVersion: number
  expiresAt: Timestamp | null
}
export type Me = {
  userId: Id
  displayName: string
  memberships: Membership[]
  staffRole: 'editor' | 'reviewer' | 'platform_admin' | null
}
export type Company = {
  id: Id
  name: string
  ticker: string | null
  cik: string | null
  fictional: boolean
}
export type Entity = {
  id: Id
  companyId: Id | null
  kind: 'company' | 'person' | 'product'
  name: string
  aliases: string[]
  fictional: boolean
}
export type DocumentSummary = {
  id: Id
  title: string
  kind: 'interview' | 'filing' | 'public_record'
  origin: 'public' | 'synthetic'
  publishedAt: Timestamp
  interviewDate: string | null
  activeRevisionId: Id
  companyIds: Id[]
}
export type Paragraph = {
  paragraphId: string
  ordinal: number
  speaker: string | null
  speakerRole: string | null
  section: string
  pageNumber: number | null
  text: string
}
export type Revision = {
  id: Id
  documentId: Id
  revisionNumber: number
  sha256: string
  isCurrent: boolean
  rightsBasis: string
  sourceUrl: string | null
  paragraphs: Page<Paragraph>
}
export type Citation = {
  citationId: Id
  documentId: Id
  revisionId: Id
  chunkId: Id
  paragraphId: string
  startChar: number
  endChar: number
  quote: string
  title: string
  speaker: string | null
  speakerRole: string | null
  interviewDate: string | null
  publishedAt: Timestamp
  section: string
  pageNumber: number | null
  origin: 'synthetic' | 'public'
  applicationUrl: string
  sourceUrl: string | null
}
export type SearchInput = PageQuery & {
  query: string
  companyIds?: Id[]
  kinds?: DocumentSummary['kind'][]
  publishedFrom?: string
  publishedTo?: string
  documentId?: Id
}
export type SearchHit = {
  document: DocumentSummary
  citation: Citation
  rank: number
}
export type SearchResult = Page<SearchHit> & {
  corpusVersion: number
  accessVersion: number
}
export type Claim = {
  text: string
  citationIds: Id[]
  kind: 'reported' | 'comparison'
}
export type Usage = {
  inputTokens: number | null
  outputTokens: number | null
  totalCostUsd: number | null
  costComplete: boolean
  latencyMs: number
}
export type Answer = {
  answerId: Id
  conversationId: Id
  answerMd: string
  status: AnswerStatus
  claims: Claim[]
  citations: Citation[]
  missingEvidence: string[]
  corpusVersion: number
  traceId: Id
  usage: Usage
}
export type StreamEvent =
  | { type: 'start'; answerId: Id; requestId: Id }
  | { type: 'stage'; stage: 'searching' | 'checking' | 'writing' }
  | { type: 'delta'; text: string; provisional: true }
  | { type: 'final'; answer: Answer }
  | { type: 'error'; error: ApiError['error']; requestId: Id }
  | { type: 'cancelled'; answerId: Id }
export type Thread = {
  id: Id
  title: string
  createdAt: Timestamp
  archivedAt: Timestamp | null
}
export type Message = {
  id: Id
  role: 'user' | 'assistant'
  state: 'pending' | 'complete' | 'failed' | 'cancelled' | 'unavailable'
  body: string | null
  answer: Answer | null
  createdAt: Timestamp
}
export type Collection = {
  id: Id
  name: string
  ownerId: Id
  visibility: 'private' | 'organization'
  createdAt: Timestamp
}
export type SavedItem = {
  itemId: Id
  document: DocumentSummary | null
  unavailable: boolean
  createdAt: Timestamp
}
export type Follow = {
  id: Id
  companyId: Id | null
  query: string | null
  enabled: boolean
}
export type Alert = {
  id: Id
  document: DocumentSummary | null
  unavailable: boolean
  createdAt: Timestamp
  seenAt: Timestamp | null
}
export type Member = {
  userId: Id
  displayName: string
  role: Role
  status: 'active' | 'suspended'
}
export type Invitation = {
  id: Id
  email: string
  role: Role
  expiresAt: Timestamp
  state: 'pending' | 'accepted' | 'revoked' | 'expired'
}
export type Seats = {
  limit: number
  active: number
  reserved: number
  accessVersion: number
}
export type Subscription = {
  planId: string
  planLabel: string
  status: 'active' | 'expired' | 'cancelled'
  currentPeriodEnd: Timestamp
  version: number
  simulated: true
}
export type Override = {
  capability: Capability
  allowed: boolean
  expiresAt: Timestamp
  reason: string
}
export type Billing = {
  subscription: Subscription | null
  seats: Seats
  access: Access
  overrides: Override[]
  simulated: true
}
export type Organization = {
  id: Id
  name: string
  status: 'active' | 'suspended'
  seats: Seats
}
export type Job = {
  id: Id
  kind: 'ingest' | 'eval' | 'alerts'
  state: JobState
  stage: string
  attempt: number
  completedUnits: number
  totalUnits: number | null
  errorCode: string | null
  createdAt: Timestamp
  finishedAt: Timestamp | null
}
export type Intake = {
  title: string
  kind: DocumentSummary['kind']
  origin: 'public' | 'synthetic'
  companyIds: Id[]
  interviewDate: string | null
  sourceUrl: string | null
  rightsBasis: string
  requiredCapability: 'library' | 'premium'
}
export type IntakeResult = { documentId: Id; revisionId: Id }
export type AdminDocument = {
  id: Id
  title: string
  status: 'draft' | 'published' | 'archived'
  activeRevisionId: Id | null
  requiredCapability: 'library' | 'premium'
  origin: 'synthetic' | 'public'
}
export type AdminRevision = {
  id: Id
  revisionNumber: number
  sha256: string
  parserVersion: string
  rightsStatus: 'review_required' | 'approved' | 'withdrawn'
  publishedOnceAt: Timestamp | null
  chunkCount: number
  embeddingCount: number
}
export type Chunk = {
  id: Id
  revisionId: Id
  ordinal: number
  text: string
  tokenCount: number
  paragraphIds: string[]
}
export type Feedback = {
  id: Id
  messageId: Id
  userId: Id
  vote: -1 | 1
  comment: string
  state: 'new' | 'reviewing' | 'resolved' | 'eval_added'
  reviewNote: string | null
}
export type EvalRun = {
  id: Id
  jobId: Id
  datasetVersion: string
  corpusVersion: number
  configurationHash: string
  baselineRunId: Id | null
  status: JobState
  createdAt: Timestamp
}
export type GoldSpan = { sourceId: string; paragraphId: string }
export type EvalCase = {
  caseId: string
  expectedStatus: AnswerStatus
  actualStatus: AnswerStatus | null
  expectedSpans: GoldSpan[]
  retrievedSpans: GoldSpan[]
  recallAt10: number | null
  ndcgAt5: number | null
  citationValid: boolean | null
  supported: boolean | null
  latencyMs: number | null
  costUsd: number | null
  failureCode: string | null
}
export type EvalSummary = {
  completedCases: number
  failedCases: number
  recallAt10: number | null
  citationValidity: number | null
  supportedClaimRate: number | null
  correctRefusalRate: number | null
  falseRefusalRate: number | null
  p95Ms: number | null
  costUsd: number | null
  unknownCostEvents: number
}
export type RetrievalDebug = {
  lexical: Id[]
  vector: Id[]
  fused: Id[]
  reranked: Id[]
  selected: Id[]
  authorizedGoldPresent: boolean | null
  diagnostic:
    | 'unknown'
    | 'retrieval_miss'
    | 'generation_miss'
    | 'correct_refusal'
    | 'dependency_error'
  corpusVersion: number
}
export type Flag = {
  key: 'ask_enabled' | 'mcp_enabled' | 'rerank_enabled'
  enabled: boolean
  version: number
}
export type Audit = {
  id: Id
  actorId: Id | null
  action: string
  targetType: string
  targetId: string
  reason: string | null
  requestId: Id
  createdAt: Timestamp
}
export type Health = {
  status: 'ready' | 'degraded'
  version: string
  database: boolean
  activeCorpus: boolean
  providerCanaryAt: Timestamp | null
}
export type Endpoint<P, Q, B, R> = {
  params: P
  query: Q
  body: B
  response: R | ApiError
}
export type Api = {
  'GET /me': Endpoint<{}, {}, never, Me>
  'PATCH /me': Endpoint<{}, {}, { displayName: string; locale: 'en' }, Me>
  'GET /orgs/:orgId/access': Endpoint<OrgPath, {}, never, Access>
  'GET /orgs/:orgId/companies': Endpoint<
    OrgPath,
    PageQuery & { query?: string },
    never,
    Page<Company>
  >
  'GET /orgs/:orgId/entities': Endpoint<
    OrgPath,
    PageQuery & { query: string },
    never,
    Page<Entity>
  >
  'GET /orgs/:orgId/entities/:id': Endpoint<ObjectPath, {}, never, Entity>
  'GET /orgs/:orgId/documents': Endpoint<
    OrgPath,
    Omit<SearchInput, 'query'> & { query?: string },
    never,
    Page<DocumentSummary>
  >
  'GET /orgs/:orgId/documents/:id': Endpoint<
    ObjectPath,
    {},
    never,
    DocumentSummary
  >
  'GET /orgs/:orgId/documents/:id/revisions/:revisionId': Endpoint<
    ObjectPath & { revisionId: Id },
    PageQuery,
    never,
    Revision
  >
  'GET /orgs/:orgId/documents/:id/revisions/:revisionId/span': Endpoint<
    ObjectPath & { revisionId: Id },
    { paragraphId: string; startChar?: number; endChar?: number },
    never,
    Citation
  >
  'POST /orgs/:orgId/search': Endpoint<OrgPath, {}, SearchInput, SearchResult>
  'GET /orgs/:orgId/saved-items': Endpoint<
    OrgPath,
    PageQuery,
    never,
    Page<SavedItem>
  >
  'PUT /orgs/:orgId/saved-items/:id': Endpoint<ObjectPath, {}, {}, Ack>
  'DELETE /orgs/:orgId/saved-items/:id': Endpoint<ObjectPath, {}, never, Ack>
  'GET /orgs/:orgId/collections': Endpoint<
    OrgPath,
    PageQuery,
    never,
    Page<Collection>
  >
  'POST /orgs/:orgId/collections': Endpoint<
    OrgPath,
    {},
    { name: string; visibility: Collection['visibility'] },
    Collection
  >
  'GET /orgs/:orgId/collections/:id': Endpoint<
    ObjectPath,
    {},
    never,
    Collection
  >
  'PATCH /orgs/:orgId/collections/:id': Endpoint<
    ObjectPath,
    {},
    { name: string; visibility: Collection['visibility'] },
    Collection
  >
  'DELETE /orgs/:orgId/collections/:id': Endpoint<ObjectPath, {}, never, Ack>
  'GET /orgs/:orgId/collections/:id/items': Endpoint<
    ObjectPath,
    PageQuery,
    never,
    Page<SavedItem>
  >
  'PUT /orgs/:orgId/collections/:id/items/:documentId': Endpoint<
    ObjectPath & { documentId: Id },
    {},
    {},
    Ack
  >
  'DELETE /orgs/:orgId/collections/:id/items/:documentId': Endpoint<
    ObjectPath & { documentId: Id },
    {},
    never,
    Ack
  >
  'GET /orgs/:orgId/follows': Endpoint<OrgPath, PageQuery, never, Page<Follow>>
  'POST /orgs/:orgId/follows': Endpoint<
    OrgPath,
    {},
    { companyId: Id; query?: never } | { query: string; companyId?: never },
    Follow
  >
  'PATCH /orgs/:orgId/follows/:id': Endpoint<
    ObjectPath,
    {},
    { enabled: boolean },
    Follow
  >
  'DELETE /orgs/:orgId/follows/:id': Endpoint<ObjectPath, {}, never, Ack>
  'GET /orgs/:orgId/alerts': Endpoint<
    OrgPath,
    PageQuery & { unread?: boolean },
    never,
    Page<Alert>
  >
  'PATCH /orgs/:orgId/alerts/:id': Endpoint<
    ObjectPath,
    {},
    { seen: true },
    Alert
  >
  'GET /orgs/:orgId/conversations': Endpoint<
    OrgPath,
    PageQuery,
    never,
    Page<Thread>
  >
  'POST /orgs/:orgId/conversations': Endpoint<
    OrgPath,
    {},
    { title: string },
    Thread
  >
  'PATCH /orgs/:orgId/conversations/:id': Endpoint<
    ObjectPath,
    {},
    { archived: true },
    Ack
  >
  'GET /orgs/:orgId/conversations/:id/messages': Endpoint<
    ObjectPath,
    PageQuery,
    never,
    Page<Message>
  >
  'POST /orgs/:orgId/conversations/:id/messages': Endpoint<
    ObjectPath,
    {},
    { text: string; requestKey: Id; documentId?: Id },
    StreamEvent
  >
  'POST /orgs/:orgId/conversations/:id/cancel': Endpoint<
    ObjectPath,
    {},
    { answerId: Id },
    Ack
  >
  'PUT /orgs/:orgId/messages/:id/feedback': Endpoint<
    ObjectPath,
    {},
    { vote: -1 | 1; comment: string },
    Feedback
  >
  'GET /orgs/:orgId/seats': Endpoint<OrgPath, {}, never, Seats>
  'GET /orgs/:orgId/members': Endpoint<OrgPath, PageQuery, never, Page<Member>>
  'PATCH /orgs/:orgId/members/:id': Endpoint<
    ObjectPath,
    {},
    { role: Role; status: Member['status'] } & VersionChange,
    Member
  >
  'GET /orgs/:orgId/invitations': Endpoint<
    OrgPath,
    PageQuery,
    never,
    Page<Invitation>
  >
  'POST /orgs/:orgId/invitations': Endpoint<
    OrgPath,
    {},
    { email: string; role: Role },
    Invitation
  >
  'DELETE /orgs/:orgId/invitations/:id': Endpoint<ObjectPath, {}, never, Ack>
  'POST /invitations/accept': Endpoint<{}, {}, { token: string }, Membership>
  'GET /orgs/:orgId/billing': Endpoint<OrgPath, {}, never, Billing>
  'POST /orgs/:orgId/billing/simulate': Endpoint<
    OrgPath,
    {},
    { action: 'expire' | 'renew' } & VersionChange,
    Billing
  >
  'GET /admin/organizations': Endpoint<{}, PageQuery, never, Page<Organization>>
  'PATCH /admin/orgs/:orgId': Endpoint<
    OrgPath,
    {},
    {
      name: string
      status: Organization['status']
      seatLimit: number
    } & VersionChange,
    Organization
  >
  'GET /admin/orgs/:orgId/seats': Endpoint<OrgPath, {}, never, Seats>
  'GET /admin/orgs/:orgId/members': Endpoint<
    OrgPath,
    PageQuery,
    never,
    Page<Member>
  >
  'PATCH /admin/orgs/:orgId/members/:id': Endpoint<
    ObjectPath,
    {},
    { role: Role; status: Member['status'] } & VersionChange,
    Member
  >
  'GET /admin/orgs/:orgId/invitations': Endpoint<
    OrgPath,
    PageQuery,
    never,
    Page<Invitation>
  >
  'POST /admin/orgs/:orgId/invitations': Endpoint<
    OrgPath,
    {},
    { email: string; role: Role },
    Invitation
  >
  'DELETE /admin/orgs/:orgId/invitations/:id': Endpoint<
    ObjectPath,
    {},
    never,
    Ack
  >
  'GET /admin/orgs/:orgId/access': Endpoint<OrgPath, {}, never, Billing>
  'PUT /admin/orgs/:orgId/overrides': Endpoint<
    OrgPath,
    {},
    Override & VersionChange,
    Billing
  >
  'DELETE /admin/orgs/:orgId/overrides/:capability': Endpoint<
    OrgPath & { capability: Capability },
    VersionChange,
    never,
    Billing
  >
  'GET /admin/orgs/:orgId/documents': Endpoint<
    OrgPath,
    PageQuery & { status?: AdminDocument['status'] },
    never,
    Page<AdminDocument>
  >
  'POST /admin/orgs/:orgId/documents': Endpoint<
    OrgPath,
    {},
    Intake,
    IntakeResult
  >
  'GET /admin/orgs/:orgId/documents/:id': Endpoint<
    ObjectPath,
    {},
    never,
    AdminDocument
  >
  'PATCH /admin/orgs/:orgId/documents/:id': Endpoint<
    ObjectPath,
    {},
    {
      title: string
      companyIds: Id[]
      requiredCapability: 'library' | 'premium'
      expectedActiveRevisionId: Id | null
      reason: string
    },
    AdminDocument
  >
  'GET /admin/orgs/:orgId/documents/:id/revisions': Endpoint<
    ObjectPath,
    PageQuery,
    never,
    Page<AdminRevision>
  >
  'POST /admin/orgs/:orgId/documents/:id/revisions': Endpoint<
    ObjectPath,
    {},
    { sourceUrl: string | null; rightsBasis: string },
    IntakeResult
  >
  'PUT /admin/orgs/:orgId/revisions/:id/content': Endpoint<
    ObjectPath,
    { format: 'pdf' | 'html' | 'transcript' },
    Blob,
    { sha256: string; bytes: number }
  >
  'PATCH /admin/orgs/:orgId/revisions/:id/rights': Endpoint<
    ObjectPath,
    {},
    { status: 'approved' | 'withdrawn'; reason: string },
    AdminRevision
  >
  'POST /admin/orgs/:orgId/revisions/:id/ingest': Endpoint<
    ObjectPath,
    {},
    { idempotencyKey: Id },
    Job
  >
  'POST /admin/orgs/:orgId/revisions/:id/publish': Endpoint<
    ObjectPath,
    {},
    { expectedActiveRevisionId: Id | null; reason: string },
    AdminDocument
  >
  'POST /admin/orgs/:orgId/documents/:id/archive': Endpoint<
    ObjectPath,
    {},
    { reason: string },
    Ack
  >
  'GET /admin/orgs/:orgId/revisions/:id/paragraphs': Endpoint<
    ObjectPath,
    PageQuery,
    never,
    Page<Paragraph>
  >
  'GET /admin/orgs/:orgId/revisions/:id/chunks': Endpoint<
    ObjectPath,
    PageQuery,
    never,
    Page<Chunk>
  >
  'GET /admin/orgs/:orgId/jobs': Endpoint<
    OrgPath,
    PageQuery & { state?: JobState },
    never,
    Page<Job>
  >
  'GET /admin/orgs/:orgId/jobs/:id': Endpoint<ObjectPath, {}, never, Job>
  'POST /admin/orgs/:orgId/jobs/:id/retry': Endpoint<
    ObjectPath,
    {},
    { reason: string },
    Job
  >
  'GET /admin/orgs/:orgId/conversations': Endpoint<
    OrgPath,
    PageQuery,
    never,
    Page<Thread>
  >
  'POST /admin/orgs/:orgId/conversations/:id/inspect': Endpoint<
    ObjectPath,
    PageQuery,
    { reason: string },
    Page<Message>
  >
  'GET /admin/orgs/:orgId/feedback': Endpoint<
    OrgPath,
    PageQuery & { state?: Feedback['state'] },
    never,
    Page<Feedback>
  >
  'PATCH /admin/orgs/:orgId/feedback/:id': Endpoint<
    ObjectPath,
    {},
    { state: Feedback['state']; reviewNote: string },
    Feedback
  >
  'GET /admin/orgs/:orgId/eval-runs': Endpoint<
    OrgPath,
    PageQuery,
    never,
    Page<EvalRun>
  >
  'POST /admin/orgs/:orgId/eval-runs': Endpoint<
    OrgPath,
    {},
    { datasetVersion: string; baselineRunId: Id | null; idempotencyKey: Id },
    EvalRun
  >
  'GET /admin/orgs/:orgId/eval-runs/:id': Endpoint<
    ObjectPath,
    {},
    never,
    { run: EvalRun; summary: EvalSummary }
  >
  'GET /admin/orgs/:orgId/eval-runs/:id/cases': Endpoint<
    ObjectPath,
    PageQuery,
    never,
    Page<EvalCase>
  >
  'POST /admin/orgs/:orgId/retrieval-debug': Endpoint<
    OrgPath,
    {},
    { query: string; personaUserId: Id; documentId?: Id },
    RetrievalDebug
  >
  'GET /admin/orgs/:orgId/flags': Endpoint<OrgPath, {}, never, Flag[]>
  'PUT /admin/orgs/:orgId/flags/:key': Endpoint<
    OrgPath & { key: Flag['key'] },
    {},
    { enabled: boolean } & VersionChange,
    Flag
  >
  'GET /admin/orgs/:orgId/audit': Endpoint<
    OrgPath,
    PageQuery & { from?: Timestamp; to?: Timestamp },
    never,
    Page<Audit>
  >
  'GET /health/ready': Endpoint<{}, {}, never, Health>
}
```

The message POST is `application/x-ndjson`, one `StreamEvent` per newline, not a JSON array. Other endpoints return JSON, except upload uses binary content with MIME/type sniffing and 10 MB maximum. Dates filter publication date inclusively in UTC; interview date is separate metadata. Search ranking pagination materializes only authorized hit IDs in a bounded server cursor session; each page rechecks access. Ordinary lists keyset-sort by `(created_at,id)` descending, documents by `(published_at,id)` descending, paragraphs by ordinal ascending. No total count is promised when not computed.

HTTP status mapping: 401 unauthenticated; 403 denied operation/capability; object missing or inaccessible 404; 410 expired invite; 409 concurrency/stale cursor/capacity; 422 invalid input; 429 quota with `Retry-After`; 503 dependency unavailable; 502 invalid provider answer. Streaming errors after headers use terminal `error` and never a final answer. Mutation failures roll back. Trace IDs carry no secret or text payload.

`GET /health/ready` is public but reveals only readiness booleans, build version and last synthetic canary time. Staff IDs, database errors, model keys and source titles never appear. Auth login/refresh/sign-out use Supabase's documented client API, not invented `/api/v1` endpoints. Raw export, account deletion, SSO provisioning, real billing and email alerts are excluded; their controls must be absent or visibly “Not implemented,” not optimistic success toasts.

## 8. Required verification and completion boundary

Specification command, from `code-project`: `python3 verify_specs.py --document 04`. It checks SQL table/RLS coverage, type references and routes plus read-only input hashes. SQL and TypeScript extraction/typecheck results are recorded in 06. The future runtime gates must cover two orgs, each role, direct PostgREST, cross-org foreign keys, storage, seat races, revoked historical citations, unknown cost and staff audit failure. No production security or Supabase deployment is claimed from this document.

## 9. Remote MCP identity linkage and immutable-content guards

These additions are part of the fresh schema when implementing the target tier. OAuth identities are linked only through a server-verified account-linking flow; token issuer+subject lookup cannot be created by tool arguments. The authorization server must bind the explicitly consented organization to the resource token. If the selected server cannot express this, target remote MCP remains blocked; local stdio still follows its declared fixture model.

```sql
create table public.external_identities (
 issuer text not null, subject text not null, user_id uuid not null references public.profiles(id),
 linked_at timestamptz not null default now(), primary key(issuer,subject)
);
alter table public.external_identities enable row level security;
revoke all on public.external_identities from anon,authenticated;
grant all on public.external_identities to service_role;

create function private.guard_published_revision() returns trigger
 language plpgsql set search_path='' as $$
begin
 if old.published_once_at is not null then
  if tg_op='DELETE' then raise exception 'Published revisions cannot be deleted'; end if;
  if (to_jsonb(new)-'rights_status'-'withdrawn_at') is distinct from (to_jsonb(old)-'rights_status'-'withdrawn_at') then
   raise exception 'Published revision content is immutable';
  end if;
 end if;
 if tg_op='DELETE' then return old; end if;
 return new;
end;
$$;
create trigger revisions_immutable before update or delete on public.document_revisions
 for each row execute function private.guard_published_revision();

create function private.guard_published_child() returns trigger
 language plpgsql security definer set search_path='' as $$
declare previous_rev uuid; next_rev uuid; row_state record;
begin
 if tg_table_name='embeddings' then
  if tg_op<>'INSERT' then
   select c.revision_id into previous_rev from public.chunks c where c.id=old.chunk_id;
  end if;
  if tg_op<>'DELETE' then
   select c.revision_id into next_rev from public.chunks c where c.id=new.chunk_id;
  end if;
 else
  if tg_op<>'INSERT' then previous_rev=old.revision_id; end if;
  if tg_op<>'DELETE' then next_rev=new.revision_id; end if;
 end if;
 for row_state in select r.published_once_at from public.document_revisions r
  where r.id=any(array[previous_rev,next_rev]) order by r.id for update
 loop
  if row_state.published_once_at is not null then
   raise exception 'Published evidence is immutable';
  end if;
 end loop;
 if tg_op='DELETE' then return old; end if;
 return new;
end;
$$;
create trigger paragraphs_immutable before insert or update or delete on public.paragraphs
 for each row execute function private.guard_published_child();
create trigger chunks_immutable before insert or update or delete on public.chunks
 for each row execute function private.guard_published_child();
create trigger chunk_spans_immutable before insert or update or delete on public.chunk_spans
 for each row execute function private.guard_published_child();
create trigger embeddings_immutable before insert or update or delete on public.embeddings
 for each row execute function private.guard_published_child();
revoke all on function private.guard_published_revision() from public,anon,authenticated;
revoke all on function private.guard_published_child() from public,anon,authenticated;
```

The child guard locks both old and new parent revision rows in UUID order and rejects INSERT, UPDATE or DELETE involving published evidence. Publication must acquire that same revision row lock before checking completeness. The runtime suite must also race insertion against publication; a sequential trigger test does not prove race behavior.
