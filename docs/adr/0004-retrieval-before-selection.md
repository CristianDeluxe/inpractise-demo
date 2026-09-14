# ADR 0004: Measure retrieval before selecting answer context

Date: 2026-09-14.

## Context

An unanswered question can reflect missing corpus knowledge, a retrieval miss or
loss during context selection. Counting only citations would combine these
causes and hide whether the
[execution plan's](../research/07-one-day-execution-plan.md) retrieval property
holds.

## Decision

[retrieveCandidates.ts](../../supabase/functions/_shared/search/retrieveCandidates.ts)
records the first ten candidate IDs separately from selected IDs.
[classifyFailure.ts](../../scripts/db/classifyFailure.ts) requires gold labels
and distinguishes `retrieval_miss` from `selection_miss`; ordinary unlabeled
queries stay `unclassified`.
[requestCompletion.ts](../../supabase/functions/research/answer/requestCompletion.ts)
raises a dependency error for generation failures, while malformed model answers
are `invalid_model_answer`, never evidence refusals.

## Consequences

The induced missing-gold control must fail its gate. A refusal can be grounded
in selected context yet wrong for the corpus. Embedding failure has a separate
behavior:
[embedQuery.ts](../../supabase/functions/research/answer/embedQuery.ts) can fall
back to explicitly reported `lexical_only`; this is not a generation refusal.
Missing required configuration still fails. The reviewer endpoint returns
counts, not a connected diagnosis report or oracle replay.

Verification: `pnpm test:ci`, including `tests/unit/ranking.test.ts`,
`contextSelection.test.ts` and `answerGate.test.ts`.
[Evaluation results](../evals.md) are retained measurements, not rerun by this
command.
