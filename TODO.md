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

- [ ] **Final authorization recheck before evidence leaves the response**, so a
      passage that became unauthorized mid-request cannot be returned.

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

- [ ] **Local stdio MCP server with exactly two tools**, `search_research` and
      `fetch_passage`, signing in as a dedicated basic member through the same
      Edge endpoint the browser uses. It never receives a service key and never
      accepts org, user or role arguments. stdout stays protocol-only.

- [ ] **Parity test**: the same principal must get identical authorization
      outcomes through the browser and through MCP, including the denial case.

- [ ] **One real Claude Code session against the server**, with the negotiated
      protocol version recorded. An example transcript is not delivery.

## Testing

- [ ] **Exercise concurrent publication and a late passage insert.** Existing
      immutability/publication tests pass and parent locking is implemented, but
      the backend report records no concurrency race test. Add a transactional
      integration test proving a late insert cannot change published evidence.

- [ ] **Retrieval diagnosis test.** Removing a known gold source must make the
      gate fail. Candidate recall is measured before context selection, and the
      two are reported separately.

- [ ] **Anchor evaluation**: eight questions covering supported, partial,
      conflicting and no-evidence outcomes, run twice live, both runs retained.
      Do not select the better run.

## Frontend

- [ ] **Wire the Lovable UI to the backend.** The owner generates it from the P1
      prompt in the execution plan; the adapter, request functions and types
      stay hand-written and reviewed.

- [ ] **Keyboard focus, selectable quotes, narrow-screen source reading and zoom
      or reflow** all verified by hand before release.

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

- [ ] **Set remote Auth signup policy before publishing login.** The original
      backend inspection found remote `disable_signup=false`; local Supabase
      config does not change the remote setting. Inspect and configure the
      remote policy when the public login flow is authorized. Unseeded users
      have no membership.

- [ ] **Cloudflare Pages direct upload** for the static build, on the assigned
      `pages.dev` URL with no custom DNS dependency. Publish a noindex shell
      early rather than at the end.

- [ ] **Pin the Supabase CLI to 2.75.0** and confirm the flags the plan relies
      on (`functions deploy --project-ref`, `--no-verify-jwt`,
      `secrets set --env-file`, `db push --dry-run`) resolve on the installed
      binary before depending on them.

## Documentation

- [ ] **Move the research documents out of the career knowledge base.** They now
      live at `docs/research/` here; the copies under
      `career/applications/2026-09-inpractise-fullstack-product-engineer/code-project/`
      in the portfolio repository still need removing, with a pointer left in
      their place. Deferred while the running Codex lanes still read them as
      authority.

- [ ] **Product method page**, stating plainly that the corpus is public and
      synthetic, which parts are stubbed, and what the demo does not claim.

- [ ] **Two-minute demo script** rehearsed against the deployed build.

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
