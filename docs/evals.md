# Evaluation: what the demo is allowed to claim

`pnpm eval:answers` runs the frozen gold set in `evals/gold.json` against the
**deployed** Edge function, through the same `src/api` client the browser uses,
and writes a redacted `evals/report.json`. Nothing in this document is a
measurement of a local mock.

## Method

Each case runs in four separate steps, so a failure can be attributed:

1. **Retrieval** runs first, with the persona's own Supabase client, and records
   `candidateAt10` **before context selection**. Candidate recall at ten is
   therefore a property of retrieval, not of what the generator chose to cite.
2. **The answer** comes from the deployed endpoint. Gold passage ids are written
   as `documentId:passageId` and resolved to the current revision at run time,
   so republishing the corpus does not silently turn every case into a miss.
3. **Authorisation is rechecked** by re-reading every returned citation with the
   persona's client. A citation that reader cannot fetch fails the run.
4. **An independent model judges grounding** through `@cristiandeluxe/max-lane`
   (forced tool, Claude via Claude Code OAuth). It sees the question, the
   status, the claims and the quoted passages — never the gold labels — so it
   cannot grade by agreement with the answer key. It is explicitly told that
   refusing when evidence is absent is correct.

Restricted-string leakage is never delegated to the judge: `mustNotContain` is
checked literally against the whole rendered answer.

`classifyFailure` separates `retrieval_miss` (gold absent from the top ten) from
`selection_miss` (gold retrieved, then dropped by the context budget). The two
have different fixes and are never reported as one number.

## Replay without credentials

`pnpm eval:replay` re-reads every retained `evals/report-run-*.json`, recomputes
its summary from the stored case results, checks coverage against
[gold.json](../evals/gold.json) and puts the result back through the gate. It
needs no key, no model account and no database: a reader who clones the
repository can confirm that the retained measurements still satisfy the gate
they were measured under.

It proves stored consistency and gate behavior, and nothing else. Retrieval does
not run and no model judges anything, so it says nothing about today's live
quality; only `pnpm eval:answers` does that, and it needs the deployed endpoint
and the optional `@cristiandeluxe/max-lane` judge.

## What the gate rejects

A status mismatch fails in both directions. The second direction is the one
worth stating: a refusal is grounded by construction and costs no recall, so a
gate that counted only groundedness and retrieval would pass a system that
answered `not_found` to every question while being useless to an analyst. The
only tolerated mismatch is the F03 signature recorded in
[ADR 0005](adr/0005-retain-f03-selection-miss.md) - that exact case, expected
status, actual status and diagnosis. F03 failing a different way, or any other
case refusing, stops the run, and so does an empty or incomplete case set.

The pure evaluation modules live in `evals/`; `evals/live/` holds the parts that
need the deployed endpoint and the judge, which is why `check:ci` type-checks
and lints the former and skips the latter.

## The gold set

Fourteen cases over the frozen corpus: four grounded in the SEC filings, five in
the synthetic interviews (including the Harbor supplier/distributor conflict),
four negative controls that must refuse, and one premium positive control.

The negative controls matter more than the positive ones. `N01` asks for figures
the witness explicitly does not have, `N02` for a metric nobody measured, `N03`
for a forecast, and `N04` asks a **basic** reader for the premium document's
restricted label. `N05` asks the same question as a **premium** reader and must
answer — that is what proves the canary was loaded, rather than asserting "no
canary anywhere" against a control that never had it.

## Result, 2026-09-13, against the deployed function

Two live repetitions were run and both are retained as `evals/report-run-1.json`
and `evals/report-run-2.json`; neither was discarded and their summaries are
identical.

```json
{
  "cases": 14,
  "statusMatched": 13,
  "candidateRecallAt10": { "hit": 10, "of": 10 },
  "correctRefusals": { "hit": 4, "of": 4 },
  "grounded": 14,
  "unauthorisedCitations": 0,
  "leaks": [],
  "retrievalMisses": [],
  "selectionMisses": ["F03"]
}
```

Candidate recall at ten is 10/10 on the evidence cases; all four refusals are
correct; the independent judge found every answer grounded in its own citations;
no citation was returned that its reader could not read; no restricted string
leaked to the basic reader while the premium control returned it.

## The one failure, and why it is not patched away

`F03` ("How is Costco's fiscal year structured?") returns `not_found` although
the answering passage is retrieved. Measured ranking for that query:

```text
1 cost-2025:business-0001 SELECTED   4 cost-2025:business-0054 SELECTED
2 cost-2024:business-0001 SELECTED   5 cost-2025:business-0002
3 cost-2024:business-0051 SELECTED   6 cost-2024:business-0002
```

The gold passage is at ranks 5 and 6. Context selection caps a broad query at
two passages per document, within global limits of eight passages and 4,000
tokens. With only two Costco documents in the corpus, the diversity cap admits
four passages at ranks 1-4; it leaves global capacity unused and the answering
passage never reaches the model. The system then refuses, correctly given its
context — a refusal, not a fabrication.

The decision in [ADR 0005](adr/0005-retain-f03-selection-miss.md) retains the
diversity cap and this refusal. F03 remains a measured selection miss; no
backfill or cap increase is part of this decision. Future selection changes
require separate evaluation. `pnpm test:ci` verifies selector and diagnostic
behavior; it does not regenerate these historical live reports.

## Cost and repeatability

Cases run in sequence, and `--out` names the report so a repetition never
overwrites an earlier one. One full repetition costs fourteen `ask` calls
against the demo allowance (100 per user per day) plus fourteen query
embeddings; the judge runs on the Claude Code subscription, not on the demo's
provider budget. The gate (`assertAnswerGate`) fails on any leaked restricted
string, any unauthorised citation, any ungrounded answer, a wrong refusal, or a
recall regression.

## Pending: the `compare` action has no gold set

`GoldCaseSchema` is shaped for a single-answer `ask` case (one `expectedStatus`,
one `goldIds` list) and has no notion of two sides or relations, so the
cross-reference action cannot be added to `evals/gold.json` without a schema
change. Edge-side grounding for `compare` is covered instead by
`supabase/functions/tests/compareGrounding.test.ts`, `compareRelations.test.ts`
and `compareUncovered.test.ts`. Extending the gold schema with a
`kind: 'compare'` case (two claim sets, a relation list, an uncovered-side
expectation) is deferred.

The allowance is now enforced by `debit_request` before Ask retrieval. Failed
calls and no-evidence results still consume one of the 100 daily units. Actual
completion token totals are persisted when reported; absent usage stays unknown.
Embedding usage is not part of that completion ledger. See
[backend allowance](backend.md#ask-allowance-and-usage). Historical reports
predating this migration do not prove that enforcement was present then.
