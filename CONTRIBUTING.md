# Contributing to In Practise Demo

This is an independent engineering demo, not an In Practise product. Preserve
public/synthetic source disclosures and the three evidence, retrieval-diagnosis
and database-authorization properties in the [README](README.md). The
[execution plan](docs/research/07-one-day-execution-plan.md) governs intended
scope; explain deviations with source evidence and an ADR when they change a
significant decision.

## Set up

Follow [README local setup](README.md#run-locally) for Node 24.20.0, pnpm
12.4.1, the optional `@cristiandeluxe/max-lane` judge dependency, and browser
configuration. `pnpm check:ci` is the gate a clean checkout can run; the wider
`pnpm type-check` and `pnpm lint` additionally cover `evals/` and need the
sibling `file:../max-lane` checkout. Member accounts are provisioned by the
project owner; signing up is not the setup procedure. The
[MCP guide](docs/mcp-install.md) covers its separate three-variable direct
environment and optional resolved-name overrides.

Do not regenerate the corpus, reapply provisioning or change credentials merely
to run a check. Full verification uses existing ignored credentials, SQL link
metadata, raw snapshots and embedding artifacts. `scripts/db/loadTarget.ts` also
requires the canonical checkout path; moving a copy does not establish that its
integration gate works. Preserve ignored inputs when moving worktrees.

## Branches, commits and hooks

There is no local branch-name validator, enforced branch prefix, or pre-commit
ban on `main` in this repository. The prepared GitHub workflow targets pushes
and pull requests to `main`; remote branch protection is not established by
these files. Use a focused branch for a reviewable change without describing
that preference as an enforced rule.

[commitlint.config.mjs](commitlint.config.mjs) loads the installed
`@syntopica/quality-config` factory, which extends Conventional Commits. The
commit type must be lowercase and one of `feat`, `fix`, `docs`, `style`,
`refactor`, `perf`, `test`, `build`, `ci`, `chore` or `revert`. A subject is
required, must not end in a period, and the whole header is limited to 100
characters. Scope is optional. Subject-case checking and body/footer line-length
limits are disabled; a blank line before body/footer is a warning. An accepted
subject example is:

```text
docs: clarify MCP installation
```

Use the existing human Git identity. Write code, documentation and commits in
English. Do not add generated-by or assistant co-author attribution.

[lefthook.yml](lefthook.yml) defines:

| Hook         | Actual check                                                                                                                                                                     |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pre-commit` | Parallel Oxlint and ESLint on staged JS/TS/Vue/Astro files, with warnings denied; Prettier checks staged code, JSON, Markdown, CSS and YAML. These checks do not auto-fix files. |
| `commit-msg` | Commitlint validates the proposed message file.                                                                                                                                  |
| `pre-push`   | The working-tree secret scan runs before push. It is not the complete advisory/security gate.                                                                                    |

The installation `prepare` script installs these hooks. Passing them does not
replace type-checking, tests or the full gates. Never use the package's
suppression-generation script to silence lint failures.

## Verify a change

Before opening a change, run the credential-free CI gate and build:

```sh
pnpm check:ci
pnpm build
```

`check:ci` runs Oxlint, all three TypeScript projects, native Deno checking,
ESLint, formatting, offline Vitest coverage, corpus unit/tamper tests, duplicate
detection and Knip. It does not run authenticated database integration or call
answer providers.

The full gate is named `pnpm verify`: it additionally runs dependency/type
quality, full integration coverage, corpus replay, database audit and baseline
conformance. This is a **command reference, not an instruction executed in the
2026-09-14 documentation pass**: it invokes `db:verify`, which this pass
explicitly prohibits. Use it only with the existing owner-provided inputs and an
authorized verification scope. The separate security gate is documented in
[baseline.md](docs/baseline.md); a CI/build pass is not a clean secret-scan
claim. CI source/history/workflow security runs without project installation,
while verify, quality and dependency advisories remain install-dependent until
the documented package and lockfile remediation is complete.

## Route test readiness

Always await `renderRouteFixture(path, runtime)`. It awaits the router's lazy
component loading before mounting the route, so cold module transformation does
not consume the first DOM assertion's default one-second wait. Session and
request effects remain observable after mounting, including deliberate pending
responses. `pnpm test:ci` includes a deferred-import regression for this
contract. Do not increase a wait timeout to cover unfinished fixture setup.

## Browser probe

The repository-owned Playwright Test 1.58.2 runner replaces the historical
`work/lovable2/browser.mjs` script and its external cache path. After completing
the normal repository installation, run:

```sh
pnpm browser:install
pnpm test:browser
```

The browser installation stays under `node_modules`. The runner builds the app
with dummy public configuration and starts its own preview at
`http://127.0.0.1:4197`; that port must be free. It never reuses or stops
another server. Six scenarios cover 1440/390/320px with reduced and normal
motion, canvas initialization, ticker/reveal/parallax behavior, horizontal
layout, protected-route sign-in invitations and reloads. External HTTPS requests
are blocked, and only the existing font hosts may be requested. No member
password, remote database or provider call is needed.

Playwright owns browser/context teardown. Each test has a 30-second budget; the
repository browser fixture has an explicit 10-second setup/teardown budget (the
built-in browser fixture has none). A 180-second global run limit and no retries
bound the complete run. Assertion failures and teardown timeouts produce a
nonzero exit. Diagnostic artifacts go under ignored `work/browser-results`.
Browser helpers have a separate `tests/browser/tsconfig.json` with DOM types;
Node tooling and Edge modules retain their existing runtime boundaries.
`pnpm type-check` includes this fourth project.

## Architecture rules

Each source file has one top-level unit and one responsibility. Extract helpers,
constants, types and hooks into separate files and import them explicitly. No
re-export barrels, grouped utilities or lint suppressions.

For a concrete example, [mcp/createServer.ts](mcp/createServer.ts) exports
`createServer` and explicitly imports
[registerSearchResearch.ts](mcp/registerSearchResearch.ts),
[registerFetchPassage.ts](mcp/registerFetchPassage.ts) and the
[ResearchSession type](mcp/ResearchSession.ts). Keep a new tool's registration,
schema and supporting types in their own files; do not accumulate them in the
server factory.

Browser code belongs to `tsconfig.app.json`, Node tooling to
`tsconfig.node.json`, and Edge functions to `supabase/functions/tsconfig.json`
plus native Deno checking. Do not add Node ambient types to Edge modules.
[Architecture](docs/architecture.md) maps request responsibilities to real
files.

## Backlog and review evidence

Read [TODO.md](TODO.md) at the start and end of related work; search
[TODO_LOG.md](TODO_LOG.md) before reopening a task. Update an existing entry for
a discovered bug or missing validation, with observation, evidence and the
smallest next step. States are `[ ]` pending, `[~]` partial/unverified, `[!]`
blocked, `[x]` verified complete and `[-]` superseded. Move closed work into the
dated year/month section of TODO_LOG.md and remove it from the active backlog.
Consult `TODO_HISTORY_INDEX.jsonl` before reviewing past conversations;
unchanged complete or irrelevant records need not be parsed again.

A reviewer should receive the concrete before/after behavior, every affected
surface, exact verification commands and results, and explicit limits. Separate
source inspection, offline tests, recorded live evidence and newly executed live
checks. Explain plan deviations; do not hide measured failures or substitute
provider errors for refusals. Existing migrations require explicit confirmation
before edits. Frozen corpus and `docs/research/` are historical inputs, not
material to rewrite during maintenance. Preserve `docs/mcp-handshake.jsonl` as
captured evidence.
