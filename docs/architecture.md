# Request architecture

In Practise Demo is an independent engineering demonstration using public SEC
filings and synthetic interviews. It has one research endpoint and two clients;
it does not access In Practise systems or private research.

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
              routeAction.ts -> one of six handlers
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
records the SDK deviation and unverified remote gateway setting.

## Six actions

[routeAction.ts](../supabase/functions/research/routeAction.ts) dispatches
exactly these actions. Every action requires an authenticated principal with
active membership.

| Action   | Input beyond `action`                                   | Handler and result                                                                                                                                             |
| -------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `me`     | None                                                    | [handleMe.ts](../supabase/functions/research/actions/handleMe.ts): organization, role and premium entitlement.                                                 |
| `list`   | Optional `company`, `kind`                              | [handleList.ts](../supabase/functions/research/actions/handleList.ts): authorized current revisions, ordered by document ID; more than 50 results is an error. |
| `read`   | `documentId`, `revisionId`, `passageId`                 | [handleRead.ts](../supabase/functions/research/actions/handleRead.ts): exact passage citation and adjacent passage IDs; missing or denied evidence is 404.     |
| `search` | `query`, optional `company`, `limit` (1–10, default 10) | [handleSearch.ts](../supabase/functions/research/actions/handleSearch.ts): ranked citations, actual search mode and truncation flag.                           |
| `ask`    | `query`, optional `company`                             | [handleAsk.ts](../supabase/functions/research/actions/handleAsk.ts): standalone structured answer, mode and candidate count.                                   |
| `debug`  | None                                                    | [handleDebug.ts](../supabase/functions/research/actions/handleDebug.ts): reviewer-only corpus counts through `inspect_corpus`; no connected evaluation report. |

Success returns `{ action, data, buildId, requestId }`; errors return
`{ error: { code, message, retryable }, requestId }`.
[apiErrorStatuses.ts](../supabase/functions/_shared/http/apiErrorStatuses.ts)
defines HTTP mappings. A reserved `allowance_exhausted` error does not establish
an implemented allowance ledger.

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
not the surrounding document's offsets. The model does not supply this metadata.

[Immutability](../supabase/migrations/20260913000003_evidence_immutability.sql)
and
[canonical publication](../supabase/migrations/20260913000007_canonical_publication.sql)
protect published content, including against privileged passage changes. Service
credentials remain in operator scripts, outside retrieval; see
[ADR 0003](adr/0003-caller-scoped-retrieval.md).

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
removes unauthorized references and drops claims with no surviving references.
If no claims survive, it emits `not_found` and an access-changed message. That
branch also covers a generated answer with zero claims, so the message alone is
not proof that revocation occurred.

This is not an atomic permission snapshot covering generation and delivery. A
claim with multiple references can survive losing some references; the tests do
not establish that the remainder supports every part of its prose. No full
concurrent revocation or corpus-fingerprint guarantee is claimed. Request
allowance debiting and a usage ledger are absent from this path and remain in
[TODO.md](../TODO.md). The broader [plan](research/07-one-day-execution-plan.md)
is the authority for intended work, not proof that every requirement shipped.

Verification: `pnpm type-check`, `pnpm test:ci` and `pnpm check:ci` exercise the
source and offline contracts. Retained live evaluation and database results are
separately dated in [evals.md](evals.md) and [backend.md](backend.md).
