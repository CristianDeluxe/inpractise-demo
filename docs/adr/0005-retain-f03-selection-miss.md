# ADR 0005: Retain the F03 selection failure

Date: 2026-09-14.

## Context

Both retained [2026-09-13 evaluation runs](../evals.md) retrieve the Costco
fiscal-year answer at ranks 5 and 6, but F03 returns `not_found`. The first four
candidates exhaust the two-per-document cap across the two Costco documents.

## Decision

Retain this failure and the cap rather than tune selection solely to turn F03
green.
[selectContext.ts](../../supabase/functions/_shared/search/selectors/selectContext.ts)
permits at most eight passages and 4,000 tokens, with at most two per document.
Four selected passages in F03 is a consequence of document diversity, not a
global four-slot limit.

## Consequences

The reported expected-status match stays 13/14, candidate recall stays 10/10
evidence cases, and one selection miss remains visible. Backfilling by rank
could improve coverage but changes the diversity tradeoff. This ADR resolves the
backlog decision: retain the cap and the refusal. Any future selection change
requires a new, separately evaluated decision. These cases do not establish
general accuracy or production retrieval quality.

Verification: `pnpm test:ci` checks the selector and diagnostic behavior. The
two JSON reports are historical measurements and are not regenerated during
documentation maintenance.
