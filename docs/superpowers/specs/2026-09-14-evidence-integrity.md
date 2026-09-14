# Evidence integrity: specification

**Status:** proposed, 2026-09-14. Owner decision pending on execution order.

## Why

The demo already proves three properties: evidence has a server-owned identity,
a retrieval failure is distinguishable from missing knowledge, and authorization
happens in the database. This specification covers what a reviewer of an
investment-research platform would look for next and does not find:

1. **The corpus is third-party text and is treated as trusted input.** Nothing
   establishes what happens when a transcript contains an instruction addressed
   to the model. For a platform whose material is written by interviewees, this
   is the textbook attack surface.
2. **Evidence age is displayed but never used.** Citation cards show interview
   and publication dates. No surface says an answer rests entirely on material
   two years old, which in a memo is the difference between a fact and a stale
   claim.
3. **Disagreement is detected but not legible.** `conflict` exists as a status,
   the system prompt requires both sides, and two gold cases (G03, G05) pass.
   The UI renders the claims as one undifferentiated list, so the reader has to
   reconstruct who said what and when.
4. **An answer cannot be re-opened later.** The ledger records which revisions
   each answer read. Nothing lets the caller return to a request and learn that
   a cited document has been revised since.

## Scope

Four independent deliverables. Each ships alone and is verified alone.

### A. Treat the corpus as hostile content

The server must not be steerable by passage text, and that must be asserted
rather than assumed. What can honestly be proven without a live provider:

- Passage text cannot forge the boundary that separates one passage from
  another, or from the instructions.
- If the model does obey an injected instruction, the server rejects the answer
  rather than returning it: a fabricated label, a citation never supplied, a
  status without claims.
- Hostile passage text renders in the UI as quoted evidence, never as markup.

**Out of scope, stated plainly:** this does not prove the model is immune to
injection. It proves the server does not depend on the model's obedience. Any
claim stronger than that is unsupported.

### B. Evidence vintage as a signal

The answer carries the date range of the evidence actually selected and the age
of the oldest and newest of it, computed server-side from the selected sources.
The UI states the range, and warns when even the newest source is more than a
year old.

No system prompt change: the figures are derived from data the server already
holds, so the evaluation suite is not disturbed.

### C. Legible disagreement

When the status is `conflict`, group the claims by the attribution of their
evidence - speaker, role, interview date - and render the sides against each
other, each keeping its link to the exact passage. Presentation only: no
contract change, no prompt change.

### D. An answer that can be audited later

A caller can reopen one of their own requests by id and see which revisions it
read and whether each is still the current revision of its document. Row level
security scopes this to the caller; the stored diagnostic record is included
only for a principal that may read diagnostics, on the same gate as `ask`.

## Constraints

- Existing migrations, the accepted corpus, `docs/research/` and
  `docs/mcp-handshake.jsonl` are immutable. Hostile passages are test fixtures,
  never corpus files.
- No service-role key on any retrieval path.
- A change to `systemPrompt.ts` changes model behaviour, so re-running
  `pnpm eval:answers` against the gold set costs provider quota and is an
  owner-authorized step, not part of any task's gate.
- New response fields are optional in the contract and the frontend deploys
  before the Edge function, because the deployed parsers are strict.

## Acceptance

Each deliverable is accepted when its own tests pass and `pnpm check:ci`
exits 0. D is additionally accepted only after a live check against the
deployment.
