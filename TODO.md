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

## Documentation

- [!] **Resolve the identity scan's historical-artifact exception.** The exact
  recursive search from the identity briefing also reads ignored `work/` logs,
  backup snapshots and caches, plus another session's `.superpowers/` records.
  Those retain the retired name. They were preserved pending the owner's cleanup
  decision; source and documentation use the new identity. Next: confirm whether
  to preserve these historical artifacts as explicit exceptions or authorize
  scrubbing them. Credential and frozen files stay untouched.

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

- The Supabase MCP server on this machine authenticates as `cristian@favish.com`
  and can therefore only see the Favish organisation. This project was created
  with the personal account's token in the `PixelPotion` organisation; the
  project reference is in `.env.remote`. Do not create project resources through
  that MCP server.

- Node here is v24.20.0, not the v26.8.2 the execution plan claims to have
  observed. Set `engines` accordingly and do not trust that plan's version
  inventory without checking.
