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

- [ ] **Edge function `research`.** One endpoint, `verify_jwt=false` only
      because the handler validates accepted research requests through
      `verifyToken` (`GET /auth/v1/user`) and forwards that token so RLS
      applies. `supabase/config.toml` has no function-specific JWT setting;
      verify the deployed setting and missing, forged and expired tokens. See
      ADR 0002.

- [ ] **Strict structured answer contract.** Model returns cited claims only;
      missing or invalid passage IDs, or malformed JSON, are an error rather
      than a silent answer. A provider failure must render as an error, never as
      `no_evidence`.

- [ ] **Request allowances.** Debit a fixed per-principal allowance before the
      provider call, including calls that then fail. Persist real usage totals
      and mark missing usage unknown. Source inspection on 2026-09-14 found no
      debit or usage ledger in `handleAsk.ts`/`requestCompletion.ts`; older
      allowance claims in `docs/evals.md` and `docs/demo-script.md` are not
      implementation evidence. Reconcile those claims when implementing the
      control.

## Corpus

- [!] **Expanded synthetic interviews: budget exhausted; semantic review
  pending.** Briefing I used 12/12 requests (29,038 tokens). S1–S3 failed all
  three attempts at 615–686 words; their short cores remain. S4 (710 words) and
  S5 (702) pass the unchanged automatic gate but remain outside the accepted
  manifest. Review `corpus/generated/briefing-i/REVIEW.md`: S4/P8 speculates
  about missed windows, and S5/P6/P16 may undermine the frozen refund exclusion.
  The smallest next step is owner review of those exact drafts; further paid
  generation requires a new explicit budget and revised prompt. All 24 accepted
  gold paragraphs and all six short documents remain byte-identical.

## MCP

- [ ] **Give the MCP server its own member.** It currently signs in as the
      seeded basic persona, which the browser tests also use, so a quota or
      lockout in one surface is felt by the other. Seed a dedicated MCP member
      in the same org and tier and point `.mcp.json` at it.

## Testing

- [ ] **Verify partial citation revocation and empty-answer messaging.**
      `authorisedClaims.ts` retains a multi-source claim if any reference
      remains; `buildAskResult.ts` reports access changed whenever no claims
      survive, including an ordinary generated zero-claim refusal. Source
      inspection on 2026-09-14; existing revocation tests cover single-source
      claims only. Add focused cases and decide whether partial evidence loss
      requires rejecting the whole claim; no concurrent revocation guarantee is
      established.

- [ ] **Bound cached browser-probe teardown.** The repeated
      `work/lovable2/browser.mjs` probe completed all six scenarios and Chrome
      exited, but its externally cached Playwright 1.58.2 Node runner remained
      stuck in `browser.close()` for over three minutes. The owned runner was
      stopped with SIGTERM; the extended probe exited normally. Add a bounded
      teardown supervisor or move to a repository-owned test runner while
      preserving assertion failures. Evidence:
      `work/lovable3/previous-probe.log` and the Lovable3 `FINDINGS.md`.

- [ ] **Investigate intermittent workspace-test readiness.** One `pnpm test:ci`
      run timed out after 1060 ms at `src/app/states.test.tsx:29` while awaiting
      the Source library heading; the other 132 tests passed and earlier full
      runs passed. The test and workspace code are unchanged by the landing
      restoration. Trace lazy-route readiness against the default one-second
      Testing Library wait before changing its timeout. Evidence:
      `work/lovable3/intermittent-test-ci.log`.

- [ ] **Exercise concurrent publication and a late passage insert.** Existing
      immutability/publication tests pass and parent locking is implemented, but
      the backend report records no concurrency race test. Add a transactional
      integration test proving a late insert cannot change published evidence.

- [ ] **Context selection drops a retrieved answer on a two-document company.**
      Measured by `F03`: the two-per-document diversity cap fills all four
      context slots at ranks 1-4, so Costco's fiscal-year passage at ranks 5-6
      never reaches the model and the system refuses. Decide whether to backfill
      the unused context budget by rank once every document has had its cap, or
      to keep the cap and the refusal. Evidence in `docs/evals.md`.

## Frontend

- [!] **Freeze the frontend/backend response boundary.** Strict UI parsers
  follow current source, while list's documented bound is ten and backend bound
  is fifty. Owner must reconcile that bound and the still-absent first-passage
  pointer, directional neighbors, fingerprint/usage metadata and connected
  redacted diagnostic report. Do not fabricate these fields.

- [ ] **Reduce the shared SPA entry bundle.** Route-level chunks are split; Vite
      still reports the shared entry above its default 500 kB warning. Inspect
      dependency contribution before choosing a further split.

## Infrastructure

- [ ] **Reconcile Knip configuration hints.** `pnpm knip` exits 0 but reports
      four hints for top-level entry/project fields, the dependency-cruiser
      ignore and CSS import coverage. Inspect `knip.config.ts` against the
      installed configuration schema and preserve actual source coverage.
      Evidence: `work/lovable2/final-knip.log`.

- [!] **D1 publication stopped at the credential gate.** `pnpm check:security`
  exited 1 with six findings: three recomputed SHA-256 checksums in
  `corpus/generated/briefing-i/before-hashes.json`, two allowed Supabase
  publishable-key occurrences in ignored `dist/`, and one actual OpenAI key in
  ignored `.env.functions.remote`. That credential file has never been tracked;
  known private environment values were absent from 717 historical Git blobs and
  20 build files. No credential exposure was established. The briefing
  explicitly requires stopping on an actual credential finding. The smallest
  next step is owner clarification that this ignored credential is an expected
  local input and publication may resume. No scanner rule was changed. Redacted
  evidence: `/tmp/lovable-work/d1-source-redacted.json` and
  `/tmp/lovable-work/d1-history-redacted.json`.

- [~] **Upstream ESLint 10 peer metadata.** Strict runtime lint passes, but
  `pnpm peers check` exits 1 for `eslint-plugin-import@2.32.0`,
  `eslint-plugin-jsx-a11y@6.10.2`, and `eslint-plugin-react@7.37.5`: their
  published ranges stop at ESLint 9. Keep the required ESLint 10 baseline; adopt
  compatible upstream releases when available. No metadata override or lint
  suppression masks this. See `docs/baseline.md`.

- [ ] **Run the prepared CI workflow now that the remote exists.** Local
      `check:ci`, `check:quality` and conformance gates pass, and the repository
      is published at `CristianDeluxe/inpractise-demo`, but no GitHub job has
      executed yet. Installation needs private `@busirocket` package access and
      the `file:../max-lane` dependency, so the workflow cannot run on a clean
      runner as written. Full corpus replay additionally needs the ignored raw
      snapshots, while CI intentionally runs the corpus unit/tamper tests
      without those snapshots.

- [ ] **Pin the Supabase CLI to 2.75.0** and confirm the flags the plan relies
      on (`functions deploy --project-ref`, `--no-verify-jwt`,
      `secrets set --env-file`, `db push --dry-run`) resolve on the installed
      binary before depending on them.

## Documentation

- [ ] **Rehearse the two-minute script against an authorized deployment.**
      `docs/demo-script.md` contains a 120-second sequence, exact local URLs,
      live questions, refusal/premium-denial steps and timed failure fallback.
      The script now targets `https://inpractise.cristiandeluxe.dev`, which is
      live and route-verified, but no timed rehearsal against it has been run.

## Pending Decisions

- [ ] **Reranking stays off by default.** Enable the Voyage `rerank-2.5`
      experiment only if the core gates already pass, and only if the same gold
      report shows a gain with no new failures.

## Notes that change how commands behave

- The Supabase MCP server on this machine authenticates as `cristian@favish.com`
  and can therefore only see the Favish organisation. This project was created
  with the personal account's token in the `PixelPotion` organisation; the
  project reference is in `.env.remote`. Do not create project resources through
  that MCP server.

- Node here is v24.20.0, not the v26.8.2 the execution plan claims to have
  observed. Set `engines` accordingly and do not trust that plan's version
  inventory without checking.

## Shared package scope migration (2026-09-14)

- [ ] After the owner publishes the renamed shared packages, regenerate the lockfile and run the existing repository quality gate. Source references now use the new scope; the lockfile is intentionally unchanged because the packages are not published.
