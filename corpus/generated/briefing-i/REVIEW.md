# Briefing I expanded interview review

Synthetic interview — fictional company and speaker. These are generated test
fixtures, not investment evidence or real In Practise research. This directory
is outside `corpus/manifest.json.documents` and must not be imported by glob.

The unchanged validation gate passes **S4 attempt 1 (710 words)** and **S5
attempt 2 (702 words)**. Each normalized review document has 16 passages: P1–P4
are exact gold, P5–P16 are generated, and P12/P14 are the intended operational
distractors. This is 32 review passages, including eight copies of gold
paragraphs already present in the accepted corpus; none increases accepted
counts. Review the complete transcripts:

- [S4: Harbor distributor](s4.review.txt), [normalized data](s4.review.json).
- [S5: Meridian processing](s5.review.txt), [normalized data](s5.review.json).

## Findings for the owner

Neither draft is semantically approved. Execution-plan section 7.3 requires the
owner to review appended content. Passing the existing structural gate is not
proof that the added claims preserve the meaning or uncertainty of the core.

## Final decision

Reject **S4**: P8's explanation attributes apparently missed delivery windows to
observational gaps, which weakens the frozen P2 ledger observation and invites an
unsupported reconciliation with S3. P6 and P16 add further unestablished
recordkeeping limitations.

Reject **S5**: P6, P10 and P16 introduce refund uncertainty, conflicting with
the frozen P3 statement that the example figures exclude refunds. In particular,
P10 adds an unestablished mechanism for refund exclusion.

Neither candidate may enter the accepted manifest. All generation attempts,
audits, sidecars, review documents and their source responses remain retained
as evidence; no generated artifact was edited into accepted evidence.

- **S4 P8:** the added explanation attributes apparently missed delivery windows
  to observational gaps. It could weaken the meaning of the frozen distributor
  ledger observation or invite an unsupported reconciliation with S3. P6 and P16
  also invent recordkeeping limitations. Review these against S4/P2–P3.
- **S5 P6 and P16:** the operator says refund exclusion cannot be confirmed.
  Although the passages discuss raw extraction and reconciliation, this could
  undermine the frozen statement that the example figures exclude refunds. P10
  adds an unestablished mechanism for refund exclusion. Review these against
  S5/P2–P4 before considering acceptance.
- **Prompt compliance:** both drafts have all 16 turns, but their six appended
  answers are shorter than the prompted minimum of 105 words. S4 answers are
  92–98 words; S5 answers are 93–101. The unchanged gate measures the complete
  700–900-word interview, not the new per-answer writing instruction. Neither
  result proves full instruction following. The final questions also exceed the
  prompted 15-word maximum.
- **Distractors:** P12 describes workspace/folder organization; P14 describes
  meeting/shift communication or stationery. They introduce operational detail
  outside the gold answers. Their claims about effects on other processes are
  generated assertions, not established facts.

No new real company or person was identified in the appended text during this
read-through. Schema/regex checks alone are not a universal entity detector. No
gold paragraph was changed. Original provider responses are retained unaltered
and are not silently edited into accepted evidence.

## Failures and budget

S1, S2 and S3 each failed three attempts with `INTERVIEW_WORD_TARGET`. Their
existing short accepted cores remain intact. S5's first attempt also failed.
There were 12 new requests in total, including the valid attempts; both the
per-source and global limits are exhausted. Re-running the generator exits 1
from checkpoints without making another provider request.

`audit.json` contains every attempt's word count, per-turn word counts, actual
token usage and validation result. Generation sidecars bind the model, prompt
hash, core hash, raw output hash and actual timestamp. The original round's ten
outputs and records remain unchanged in the parent directory.

Verify with:

```sh
pnpm exec node scripts/corpus/auditRegeneration.mjs
pnpm exec node scripts/corpus/verify.mjs
pnpm exec node --test scripts/corpus/checks.test.mjs
pnpm exec node scripts/corpus/verifyPreservedCorpus.mjs
```
