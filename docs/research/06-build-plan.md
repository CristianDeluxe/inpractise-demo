# In Practise demo implementation plan

> For implementation: execute this plan task by task with the `executing-plans` workflow. This delivery is specification only; no application, credentials, hosting or external submission is created here.

**Goal:** demonstrate an analyst moving from a question to inspectable evidence, with the same access boundaries in a member workspace and an MCP client, plus an admin view that explains retrieval failures.

**Architecture:** Lovable generates the landing, member screens and admin screens. A handwritten Node service owns the shared authorization/retrieval contract and MCP adapter; Supabase provides identity, PostgreSQL/pgvector and private storage; one leased-job worker handles ingestion/evals/alerts. Public synthetic landing fixtures are separate from authenticated corpus storage.

**Stack:** React, Vite, Tailwind, shadcn/Radix, TypeScript, Supabase Auth/Postgres/Storage, pgvector, Node, MCP TypeScript SDK v2. Choose and lock compatible exact versions from the Lovable export and current official docs during task 1. No migration of the portfolio or CaseGPT repositories.

**Specifications:** [landing](03-lovable-landing-brief.md), [members/admin/schema/API](04-members-and-admin-spec.md), [askbot/MCP/corpus/evals](05-askbot-and-mcp-spec.md). Source evidence: [market research](01-market-and-landing-research.md), [reusable assets](02-reusable-assets.md), [role](../offer.md), [dossier](../research-dossier.md) and [interview brief](../interview-brief.md).

## 1. Constraints and scope tiers

All implementation is a future, separately authorized build. This task writes specifications and verification support only to this code-project directory. `/Users/cristiandeluxe/p` remains read-only elsewhere; no TODO, migration, credential, Git index or source repository file is changed. The existing dirty TODO is unrelated work, not permission to amend it.

Always show “Independent demo. Public and synthetic sources; no private In Practise research.” Synthetic companies/speakers are labeled in every surface. The demo does not connect to In Practise's APIs or private corpus. Read real source paragraphs, keep immutable citation IDs, enforce access before retrieval, and never translate a provider failure into “no evidence.” No real billing, lead collection, external email or impersonation. One exported unit and one responsibility per implementation file; types/helpers/hooks are separate explicit imports. Private planning evidence and local paths do not enter the public app or README.

Hours below are **planning estimates**, including testing and review but excluding this research/specification effort, access procurement and delays. They are cumulative elapsed engineering effort for one engineer familiar with the stack, not parallel calendar-time promises. Reuse means known patterns; copying client code is not assumed. A four-hour prototype could show screens, but would not substantiate this project's authorization/retrieval claims.

| Tier                                  | Included working behavior                                                                                                                                                                                                                                                                                                                                 | Explicitly reduced or stubbed                                                                                                                                                                                                                                   | Estimated effort                                             |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Minimum demo that is still impressive | All landing sections, real member sign-in/org selection, S1–S6 synthetic corpus in two test orgs, library and paragraph reader, one live question/refusal flow, basic bookmarks, admin document/chunk inspector, deterministic evidence/permission tests and a local stdio MCP session using the same service                                             | No public-filing parser demo; ingest pre-normalized fixtures only. Collections/alerts/seats/billing/review/eval dashboards show honest specification/fixture mode where not wired. Local MCP principal is a seeded test identity, not OAuth. Reranker disabled. | 36–48 hours, roughly 5–7 focused days                        |
| Realistic target                      | Minimum plus all members/admin screens in 04, durable ingestion for transcript/HTML/text PDF, four pinned SEC filings, immutable revisions, transactional seats, private/shared collections, in-app follows/alerts, real feedback triage/eval runs, hybrid retrieval with optional measured rerank, remote OAuth MCP, deployment and two-minute rehearsal | Billing remains visibly simulated. No email alerts, production SSO/SCIM, OCR, payments, external customer integrations or unsupported numerical agent                                                                                                           | 92–128 hours, roughly 12–17 focused days                     |
| Stretch                               | Target plus one real SSO test IdP, OCR with review, deterministic numeric calculator with unit/period checks, independent holdout questions, larger-corpus exact-vs-HNSW comparison or approved Stripe test mode                                                                                                                                          | Select at most two stretch tracks; no production financial-data licensing or full market terminal                                                                                                                                                               | 132–188 hours total; +40–60 hours depending on chosen tracks |

Recommendation: reach the minimum first, show it, then invest in the target only within the time commitment agreed with Carlos. His assessment budget/deadline is **UNVERIFIED in these inputs**. Do not spend two weeks silently building a speculative enterprise platform. Target breadth is fully specified so cuts are deliberate and visible. If remote OAuth cannot be completed within its 10–14-hour allocation, ship the labeled local MCP minimum and report the missing remote integration; never disguise a bearer-key shortcut as OAuth.

## 2. Ownership and reuse split

| Work                                                      | Builder                                    | Reuse / acceptance                                                                                                                              |
| --------------------------------------------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Landing, member and admin visual surfaces                 | Lovable                                    | Exact copy/states from 03/04; source-first editorial design from 01. Real empty/error states, no manufactured success.                          |
| View hooks and HTTP adapter wiring                        | Lovable first pass, handwritten review     | CaseGPT R1 feature/data boundaries. Each request function imports its contract; no service credential or ad hoc DB writes in components.        |
| SQL, RLS, transactional guards, storage                   | Handwritten                                | New schema in 04 corrects CaseGPT singleton/access issues. Fresh migrations only. Direct unauthorized access must fail.                         |
| Parsing, chunking, embedding worker                       | Handwritten                                | CaseGPT pipeline shape; new source-aware parsers, stable spans, leases and atomic publication from Shoutouts lessons.                           |
| Search, strict answer validation, cancellation and quotas | Handwritten                                | Corrected lexical/vector fusion, NDJSON, provider boundary and source-card contract; no unchecked answer parser or unscoped cache.              |
| MCP tools/transport/OAuth                                 | Handwritten                                | ZeroHedge/BankBridge architectural lessons in 02; current official SDK, no copied client server or private tokens.                              |
| Admin conversation review/eval dashboard                  | Lovable UI + handwritten guarded API       | Feedback/eval scaffold pattern; this screen is new, not a previously shipped CaseGPT feature.                                                   |
| Billing                                                   | Handwritten simulator + Lovable labeled UI | No Stripe client or payment webhook in target. Simulated expiration/renewal must actually change demo access and audit state.                   |
| Alerts                                                    | Durable worker + Lovable list              | In-app events only; deterministic per-follow/revision uniqueness. Email toggle absent.                                                          |
| Code reuse                                                | Fresh implementation by default            | Review actual license and ownership before copying any existing source. Private client patterns can inform design without redistributing files. |

Lovable's [Supabase integration documentation](https://docs.lovable.dev/integrations/supabase), checked 2026-09-13, describes generating/wiring backend behavior. That capability does not remove the need to review RLS and privileged code. Here the responsibility boundary is explicit: generator-produced policies/edge functions are drafts until the access tests pass. Use a single Node corpus service; any edge adapter delegates to that service and adds no second entitlement implementation.

## 3. Planned project layout and verification interface

Create a separate demo repository when implementation is authorized. These are **future paths**, not existing files in this specification delivery:

```text
apps/web/src/features/landing/LandingPage.tsx
apps/web/src/features/library/LibraryPage.tsx
apps/web/src/features/reader/InterviewReader.tsx
apps/web/src/features/ask/AskPage.tsx
apps/web/src/features/admin/DocumentInspector.tsx
apps/web/src/features/admin/EvalRunPage.tsx
apps/web/src/features/account/OrganizationChooser.tsx
apps/web/src/api/fetchResearch.ts
apps/api/src/auth/resolvePrincipal.ts
apps/api/src/auth/withMemberTransaction.ts
apps/api/src/research/searchResearch.ts
apps/api/src/research/fetchTranscriptSpan.ts
apps/api/src/answers/validateAnswer.ts
apps/api/src/answers/streamAnswer.ts
apps/api/src/mcp/createResearchServer.ts
apps/api/src/mcp/searchResearchTool.ts
apps/worker/src/jobs/claimJob.ts
apps/worker/src/ingestion/parseTranscript.ts
apps/worker/src/ingestion/parseHtml.ts
apps/worker/src/ingestion/parsePdf.ts
apps/worker/src/ingestion/chunkSpeakerTurns.ts
apps/worker/src/ingestion/publishRevision.ts
packages/contracts/src/Answer.ts
packages/contracts/src/Citation.ts
packages/contracts/src/SearchInput.ts
supabase/migrations/202609130001_demo_schema.sql
supabase/tests/rls.test.sql
fixtures/corpus/manifest.json
fixtures/gold/ip-demo-gold-v1.json
scripts/verifyCorpusManifest.ts
scripts/runGoldEval.ts
scripts/checkEvalRegression.ts
scripts/checkLandingBudget.ts
scripts/smokeDeployment.ts
```

The route catalog in 04 drives additional single-purpose page, service, handler and type files. The list above names core boundaries, not permission to combine every admin screen in one component. Extract every exported type in the contract catalog into its own file and generate imports. No generic `utils.ts` or barrel that hides dependencies.

Define the following package scripts in task 1. These command strings are **planned acceptance interfaces, NOT RUN in this specification task**; their source files are created in the corresponding steps. Do not report them as passing until implementation exists. `pnpm test` is deterministic by default and never spends provider quota. `pnpm eval:live` is separate and requires the explicit demo budget/configuration.

| Command                        | Definition/required behavior                                                                                                      |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm typecheck`               | `tsc --build --pretty false`; strict project references and noEmit checks for source packages                                     |
| `pnpm test -- <test-path>`     | `vitest run <test-path>`; no live provider calls; isolated fixture database where required                                        |
| `pnpm test:rls`                | `supabase test db`; pgTAP tests against the isolated local demo, never a linked production database                               |
| `pnpm corpus:verify`           | `tsx scripts/verifyCorpusManifest.ts`; verify bytes/hashes/rights/paragraph coverage and no forbidden public fixture              |
| `pnpm eval:fixture`            | `tsx scripts/runGoldEval.ts --provider fixture`; real retrieval with recorded/deterministic generation outputs, failures retained |
| `pnpm eval:live`               | `tsx scripts/runGoldEval.ts --provider live --repetitions 3`; hard budget and explicit environment required                       |
| `pnpm eval:gate`               | `tsx scripts/checkEvalRegression.ts`; compare candidate artifact against separate approved baseline; exit nonzero on hard fail    |
| `pnpm test:e2e -- <test-path>` | `playwright test <test-path>`; local seeded users, no real invitations or payment providers                                       |
| `pnpm build`                   | workspace build for web/API/worker; production web assets inspected independently                                                 |
| `pnpm perf:landing`            | `tsx scripts/checkLandingBudget.ts`; three cold-load runs and gzip/request budget, conditions recorded                            |
| `pnpm smoke:deployment`        | `tsx scripts/smokeDeployment.ts`; selected preview origin, authenticated span/search, read-only readiness and deployed build ID   |

## 4. Sequenced build checkpoints

### Task 1 — Export a visible landing and establish contracts (8–10 hours)

- [ ] Generate UI with 03's main prompt; iterate S01–S10 prompts. Export a new React/Vite project and lock compatible exact package/runtime versions. Use Node 24 as the chosen runtime floor, verify supported versions against actual dependency engines. Record resolved MCP v2 packages and 1,536-dimensional provider choice. Do not force CaseGPT's manifest ranges onto the export.
- [ ] Create `packages/contracts` from 04 and typed API adapters using local fixtures. Add `/demo/status`, `/demo/method` and `/demo/mcp`. All unimplemented capabilities read `not_implemented`; no paid-network calls on landing.
- [ ] Add `tests/contracts/schema.test.ts` to reject unknown fields, bad IDs and missing citation metadata; add `e2e/landing.spec.ts` to open the exact synthetic source context and check disclosure at 390×844 and desktop.
- [ ] Verify: `pnpm typecheck`, `pnpm test -- tests/contracts/schema.test.ts`, `pnpm test:e2e -- e2e/landing.spec.ts`, `pnpm build`.

Checkpoint: polished static landing with no fake working product. Input: 03/04; output: compileable contract package and semantic landing. Acceptance: exact quotes, working anchors, no form collecting leads, no service key in built assets, and source panel works with keyboard. This is UI progress, not retrieval progress.

### Task 2 — Establish identity and prove tenant boundaries (10–14 hours)

- [ ] Apply the 04 schema as new migrations in a fresh local Supabase instance. Add atomic invitation, publication and quota handlers; private raw bucket; immutable-content insertion/update/delete guards. Seed two test orgs, all three member roles, separate staff roles, one expired subscriber and the two restricted canaries.
- [ ] Implement `resolvePrincipal` and `withMemberTransaction`; verify pooling cannot carry an old user's claims into the next request. Build the org chooser and account access summary. Test each route's actor matrix, not only navigation guards.
- [ ] Add `supabase/tests/rls.test.sql`: anonymous cannot read any corpus table; member cannot update role/staff grant; Org A cannot insert/link/read Org B rows; premium revoke blocks paragraphs, history/citations and storage; profile display-name edit succeeds but ID change fails. Add `tests/auth/seats.test.ts`: two concurrent invites for one free seat produce exactly one success; expiry frees reservation; accepting does not double-count; last admin remains protected.
- [ ] Verify: `pnpm test:rls`, `pnpm test -- tests/auth/seats.test.ts`, `pnpm test -- tests/auth/poolIsolation.test.ts`, `pnpm test:e2e -- e2e/orgSelection.spec.ts`.

Checkpoint: new schemas are safe enough to hold the synthetic test corpus. These tests are mandatory even for the minimum. If they fail, do not expose the API remotely.

### Task 3 — Ingest immutable evidence and open paragraphs (10–14 hours target; 3–4 hours minimum fixture-only)

- [ ] Materialize S1–S6 exact seed bytes and deterministic UUIDs from 05; validate manifest and label public vs restricted fixtures. Minimum imports normalized transcripts; target adds SEC discovery, HTML and text-PDF parsers.
- [ ] Implement leased job claim/heartbeat/retry, parser output map, speaker-aware token bounds, embedding adapter and atomic publication. Do not require OCR to pass text-PDF handling; image-only input must fail with `OCR_REQUIRED`.
- [ ] Add `tests/ingestion/revisions.test.ts`: kill worker after partial indexing, restart and finish once; no publication until complete; failed new revision preserves active old content; insertion/update/delete cannot alter a published revision. Add Unicode-span, heading-free and table-unit cases.
- [ ] Wire library, reader, source deep links and bookmarks. Open old S5 v1 after v2 publish, check visible revision badge and exact quote.
- [ ] Verify: `pnpm corpus:verify`, `pnpm test -- tests/ingestion/revisions.test.ts`, `pnpm test -- tests/ingestion/parsers.test.ts`, `pnpm test:e2e -- e2e/reader.spec.ts`.

Checkpoint: the same paragraph survives parsing, chunking, a browser deep link and reindexing. Source rights/accessions/hashes are actual artifacts, not typed estimates. Minimum can proceed without the SEC branch and must say so.

### Task 4 — Prove retrieval and refusal separately (12–16 hours target; 7–9 hours minimum)

- [ ] Implement lexical baseline and exact vector candidate retrieval with identical permission/time filters. Add RRF formula `sum(1/(60+rank))` without the incompatible threshold. Target benchmarks optional rerank; minimum skips it.
- [ ] Implement strict provider output validation and server-generated citation URLs/Markdown. Add stage-only streaming first, then optional provisional text; propagate cancellation and reauthorize final answer. Meter quota/budget before any provider call, record all phase usage.
- [ ] Translate G01–G18 to checked-in gold with paragraph labels. Add forced candidate-drop and oracle-context seams only in test runtime, unavailable in production. Preserve raw candidate/selection IDs in protected diagnostics.
- [ ] Verify: `pnpm test -- tests/retrieval/ranking.test.ts`, `pnpm test -- tests/answers/validation.test.ts`, `pnpm test -- tests/answers/cancellation.test.ts`, `pnpm eval:fixture`, then budgeted `pnpm eval:live` and `pnpm eval:gate`.

Checkpoint: show an answered question, a correct no-evidence gold case and a deliberately detected retrieval miss. Live semantic support remains subject to actual results; deterministic fixtures are not a live accuracy score. If generation is unavailable, show source retrieval only and label the limitation.

### Task 5 — Complete member organization workflows (10–14 hours target; minimum stubs)

- [ ] Build personal/org collections with explicit selection and owner/analyst rules. Build in-app follows/alerts with publication-triggered jobs and unique follow/revision keys. Implement thread archive, history redaction, feedback and account seats.
- [ ] Wire simulated expiry/renewal to actual capability projection with prominent simulation label. Do not add a checkout SDK. Build invitations without sending real mail; exercise acceptance with local mail/test harness.
- [ ] Verify: `pnpm test -- tests/members/collections.test.ts`, `pnpm test -- tests/members/alerts.test.ts`, `pnpm test -- tests/members/accessExpiry.test.ts`, `pnpm test:e2e -- e2e/memberFlows.spec.ts`.

Checkpoint: changes persist after reload, unavailable source titles do not leak through saved collections/alerts, and billing simulation changes access without implying payment. Minimum status page identifies these unwired screens as fixtures/specification.

### Task 6 — Make the admin explain real state (10–14 hours target; 2–3 hours minimum inspector)

- [ ] Wire job/revision/chunk panels first; retain exact unknown progress rather than fabricated percentages. Target adds organizations/seats, entitlement overrides, reviewed conversations, feedback triage, eval jobs/per-case comparisons, flags and audit.
- [ ] Implement server aggregates and paginated reads; review content is returned only after audit insert. Missing or failed query is an error, never “0.” Backend flags gate API and MCP; UI uses the same effective state.
- [ ] Verify: `pnpm test -- tests/admin/permissions.test.ts`, `pnpm test -- tests/admin/auditFailure.test.ts`, `pnpm test -- tests/admin/evalHistory.test.ts`, `pnpm test:e2e -- e2e/admin.spec.ts`.

Checkpoint: reviewer can explain G15 using gold-present → candidate-missing → oracle-answer evidence. Platform editor cannot inspect private chats, organization admin cannot grant premium or publish content, and eval failures remain visible.

### Task 7 — Connect a real MCP client (10–14 hours target; 3–4 hours minimum local)

- [ ] Register the five 05 schemas using matching SDK v2. Expand and validate shared schema references; tool registration must reject malformed output. Test initialize, tools/list and tools/call with the official client library.
- [ ] Minimum: stdio with explicit seeded fixture principal; no listener or shared administrator token. Target: choose verified authorization-server capability, implement metadata/discovery/PKCE, resource audience, subject linkage, explicit org consent and revocation; only then expose HTTPS `/mcp`.
- [ ] Verify: `pnpm test -- tests/mcp/protocol.test.ts`, `pnpm test -- tests/mcp/parity.test.ts`, and target `pnpm test -- tests/mcp/oauth.test.ts`. Include wrong issuer/audience, expired token, stale/tampered/foreign cursor, large result, concurrent quota, source canary and seat revocation.
- [ ] Run the 05 worked sequence in the actual selected Claude/agent client, record client/protocol/build versions and nonsecret result IDs. A passing SDK client test alone does not prove the chosen desktop client is configured.

Checkpoint: same source revision/paragraph via web and MCP, with the target's real authentication or the minimum's openly described local fixture auth. No demo tool can write a document or subscription.

### Task 8 — Deploy, rehearse and report limits (12–18 hours target; 3–4 hours minimum local polish)

- [ ] Build and inspect deployed artifacts, configure preview noindex and exact origins, run deterministic gates then production-build E2E. Validate environment names without printing values. Warm a synthetic canary; capture actual cost/latency with conditions.
- [ ] Check keyboard/VoiceOver, 200%/400% zoom, mobile source panels and network/error/cancel states. Run three comparable cold landing performance samples and fix actual budget overages; report field INP as unavailable if there is insufficient traffic.
- [ ] Verify: `pnpm build`, `pnpm test:e2e -- e2e/demoJourney.spec.ts`, `pnpm perf:landing`, `pnpm smoke:deployment`. Record deployed commit SHA/build ID and active service state before remote smoke.
- [ ] Rehearse the script below using that build. Update status manifest, README and limitations to match the tier actually delivered. Prepare a reviewable link/message for Carlos; sending is a separate explicitly authorized action.

Checkpoint: proof of deployed behavior and honest scope. Minimum may remain local with a reproducible recording; do not label that deployed. Target tasks total 82–114 hours, plus an explicit 10–14-hour integration/rework reserve, giving 92–128 hours. Minimum allocations are a compressed subset and assume fixture-only workflows; unplanned authentication/deployment work must not be hidden in that range.

## 5. Test assertion examples for the future implementation

These are explicit test requirements using the named future test harness API. They are not passing tests in this specification delivery. The harness must expose isolated org/user seeding, authorized HTTP calls, provider-input capture and test-only retrieval seams; never register those seams in the production router.

```ts
// tests/auth/seats.test.ts, after creating the isolated fixture harness
const attempts = await Promise.all([
  harness.inviteAs('orgAAdmin', 'candidate-one@example.invalid'),
  harness.inviteAs('orgAAdmin', 'candidate-two@example.invalid'),
])
expect(attempts.map((x) => x.status).sort()).toEqual([201, 409])
expect(await harness.reservedSeats('orgA')).toBe(1)
```

```ts
// tests/retrieval/refusalDiagnosis.test.ts
const run = await harness.evalCase('G15', { dropSources: ['S1'] })
expect(run.diagnostic).toBe('retrieval_miss')
expect(run.oracle.status).toBe('answered')
expect(run.gatePassed).toBe(false)
```

```ts
// tests/mcp/parity.test.ts
const web = await harness.webSearch('orgABasic', 'Northstar migration')
const mcp = await harness.mcpSearch('orgABasic', 'Northstar migration')
expect(mcp.spanKeys).toEqual(web.spanKeys)
expect(JSON.stringify(await harness.allCapturedOutputs())).not.toContain(
  'ORCHID-74',
)
expect(JSON.stringify(await harness.allProviderInputs())).not.toContain(
  'CEDAR-29',
)
```

The `.invalid` addresses are non-deliverable test identifiers. Scope the canary assertions to basic Org A requests, not an intentionally authorized premium control run. An eval must assert its negative control actually fails under injected bad behavior, so a disconnected test seam cannot produce a misleading green result.

## 6. Deployment, configuration and costs

Recommended target topology: a single DigitalOcean App Platform static web component, a small Node API/MCP service, a small worker, and a Supabase project in a nearby European region. HTTPS and route rewrite serve SPA deep links; root landing is prerendered. Use separate API and worker processes so a parser stall cannot block interactive requests. No GKE, Redis cluster, ClickHouse or second general-purpose database at demo scale.

Current first-party pricing checked 2026-09-13: [DigitalOcean App Platform](https://www.digitalocean.com/pricing/app-platform) lists static hosting within its free allowance and a $5/month 512 MiB service tier; [Supabase](https://supabase.com/pricing) lists Pro from $25/month with one included project. Planning allowance: $10–20 for two small API/worker components, $25 for Supabase Pro, $0–5 for static/transfer allowance, and a chosen $10 model-spend cap: **approximately $45–60/month**, before tax, domain, overages, SSO provider and Lovable credits. This is a budget, not a quote or an observed invoice. Worker memory sizing and whether the selected SKU supports the exact component remain UNVERIFIED until deployment configuration; parsing larger PDFs may require more than 512 MiB. Minimum local demo has no required hosted infrastructure cost; provider usage still needs a budget.

Exact embedding/generation provider prices and Lovable plan costs are **UNVERIFIED** in this specification; task 1 must capture current official prices and set `MODEL_PRICE_VERSION` before enabling live inference. Do not inherit CaseGPT's old price table. Cost formula: embedding input tokens × embedding rate + rerank usage × selected rate + generation input/output tokens × respective rates, plus retries. If an optional phase is disabled, record it as disabled, not a billed zero-cost success.

| Variable                                                      | Placement and meaning                                                                                       |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `VITE_API_BASE_URL`                                           | Public web configuration, actual preview API origin                                                         |
| `VITE_SUPABASE_URL`                                           | Public project URL                                                                                          |
| `VITE_SUPABASE_PUBLISHABLE_KEY`                               | Publishable browser key only; not a service-role key                                                        |
| `APP_ORIGIN`                                                  | Server trusted web origin; absolute citation/link generation                                                |
| `MCP_RESOURCE_URL`                                            | Actual audience/resource URL ending `/mcp`                                                                  |
| `ALLOWED_ORIGINS`                                             | Explicit preview origins, no wildcard credentialed access                                                   |
| `DATABASE_URL`                                                | Server secret, transaction-capable pool and restricted DB login                                             |
| `SUPABASE_SERVICE_ROLE_KEY`                                   | Worker/server secret for approved storage/admin operations only                                             |
| `SUPABASE_URL`                                                | Server project URL                                                                                          |
| `GENERATION_API_KEY`, `EMBEDDING_API_KEY`                     | Provider secrets, chosen provider adapter only                                                              |
| `GENERATION_MODEL`, `EMBEDDING_MODEL`, `EMBEDDING_DIMENSIONS` | Pinned provider identifiers, dimensions exactly 1536 in this schema                                         |
| `RERANK_API_KEY`, `RERANK_MODEL`                              | Optional server secret/model; unset means rerank disabled                                                   |
| `MODEL_PRICE_VERSION`                                         | Verified versioned price table ID; unknown blocks live generation                                           |
| `DEMO_MONTHLY_MODEL_BUDGET_USD`                               | Default 10; enforced by atomic reservation and provider limits                                              |
| `OAUTH_ISSUER`, `OAUTH_JWKS_URL`                              | Verified authorization-server metadata for remote MCP; issuer/audience allowlisted                          |
| `CURSOR_SIGNING_SECRET`                                       | Server secret used to bind bounded pagination cursors                                                       |
| `SEC_USER_AGENT`                                              | Declared project identity/contact for fair SEC access; use developer identity only in private server config |
| `CORPUS_BUCKET`                                               | Private bucket name `corpus`                                                                                |
| `DEMO_MODE`                                                   | Required `true`; gates simulated billing and corpus notices                                                 |
| `LOG_CONTENT`                                                 | Required `false`; redact source/question bodies from external telemetry                                     |

Never commit actual environment values. `.env.example` contains names and safe public defaults only. Preview auth redirects must match deployed origin, and HTTP CORS behavior must work for both preflight and actual stream response. A health endpoint is not sufficient: smoke tests fetch a known authorized paragraph and execute a bounded canary. Before rollback, preserve corpus revisions and active-revision pointer history; roll back application image and pointer only when compatible, never delete old source evidence to “clean up.”

## 7. Risks, outstanding evidence and honesty rules

| Risk / observation                                                | Smallest next step and disclosure                                                                                                                                                                |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Private IP corpus and internal entitlements unavailable           | Use exact labeled public/synthetic stand-in. Say the demo does not validate real IP content quality or account parity.                                                                           |
| Breadth exceeds a short take-home                                 | Reach minimum first; show actual hours and unfinished capabilities. Deadline/expected effort still UNVERIFIED.                                                                                   |
| “Built from scratch” conflicts with generated UI or copied source | Say this is a new project, UI generated with Lovable and implementation reviewed/tested by Cristian; architecture informed by prior work. No claim every component or pattern was invented here. |
| Tiny synthetic gold can overfit                                   | Show corpus/question counts and gold labels; no general accuracy claim. Add an independently reviewed holdout before making a quality statement.                                                 |
| Citation exists but claim unsupported                             | Test span integrity and semantic support separately; final prose is rendered from validated claims. MCP cannot guarantee an external agent's synthesis.                                          |
| Local auth mistaken for remote OAuth                              | Prominent transport/auth label and actual client test. Target remote OAuth is blocked until issuer/resource/org linkage is demonstrated.                                                         |
| Public material mistaken for unrestricted third-party transcripts | Use SEC filing reuse policy; exclude transcript aggregators and unapproved artwork. Pin provenance/rights for every source.                                                                      |
| Billing/alerts/SSO mistaken for connected services                | Billing simulation, in-app alerts and absent SSO clearly marked. No fake paid invoice, delivered email or connected IdP.                                                                         |
| Unknown provider cost/latency                                     | Resolve official prices and run budgeted canaries; show unknowns instead of zeros. Publish no performance number from this spec as a result.                                                     |
| Copied CaseGPT defects or private source                          | Use 02's pattern/gotcha matrix, fresh code by default, permission/citation regression gates. No client secrets or archive material in demo.                                                      |
| Logs and saved answers retain withdrawn evidence                  | Reauthorize answer history and citations, block external content logging, implement stated retention. Disclose no ability to erase text already legitimately read by an external agent.          |

These findings stay in this authorized deliverable. The instruction forbids updating repository TODO or Brain files during this task. No external message or publication is authorized by the specification request.

## 8. One-page README outline

Use this structure in the new demo repository, roughly one page plus links to detailed specs. Replace bracketed runtime evidence only after measurement; do not publish placeholders as completed facts.

```text
# Research evidence demo

An independent code project prepared for In Practise. It demonstrates a question-to-source workflow over public SEC material and original synthetic interviews. It has no access to In Practise's private corpus or production systems.

## What works
List only capabilities whose acceptance checks passed in the selected build. Name the deployed build ID or state that the demo is local. Link the implementation-status manifest. Separate curated landing examples from live generated answers.

## Run it
State the exact pinned Node/pnpm versions, local Supabase prerequisite and environment-variable names. Provide verified install, database setup, seed, development and test commands. Default to local fixtures; live inference requires explicit provider configuration and budget. Never include credentials.

## Try the evidence workflow
Open the Northstar switching question, inspect S1/P2 and S2/P2, then ask for next year's retention. Open the admin eval case that deliberately drops a known source. For MCP, show the actual tested client/transport and its authorization setup; keep tokens out of screenshots.

## Architecture
React/Vite UI generated in Lovable; reviewed Node API/worker; Supabase Auth/Postgres/private storage; shared permission-aware retrieval and paragraph citations for web and MCP. Link the data/API contracts and exact package lock.

## Evidence and evaluation
Link corpus manifest, source-rights policy, dataset version and actual eval report. Distinguish recall, support, refusal, latency and cost. Describe synthetic limitations and what the test set cannot establish. Show failed cases as well as passing ones.

## Scope and authorship
State actual time spent. New project with known architectural patterns from prior work; identify Lovable's UI contribution and any legitimately reused code/licenses. Billing is simulated; alerts are in-app; list any other stubs. Do not expose private client implementation notes or local career paths.

## Operations and limits
Document real retention, deployment/rollback, budget, source revocation and known failures. No investment advice or production security certification is claimed. Link current checks and recorded limitations rather than claiming the project is production-ready.
```

## 9. Two-minute demo script

Script is a rehearsal plan, not a claim of a successful run. Use the target script only when its screens and client pass; in minimum say “local MCP with a seeded test identity” and replace target-only admin actions with the actual test artifact. Keep the opening disclosure even if time is short.

| Time      | Action                                                                                  | Spoken copy                                                                                                                                                                                                                                                   |
| --------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0:00–0:15 | Landing, disclosure visible                                                             | “I built a new research demo around one workflow: ask, inspect the passage, and understand the limits. The UI was generated in Lovable. The interviews here are fictional, and there is no private In Practise content.”                                      |
| 0:15–0:40 | Member workspace, explicit org, ask Northstar switching question; open S1/P2 then S2/P2 | “These two accounts describe different installation sizes. The answer keeps their context separate. Each citation opens the exact paragraph and document revision.”                                                                                           |
| 0:40–0:58 | Ask next-year retention                                                                 | “The available sources do not establish a forecast. The assistant should say that. A failed search would be a different state.”                                                                                                                               |
| 0:58–1:23 | Admin eval G15; candidate list and oracle replay                                        | “Here I deliberately removed a known relevant source from retrieval. The gold paragraph exists, the candidate list missed it, and an oracle-context replay answers. That makes this a retrieval miss, rather than evidence that the corpus could not answer.” |
| 1:23–1:43 | Actual connected MCP client, fetch same paragraph; show ordinary-member denied fixture  | “The agent uses the same evidence service and permissions. It can retrieve a passage, but it cannot gain access by guessing a document ID. The external agent still owns its final synthesis.”                                                                |
| 1:43–2:00 | Implementation status and real eval report                                              | “This is the scope I completed in the recorded time. Billing is simulated and alerts are in-app. These are the measured checks and remaining failures. With your corpus, I would start by building a reviewed evaluation set with the research team.”         |

If a live dependency fails, show its real error and use a clearly labeled saved run. Do not present a recording, fixture or scripted answer as a live result. Keep a known-good previous build and a local fixture demo ready; identify which one is on screen.

## 10. Specification verification performed for this delivery

The four specification files were saved individually as they were drafted. The following read-only verification command applies to this document delivery, not the future app:

```bash
python3 verify_specs.py
```

`verify_specs.py` validates required sections, the ≤400-word main Lovable prompt, local document links, exact shared synthetic quotes, SQL table/RLS coverage, TypeScript contract extraction, MCP schema references and unchanged source/TODO hashes. It writes no files. Additional isolated type/SQL verification and final counts are recorded below after execution. Live provider evaluation, hosted Supabase, actual MCP OAuth/client behavior and deployment remain **NOT RUN / UNVERIFIED**.

### Results recorded on 2026-09-13

| Executed command                                                                                                              | Result and scope                                                                                                                                                                                                                                                                                                                                                               |
| ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `python3 verify_specs.py` from this directory                                                                                 | PASS: four specifications, 311-word main Lovable prompt, 24 exact synthetic paragraphs, 18 gold cases, 37 tables with RLS, 84 unique API routes, five MCP tool definitions, strict TypeScript check, six unchanged source/TODO hashes.                                                                                                                                         |
| `tsc --noEmit --strict --skipLibCheck --target ES2022 --lib ES2022,DOM --ignoreConfig contract.ts` in the briefing scratchpad | PASS using TypeScript 7.0.2 on the extracted 04 contract catalog. This is the available verification compiler, not a prescribed Lovable dependency version.                                                                                                                                                                                                                    |
| `/tmp/briefing-c-schema-venv/bin/python verify_schemas.py` in the briefing scratchpad                                         | PASS: 159 PostgreSQL statements parsed with pglast; all ten MCP input/output schemas pass JSON Schema meta-validation; concrete worked requests/result validate; unknown organization argument and malformed citation UUID are rejected.                                                                                                                                       |
| `python3 verify_database.py` in the briefing scratchpad                                                                       | PASS on a fresh isolated PostgreSQL 18.6 cluster with the actual pgvector 0.8.2 library compiled locally from its upstream tag. Tested organization isolation, safe profile grants, premium/seat revocation, hidden historical answers/citations, expired overrides, published-evidence mutation denial and 1,536-dimensional vector storage. Cluster stopped after the check. |

The PostgreSQL test loaded the upstream vector type/operator definitions against the compiled library inside the isolated cluster because the system had no installed pgvector extension control file. The schema's `CREATE EXTENSION` packaging step was therefore substituted only in the test bootstrap. Supabase Auth was represented by a minimal `auth.users`/`auth.uid()` fixture. This verifies real PostgreSQL RLS and vector types, **not** hosted Supabase extension installation, Storage policies, complete auth sessions, concurrent handler transactions, model quality, OAuth compatibility or deployment. Those remain the future gates above. No existing database or global extension installation was modified.

Scratchpad verification location: `/private/tmp/claude-501/-Users-cristiandeluxe-p-cristian-deluxe-developer-portfolio/67bd7815-5553-4e34-a4d0-5c5ed891d38d/scratchpad/codex`. It contains the extracted contract, SQL test/bootstrap scripts and database verification log. Supporting `verify_specs.py` and `verification-input-hashes.json` live beside the four deliverables so their document/type/input checks can be rerun without a live database or provider.

Input integrity covers 01, 02, offer, research dossier, interview brief and the pre-existing repository TODO. The supplied Atrium search returned project history corroborating the already-read input documents; no additional private source was needed. All work under `/Users/cristiandeluxe/p` was confined to this code-project output directory. No Git commit/push, external message, UI implementation or deployment was performed.
