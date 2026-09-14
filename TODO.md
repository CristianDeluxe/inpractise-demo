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

- [!] **Provision the consolidated demo identity and renamed fixtures.** Source
  now defines `demo` as the premium reviewer and retains `basic`, `other` and
  `mcp` for authorization tests. The owner must set `DEMO_PASSWORD`, provision
  the new identities and verify their memberships before login or live
  integration checks. No credential or remote user was changed during the
  identity update. Next: owner provisioning, then `pnpm test:rls` and
  `pnpm test` against the new accounts.

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

## Documentation

- [!] **Resolve the identity scan's historical-artifact exception.** The exact
  recursive search from the identity briefing also reads ignored `work/` logs,
  backup snapshots and caches, plus another session's `.superpowers/` records.
  Those retain the retired name. They were preserved pending the owner's cleanup
  decision; source and documentation use the new identity. Next: confirm whether
  to preserve these historical artifacts as explicit exceptions or authorize
  scrubbing them. Credential and frozen files stay untouched.

- [ ] **Rehearse the two-minute script against an authorized deployment.**
      `docs/demo-script.md` contains a 120-second sequence, exact local URLs,
      live questions, refusal/premium-access steps, test-covered tier denial and
      timed failure fallback. The script now targets
      `https://inpractise.cristiandeluxe.dev`, which is live and route-verified,
      but no timed rehearsal against it has been run.

## Pending Decisions

- [ ] **Reranking stays off by default.** Enable the Voyage `rerank-2.5`
      experiment only if the core gates already pass, and only if the same gold
      report shows a gain with no new failures.

## Notes that change how commands behave

- The Supabase MCP server on this machine authenticates as `<work-account>`
  and can therefore only see the Favish organisation. This project was created
  with the personal account's token in the `<personal-org>` organisation; the
  project reference is in `.env.remote`. Do not create project resources through
  that MCP server.

- Node here is v24.20.0, not the v26.8.2 the execution plan claims to have
  observed. Set `engines` accordingly and do not trust that plan's version
  inventory without checking.
