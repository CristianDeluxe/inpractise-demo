# Demo corpus

The accepted corpus contains **four real public SEC filings, one public UK
annual report and six unchanged short synthetic interviews: 1094 passages
total**. The filings and the annual report contribute 1070 passages. The
interviews contribute 24 passages, all immutable gold: **S1–S6, P1–P4 in each
source**; the gold paragraphs live only in the interviews. Every source carries
its own public or synthetic disclosure. This is an independent engineering demo,
and the corpus is entirely public filings, one public annual report and
synthetic interviews.

## Approved international non-SEC filing

Rolls-Royce Holdings plc's 2024 Annual Report is a PDF, not an SEC filing, so it
exercises document processing beyond US HTML filings. It is a UK premium-listed
company's own regulated public disclosure (Companies Act 2006 s.430; FCA DTR
4.1), fetched directly from its investor-relations site:

| Document                                | Jurisdiction | Reporting period         | Accepted passages |
| --------------------------------------- | ------------ | ------------------------ | ----------------: |
| Rolls-Royce Holdings Annual Report 2024 | GB           | 2024-01-01 to 2024-12-31 |               132 |

- Source URL:
  `https://www.rolls-royce.com/~/media/Files/R/Rolls-Royce/documents/annual-report/2025/2024-annual-report.pdf`
- Fetch date: 2026-09-15
- Selector, acquisition and review live in `corpus/sources-annual-reports.json`,
  `corpus/acquisition-annual-reports.json` and
  `corpus/review/annual-reports.json` (new files, alongside the frozen SEC
  intake, never inside it).
- Manifest `kind` is `annual_report_pdf`, `origin: "public"`,
  `synthetic: false`, `fictional: false`.
- Extraction covers only the strategic-report narrative that corresponds to the
  SEC Item 1 / 1A scope: "Business model" and "Principal risks". Heading
  detection (`locateAnnualReportSections.mjs`) bounds each section between its
  own title and the next one at the same heading size; page furniture, running
  headers/footers, tables and financial statements are excluded the same way
  `isPageFurniture.mjs` excludes SEC page furniture (see
  `isPdfItemFurniture.mjs`).
- Throughput for this document (pages scanned, pages read, blocks, passages,
  parse time) is recorded in `corpus/ingestion-metrics.json` and shown on the
  `/inspect` page next to the existing document/revision/passage/vector counts.

Build and verify after this intake:

```text
BUILD: 11 accepted documents; 1094 passages; 0 public candidates excluded; lexical_only.
PASS: 11 accepted documents; 1094 passages; 24/24 immutable gold paragraphs.
PASS: raw/canonical hashes, deterministic replay, Unicode offsets, attribution, token bounds and S1/S2-only sample.
PASS: 2 isolated revision/access fixtures; 4 acquired SEC candidates; 938 candidate passages replayed from raw HTML.
PASS: 1 acquired annual-report candidate(s); 132 candidate passages replayed from raw PDF bytes.
MODE: public_and_synthetic; public accepted=5; public excluded=0; short synthetic fixtures.
```

The ten pre-existing documents' revision ids and the corpus fingerprint are
unchanged by this intake; `normaliseDocument.mjs` derives the new
`annual_report_pdf` kind and its jurisdiction/reporting-period fields without
altering the canonical payload shape for any other document.

Briefing I explicitly approved the four parsed filings and authorized a new
bounded generation round. That round used 12 requests and produced two drafts
that pass the existing automatic gate, plus ten rejected drafts. The accepted
corpus still contains the original six synthetic documents, byte-identical; the
two reviewable drafts await owner semantic review, with the concerns recorded in
[the review packet](../corpus/generated/briefing-i/REVIEW.md).

## Approved public filings

| Document       | Accession            | Fiscal period | Accepted passages |
| -------------- | -------------------- | ------------- | ----------------: |
| Microsoft 2024 | 0000950170-24-087843 | 2024-06-30    |               356 |
| Microsoft 2025 | 0000950170-25-100235 | 2025-06-30    |               292 |
| Costco 2024    | 0000909832-24-000049 | 2024-09-01    |               141 |
| Costco 2025    | 0000909832-25-000101 | 2025-08-31    |               149 |

Coverage is Item 1 Business and Item 1A Risk Factors as parsed: 938 passages /
65,064 tokens. Tables, financial statements, hidden metadata and page furniture
are excluded. Each accepted public manifest entry has `origin: "public"`,
`kind: "sec_filing"`, `synthetic: false`, `fictional: false`, the SEC
company-disclosure label, the original filing URL, actual retrieval timestamp,
raw hash, normalized hash, rights basis and policy URL.

Reuse follows the
[SEC reuse policy](https://www.sec.gov/about/webmaster-frequently-asked-questions),
which permits reuse of public EDGAR filing content. Artwork and linked
third-party content are outside this intake. Acquisition metadata and complete
primary HTML/submissions JSON remain in `corpus/acquisition.json` and
`corpus/raw/`. The original acquisition used identified, serial requests spaced
at least 600 ms apart, 10-second request deadlines and a 15-minute overall
deadline, stopping on 403/429. Later updates replay those frozen files rather
than fetching from EDGAR again.

[approvals.json](../corpus/review/approvals.json) records the owner's explicit
Briefing I approval against the original reviewed revisions and hashes. Its
timestamp is when the supplied approval was recorded, which is the only review
time on record. The historical
[SEC review packet](../corpus/review/SEC_REVIEW.md) and candidate JSON files
remain unchanged as evidence of what was approved; their pending labels describe
that historical state.

Briefing K corrected the mistaken `origin: "sec_filing"` assignment to
`origin: "public"`. `kind` is the single field for document type (`sec_filing`
or `synthetic_interview`) in normalized documents and active manifest entries;
the duplicate `sourceKind` field has been removed. `sourceType` remains the
existing manifest presentation category (`public_filing` or `synthetic`),
derived from origin; import and identity use `kind`. The six synthetic document
files and both fixture files remain byte-identical.

Recomputing the canonical revision IDs and file hashes restores the exact
original reviewed bytes for all four filings. The manifest's
`reviewedRevisionId`, `reviewedNormalisedPath` and `reviewedNormalisedSha256`
still bind to the unchanged owner approval. The corpus fingerprint was
recomputed from the accepted IDs; approvals, historical review files, raw
filings and passage text are unchanged. Filing dates have day precision:
midnight in `publishedAt` encodes the date, and the time of day carries no
information.

| Document  | Canonical revision ID                                              | Normalized file SHA-256                                            |
| --------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| msft-2024 | `b9620e9fd38751139d31613fa1b4904293dac8d724a7f447074d865b035f3a0f` | `408c15a022dd8f1c6993ddea99a77e350889d1c2aa69a1d2f6c7e8d66d3310ad` |
| msft-2025 | `54c830357a606cc1f1f3a7caa568106ff3a9ebd60f9ffa79bf40f84e4cb410e9` | `3aea7fa18474b8b3e520e386949587a19a554e8b9c42ef7d3b55c0b606fb91c2` |
| cost-2024 | `17576935ad003d8d5fca227b74b3e8d067a6a95235608ff8d95f96dd06296b75` | `09338a7e4115fd30d29a9a14fee47de6d7efd2f528489d548604d20293fc7f16` |
| cost-2025 | `62b1058c4bdc862c14c255b8cd29fe484a798c2438717a9eb3b6e451b15f8ff7` | `a9f55720b4b327141997f07378a011b20f1e8ddb77f28efcf89144bbca223efc` |

## Synthetic generation result

The original prompt and its ten rejected attempts remain untouched. The new
prompt is [generation-prompt-i.txt](../corpus/generation-prompt-i.txt): four
exact core turns followed by six moderator/operator pairs, for 16 turns total.
It requires 105–115 words per appended answer and 10–15 per question, with P12
and P14 devoted to operational distractors. It prohibits new names, quantities,
dates and claims that contradict the gold core.

The model remains `gpt-4.1-mini-2025-04-14`, using strict JSON-schema structured
output and temperature 0.4. The completion ceiling was increased from 2,200 to
3,600 tokens to leave room for the longer JSON structure; all 12 actual outputs
finished with `stop`, not truncation. The existing validation files are
byte-identical: exact gold turns, allowed fields/speakers, sequential IDs,
1,200-code-point bounds, prohibited numeric/entity checks and 700–900 total
words. See the
[model reference](https://developers.openai.com/api/docs/models/gpt-4.1-mini)
and
[structured-output documentation](https://developers.openai.com/api/docs/guides/structured-outputs).

| Source | Attempt word counts | Result                                                                    |
| ------ | ------------------- | ------------------------------------------------------------------------- |
| S1     | 677, 660, 652       | All three rejected: `INTERVIEW_WORD_TARGET`                               |
| S2     | 666, 622, 653       | All three rejected: `INTERVIEW_WORD_TARGET`                               |
| S3     | 680, 615, 686       | All three rejected: `INTERVIEW_WORD_TARGET`                               |
| S4     | 710                 | First attempt passed the automatic gate; semantic review pending          |
| S5     | 656, 702            | First rejected; second passed the automatic gate; semantic review pending |
| S6     | Not generated       | Restricted short core preserved                                           |

The new outputs average 664.9 words versus 431.3 in the old round: the
structured prompt helped length, and even the two automatic passes still
underfill the prompted answer lengths. S4 introduces a possible explanation for
missed windows; S5 introduces uncertainty about refund exclusion. Both wait for
owner semantic review against the frozen facts before import.

The two normalized review drafts contain **32 passages outside the accepted
manifest**, including eight duplicate gold paragraphs and 24 appended turns.
They are visibly synthetic, with invented company/speaker identities, and have
complete transcripts in the review packet. S1–S3 retain their short cores after
exhausting their attempts. The original six accepted sources and their gold
facts remain unchanged, including S4 and S5 while review is pending.

The scheduler gives each of S1–S5 an attempt before retrying failures, stops
retrying successful sources and enforces three per source / twelve globally. A
disk lock excludes simultaneous generator commands. Attempts are checkpointed
before requests; quota/auth/content-filter stops or unresolved interrupted
attempts prevent further calls. Requests have 90-second deadlines within a
10-minute run deadline. An exhausted rerun makes no paid requests and exits 1.

Actual API usage from the response bodies:

| Round                     | Requests | Prompt tokens | Completion tokens | Total tokens | Unknown usage |
| ------------------------- | -------: | ------------: | ----------------: | -----------: | ------------: |
| Original retained history |       10 |         8,120 |             9,617 |       17,737 |             0 |
| Briefing I                |       12 |        14,404 |            14,634 |       29,038 |             0 |
| Combined retained history |       22 |        22,524 |            24,251 |       46,775 |             0 |

The new per-source sidecars and
[audit.json](../corpus/generated/briefing-i/audit.json) record actual
timestamps, model, prompt/core/raw hashes, rejection reasons, word counts and
usage. The original `manifest.generation` stays historical;
`manifest.regeneration` describes the new round. Accepted evidence is defined by
`manifest.documents` alone.

## Import contract

- Read **only `corpus/manifest.json.documents`**. Never glob generated drafts,
  review candidates or access fixtures. Normalized paths use `normalised`.
- Each entry includes document/revision identity, raw and normalized paths and
  hashes, origin/type, rights, source disclosure, access tier, dates, coverage,
  passage/vector counts and source URL where applicable. The importer supplies
  organization membership.
- `revisionId` hashes sorted-key canonical JSON without `revisionId`, followed
  by one LF. `normalisedSha256` hashes the complete file including `revisionId`.
- The normalized document contains `sourceTurns`, `sourceText`, `passages` and
  normalization configuration. Gold passage IDs remain P1–P4. Fragment suffixes
  are deterministic. Half-open Unicode code-point offsets address passage,
  original turn and document text; HTML offsets separately use UTF-16 units.
- Passages have at most 450 tokenizer tokens, 500 with metadata, and 1,200 code
  points. Short gold, moderator, source-paragraph and final-fragment exceptions
  are explicit; text is not padded or combined across speakers.
- The portable corpus artifact remains `indexMode=lexical_only`,
  `vectorCount=0`, with an empty `corpus/embeddings.json`. Database hybrid
  vectors are stored separately under ignored `supabase/.temp/embeddings/` and
  in PostgreSQL; the ingestion record below reports their actual counts.
- `manifest.fixtures` contains separate S5 v2 and Org B S6 fixtures, kept
  outside the accepted sources, the bundle and the generation rounds.
- `corpus/sample.json` remains the original S1/S2-only curated projection.
  Briefing K imports and embeds only accepted sources; expanded review drafts
  stay excluded. Knip registers the regeneration-audit and preservation commands
  as explicit entry points.

## Briefing I command record (historical)

Use repository-local Node **v24.20.0** through pnpm. The existing pnpm workspace
is the installation authority; Cheerio 1.2.0 and js-tiktoken 1.0.21 are
unchanged. These commands were executed from the repository root:

```sh
pnpm exec node scripts/corpus/generate.mjs
pnpm exec node scripts/corpus/auditRegeneration.mjs
pnpm exec node scripts/corpus/build.mjs
pnpm exec node scripts/corpus/verify.mjs
pnpm exec node --test scripts/corpus/checks.test.mjs
pnpm exec node scripts/corpus/verifyPreservedCorpus.mjs
pnpm exec eslint scripts/corpus --max-warnings 0
```

Generation exited **1** because three sources failed. Its final line, also
reproduced by a checkpoint-only rerun without further requests:

```text
GENERATION: 2/5 sources passed; 12/12 attempts; owner review pending.
```

Audit and build exited **0**:

```text
AUDIT: 12/12 attempts; 2/5 expanded drafts passed; 10 rejected drafts; no provider calls.
USAGE: prompt=14404; completion=14634; total=29038; unknown=0.
BUILD: 10 accepted documents; 962 passages; 0 public candidates excluded; lexical_only.
```

Verification exited **0**:

```text
PASS: 10 accepted documents; 962 passages; 24/24 immutable gold paragraphs.
PASS: raw/canonical hashes, deterministic replay, Unicode offsets, attribution, token bounds and S1/S2-only sample.
PASS: 2 isolated revision/access fixtures; 4 acquired SEC candidates; 938 candidate passages replayed from raw HTML.
PASS: 10/10 generation attempts accounted for; indexMode=lexical_only; vectorCount=0.
PASS: 12/12 Briefing I attempts accounted for; 2/5 expanded drafts passed; owner review pending.
MODE: public_and_synthetic; public accepted=4; public excluded=0; short synthetic fixtures.
```

The checks test exited **0**: seven tests passed, zero failed, including source
/ global generation budgets, early success stops, provider stops, Unicode
fragmentation, SEC boundaries and tamper rejection. Strict corpus ESLint exited
**0** with no warnings. The preservation command exited **0**:

```text
PASS: 55 original corpus and validation files remain byte-identical; manifest additions are excluded.
```

Raw command output is retained in `corpus/generated/briefing-i/`. The original
`corpus/verification.json` remains historical. The full gates ran in Briefing K,
below.

## Briefing K ingestion record

`pnpm exec node scripts/corpus/verify.mjs` and
`pnpm exec node --test scripts/corpus/checks.test.mjs` exit 0: ten accepted
sources, 962 passages, 24/24 immutable gold paragraphs and seven corpus tests.
`pnpm exec node scripts/corpus/verifyPreservedCorpus.mjs` confirms 55 original
corpus/validation files and all four approved public file hashes. The six
synthetic normalized files also match the independent Briefing K starting
snapshot byte-for-byte. The two import-vocabulary regression tests exercise
`loadCorpus` and reject a filing kind incorrectly placed in `origin`.

The requested initial `pnpm db:import` exited 1 with
`Embedding missing; run pnpm db:embed`. The importer requires hybrid artifacts
before publishing and resumed the unpublished staging revision after embedding;
no lexical publication or immutable-row conversion was introduced.

Actual `pnpm db:embed` response accounting:

| Run               | Unique accepted texts | Reused | Created | Successful batches | Input tokens | Unknown-usage batches |
| ----------------- | --------------------: | -----: | ------: | -----------------: | -----------: | --------------------: |
| Ingestion         |                   732 |     24 |     708 |                 45 |       54,743 |                     0 |
| Checkpoint replay |                   732 |    732 |       0 |                  0 |            0 |                     0 |

The 962 passages contain 732 unique texts. Embedding deduplicates exact text,
using at most 16 inputs per batch and two concurrent requests; database rows
retain every passage identity even when vectors share a cache artifact. Each
successful batch was persisted before its usage checkpoint was logged. Usage
comes from actual provider responses, counted once per batch, rather than
estimated tokenizer counts or repeated per-vector metadata. Replay made no new
provider calls. The isolated Org B fixture never enters the embedding input.

Local, credential-free evidence is retained under `work/briefing-k/`, including
`embed.log`, `embed-replay.log`, `embedding-usage.json`,
`import-before-embed.log`, `import.log`, `corpus-verify.log` and
`preservation.log`. These operational logs are ignored by Git. The completed
publication totals and full verification record follow.

`pnpm db:import` exited 0 after embedding: eight public revisions published,
twelve synthetic org/document pairs unchanged. The repeated `pnpm db:import`
also exited 0 with `unchanged` for all twenty pairs. Read-only snapshots before
and after replay have identical document, revision and passage table content
fingerprints and counts, proving no evidence changed. The comparison includes
persisted vectors and retained history, not just current revision pointers.
Evidence: `work/briefing-k/import-replay.log`, `database-before-replay.json` and
`database-after-replay.json`; regenerate a snapshot with
`pnpm exec node --import tsx work/briefing-k/database-snapshot.mjs`.

Database counts after publication and replay, measured by read-only SQL:

| Measure                                    | Actual database total |
| ------------------------------------------ | --------------------: |
| Organisation-scoped documents              |                    20 |
| Revisions, including retained history      |                    21 |
| Current revisions                          |                    20 |
| Passages, including retained history       |                 1,928 |
| Stored vectors, including retained history |                 1,924 |
| Unpublished revisions                      |                     0 |
| Retained test documents                    |                     0 |

The twenty documents are two organisation copies of the ten accepted sources.
One prior Org B S6 revision retains four passages and vectors. Its current
isolation fixture contains four lexical-only passages; all other stored passages
have vectors. Source-level corpus counts remain ten documents, ten accepted
revisions and 962 passages. The portable manifest's zero vector count describes
its own artifact, not the populated database.

### Full verification

`pnpm verify` exited **0** after the corpus correction and database publication.
Actual test output:

```text
Test Files  12 passed (12)
     Tests  73 passed (73)
Test Files  18 passed (18)
     Tests  89 passed (89)
```

The separate corpus test runner passed **7 tests, 0 failures**. The two added
Vitest tests guard accepted origin/kind compatibility at the real importer
boundary. Full-suite coverage remained 94.16% statements, 90.25% branches, 100%
functions and 95.36% lines. Strict lint, three TypeScript targets, native Deno,
formatting, zero-clone analysis, Knip, dependency boundaries, type coverage,
corpus replay, live RLS audit and baseline conformance all passed.

The first full-gate attempt exited 1 at Knip because Briefing I's executable
`auditRegeneration.mjs` and `verifyPreservedCorpus.mjs` were absent from its
entry list; the former imports `writeExpansionReview.mjs`, also reported unused.
Registering those two concrete CLI entry points fixed the graph, and that
registration was the whole fix.

The separate `pnpm check:security` exited **1** for three pre-existing
`generic-api-key` matches in the historical `before-hashes.json`. Each was
independently verified as the SHA-256 of `countTokens.mjs`, `tokenizer.mjs` or
`loadApiKey.mjs`, not a credential. Scanner exclusions were unchanged; the
false-positive policy is recorded in `TODO.md`. `pnpm audit:check` separately
exited **0**, reporting zero advisories. `pnpm verify` runs neither command; the
security gate is its own step.

Evidence: `work/briefing-k/verify-first.log`, `verify-final.log`,
`security.log`, `gitleaks-redacted.json` and `audit.log`.

## Annual report publication, 2026-09-16

The `documents.kind` check constraint needed a new migration
(`supabase/migrations/20260916000016_annual_report_kind.sql`, the existing
migration stays immutable) admitting `annual_report_pdf` with a non-SEC
`https://` source URL. It was applied to the deployed project with
`pnpm exec supabase link` then `pnpm exec supabase db push` (dry run first,
confirming exactly that one migration was pending) before any import.

`pnpm db:embed` created 126 new vectors for the 132 `rr-2024` passages (6 reused
from cross-document duplicate text), then `pnpm db:import` published `rr-2024`
for both `org-a` and `org-b`; all twenty pre-existing pairs reported
`unchanged`. `pnpm db:verify` itself fails on an unrelated, pre-existing table
list (`scripts/db/verify.ts` does not yet know about the `query_embeddings` and
`research_notes` tables added by earlier migrations - not touched by this
change), so counts were confirmed instead with `reportDatabaseCounts`:

| Measure                      | Before | After |
| ---------------------------- | -----: | ----: |
| Documents                    |     20 |    22 |
| Revisions, including history |     21 |    23 |
| Current revisions            |     20 |    22 |
| Passages, including history  |  1,928 | 2,192 |
| Stored vectors               |  1,924 | 2,188 |

The deltas are exactly 264 passages and 264 vectors (132 passages times two
organisation copies), and every pre-existing count is unchanged, confirming the
new revision published without touching the frozen documents.

## Remaining work

- The twelve-request Briefing I budget is exhausted. Expanded S1–S3 versions
  need an explicitly authorized new budget and a revised structure; another
  round starts only on that authorization.
- Owner semantic review of the exact S4/S5 drafts is pending, with the concerns
  and passage IDs in the review packet. A rejection leaves the short core in
  place.
- `corpus/raw/` remains ignored by the existing root `.gitignore`; transfer its
  frozen source bytes with the workspace. A normal Git add omits them.
