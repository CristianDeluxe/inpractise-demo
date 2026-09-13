# TODO

> Consolidated from the accessible Claude, Codex, Cursor, and Antigravity
> project history. Last reviewed: 2026-09-13. History coverage: Partial.
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
      because the handler validates every non-OPTIONS request through
      `auth.getUser(token)` and forwards that token so RLS applies. Test
      missing, forged and expired tokens.

- [ ] **Strict structured answer contract.** Model returns cited claims only;
      missing or invalid passage IDs, or malformed JSON, are an error rather
      than a silent answer. A provider failure must render as an error, never as
      `no_evidence`.

- [ ] **Request allowances.** Debit a fixed per-principal allowance before the
      provider call, including calls that then fail. Persist real usage totals
      and mark missing usage unknown.

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

- [!] **Working-tree secret scan flags historical SHA-256 values.** Briefing K
  ran `pnpm check:security`; gitleaks exited 1 with three `generic-api-key`
  matches in `corpus/generated/briefing-i/before-hashes.json` at lines 64, 77
  and 131. Each value was independently recomputed and matches the file hash for
  `countTokens.mjs`, `tokenizer.mjs` or `loadApiKey.mjs`; none is a credential.
  The smallest next step is a narrowly scoped checksum false-positive policy
  that retains credential detection, followed by `pnpm check:security`. No
  scanner rule or exclusion was weakened. Redacted evidence is in
  `work/briefing-k/gitleaks-redacted.json`.

- [~] **Upstream ESLint 10 peer metadata.** Strict runtime lint passes, but
  `pnpm peers check` exits 1 for `eslint-plugin-import@2.32.0`,
  `eslint-plugin-jsx-a11y@6.10.2`, and `eslint-plugin-react@7.37.5`: their
  published ranges stop at ESLint 9. Keep the required ESLint 10 baseline; adopt
  compatible upstream releases when available. No metadata override or lint
  suppression masks this. See `docs/baseline.md`.

- [ ] **Run the prepared CI workflow on a remote once one is authorized.** Local
      `check:ci`, `check:quality` and conformance gates pass; the separate
      security scan has the checksum findings recorded above. This repository
      still has no remote or commits; no GitHub job has executed. Full corpus
      replay additionally needs the ignored raw snapshots, while CI
      intentionally runs the corpus unit/tamper tests without those snapshots.

- [ ] **Owner-authorized Cloudflare Pages publication.** Preparation is in
      `docs/deploy.md`; explicit static routing and noindex are configured.
      Owner must resolve the signup and claim-revocation findings, choose the
      account/project, and authorize creation/upload. No deployed URL is
      assigned by this task; no DNS dependency is required.

- [ ] **Pin the Supabase CLI to 2.75.0** and confirm the flags the plan relies
      on (`functions deploy --project-ref`, `--no-verify-jwt`,
      `secrets set --env-file`, `db push --dry-run`) resolve on the installed
      binary before depending on them.

## Documentation

- [ ] **Rehearse the two-minute script against an authorized deployment.**
      `docs/demo-script.md` contains a 120-second sequence, exact local URLs,
      live questions, refusal/premium-denial steps and timed failure fallback.
      Replace the local origin with the actual deployed URL after publication;
      no deployed rehearsal is claimed.

## Pending Decisions

- [ ] **Whether this repository gets a remote.** It has none. Creating one is
      the owner's call, and the repository carries an ignored `.env.remote` with
      live credentials, so the decision includes confirming nothing secret is
      tracked before any push.

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
