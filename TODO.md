# TODO

> Consolidated from the accessible Claude, Codex, Cursor, and Antigravity
> project history. Last reviewed: 2026-09-14. History coverage: Partial.
>
> States: `[ ]` pending · `[~]` partial or unverified · `[!]` blocked · `[x]`
> verified complete · `[-]` obsolete or superseded. Closed work moves to
> `TODO_LOG.md`.

The project was created on 2026-09-13, so the only history is the Claude session
that created it and the six Codex runs it launched. Two of those runs were still
executing when this backlog was written and are recorded as partial.

The authority for the build is `docs/research/07-one-day-execution-plan.md`.
Where it disagrees with the earlier specifications in the same directory, the
plan wins.

## Backend

- [ ] **Record the follow-up rewrite's token usage.** `resolveQuery` spends one
      short completion per follow-up and passes a no-op usage callback, because
      `record_request_usage` stores one set of totals per request and a second
      call would overwrite the generation's. Smallest step: add a
      `rewrite_tokens` column and a second RPC, or sum both calls client-side in
      `askStages` before one `recordUsage`. Found 2026-09-15 while adding
      follow-ups to the chat.

- [ ] **A broad multi-part `investigate` question occasionally exceeds the
      4-claim array cap, not the per-claim length cap.** Live against the
      deployed function, "What does Costco say about membership fee income?"
      returned `partial` on two calls and `invalid_model_answer` ("claims/
      too_big") on a third, with nothing else changed; a two-company, two-topic
      question ("How does Rolls-Royce describe its exposure to supply chain and
      raw material risk compared to how Microsoft describes its cybersecurity
      risk?") hit the same array-length `too_big` on both the first attempt and
      the length-focused retry, so it still surfaces as an error after the
      2026-09-16 investigate hotfix. That hotfix's retry
      (`synthesisRetryTranscript.ts`) restates the 500-character per-claim limit
      but says nothing about the 4-claim array limit
      (`ProviderAnswerSchema.claims.max(4)`), so it does not help when the
      model's extra granularity is more claims rather than longer ones. Found
      2026-09-16 while verifying that hotfix live; see `docs/deploy.md`.
      Smallest step: have the retry prompt also say "at most 4 claims,
      consolidating related points" when the schema failure is the `claims`
      array itself rather than one claim's `text`.

## Frontend

- [ ] **Register the router types.** `@tanstack/react-router` has no
      `declare module` `Register` block here, so `useSearch`, `useNavigate`
      options and `Link` search props are `any`; `useResearchWorkspace`
      re-parses `location.search` through `companySearchSchema` to stay typed.
      Smallest step: add the `Register` interface for `router` in
      `src/routes/router.ts` and drop the manual parse. Found 2026-09-15 while
      moving the company scope to the URL.

- [!] **Freeze the frontend/backend response boundary.** The connected redacted
  diagnostic report now exists on both sides: `ask` carries `diagnostics` for an
  unrestricted reviewer and `debug` carries `recentRequests`, both deployed and
  verified live. The remaining open points are the absent first-passage pointer,
  directional neighbors and fingerprint/usage metadata. Do not fabricate these
  fields.

## Infrastructure

- [!] **CI is red on `main`: `jscpd` duplication (1.08%) exceeds the 1.0%
  threshold.** GitHub Actions run 35041706617 (commit `e135dd1`, the first CI
  run to cover the `wf/intl-filing` annual-report ingestion merged as `0ce60d8`)
  failed `check:ci` on `baseline-dupes` alone; every other check in that job
  (type-check, lint, deno, format, edge and vitest suites, corpus checks, knip)
  passed. The prior green run (`d3caa6b`, run 35036070675) measured 0.78% (13
  clones); the five new clones are all in the annual-report corpus scripts added
  by that merge: `corpus/buildAnnualReportDocuments.mjs` duplicates
  `corpus/buildPublicDocuments.mjs`, and likewise
  `prepareAnnualReportReview.mjs`/`prepareReview.mjs`,
  `verifyAnnualReportCandidates.mjs`/`verifyReviewCandidates.mjs`, and
  `verifyAnnualReportDocument.mjs`/`verifyPublicDocument.mjs`. This was
  undetected locally because of the `pnpm dupes` ENOEXEC bug below, which
  silently skipped the check on this machine before every commit in that merge.
  The deployed application on `https://inpractise.cristiandeluxe.dev` is
  unaffected: the 2026-09-16 release probes and `docs/deploy.md` confirm it is
  live and correct; only the CI badge on `main` is red. Smallest step: extract
  the shared logic between each annual-report/public pair into one imported
  helper (matches the file-per- responsibility convention anyway), then confirm
  with `pnpm dupes` on a machine where the ENOEXEC bug does not reproduce, or
  re-run the GitHub Actions job after the fix.

- [!] **`pnpm dupes` and `pnpm check:quality` (type-coverage) fail with
  `spawnSync pnpm ENOEXEC` on this machine.** Both `baseline-dupes` and
  `baseline-type-coverage` (from `@syntopica/quality-config`) shell out to
  `pnpm` via `spawnSync('pnpm', ...)`, and that spawn fails on this Mac's pnpm
  shim regardless of branch: reproduces identically on a clean `main` checkout
  with no code changes. `baseline-type-coverage` reports every workspace as
  `FAIL` with empty output; running `type-coverage --strict` directly against
  each tsconfig (node/app/supabase/functions) passes at 99.7-99.8%, confirming
  the spawn itself is what fails, not the coverage. `pnpm check:ci` otherwise
  passes in full (type-check, lint, deno check, format, edge and vitest suites,
  corpus checks, knip). Found 2026-09-16 while finishing the latency work on
  `wf/latency`; confirmed to also hit type-coverage 2026-09-16 while merging
  `wf/notes`/`wf/latency`/`wf/crossref`/`wf/research-agent` into `main`.
  Smallest step: check whether `@syntopica/quality-config`'s spawn uses
  `shell: true` or resolves the pnpm binary path directly; compare against a
  machine where `pnpm dupes` succeeds.

- [ ] **`pnpm db:verify` fails on a stale table list.** `scripts/db/verify.ts`
      asserts the exact set of public tables and does not know about
      `query_embeddings` or `research_notes`, added by
      `20260915000014_query_embedding_cache.sql` and
      `20260915000013_research_notes.sql`. Not touched while adding the
      `annual_report_pdf` migration and import (`wf/intl-filing`); counts were
      confirmed instead with `reportDatabaseCounts`. Found 2026-09-16. Smallest
      step: add both table names to the expected list in `verifyDatabase`.

- [~] **Upstream ESLint 10 peer metadata.** Strict runtime lint passes, but
  `pnpm peers check` exits 1 for `eslint-plugin-import@2.32.0`,
  `eslint-plugin-jsx-a11y@6.10.2`, and `eslint-plugin-react@7.37.5`: their
  published ranges stop at ESLint 9. Keep the required ESLint 10 baseline; adopt
  compatible upstream releases when available. No metadata override or lint
  suppression masks this. See `docs/baseline.md`.

- [ ] **`pnpm test:ci` fails its own branch-coverage threshold (80%) even on a
      clean checkout.** `vitest.config.ts` sets `coverage.include` to
      `src/**/*.{ts,tsx}` and `supabase/functions/_shared/**/*.ts`, but
      `_shared/**` is exercised only by the Deno edge suite (`pnpm test:edge`),
      never by Vitest, so files like `_shared/search/retrieveCandidates.ts` and
      `_shared/http/errorFrame.ts` report 0% and drag the global branch number
      under 80% (measured 79.6% on `227d099`, unrelated to any code change).
      Because `test:ci` is `vitest run --coverage && pnpm test:edge`, the `&&`
      also means a coverage-threshold failure skips the edge suite entirely when
      run through this one script; run `pnpm test:edge` directly to get a real
      signal meanwhile. Found 2026-09-16 while shipping the investigate/compare
      hotfix, whose own tests passed in full (unit and edge) with only this
      global threshold red. Smallest step: drop `supabase/functions/_shared/**`
      from Vitest's `coverage.include` (it has no Vitest tests to instrument) or
      raise it via the Deno suite's own coverage instead.

## Documentation

- [~] **Rehearse the two-minute script against an authorized deployment.** Every
  request in `docs/demo-script.md` has now been timed against
  `https://inpractise.cristiandeluxe.dev` as the demo reviewer and each fits the
  script's 8-second budget once the function is warm; the measurements and the
  required warm-up are recorded in the script itself. What remains is a person
  reading the narration against a clock, which no automated run can stand in
  for.

## Pending Decisions

- [ ] **Reranking stays off by default.** The first condition is now met:
      `pnpm check:ci` exits 0 and the local gates pass. What is still missing is
      a gold report from a run of the Voyage `rerank-2.5` experiment, which
      costs provider calls and a key this repository does not hold. Enable it
      only if that report shows a gain with no new failures.

## Notes that change how commands behave

- The Supabase project reference lives in the ignored `.env.remote`. Create and
  change project resources with that project's own token, never through an MCP
  server authenticated as another account.

- Node here is v24.20.0, not the v26.8.2 the execution plan claims to have
  observed. Set `engines` accordingly and do not trust that plan's version
  inventory without checking.
