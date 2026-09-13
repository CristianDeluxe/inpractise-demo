# Backend implementation and verification

Status: database, immutable import, embeddings, and retrieval foundations
implemented and applied to the existing remote demo project on 2026-09-13. The
seed blocker recorded by the original backend lane was resolved before baseline
adoption: four users and memberships already existed. Baseline adoption passed
87 tests, including real password-session and SQL checks. Briefing K later
passed `pnpm verify` with 89 Vitest tests plus seven corpus tests. See
[baseline verification](baseline.md) for the current commands and output. No
commit was made; this pass did not reseed or change migrations.

## Authority and scope decisions

Briefing F explicitly names `organisations`, `memberships`, `documents`,
`document_revisions`, and `passages`. That list overrides the execution plan's
contradictory section 6.1 list containing `usage_buckets` and `ingest_runs`.
This implementation has exactly the briefing's five public tables. Source-owned
version metadata lives in `document_revisions`; logical document access tier
lives in `documents`.

The briefing authorizes the existing remote project and says Docker is
unavailable. All database checks here used that remote project. No other project
was created or reset. The shell initially reported Node 26.8.2; the package now
pins a repository-local Node 24.20.0 binary, and package scripts run with it.
Supabase CLI 2.75.0 is pinned and its actual binary version was verified.
Dependencies have exact versions and a frozen lockfile. pnpm 12 generated
`pnpm-workspace.yaml`, which holds the required installation permissions for
Node, Supabase and esbuild; the baseline pass also registered `scripts/corpus`
as a workspace. The root `pnpm-lock.yaml` now resolves both packages. Its
settings no longer belong in `package.json` or `.npmrc` according to
[pnpm's configuration documentation](https://pnpm.io/settings).

The accepted input now contains ten logical sources: six short synthetic
interviews with 24 passages and four owner-approved public SEC filings with 938
passages. Briefing K corrected the public origin to `public`, retaining
`kind=sec_filing`; no database constraint or importer translation was changed.
The portable corpus manifest describes its embedding-free artifacts as
`lexical_only`. Database hybrid indexing uses separate validated embedding
artifacts and publishes the same canonical evidence identity.

## Database and retrieval contract

Seven additive migrations are applied under `supabase/migrations/`. Existing
migration files were not edited. The final migration binds persisted source
metadata and passages to canonical content and verifies both the revision hash
and normalized file hash.

- Every public table has RLS. Anonymous table reads and RPC execution are
  denied; authenticated writes are denied. Membership is unique per user.
  Current active membership, active organisation, publication, withdrawal,
  approved rights, and basic/premium access determine visibility.
- Private policy helpers have fixed empty search paths and derive identity from
  `auth.uid()`. A reviewer gets no premium or tenant bypass. Supabase's
  [RLS guidance](https://supabase.com/docs/guides/database/postgres/row-level-security)
  is the implementation reference.
- Composite foreign keys prevent attaching a passage or revision to another
  organisation's parent. Authorized historical published revisions remain
  readable. Search selects only current revisions.
- Published passages reject INSERT, UPDATE and DELETE, including privileged
  writes. Published source metadata rejects content changes; only
  current/withdrawn/rights-status lifecycle fields can change. Parent row locks
  coordinate passage writes with publication.
- `publish_document(org_id, document_id, revision_id, expected_passages, expected_hash)`
  is service-only. It checks actual passage/vector counts, canonical source
  metadata, passage identity/text/token counts, and hashes before changing
  current revision in one transaction. Failed publication leaves the prior
  current revision intact. A verified repeated import is a no-op.
- `search_candidates(query_text, query_embedding, company_filter, candidate_limit)`
  is `SECURITY INVOKER`. It returns separate `fts` and `vector` branch ranks,
  lexical score and cosine distance. Limits are 1–30. A null vector selects FTS
  only. PostgreSQL full-text search is called **FTS**, never BM25. Vector search
  uses exact cosine distance over authorized rows, without an ANN index,
  following
  [pgvector's documented operators](https://github.com/pgvector/pgvector).
- `retrieveCandidates` receives a caller-authenticated Supabase client, calls
  that RPC, and rereads evidence through the same client. It returns
  `{ candidates, diagnostics }`. RRF uses one-based `1 / (60 + rank)`
  contributions; no cosine cutoff is applied to fused scores. There are at most
  40 fused candidates; `candidateAt10` is recorded before selecting at most
  eight passages, 4,000 tokens, and two passages per document.
  `diagnostics.selectedIds` is separate from candidates. Unlabelled queries
  remain `unclassified`.
- `inspect_corpus()` is a reviewer-only, caller-scoped aggregate. Its counts
  include only evidence the reviewer can read. It returns no fabricated
  evaluation report.

There is no Edge Function HTTP handler, answer-generation implementation, quota
table, MCP server, UI, or deployed website in this lane. There is no service
credential in `supabase/functions/_shared/`; service credentials are restricted
to operator scripts. The final response authorization recheck belongs to the
later answer/HTTP lane.

## Import and embedding artifacts

`loadCorpus` accepts `corpus/normalised/*.json`, with `corpus/normalized/`
supported for the plan's spelling. It validates accepted manifest membership,
rights approval, source/file hashes, canonical revision identity, unique passage
IDs/ordinals, Unicode length, actual tokenizer counts, and the 500-token
text-plus-metadata limit. Missing artifacts fail with a named error before
upload. Public files awaiting review are not imported or embedded.

`db:embed` calls the
[OpenAI embeddings API](https://developers.openai.com/api/reference/resources/embeddings/methods/create)
directly for `text-embedding-3-small`, 1,536 dimensions. It deduplicates text,
batches at most 16 texts, runs at most two batches concurrently, uses a
ten-second request deadline and at most three attempts, and stops on
authentication or insufficient-quota failures. Successful sibling batches are
checkpointed even if another fails. Each artifact records model, dimensions,
text hash, vector hash, vector, and the batch's input-token count. The latter is
repeated batch metadata; do not sum it across individual artifacts as
independent usage.

Artifacts live in ignored `supabase/.temp/embeddings/`, keyed by SHA-256 of
model, dimensions and exact text. They contain no credentials. They are
validated on replay and compared to persisted database vectors using pgvector's
float32 representation. Import validates all staged metadata and passage fields
instead of overwriting discrepancies. Published rows retain their original
immutable rights-basis wording and coverage if the operator later refines those
ancillary descriptions; canonical identity fields must still match.

Two organisation copies are imported. Org B's current S6 is the distinct
organisation-isolation fixture. That fixture explicitly excludes provider
submission and has four lexical-only passages. The earlier Org B S6 revision is
preserved as historical evidence. Database totals, publication outcomes and
embedding usage from Briefing K are recorded below; counts represent
organisation copies and retained history, not additional research sources.

### Publication order

`pnpm db:import` publishes accepted sources in `hybrid` mode, except the
isolated Org B fixture. It requires every passage's validated embedding artifact
before insertion. It cannot publish a lexical revision and later mutate it into
a hybrid revision: published evidence is immutable. Run `pnpm db:embed` first
when new texts lack artifacts, then `pnpm db:import`; repeat import verifies
stored metadata, passages and float32 vectors and returns `unchanged`.

Briefing K's requested initial import exited 1 with
`Embedding missing; run pnpm db:embed`, after creating an unpublished Costco
2024 revision for Org A. That staging record is resumable. The original
`Invalid normalized document: cost-2024.json` vocabulary failure was resolved.
The subsequent embedding and import commands resume through the existing path.

`db:embed` now emits one `embedding_batch_checkpoint` record after persisting
each successful batch, with its actual response `inputTokens`. Its final summary
sums those batch values once and reports `unknownUsageBatches`; cache replay
uses no provider tokens. Never sum the repeated token field on every vector.

### Briefing K database snapshot

Database counts after publication, measured by a read-only SQL snapshot:

| Measure                                    | Actual database total |
| ------------------------------------------ | --------------------: |
| Organisation-scoped documents              |                    20 |
| Revisions, including retained history      |                    21 |
| Current revisions                          |                    20 |
| Passages, including retained history       |                 1,928 |
| Stored vectors, including retained history |                 1,924 |
| Unpublished revisions                      |                     0 |
| Retained test documents                    |                     0 |

These are two organisation copies of ten accepted source documents, not twenty
independent research sources. One prior Org B S6 revision retains four passages
and vectors. Its current isolation fixture contains four lexical-only passages;
all other stored passages have vectors. Source-level corpus counts remain ten
documents, ten accepted revisions and 962 passages. The portable manifest's zero
vector count describes its own artifact, not the populated database.

`pnpm db:embed` created 708 artifacts in 45 successful batches, reusing the 24
existing ones: 732 distinct texts across 962 accepted passages. Actual provider
input usage was 54,743 tokens with zero unknown-usage batches. A second
`pnpm db:embed` reused all 732 artifacts, created none and used zero tokens.
Both runs retained model `text-embedding-3-small`, 1,536 dimensions, batch size
16 and concurrency two. See
[corpus verification](corpus.md#briefing-k-ingestion-record) for hashes, usage
and retained command evidence.

`pnpm db:import` subsequently exited 0 for all twenty org/document pairs: eight
public revisions were published and twelve synthetic pairs were unchanged. No
source, historical revision or passage was deleted.

The repeated `pnpm db:import` also exited 0 with `unchanged` for all twenty
pairs. Document, revision and passage table content fingerprints and row/vector
counts match exactly before and after replay. Evidence is retained in
`work/briefing-k/import-replay.log`, `database-before-replay.json` and
`database-after-replay.json`.

`pnpm verify` after publication exited 0: 73 offline tests, 89 full-suite tests
and seven corpus checks, with all original coverage thresholds retained.
`pnpm db:verify` confirmed five RLS tables, caller-scoped retrieval,
service-only publication, two organisations, four memberships/users and the
counts above. The first gate failure and separately observed security-scan false
positives are documented in
[the full verification record](corpus.md#full-verification).

## Seed and password sessions

The original backend lane lacked four demo-password variables. That blocker was
resolved before baseline adoption; current verification signs in all four
existing demo users using the ignored environment configuration. Values are
never printed. No user or password was created or changed in the baseline pass.

`seed` uses Supabase's Admin API with confirmed email/password users, preserving
unrelated existing accounts. Existing users must carry the seed-owned
`app_metadata.demo_project` marker. It never changes an existing user's password
or promotes an unrelated account. Password sign-in uses the publishable key, not
the Admin client. These APIs were checked against the
[Supabase JavaScript Auth reference](https://supabase.com/docs/reference/javascript/auth-admin-createuser).

| Persona  | Email                                   | Organisation | Access          |
| -------- | --------------------------------------- | ------------ | --------------- |
| basic    | info+inpractise-basic@busirocket.com    | org-a        | member, basic   |
| premium  | info+inpractise-premium@busirocket.com  | org-a        | member, premium |
| reviewer | info+inpractise-reviewer@busirocket.com | org-a        | reviewer, basic |
| other    | info+inpractise-other@busirocket.com    | org-b        | member, basic   |

Run `pnpm verify` to check the existing sessions and database. `pnpm seed` is an
operator mutation command, not a verification prerequisite to rerun on every
maintenance pass.

## Original backend-lane command record (historical)

This table preserves the first implementation run, before the password blocker
was resolved. Failures and counts below are historical, not the current state.
The current command matrix and passing results are in
[baseline.md](baseline.md). `architecture:check` and `format:backend` were
replaced by `pnpm lint` (strict code-policy) and `pnpm format` (shared
Prettier).

Run commands from `/Users/cristiandeluxe/p/inpractise-demo`. Scripts load only
this repository's `.env.remote` and verify its exact project URL/ref pairing.
Direct SQL tests require the link metadata written by `db:prepare`.

| Command                                                              | Responsibility                                                                      | Executed result                                                                         |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `PATH="$PWD/node_modules/.bin:$PATH" pnpm install --frozen-lockfile` | Reproduce exact dependency installation using Node 24                               | Exit 0; lockfile up to date                                                             |
| `node_modules/node/bin/node --version`                               | Verify the actual required runtime                                                  | Exit 0; `v24.20.0`                                                                      |
| `pnpm exec supabase --version`                                       | Verify the pinned migration CLI                                                     | Binary verified as `2.75.0`                                                             |
| `pnpm preflight`                                                     | Verify dedicated remote target and report missing variable names                    | Exit 0; five tables and four missing seed-password variables                            |
| `pnpm db:prepare`                                                    | Inspect expected schema, link target, dry-run and apply new migrations              | Exit 0; migrations 00001–00007 applied                                                  |
| `pnpm db:prepare -- --dry-run`                                       | Check migration parity without applying changes                                     | Exit 0; `Remote database is up to date.`                                                |
| `pnpm db:embed`                                                      | Create/resume bounded embedding artifacts                                           | Exit 0; initially 24 created, then 24 reused / zero created                             |
| `pnpm db:import`                                                     | Verify artifacts, stage/resume revisions, atomically publish                        | Exit 0; final repeat returned `unchanged` for all 12 org/document pairs                 |
| `pnpm seed`                                                          | Create four owned password users and memberships                                    | Exit 1; four missing password variables                                                 |
| `pnpm typecheck`                                                     | Strict TypeScript checks for owned code                                             | Exit 0                                                                                  |
| `pnpm architecture:check`                                            | Check atomic source units and reject barrel exports                                 | Exit 0; 51 backend source files                                                         |
| `pnpm format:backend`                                                | Format only backend and owned tests using the TypeScript printer                    | Exit 0                                                                                  |
| `pnpm test:db`                                                       | Run remote SQL isolation, revocation, vector, publication and revision tests        | Exit 0; nine tests passed                                                               |
| `pnpm test tests/unit`                                               | Rank, diagnostic gate and persisted-vector tests                                    | Exit 0; five unit tests passed                                                          |
| `pnpm test:rls`                                                      | Real password-session PostgREST checks plus anonymous denial                        | Exit 1; one passed, three failed on missing seed passwords                              |
| `pnpm test`                                                          | All owned tests; corpus lane's Node test files excluded by test-directory selection | Exit 1; 15 passed, five failed on missing seed passwords                                |
| `pnpm eval:retrieval -- --mode hybrid`                               | Authenticated G01 control using a recorded gold-passage embedding                   | Exit 1; missing `DEMO_BASIC_PASSWORD`                                                   |
| `pnpm eval:gate -- --input supabase/.temp/gold-positive.json`        | Check positive evidence from real SQL retrieval                                     | Exit 0; `PASS: retrieval gate`                                                          |
| `pnpm eval:gate -- --input supabase/.temp/gold-drop.json`            | Check the deliberately removed gold source                                          | Expected exit 1; `Retrieval gate failed: retrieval_miss`                                |
| `pnpm db:verify`                                                     | Check live RLS/grants/RPC privileges and count stored rows                          | Exit 0; schema checks passed                                                            |
| `pnpm verify`                                                        | Run typecheck, architecture, all tests, then database audit                         | Exit 1 at tests; database audit was run separately                                      |
| `git diff --check`                                                   | Tracked-diff whitespace verification                                                | Exit 0; owned untracked source files were also checked directly for trailing whitespace |

`eval:retrieval` also accepts `--mode lexical`, `--drop-gold`, and
`--out supabase/.temp/<name>.json`. Hybrid mode is explicitly a
recorded-gold-vector mechanics control; it is not a measurement of
natural-question embedding quality. No live generation or broad retrieval
benchmark is claimed.

The successful SQL tests create identities and test revisions inside
transactions and roll them back. They exercise real PostgreSQL roles/RLS using
transaction-local claims. That proves the database predicate behavior, but does
not replace the pending real Supabase password/JWT/PostgREST tests. Anonymous
PostgREST denial did pass. A post-test query confirmed zero persistent Auth
users, zero memberships and zero `test-*` documents.

Original backend-lane suite output (superseded):

```text
Test Files  2 failed | 4 passed (6)
     Tests  5 failed | 15 passed (20)
```

Original backend-lane database audit (superseded):

```text
PASS: five RLS tables, default-deny anonymous grants, no member writes, caller-scoped retrieval, service-only publication
organisations=2, memberships=0, auth_users=0, documents=12, revisions=13, current_revisions=12, passages=52, vectors=48, test_documents=0
```

Actual deterministic embedding replay:

```json
{ "embeddingTexts": 24, "reused": 24, "created": 0, "dimensions": 1536 }
```

## Remaining work and limits

- Remote Auth inspection returned `disable_signup=false`. The local Supabase
  config disables signup, but this does not apply remote Auth settings.
  Configure remote signup before publishing a public login flow. Unseeded
  accounts have no membership and therefore no evidence access.
- Publication and immutable-child tests pass, but a concurrent
  fresh-publication/late-insert race has not been exercised. Parent locking is
  implemented; no race-test success is claimed.
- The known-gold negative control genuinely fails the CLI gate. Oracle
  generation replay, semantic answer support, HTTP/MCP parity, provider-input
  leakage tests, and final answer authorization recheck belong to the subsequent
  answer/transport work and are not implemented here.
- This lane has no durable `ingest_runs` table under the explicitly assigned
  five-table list, no quota counters, and no reviewer evaluation-report store.
  Failed uploads remain unpublished and resumable; errors exit nonzero. These
  omissions must be reconciled before implementing the broader plan's
  inspector/quota actions.

Two review findings were corrected: canonical metadata binding and
persisted-vector replay checking. A second read-only review reported no
remaining blocking findings in the revised scope. It did not independently run
database tests or inspect credentials.
