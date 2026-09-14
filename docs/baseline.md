# Strict BusiRocket baseline

Adopted on 2026-09-13 over the existing database, corpus pipeline and browser
API client. Verification command: **`pnpm verify`**. Security command:
**`pnpm check:security`**. This is an independent demo using disclosed synthetic
interviews and public filings; no private In Practise content is involved.

The source of truth was the read-only `../baseline` repository, especially
`docs/adoption/existing-repo.md`, `docs/quality-gates.md`, the published config
factories and the strict code-policy preset. ESLint and TypeScript were adopted
in the same pass. No ESLint suppression file was generated. No commit was made.

## Packages and runtime

All direct dependencies are exactly pinned in `package.json`; the root
`pnpm-lock.yaml` includes the `scripts/corpus` workspace. Install with
`pnpm install --frozen-lockfile`.

| Package                          | Version                  |
| -------------------------------- | ------------------------ |
| `@syntopica/eslint-config`       | 0.8.0                    |
| `@syntopica/tsconfig`            | 0.3.0                    |
| `@syntopica/prettier-config`     | 0.2.0                    |
| `eslint-plugin-code-policy`      | 0.7.4                    |
| `@syntopica/quality-config`      | 0.11.0                   |
| `@syntopica/create-baseline`     | 0.9.0                    |
| ESLint / TypeScript / Prettier   | 10.9.1 / 6.0.3 / 3.9.6   |
| Vitest / V8 coverage             | 4.1.11 / 4.1.11          |
| React / React DOM                | 19.3.0 / 19.3.0          |
| Vite / React plugin              | 8.3.0 / 6.1.1            |
| Node / pnpm / Deno               | 24.20.0 / 12.4.1 / 2.9.6 |
| Supabase CLI / JavaScript client | 2.75.0 / 2.116.0         |

The frozen lockfile is stale: `package.json` names these five exact
`@syntopica/*` packages while it still resolves the former `@busirocket/*`
names. The exact renamed versions and `@cristiandeluxe/max-lane` are not
published; max-lane is also a sibling-only `file:../max-lane` dependency. A
clean GitHub runner therefore cannot install until the exact packages are
available, max-lane is published or vendored without importing Keychain
credentials, and the regenerated lockfile is committed. CI independently runs
source/history/workflow security before that install gate; no remote run of the
restructured workflow is claimed here.

The repository-local Node binary runs package scripts even if the interactive
shell uses Node 26. pnpm downloads the pinned Deno runtime; its cache stays in
`node_modules/.cache/deno`. The corpus retains Cheerio 1.2.0 and js-tiktoken
1.0.21. Its earlier nested npm lock is preserved, but root pnpm is the ongoing
installation path.

Every peer required by the selected ESLint subpaths is installed directly,
including `eslint-plugin-testing-library`, `@vitest/eslint-plugin`, and
`eslint-plugin-boundaries`. The exact complete inventory is in `package.json`.
Vitest/coverage were updated together, and `supabase>tar` is overridden to
7.5.22 to resolve real audit advisories. No advisory waivers are present.

## Supabase CLI pin and verified flags

`package.json` already pins the CLI dev dependency to exactly `2.75.0`, and
`pnpm-lock.yaml` resolves that version. Use `pnpm exec supabase` so the local
pin is used instead of a possibly different global binary. On 2026-09-14 these
read-only commands all exited 0:

```sh
pnpm exec supabase --version
pnpm exec supabase functions deploy --help
pnpm exec supabase secrets set --help
pnpm exec supabase db push --help
```

The version output was `2.75.0`. Functions help exposes `--project-ref string`
and `--no-verify-jwt`; secrets help exposes `--env-file string`; database push
help exposes `--dry-run`. This verifies flag availability on the installed
binary, not deployment readiness. No function deployment, secret update or
migration push was executed.

## Presets and runtime boundaries

| Surface                 | Configuration                                                                                                      |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Shared lint             | `createBaseConfig`, `createCodeQualityConfig`, then `codePolicy.configs.strict`; warnings fail the gate            |
| Node tooling and corpus | `createNodeConfig`; explicit Node project for `scripts/db`, `tests`, and `vite.config.ts`                          |
| Browser `src/`          | `createViteReactConfig` and `createAccessibilityConfig`; browser globals and explicit app TypeScript project       |
| Edge functions          | Dedicated base-derived TypeScript project with DOM and Deno types, plus native `deno check`; no Node ambient types |
| Formatting              | Shared `@syntopica/prettier-config/base`                                                                           |
| Quality                 | Shared Knip, dependency-cruiser, Oxlint, duplicate and type-coverage policies                                      |
| Hooks and CI            | Baseline Lefthook, commitlint and generated CI conventions; separate offline and local integration entrypoints     |

`tsconfig.json` is a solution referencing the Node, app and Edge projects.
`tsconfig.node.json` extends `@syntopica/tsconfig/node.json`.
`tsconfig.app.json` extends `@syntopica/tsconfig/vite-react.json`.
`supabase/functions/tsconfig.json` extends the strict base and owns its runtime
libraries explicitly. `src/api/tsconfig.json` delegates to the app config for
existing tooling compatibility.

Native Deno resolution is configured in `supabase/functions/deno.json`, with
pinned npm imports resolved from the root pnpm installation. A temporary
negative probe confirmed that the Edge TypeScript project rejects Node's
`process` global. The `.mjs` corpus pipeline stays JavaScript: ESLint, tests,
dependency analysis and duplication checks cover it; TypeScript type coverage
does not measure it.

## React UI integration

Place the incoming UI under `src/`, with the entry at `src/main.tsx`, and keep
API imports pointed at individual files under `src/api/`. The existing
`vite.config.ts` already loads the React plugin and resolves `@/` to `src/`; the
app TypeScript project and dependency graph use the same alias. `vite/client`
supplies browser asset and `import.meta.env` types, as documented by
[Vite](https://vite.dev/guide/features#client-types).

JSX, React hooks, accessible markup, frontend dependency boundaries, and strict
atomic modules are already checked. Tests under `src/**/*.test.{ts,tsx}` are
collected, and production `src/**/*.{ts,tsx}` contributes to the existing 80%
coverage thresholds. A valid temporary React component passed tsc and ESLint;
invalid conditional hooks and missing image alternatives failed their actual
rules. Pure re-export barrels and multiple exported units also failed probes.

The UI still needs its actual HTML/React entry and application dependencies.
This adoption does not invent a page or claim a browser build. Add the UI's
normal development/build commands when its entry exists; retain `pnpm verify`
and the strict configs. Vite transpiles TypeScript without type-checking, so
keep `pnpm type-check` before a production build.
[Vite TypeScript guidance](https://vite.dev/guide/features#typescript).

## Commands

| Command                                                               | What it verifies or changes                                                                                             |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `pnpm verify`                                                         | Full local gate: `check:ci`, `check:quality`, full tests, corpus replay, database audit, conformance                    |
| `pnpm check:ci`                                                       | Oxlint, four TS projects, native Deno, strict ESLint, Prettier, offline coverage/tests, corpus tests, duplication, Knip |
| `pnpm check:all`                                                      | Baseline static gate: type-check, ESLint, Prettier, duplication                                                         |
| `pnpm check:quality`                                                  | Dependency graph and at least 99% TypeScript type coverage                                                              |
| `pnpm type-check` / `pnpm typecheck`                                  | Explicit Node, browser, Edge and browser-test TypeScript projects; the second name preserves compatibility              |
| `pnpm check:deno`                                                     | Native Deno module/type check using its own import map and the installed npm graph                                      |
| `pnpm lint` / `pnpm lint:fast`                                        | Strict ESLint / shared Oxlint, both failing on warnings                                                                 |
| `pnpm format:check`                                                   | Check shared Prettier output without rewriting files                                                                    |
| `pnpm fix`                                                            | Baseline convention: ESLint automatic fixes followed by Prettier                                                        |
| `pnpm lint:fix` / `pnpm format`                                       | Individual formatting/fix commands; review changes and rerun verification                                               |
| `pnpm test:ci`                                                        | Offline Vitest coverage with 80% thresholds, plus native Deno Auth/answer regressions                                   |
| `pnpm test`                                                           | Full suite, including real database/password sessions and persisted embeddings, with coverage                           |
| `pnpm test:rls` / `pnpm test:db`                                      | Focused live authorization / SQL and import integration checks                                                          |
| `pnpm test:corpus`                                                    | Five Node test-runner normalization/tamper tests                                                                        |
| `pnpm corpus:verify`                                                  | Replay retained accepted and candidate corpus artifacts, hashes, provenance, offsets and gold text                      |
| `pnpm db:verify`                                                      | Read-only live schema, grants, RLS, RPC and row-count audit                                                             |
| `pnpm dupes` / `pnpm knip` / `pnpm deps:graph` / `pnpm type-coverage` | Individual shared quality checks                                                                                        |
| `pnpm check:security`                                                 | Working-tree secret scan followed by dependency audit at moderate severity                                              |
| `pnpm secrets:check` / `pnpm audit:check`                             | Individual secret / dependency checks                                                                                   |
| `pnpm conformance`                                                    | `create-baseline --check` against the installed shared baseline                                                         |

`pnpm test` uses controlled lexical query embeddings for search parity while
exercising the local search handler, real MCP transport and live caller-scoped
RLS. Deployed Read parity remains live. It does not invoke paid providers or
claim deployed hybrid search parity. Native Deno provider tests use stubs.

The generated `lint:suppress` and `lint:prune` maintenance commands exist for
baseline conformance but were not run. They are not a remediation workflow for
this repository. `prepare` only installs Lefthook; it never initializes `.env`
files. Lefthook runs the shared staged-file lint/format gates, conventional
commit validation, and the local secret scan before push. No commit was tested
by creating one; commitlint was checked through stdin.

## Fixes at the source

The old `scripts/db/architecture.ts` and `scripts/db/format.ts` were deleted
after strict ESLint and Prettier covered their responsibilities. Compound CLI
operations, corpus verification/generation/acquisition helpers, database
row/schema types, validators and client transport operations were split into
explicit imports. Validator/selector/mapper paths follow the strict policy.

Input envelope guards now use `Object.hasOwn`. Missing environment keys, missing
vectors, invalid report paths and malformed embedding artifacts throw explicit
errors instead of falling back to an empty value or relying on a cast. Six new
boundary/context-budget tests cover these cases and the eight passage,
two-per-document and 4,000-token context limits. Existing assertions were
preserved when tests were split into atomic files.

Database clients use types generated read-only from the existing public schema;
row, insert, update and RPC types are each separate units. HTTP cancellation
keeps its abort and late-result guarantees after extracting the asynchronous
request operation. The full cancellation, contract, evidence and database suites
pass after the refactor.

## Explicit configuration exceptions

- `security/detect-non-literal-fs-filename` is disabled in one commented block
  only for local `scripts/db/**/*.ts` and `scripts/corpus/**/*.mjs`. These tools
  intentionally read computed artifact paths; corpus loaders validate path
  containment and hashes, and generated outputs use fixed roots. The syntactic
  rule cannot follow that validation. Runtime request modules remain covered.
- The shared size preset omits `.mjs`; an explicit corpus block adds its same
  100-line, 50-line-function, complexity-10, depth-4 and parameter-4 budgets.
  Corpus test wrappers receive the same 200-line/function-size test exception as
  the baseline's TypeScript test layer. This does not relax atomic units.
- Pure barrels receive an additional ESLint prohibition because the strict
  plugin alone also permits a pure forwarding file. No barrel exception exists.
- Prettier excludes frozen root `corpus/`, `docs/research/`, migrations, locks,
  ignored artifacts and credential paths. The `/corpus/` pattern is anchored; it
  does not exclude `scripts/corpus/` source.
- Knip ignores the externally installed `gitleaks` executable and `@types/deno`,
  which is consumed by the nested Edge tsconfig. It retains the baseline's
  documented peer/runner dependency exemptions. Test collection and exact CLI
  entrypoints are explicit; there is no blanket script-source exemption.
- Secret scanning separates `.gitleaks-source.toml` for the working directory
  from `.gitleaks.toml` for committed history. Only the former excludes ignored
  local credentials/artifacts. The shared history config excludes lockfile
  integrity hashes and the exact non-secret research phrase that triggered a
  false positive. A synthetic secret in a temporary `.env.remote` was detected
  by the history config; no credential path is excluded from history scanning.

## Executed verification

The complete local verification exited **0**. Its test and corpus output was:

```text
Test Files  11 passed (11)
     Tests  71 passed (71)
Test Files  17 passed (17)
     Tests  87 passed (87)
PASS: 6 accepted documents; 24 passages; 24/24 immutable gold paragraphs.
PASS: raw/canonical hashes, deterministic replay, Unicode offsets, attribution, token bounds and S1/S2-only sample.
PASS: 2 isolated revision/access fixtures; 4 acquired SEC candidates; 938 candidate passages replayed from raw HTML.
PASS: 10/10 generation attempts accounted for; indexMode=lexical_only; vectorCount=0.
```

The five separate corpus tests also pass. Offline coverage is 82.84% statements,
81.53% branches, 81.53% functions and 84.55% lines. Full-suite coverage is
94.16% statements, 90.25% branches, 100% functions and 95.36% lines. Both runs
retain 80% thresholds in every category.

```text
PASS: five RLS tables, default-deny anonymous grants, no member writes, caller-scoped retrieval, service-only publication
{"organisations":2,"memberships":4,"auth_users":4,"documents":12,"revisions":13,"current_revisions":12,"passages":52,"vectors":48,"test_documents":0}
```

The database has two organisation copies of six logical sources, including one
historical revision and one isolated lexical-only fixture; these are not 12
distinct research sources. `corpus/` intentionally declares its own separate
embedding-free state. Integration fixtures roll back; the final audit confirms
no retained test documents. This pass ran no seed, migration, corpus generation,
embedding or publication command.

Strict lint, formatting, three TypeScript projects, native Deno, duplicate,
Knip, dependency graph, type-coverage and baseline conformance checks all
passed. The dependency and type checks reported:

```text
no dependency violations found (273 modules, 665 dependencies cruised)
type-coverage: ok    tsconfig.node.json  (3056 / 3065) 99.70%
type-coverage: ok    tsconfig.app.json  (1605 / 1608) 99.81%
type-coverage: ok    supabase/functions/tsconfig.json  (702 / 702) 100.00%
type-coverage: every workspace is at or above 99% (5 checked).
create-baseline: baseline packages and wiring OK.
```

Duplication analysis found zero clones in 166 parsed source files. The five
type-coverage discoveries include the three projects and the two compatibility
paths; they do not represent five independent codebases.

The independent security gate scanned approximately 25 MB of actual source files
and reported no leaks; `baseline-audit` reported:

```text
baseline-audit: 0 advisories, gate at moderate: 0 unwaived, 0 expired, 0 waived.
```

Pre-adoption fingerprints cover 70 frozen corpus, migration and research
artifacts. All match after adoption. The ignored `work/baseline/` directory
retains source backups and local verification logs without credentials.

## Deferred findings and verification limits

`pnpm peers check` still exits **1**. These three upstream packages publish peer
ranges through ESLint 9 despite the baseline requiring ESLint 10:

```text
eslint-plugin-import@2.32.0
eslint-plugin-jsx-a11y@6.10.2
eslint-plugin-react@7.37.5
```

All three are installed and their real rules execute successfully, including
negative React/accessibility probes. No package metadata override hides the
mismatch. The smallest next step is to adopt upstream versions declaring ESLint
10 compatibility; this is recorded in `TODO.md`. Baseline-provided Knip
configuration hints are informational, not unused-source or dependency errors.

`.github/workflows/ci.yml` uses pinned actions and four independent jobs:
`check:ci`, `check:quality` plus conformance, dependency advisories after an
install, and source/history/workflow security without project dependencies. The
last job uses a full-history checkout, both gitleaks configurations and the
pinned actionlint and zizmor actions. Its source scan invokes the declared
`secrets:check` script as `NPM_CONFIG_FORCE=true npm run secrets:check`: force
only bypasses npm's `devEngines` Deno provisioning before project installation,
so the already dependency-free gitleaks command runs without installing project
packages. Local `actionlint` checks syntax. The repository is published at
`CristianDeluxe/inpractise-demo`; this document records local and
repository-state evidence only and does not claim a fresh remote CI run.

### Reader self-check: publication and credentials

The following read-only checks reproduce the boundary between local ignored
inputs and publishable source. They never print credential values:

```sh
git check-ignore -v .env.functions.remote
git ls-files --error-unmatch .env.functions.remote  # must report no tracked path
git log --all -- .env.functions.remote              # must be empty

mkdir -p work/backlog2
archive_target="$(mktemp -d work/backlog2/item5-clean-tree.XXXXXX)"
printf 'clean-tree target: %s\n' "$archive_target"
git archive HEAD | tar -x -C "$archive_target"
(cd "$archive_target" && \
  gitleaks dir --config .gitleaks-source.toml --no-banner --redact .)
find "$archive_target" -depth -delete

gitleaks git --config .gitleaks.toml --no-banner --redact .
gitleaks dir --config .gitleaks-source.toml --no-banner --redact .
./node_modules/.bin/baseline-audit --level moderate
```

The source scan intentionally excludes ignored local credentials and build or
report artifacts that are not publishable source. The history scan uses the
committed-history configuration and does not exclude credential paths. A clean
tree scan therefore checks exactly what `git archive HEAD` would publish, while
the working-tree scan checks current source around local inputs. On 2026-09-14,
the clean-tree scan found no leaks in approximately 5.92 MB, the history scan
found no leaks across 19 commits and approximately 6.33 MB, the current source
scan found no leaks in approximately 27.40 MB, and baseline-audit reported zero
advisories.

CI deliberately excludes password/SQL integration tests and the embedding replay
that needs ignored local artifacts. It runs the offline coverage gate and five
corpus tests. Full corpus replay, including SEC raw HTML, was verified locally
and requires preserving the ignored `corpus/raw/` snapshot when transferring the
workspace. `pnpm verify` also needs existing ignored credentials, linked SQL
metadata and embedding artifacts; missing inputs fail rather than produce a
false pass.

Outstanding UI, HTTP, answer-generation, MCP, live evaluation and public-filing
approval work stays in `TODO.md`; baseline adoption does not claim those product
features are delivered.

Browser regression runner: see [CONTRIBUTING](../CONTRIBUTING.md#browser-probe)
for its pinned dependency, installation, execution and timeout boundaries.

Native Edge authentication and answer-contract regressions run with
`pnpm test:edge`, included in `pnpm test:ci`. Deno uses the installed module
graph with `--cached-only` and no network permission; Auth, retrieval and
provider responses are stubbed, and environment changes are restored. This keeps
test execution inside the existing Edge type boundary.
