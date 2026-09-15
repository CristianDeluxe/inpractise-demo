# ADR 0010: Stream progress, never provisional claims or stored answers

Date: 2026-09-15.

## Context

Ask returns one validated envelope after generation and a final authorization
recheck, so a reader waits with no indication of what the system is doing. Two
familiar remedies were considered for that wait, and both were rejected.

**Streaming claims as they close.** The provider is asked for a JSON object, but
that object can be consumed incrementally, so emitting each claim as it closes
is technically available. It is not safe here. Access can change between the
moment a passage enters model context and the moment
[handleAsk](../../supabase/functions/research/actions/handleAsk.ts) rereads it.
Today that window ends before anything reaches the reader:
[authorisedClaims](../../supabase/functions/research/answer/authorisedClaims.ts)
drops a whole claim when any supporting source has become unreadable, as
[ADR 0006](0006-require-complete-claim-evidence.md) requires. A claim emitted
before that recheck has already been disclosed; marking it provisional and
retracting it afterwards does not undo the disclosure.

A closed claim is also not a valid answer on its own. Later output can
invalidate the root object or exceed the claim limit, and a truncated response
remains an error rather than a shorter answer. `temperature: 0` and the
completion cap guarantee neither completeness nor termination.

**Storing answers as conversation history.** A stored envelope is a second
evidence store.
[buildCitation](../../supabase/functions/research/citations/buildCitation.ts)
embeds the source text inside each citation, so a reader who generated a premium
answer and then lost premium access could read premium quotations back out of
their own history. Row ownership does not establish continued access to the
underlying evidence, and the allowance tables are not a precedent: they record a
caller's own consumption, not evidence.

## Decision

Stream stages, not content. A streaming Ask may report which phase the request
has reached and how many candidates and passages each phase handled; the answer
itself is published only after generation, the authorization recheck and
envelope validation have all completed, in one terminal event carrying the same
payload the non-streaming action returns.

Do not persist answers, claims or citations as conversation history. Each
question is standalone and its evidence is refetched under the caller's own
credentials.

Detailed per-candidate identifiers remain behind
[mayReadDiagnostics](../../supabase/functions/research/answer/mayReadDiagnostics.ts).
A progress stream must not widen that disclosure to callers the non-streaming
endpoint excludes.

## Consequences

The wait becomes legible without moving any authorization boundary, and the
three properties keep describing what the code does. A reader gains no history:
returning to an earlier answer means asking again, which recomputes access.

This governs disclosure through delivery, not revocation in general. Neither the
streaming nor the non-streaming path establishes an atomic guarantee against a
change occurring after the final recheck.

A candidate identifier is not evidence and is not treated as one. It is the same
string as the citation identifier
([candidateKey](../../supabase/functions/_shared/search/candidateKey.ts) and
[buildCitation](../../supabase/functions/research/citations/buildCitation.ts)
both compose `documentId:revisionId:passageId`), and the non-streaming action
already returns it inside `diagnostics.candidateAt10` to exactly the principals
`mayReadDiagnostics` admits. Stages disclose no more.

Verification: `pnpm test:edge` runs
`supabase/functions/tests/askStages.test.ts`, which asserts that no stage
carries claim text or a passage quotation, that the phases run in order, and
that a restricted principal receives no per-candidate identifiers.
