# Ask IP: conversational panel and live evidence rail

Date: 2026-09-15. Status: approved for implementation.

## Problem

Ask exists but as a one-shot form at the bottom of a scrolling page
(`src/research/ResearchPanel.tsx`, mounted by
`src/workspace/WorkspacePage.tsx`). It has no thread, no history, no visible
progress. The workspace route mixes a library, a coverage chart, recent
documents and that form into one column, and the sidebar navigates it with
`#library` and `#research` anchors rather than routes.

Meanwhile the pipeline computes numbers that no surface shows while they are
being produced: candidate recall before context selection, which passages the
context budget dropped, and an authorization re-read that can retract evidence
after generation.

## Goal

Make the middle of the retrieval pipeline visible, live, and true, without
weakening any of the three properties the demo exists to defend.

Token streaming of prose is not available here and is not the goal:
`answer/requestCompletion.ts` requests `response_format: {type:'json_object'}`
and the provider returns a structure, not prose.

## Design

### 1. Transport: additive, never a replacement

The `ask` action stays byte-identical. `evals/live/runAsk.ts` measures against
it and three retained reports plus the gate depend on that route not moving.

A new action `ask_stream` returns `text/event-stream`. `actions/handleAsk.ts` is
refactored into an async generator that yields stage events; the existing
non-streaming `handleAsk` becomes a thin consumer that drains the generator and
returns its final value. One implementation, two consumers.

MCP is untouched: `mcp/` exposes only `search_research` and `fetch_passage`.

### 2. Stage events

Every field is a value the server already computes. Nothing is invented.

| Event        | Payload                                                                | Source                                      |
| ------------ | ---------------------------------------------------------------------- | ------------------------------------------- |
| `debited`    | allowance before and after                                             | `answer/debitRequest.ts`                    |
| `embedded`   | dimension count, elapsed ms                                            | `answer/embedQuery.ts`                      |
| `retrieved`  | candidate count, and per candidate the key, branch and rank            | `_shared/search/retrieveCandidates.ts`      |
| `selected`   | which keys entered the context budget, which were dropped, token total | `diagnostics.selectedIds`, `selectedTokens` |
| `generating` | nothing                                                                | —                                           |
| `claim`      | one provisional claim as its JSON object closes                        | incremental parse of the provider stream    |
| `verifying`  | count of citations being re-read                                       | `citations/readCitationSources.ts`          |
| `result`     | the terminal, validated envelope                                       | `answer/buildAskResult.ts`                  |

Emitting candidate keys and scores before `readCitationSources` is safe by
construction, not by discipline: `search_candidates_scoped` and
`search_candidates` are `security invoker`, and their `permitted` CTE joins
`passages`, `document_revisions` and `documents` under the caller's RLS
(`supabase/migrations/20260914000011_scoped_search_candidates.sql:12-17`). A
passage the caller may not read never enters the candidate rows, so it cannot
enter a stage event.

### 3. Provisional claims

An incremental parser over the provider stream emits each `claim` object as it
closes. The client renders it dimmed and marked provisional. The terminal
`result` event commits it to normal ink, or retracts it when
`authorisedCitationIds` no longer contains its evidence.

Nothing is ever presented as verified before the re-read. A provisional claim is
labeled provisional; the commit is the visible step that makes it an answer.
This preserves ADR 0003 and ADR 0006: the re-read still happens after generation
and still governs what the reader is told.

### 4. Persistence

A new migration `20260915000013_chat_sessions.sql`. No existing migration is
edited; AGENTS.md declares them immutable.

- `chat_sessions` — id, org, owner, title, created_at, updated_at.
- `chat_messages` — id, session, role, question text or response envelope,
  created_at.

RLS follows the pattern of `20260914000008_request_allowances.sql`: the caller
reads and writes only their own rows within their organization. Messages store
the question and the response envelope, never the raw model context.

New RLS integration tests in `tests/integration/`, inside rolled-back
transactions like the existing ones: a member of another organization sees
nothing, and reviewer status does not bypass ownership.

### 5. Interface

`/app` becomes a dashboard: a row of stat tiles over values already present in
the `list` response (documents, passages, companies, coverage, latest revision),
then recent documents beside `CoverageChart`.

`LibraryPanel` moves to `/app/library`. `WorkspaceNav` points at routes instead
of hash anchors.

`ResearchPanel` leaves the page and becomes the content of a floating panel with
a launcher in `WorkspaceLayout`, so Ask follows the reader across dashboard,
library and reader.

- Maximized (`inset-4`): sessions rail, thread, live evidence rail.
- Collapsed (380px): thread only; citations are chips that open the reader.
- The evidence rail collapses for an analyst and expands for an engineer.

### 6. The two demo moments

1. Ask as reviewer, then downgrade with `ViewAsSelector` and re-ask. The premium
   candidate never appears in the `retrieved` stage, because RLS removed it in
   the database. The same question, two correct answers, by identity.
2. The F03 selection miss becomes a chip that visibly greys out with its reason,
   beside `docs/adr/0005-retain-f03-selection-miss.md`.

### 7. Verification

`pnpm verify` stays green. New:

- Deno tests for the stage generator in `supabase/functions/tests`.
- A test that draining `ask_stream` to its `result` event produces the same
  envelope shape and the same claim and citation identities as `ask` for the
  same question. It cannot assert byte equality: `debitRequest` consumes
  allowance and `recordDiagnostics` writes rows, so two runs differ in request
  id and allowance. The assertion is over the answer payload with those fields
  excluded, and the exclusion list is named in the test.
- A retraction test: a provisional claim whose evidence is denied before the
  re-read must not survive into `result`.

## Out of scope

The open TODO items (frontend/backend boundary fields, ESLint 10 peers,
reranking, historical artifacts, the human rehearsal) are a separate pass.
