# Ask IP: a dedicated route and a live evidence inspector

Date: 2026-09-15. Status: revised after adversarial review; sections 1-2 built,
section 3 pending.

## Problem

Ask existed as a one-shot form at the bottom of a scrolling page, under the
coverage chart, the recent documents and the library. It had no place of its own
and no indication of what the system was doing while it worked.

Meanwhile the pipeline computes numbers that no surface showed: candidate recall
before context selection, which passages the context budget dropped, and an
authorization recheck that can retract evidence after generation.

## Goal

Make the middle of the retrieval pipeline visible without moving any
authorization boundary.

## What was cut, and why

The first draft of this design also proposed provisional claims streamed as
their JSON objects closed, and a persisted chat history. Both were rejected;
[ADR 0010](../../adr/0010-no-provisional-claims-or-stored-answers.md) records
the reasoning. In short: a provisional claim has already been disclosed by the
time the recheck could retract it, and a stored envelope is a second evidence
store, because citations embed their source text.

The draft also claimed that token streaming was impossible because the provider
returns JSON. That was wrong. It is available and still unsafe, which is a
different argument and the one that governs.

## 1. Routes and layout (built)

`/app` is an overview: counts of the corpus the caller is authorized to read, a
company filter, coverage and recent documents. A missing passage count makes the
total unknown rather than smaller.

`/app/library` holds the source library. `/app/ask` is Ask at full width: the
question and its answer on the left, the evidence inspector on the right. The
sidebar points at routes rather than hash anchors.

The ask session is mounted under a key of the company scope, so narrowing the
scope discards the previous answer rather than leaving evidence from one scope
beside a question asked in another.

## 2. The evidence inspector (built)

Retrieval mode and candidate count for the current answer; the ranked candidate
identifiers and their selected-or-dropped state when the endpoint disclosed
them; and the retained F03 case as a labeled measurement with its gold passages,
its observed ranks and the cap that dropped them.

Detailed diagnostics reach the inspector only when `mayReadDiagnostics` allowed
them into the response. Their absence is stated, not hidden.

F03 is labeled because it has gold passages. A live unlabeled query is never
classified as a selection miss: an ordinary dropped candidate is not evidence
that it held the answer.

## 3. Stage streaming (pending)

The `ask` action stays byte-identical; `evals/live/runAsk.ts` measures against
it and three retained reports depend on that route not moving. A new
`ask_stream` action returns `text/event-stream`. `handleAsk` is refactored into
an async generator yielding stage events, and the existing non-streaming
`handleAsk` becomes a consumer that drains it.

Stage events carry only counts and phase names, plus per-candidate identifiers
gated by `mayReadDiagnostics`. The terminal event carries the same validated
payload the non-streaming action returns. Nothing before it carries claim text,
quotations or citation identifiers.

Emitting candidate identifiers at all is safe because `search_candidates_scoped`
and `search_candidates` are `security invoker` and their `permitted` CTE joins
under the caller's RLS
(`supabase/migrations/20260914000011_scoped_search_candidates.sql:12-17`): a
passage the caller may not read never enters the candidate rows.

Known constraints to verify before claiming streaming works end to end:

- Supabase Edge Functions allow SSE, with a 150-second idle timeout and worker
  lifetimes of 150 to 400 seconds.
- `server/api/callBackend.ts:32-34` applies a 15-second timeout and buffers
  JSON, so the cPanel facade must be measured on the deployed path rather than
  assumed.
- Several values the first draft promised do not exist as described:
  `debitRequest` returns an identifier rather than balances,
  `retrievalDiagnostics` carries no scores, `selectContext` drops candidates
  without recording a reason, and `embedQuery` can fall back to lexical-only.
  Each event reports what the code actually produces, or the selector records
  its decisions first.

### Equivalence testing

"Byte-identical to `ask`" is not assertable: envelopes carry a fresh request
identifier, each run debits separately, and the wrapped action name differs. The
tests instead run both adapters against independently reset fixtures with an
identical principal, corpus, provider response and clock, then compare the
terminal answer payload including citations and diagnostic visibility, and
assert the documented action mapping separately. Each path must perform exactly
one debit before provider work and end in exactly one terminal result or error;
end of stream is never success.

## Out of scope

The open TODO items are a separate pass.
