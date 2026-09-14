# ADR 0006: Require every source supporting a claim

Date: 2026-09-14.

## Context

A generated claim may combine facts from several passages. If a comparison says
one deployment took six weeks and another took six months, retaining the
sentence with only the first source can disclose or assert the second fact
without readable evidence. Numeric source labels do not identify which words
each source supports.

## Decision

At the final authorization recheck, drop the entire claim when any cited source
is unavailable. Keep independent claims whose complete evidence remains
readable; return only citations those claims actually use. Do not rewrite or
regenerate a partly supported claim during finalization.

An answer that originally contained claims but loses all of them returns
`not_found` with "Access to the supporting evidence changed." A generated
zero-claim refusal retains its original `missingEvidence`, including an empty
array: it did not lose a claim to revocation.

## Consequences

This deliberately sacrifices a potentially still-supported fragment rather than
asserting that the remaining citation supports the whole sentence. Fully
supported multi-source claims and independent surviving claims remain available.
The recheck does not establish an atomic guarantee against revocation after the
check; it governs only the evidence set observed at finalization.

Verification:
`pnpm exec vitest run tests/unit/partialRevocation.test.ts tests/unit/revokedEvidence.test.ts --no-coverage`.
