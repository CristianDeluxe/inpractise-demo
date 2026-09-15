# Request architecture

In Practise Demo is an independent engineering demonstration over public SEC
filings and synthetic interviews, with one research endpoint and three clients.

```text
Browser session                         Local MCP member session
src/runtime/createBrowserRuntime.ts     mcp/createSession.ts -> mcp/signIn.ts
src/api/performRequest.ts               mcp/callResearch.ts
              |                         |
              +---- POST /functions/v1/research ----+
                               |
              research/index.ts: schema and envelope
                               |
              authenticate.ts -> verifyToken.ts
              Auth /auth/v1/user -> active membership
                               |
              caller JWT forwarded to Supabase client
                               |
              routeAction.ts -> one of twelve handlers
                               |
              PostgreSQL RLS -> authorized evidence only
                               |
              search: candidates -> citations
              ask: candidates -> selected context -> model
                               -> authorization reread -> cited claims
              read: exact revision/passage -> citation + neighbor IDs
```

Paths prefixed `research/` in the diagram are under `supabase/functions/`. The
[glossary](../CONTEXT.md) defines the domain vocabulary;
[ADRs](../README.md#documentation-map) explain the decisions.

## Clients and identity

The browser creates Supabase Auth and the research client in
[createBrowserRuntime.ts](../src/runtime/createBrowserRuntime.ts).
[performRequest.ts](../src/api/performRequest.ts) gets the session token and
sends JSON with `Authorization: Bearer <user JWT>` and the project's publishable
`apikey`. [createResearchClient.ts](../src/api/createResearchClient.ts) owns the
endpoint; client parsers reject malformed envelopes and evidence.

MCP [start.ts](../mcp/start.ts) signs in with an ordinary member password before
connecting stdio. [createServer.ts](../mcp/createServer.ts) advertises
`inpractise-demo` and registers only
[search_research](../mcp/registerSearchResearch.ts) and
[fetch_passage](../mcp/registerFetchPassage.ts).
[callResearch.ts](../mcp/callResearch.ts) forwards that member's JWT to the same
HTTP endpoint and retries one 401 after signing in again. There is no MCP Ask or
write tool. See [installation](mcp-install.md).

The Edge [index.ts](../supabase/functions/research/index.ts) handles OPTIONS,
rejects non-POST requests, bounds and parses the body, checks
[RequestSchema.ts](../supabase/functions/research/RequestSchema.ts), then
authenticates. Unknown identity, role or organization keys are rejected.
[verifyToken.ts](../supabase/functions/research/verifyToken.ts) validates
through Supabase Auth's `/auth/v1/user`;
[authenticate.ts](../supabase/functions/research/authenticate.ts) then forwards
the bearer token into a caller-scoped database client and reads active
membership. This is the implemented equivalent of the plan's
`auth.getUser(token)` step; [ADR 0002](adr/0002-handler-authentication.md)
records the SDK deviation and verification evidence. Read-only Management API
inspection records deployed version 15 as `ACTIVE` with `verify_jwt=false`, so
the handler's own validation is the one that counts. Live probes reject missing
and deliberately mis-signed tokens. The expiry regression constructs a JWT with
a past `exp`, models Supabase Auth's observed HTTP 403 expiry response, and
shows authentication stopping before membership or evidence access; an
organically aged member token was also checked against Auth directly, accepted
before `exp` and rejected after it.

### Viewing the corpus as a lesser principal

A reviewer can ask what a plain member sees without a second account. The
request carries an optional `viewAs` object, and
[ViewAsSchema.ts](../supabase/functions/research/ViewAsSchema.ts) is written so
that only a downgrade is expressible: `role` accepts the literal `member` and
`premium` accepts the literal `false`. There is no shape that asks for reviewer
access or premium entitlement, so a forged body cannot request one.

[effectivePrincipal.ts](../supabase/functions/research/effectivePrincipal.ts)
intersects the request with the authenticated principal rather than replacing
it: premium survives only as `real.premium && viewAs?.premium !== false`. The
caller's JWT and organization are untouched, so RLS remains the ceiling and the
downgrade can only lower the floor. Two viewing modes never share a cached
response either - [viewingReadScope.ts](../server/api/viewingReadScope.ts) folds
the mode into the ETag, so a member-view response cannot be served from a
reviewer-view entry.

## Twelve actions

[routeAction.ts](../supabase/functions/research/routeAction.ts) dispatches
exactly these actions. Every action requires an authenticated principal with
active membership. The plain HTTP facade (below) exposes only the original
seven; `note_save`, `note_list` and `note_delete` are browser-only.

| Action        | Input beyond `action`                                                | Handler and result                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `me`          | None                                                                 | [handleMe.ts](../supabase/functions/research/actions/handleMe.ts): organization, role and premium entitlement.                                                                                                                                                                                                                                                                                                                    |
| `list`        | Optional `company`, `kind`                                           | [handleList.ts](../supabase/functions/research/actions/handleList.ts): authorized current revisions, ordered by document ID; more than 50 results is an error.                                                                                                                                                                                                                                                                    |
| `read`        | `documentId`, `revisionId`, `passageId`                              | [handleRead.ts](../supabase/functions/research/actions/handleRead.ts): exact passage citation and adjacent passage IDs; missing or denied evidence is 404.                                                                                                                                                                                                                                                                        |
| `search`      | `query`, optional `company`, `limit` (1–10, default 10)              | [handleSearch.ts](../supabase/functions/research/actions/handleSearch.ts): ranked citations, actual search mode and truncation flag.                                                                                                                                                                                                                                                                                              |
| `ask`         | `query`, optional `company`                                          | [handleAsk.ts](../supabase/functions/research/actions/handleAsk.ts): standalone structured answer, mode, candidate count and evidence vintage.                                                                                                                                                                                                                                                                                    |
| `compare`     | `company`, `topic`                                                   | [handleCompare.ts](../supabase/functions/research/actions/handleCompare.ts): two-sided cross-reference verdict with relations between claims.                                                                                                                                                                                                                                                                                     |
| `investigate` | `question`, optional `company`                                       | [handleInvestigate.ts](../supabase/functions/research/actions/handleInvestigate.ts): bounded multi-step research loop; see [below](#the-bounded-investigation-loop). Streamed only; the non-streamed path drains the same generator and returns its terminal value.                                                                                                                                                               |
| `provenance`  | `requestId`                                                          | [handleProvenance.ts](../supabase/functions/research/actions/handleProvenance.ts): the caller's own past request, replayed with the current currency of each cited revision. Row level security scopes the lookup, so another caller's request and an unknown one are the same 404. The revision list reaches any member for their own request; the stored diagnostic record follows the same `mayReadDiagnostics` gate as `ask`. |
| `debug`       | None                                                                 | [handleDebug.ts](../supabase/functions/research/actions/handleDebug.ts): reviewer-only corpus counts through `inspect_corpus`.                                                                                                                                                                                                                                                                                                    |
| `note_save`   | `documentId`, `revisionId`, `passageId`, optional `question`, `note` | [handleNoteSave.ts](../supabase/functions/research/actions/handleNoteSave.ts): re-reads the passage as the caller, then inserts a note row naming it; the insert policy re-checks visibility independently of the Edge read.                                                                                                                                                                                                      |
| `note_list`   | None                                                                 | [handleNoteList.ts](../supabase/functions/research/actions/handleNoteList.ts): the caller's own notes, newest first, each with its passage re-read as the effective principal - `null` when it can no longer be opened.                                                                                                                                                                                                           |
| `note_delete` | `noteId`                                                             | [handleNoteDelete.ts](../supabase/functions/research/actions/handleNoteDelete.ts): deletes one of the caller's own notes; another member's note and an unknown id are the same 404.                                                                                                                                                                                                                                               |

Success returns `{ action, data, buildId, requestId }`; errors return
`{ error: { code, message, retryable }, requestId }`.
[apiErrorStatuses.ts](../supabase/functions/_shared/http/apiErrorStatuses.ts)
defines HTTP mappings. `allowance_exhausted` represents a rejected database Ask
debit.

## Database boundary and exact evidence

The [table migration](../supabase/migrations/20260913000001_evidence_tables.sql)
defines organization-scoped documents, revisions and passages with composite
relationships.
[Access policies](../supabase/migrations/20260913000002_evidence_access.sql)
require active user membership and organization, sufficient tier, a published
non-withdrawn revision and approved rights. Reviewer is a role, not an RLS
bypass.
[Search SQL](../supabase/migrations/20260913000005_search_candidates.sql) is
`SECURITY INVOKER`; authorization happens before rows leave PostgreSQL.

Search and list restrict to current revisions; an exact reader can still open an
authorized historical revision.
[readCitationSources.ts](../supabase/functions/research/citations/readCitationSources.ts)
reads with the principal's client.
[buildCitation.ts](../supabase/functions/research/citations/buildCitation.ts)
creates the ID `documentId:revisionId:passageId`, quote, source metadata and
[reader path](../supabase/functions/research/citations/readerPath.ts). The quote
is the whole passage: offsets run from zero to its Unicode code-point length,
not the surrounding document's offsets. The server, not the model, supplies
every field of this metadata.

[Immutability](../supabase/migrations/20260913000003_evidence_immutability.sql)
and
[canonical publication](../supabase/migrations/20260913000007_canonical_publication.sql)
protect published content, including against privileged passage changes. Service
credentials remain in operator scripts, outside retrieval; see
[ADR 0003](adr/0003-caller-scoped-retrieval.md).

### Research notebook

The
[research notes migration](../supabase/migrations/20260915000013_research_notes.sql)
adds `research_notes`: one row per saved citation, naming a passage by its three
ids plus an optional question and note. No quotation is stored. Row level
security scopes select and delete to `auth.uid()`, and the insert policy selects
the referenced passage as the caller, so saving evidence the passage policy
would hide fails in the database regardless of what the Edge function believes -
reviewer status does not bypass it. `note_list` re-reads each passage as the
effective principal at list time, so a note can never surface evidence its owner
may no longer read.

## Retrieval and selection

[embedQuery.ts](../supabase/functions/research/answer/embedQuery.ts) requests a
query embedding with a four-second timeout. Provider/network embedding failure
can yield visible `lexical_only` fallback; missing required configuration
remains an error.
[retrieveCandidates.ts](../supabase/functions/_shared/search/retrieveCandidates.ts)
requests up to 30 candidates per lexical/vector branch from `search_candidates`.
[fuseRanks.ts](../supabase/functions/_shared/search/fuseRanks.ts) combines
one-based ranks with reciprocal rank fusion, `1 / (60 + rank)`, retaining at
most 40 candidates.

Diagnostics separate `candidateAt10` from `selectedIds` and `selectedTokens`.
[selectContext.ts](../supabase/functions/_shared/search/selectors/selectContext.ts)
admits at most eight passages and 4,000 tokens, with two per document. The cap
applies even with a company filter.
[classifyFailure.ts](../scripts/db/classifyFailure.ts) needs gold labels to
separate retrieval and selection misses; an ordinary question remains
unclassified. F03 demonstrates a selection miss;
[ADR 0005](adr/0005-retain-f03-selection-miss.md) retains it.

## Structured answers and limits

[handleAsk.ts](../supabase/functions/research/actions/handleAsk.ts) reads
selected sources, returns `not_found` without generation if none remain,
otherwise generates once and rereads evidence using the caller's client.
[requestCompletion.ts](../supabase/functions/research/answer/requestCompletion.ts)
uses a twelve-second generation deadline and an 800-token output limit. A failed
generation is a dependency error; malformed JSON/schema output is
`invalid_model_answer`.

[ProviderAnswerSchema.ts](../supabase/functions/research/answer/ProviderAnswerSchema.ts)
accepts `answered`, `partial`, `conflict` or `not_found`, at most four claims of
at most 500 characters each, numeric source labels 1–8, and `missingEvidence`.
Every claim requires a source.
[assertSourcesSupplied.ts](../supabase/functions/research/answer/assertSourcesSupplied.ts)
rejects labels beyond the supplied sources.
[buildAskResult.ts](../supabase/functions/research/answer/buildAskResult.ts)
maps labels to server citations;
[authorisedClaims.ts](../supabase/functions/research/answer/authorisedClaims.ts)
drops a whole claim if any referenced source is unavailable. Independent claims
with complete evidence remain, and only their citations are returned. If an
originally nonempty answer loses every claim, it emits `not_found` with an
access-changed message. An ordinary generated zero-claim refusal retains its
original missing-evidence explanation.
[ADR 0006](adr/0006-require-complete-claim-evidence.md) records why a partly
supported comparison cannot retain its unchanged prose.

The reread is a single check after generation, governing the evidence set it
observes; there is no permission snapshot spanning generation and delivery, so a
revocation that lands after the reread is outside it. Ask allowance debiting and
completion usage accounting are described below.

`pnpm type-check`, `pnpm test:ci` and `pnpm check:ci` exercise the source and
offline contracts. Retained live evaluation and database results are dated in
[evals.md](evals.md) and [backend.md](backend.md).

## Ask allowance and usage

Each authenticated member has 100 Ask requests per UTC calendar day. The
`debit_request` RPC takes its principal from `auth.uid()`, serializes requests
for that principal with a transaction advisory lock, and inserts an
unknown-usage ledger row before any Ask embedding or generation request.
Exhaustion returns `allowance_exhausted` (HTTP 429). Caller cancellation,
retrieval failure, no matching evidence, provider failure and invalid answers do
not refund the debit. Search and Read do not consume this Ask allowance.

The two mutation RPCs execute as a dedicated non-login role without RLS bypass;
RLS restricts ledger access to the active caller. Members cannot directly mutate
ledger rows. Reported completion prompt, completion and total tokens are stored
once, even if answer validation subsequently fails. Missing or invalid provider
usage stays NULL (unknown), never an invented zero. These are completion totals,
not an aggregate of embedding usage. The member-scoped usage endpoint accepts
caller reports, which makes it operational accounting rather than a billing
record. Usage metadata stays out of the browser response contract.

## The bounded investigation loop

[investigateStages.ts](../supabase/functions/research/actions/investigateStages.ts)
is a five-phase async generator, run entirely server-side with the caller's own
JWT client. Exactly one Ask debit covers the whole loop:

1. **`debited`** — the same `debit_request` RPC as `ask`, before any provider
   call.
2. **`plan`** —
   [planInvestigation.ts](../supabase/functions/research/investigate/planInvestigation.ts)
   asks a chat completion to decompose the question into two to four
   sub-questions, each optionally scoped to a company. The model sees only the
   caller-visible company slugs
   ([readVisibleCompanies.ts](../supabase/functions/research/investigate/readVisibleCompanies.ts)),
   never corpus content; a slug outside that list is `invalid_model_answer`, not
   silently dropped. More than four sub-questions are truncated, not rejected —
   an eager model costs only the extra lines.
3. **`retrieve`** (one per sub-question) —
   [investigateSubQuestion.ts](../supabase/functions/research/investigate/investigateSubQuestion.ts)
   runs the identical embed/retrieve/select/read pipeline a standalone `ask`
   runs, so recall and selection are measured exactly the same way per
   sub-question.
4. **`refine`** (at most once) —
   [refineInvestigation.ts](../supabase/functions/research/investigate/refineInvestigation.ts)
   asks for one reformulated sub-question only when some step found no readable
   passage and the token budget can still afford both the reformulation and the
   synthesis after it; the model may decline. A reformulation replaces its
   sub-question's evidence in place and keeps the original text beside it.
5. **`synthesise`** — one grounded completion over the merged evidence, under
   the same claim/citation contract as `ask`
   ([ProviderAnswerSchema.ts](../supabase/functions/research/answer/ProviderAnswerSchema.ts)),
   plus a `status` (`answered` / `partial` / `not_found`) per sub-question
   ([subQuestionResults.ts](../supabase/functions/research/investigate/subQuestionResults.ts)).
   A part is reported established only when it actually supplied a passage the
   final answer still cites; the model's own claim is downgraded to `not_found`
   otherwise. No readable passage anywhere ends the loop in the standalone
   refusal shape, without a synthesis call.

[TokenBudget.ts](../supabase/functions/research/investigate/TokenBudget.ts)
enforces one hard token bound (`INVESTIGATE_TOKEN_BUDGET`, default 16,000)
across every provider call in the loop; the next call is refused once the bound
is reached, and usage is recorded once, as the sum of every call, with the
synthesis (the ledger accepts one usage total per request). Each phase is
timestamped by an elapsed-milliseconds clock started at the first debit. No
phase carries claim text, a quotation, or a citation identifier the effective
(view-as-downgraded) principal may not read; `mayReadDiagnostics` gates
`candidateAt10`/`selectedIds` exactly as it does for `ask`. Both the streamed
path
([streamInvestigate.ts](../supabase/functions/research/streamInvestigate.ts))
and the non-streamed path
([handleInvestigate.ts](../supabase/functions/research/actions/handleInvestigate.ts))
drain the same generator; the non-streamed path discards the intermediate phases
and returns only the terminal, rechecked result. Verify with `pnpm test:edge`
(`investigatePlan.test.ts`, `investigateRefine.test.ts`,
`investigateSynthesis.test.ts`, `investigateBudget.test.ts`,
`investigateDisclosure.test.ts`).

## Retrieval diagnostics (reviewer-only)

After ask completion,
[recordDiagnostics.ts](../supabase/functions/research/answer/recordDiagnostics.ts)
writes the retrieval diagnostic record to the existing ledger row. This is
best-effort: if the write fails, the answer is already correct and must not be
downgraded to an error. The failure is visible as a request whose diagnostics
column stays null.

`record_request_diagnostics` is a security-definer function owned by the same
narrow `request_usage_writer` role. It takes identity from the JWT, never from
caller arguments, so it cannot record another user's request. It refuses a
payload over 4096 bytes, and rejects a second write to the same request. The
diagnostic object contains `candidateAt10` (top 10 ranked passages before
selection), `selectedIds` (passages sent to the model), `selectedTokens` (token
budget spent on selection), and `revisionIds` (server corpus identities of
selected passages). Together they distinguish a retrieval failure from selection
failure: candidates not ranked high enough, or selection that rejected
high-ranked candidates.

`debug` action reads the caller's own recent ledger rows; row-level security
already scopes `request_usage` to the authenticated principal, so there is no
separate authorization predicate. Each row returned carries its diagnostics
value (null when no record was written) and recorded timestamp.

Verify with `pnpm test` (rolled-back database integration and provider-free
search parity) and `pnpm test:edge` (stubbed provider ordering and usage). The
concurrency fixture holds the last debit open on one connection and proves a
second connection cannot acquire it; it times out the contender and rolls both
transactions back. A same-principal attempt after the last debit sees
exhaustion. See [ADR 0007](adr/0007-debit-before-provider.md).

## Plain HTTP client

The [HTTP API](api.md) adds `/api/v1` to the existing Node origin.
`server/originListener.mjs` dispatches that prefix to the bundled
`server/api/createApiListener.ts` and preserves static assets and SPA fallback.
The facade holds no key and forwards the caller bearer to the same research
endpoint. Backend `me` verification precedes per-principal in-process quota
admission; database authorization still gates every evidence response, including
304s.

`src/http-api/operations.ts` binds routes to runtime schemas shared by the typed
client and OpenAPI generator. The immutable passage projection omits mutable
current-revision and envelope metadata. Strong ETags derive from server
identity; private revalidation preserves revocation. Caching is private
revalidation only: every conditional read still touches the database, and
nothing is served from a public immutable cache. See ADRs
[0008](adr/0008-caller-token-http-facade.md) and
[0009](adr/0009-scope-immutable-passage-caching.md).
`pnpm exec vitest run tests/api --no-coverage` checks the contract;
`python3 scripts/api/exercise.py` verifies the built local origin with an
offline backend fixture.

The read response supplies `X-Research-Org-Id` from the same authenticated
principal through `researchResponse.ts`. ETag v2 includes that scope, protecting
tenant isolation even when memberships change between the earlier identity check
and the read. An older backend without the header receives compatible uncached
200 responses; the API never guesses read scope from `me`. This additive backend
metadata change is in source and not yet deployed.
