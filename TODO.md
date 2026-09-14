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

## Corpus

## Testing

- [ ] **Handle lock-upgrade deadlocks for transactional publishers.** The
      synchronized staging/publication regression produces one `40P01` abort:
      both transactions hold foreign-key key-share locks before publication
      requests `FOR UPDATE` on the same document. Atomicity is preserved; the
      losing transaction must retry. The current importer uses separate REST
      operations, so this is not evidence it encounters this exact staging
      pattern. Next: evaluate locking the parent before staging for callers that
      combine both operations in one transaction, or add bounded
      whole-transaction retry. Evidence:
      `tests/integration/publication-concurrency.test.ts`.

## Frontend

- [!] **Freeze the frontend/backend response boundary.** The remaining open
  points are the absent first-passage pointer, directional neighbors,
  fingerprint/usage metadata and connected redacted diagnostic report. Do not
  fabricate these fields.

## Infrastructure

- [~] **Upstream ESLint 10 peer metadata.** Strict runtime lint passes, but
  `pnpm peers check` exits 1 for `eslint-plugin-import@2.32.0`,
  `eslint-plugin-jsx-a11y@6.10.2`, and `eslint-plugin-react@7.37.5`: their
  published ranges stop at ESLint 9. Keep the required ESLint 10 baseline; adopt
  compatible upstream releases when available. No metadata override or lint
  suppression masks this. See `docs/baseline.md`.

- [~] **CI install fixed locally; no clean-runner run yet.** Run `34801318491`
  stopped at `pnpm install --frozen-lockfile` for two reasons, both now
  addressed. The five shared config packages are published under `@syntopica/*`
  at the exact versions this repository pins, `@busirocket/*` is retired, and
  the lockfile was regenerated in the same commit as the rename - the mismatch
  between the two, not the rename itself, is what broke that run.
  `@cristiandeluxe/max-lane`, available only as the sibling `file:../max-lane`,
  is now an optional dependency used exclusively by the local `evals/` harness,
  and `type-check:ci` / `lint:ci` exclude that directory, so a runner without
  the sibling passes `check:ci` (verified locally with the package unlinked,
  exit 0). Next: confirm on the next push that every job is green on a real
  runner.

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
