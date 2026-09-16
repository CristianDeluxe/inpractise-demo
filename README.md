# In Practise Demo

A signed-in research workspace for one workflow: search a caller-authorized
corpus, ask a standalone question, open the exact passage the answer cites, ask
for something the corpus cannot establish, and inspect why a labeled retrieval
or selection check failed. A local MCP server exposes the same search and
passage reader through two read-only tools.

This is an **independent engineering demo** built for a hiring conversation, not
an In Practise product. The corpus is four public SEC filings and six synthetic
interviews about invented companies and fictional speakers; every source-bearing
screen labels its provenance, and nothing here touches In Practise data or
systems. See [corpus provenance](docs/corpus.md).

## Built in 24 hours with agents

The repository was built in a single day under
[the one-day execution plan](docs/research/07-one-day-execution-plan.md), with
coding agents doing most of the typing and a person deciding what shipped, what
was retained as a measured failure and what was cut. The story of that day, and
how the work was split, is at
[/built](https://inpractise.cristiandeluxe.dev/built).

Live demo: <https://inpractise.cristiandeluxe.dev>. Sign in as
`me@cristiandeluxe.dev` with the owner-supplied `DEMO_PASSWORD`; the identity is
provisioned by the owner and public signup is disabled. Hosting and the dated
route checks are in [deployment](docs/deploy.md).

## Three engineering properties

1. **Server-owned evidence identity and scope.** Citations carry document,
   revision and passage IDs, the exact quotation, source dates and speaker
   attribution. Opening a citation reads the passage actually used and rechecks
   access.
2. **Retrieval failure is distinguishable from missing knowledge.** Labeled
   candidate recall is measured before context selection, an induced
   missing-gold control fails its gate, and a provider generation error is an
   error, never a refusal. Classification needs gold labels, so it runs in the
   evaluation harness rather than on every live question.
3. **Authorization happens in the database before evidence leaves it.** Caller
   JWTs govern row level security across browser and MCP. No service-role key
   participates in retrieval, and reviewer status does not bypass organization
   or premium access.

[Architecture](docs/architecture.md) follows these properties through the real
files; [the glossary](CONTEXT.md) defines their vocabulary. The `/inspect`
screen shows caller-scoped corpus counts; the evaluation report and the induced
miss live in [evals.md](docs/evals.md) and the retained run files.

## A reviewer's five-minute path

Obtain the `me@cristiandeluxe.dev` reviewer password privately before starting.
Each live Ask invokes the provider and debits the daily allowance, so submit
each question once and describe the outcome you see.

| Time      | Action and evidence to inspect                                                                                                                                                                                                                                      |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0:00–0:40 | Open the [demo](https://inpractise.cristiandeluxe.dev), read the scope disclosure and [sign in](https://inpractise.cristiandeluxe.dev/login).                                                                                                                       |
| 0:40–1:20 | Open the [workspace](https://inpractise.cristiandeluxe.dev/app), search for Northstar and inspect the synthetic source label, dates and quotation.                                                                                                                  |
| 1:20–2:20 | Select Ask and submit “What makes a complex Northstar installation difficult to migrate?” Open a returned citation and follow its exact reader link; refresh the reader to check that the IDs remain stable.                                                        |
| 2:20–3:10 | Ask “What will Northstar Workflow net retention be in 2027?” The retained result is `not_found`, with no claims or citations: related search hits are surfaced as evidence, never turned into a forecast.                                                           |
| 3:10–4:15 | Read [method](https://inpractise.cristiandeluxe.dev/method) and [F03's recorded failure](docs/evals.md). The answer was retrieved but dropped during selection. The induced missing-gold test in `tests/unit/ranking.test.ts` is the other failure kind: retrieval. |
| 4:15–5:00 | Open [Connect](https://inpractise.cristiandeluxe.dev/connect) and the [MCP install guide](docs/mcp-install.md). Check how database authorization and exact passage IDs reach both clients.                                                                          |

Three more surfaces sit past the five-minute path: switching Ask to Investigate
mode at `/app/ask` runs a bounded multi-step research loop instead of one
retrieval pass; [Compare](https://inpractise.cristiandeluxe.dev/app/compare)
cross-references interview and filing evidence for one company and topic side by
side; and the [notebook](https://inpractise.cristiandeluxe.dev/app/notes) holds
passages the reviewer has saved from any citation. All three read from the same
reviewer allowance and database authorization as Ask.

The [two-minute presentation script](docs/demo-script.md) opens a premium
passage with the reviewer account and points at the tests that cover the
denied-fixture boundary. The workspace also carries a view switcher: the
reviewer can re-run the same search as a plain member and watch the premium
document leave the results. That switch is a downgrade only - the request shape
cannot express an upgrade, and the effective principal is the intersection with
the real one, so RLS stays the ceiling. See
[the architecture note](docs/architecture.md#viewing-the-corpus-as-a-lesser-principal).

## Run locally

Use Node 24.20.0 and pnpm 12.4.1 from the repository root.
`pnpm install --frozen-lockfile` installs everything the application, the tests
and the checks need.

One dependency is optional. The answer-quality harness under `evals/` judges
grounding through `@cristiandeluxe/max-lane`, an unpublished sibling package
declared as `file:../max-lane`. pnpm skips it when the sibling checkout is
absent, and nothing outside `evals/` imports it: `pnpm check:ci` type-checks and
lints the whole repository except that directory, so a clean checkout passes
every gate. `pnpm type-check`, `pnpm lint` and `pnpm eval:answers` include
`evals/` and need the sibling present.

```sh
pnpm install --frozen-lockfile
```

Put only `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in ignored
`.env.local`, using the existing demo project's public configuration supplied by
the owner. Vite embeds these values in the browser build; never put a service
key, provider key or password in a `VITE_` variable. See
[Vite environment handling](https://vite.dev/guide/env-and-mode).

```sh
pnpm dev --host 127.0.0.1 --port 5173 --strictPort
```

Open `http://127.0.0.1:5173/`, then `/login` as `me@cristiandeluxe.dev` with
`DEMO_PASSWORD`. `/app` contains the library, passage search, Ask (with an
Investigate mode toggle) and the notebook; `/app/compare` cross-references
interviews against filings; `/method` explains measurements and `/connect`
describes MCP. Stop with Ctrl-C. [Frontend setup](docs/frontend-port.md) records
the browser contract and dated live checks.

To build and inspect the production artifact locally:

```sh
pnpm build
pnpm preview --host 127.0.0.1 --port 4173 --strictPort
```

Open `http://127.0.0.1:4173/` and stop with Ctrl-C. Preview serves the built
artifact locally; [deployment](docs/deploy.md) records the hosting procedure and
its routing.

## MCP surface

The `inpractise-demo` stdio server exposes:

- `search_research(query, company?, limit?)`: ranked passages with immutable
  citations.
- `fetch_passage(documentId, revisionId, passageId)`: an exact passage with
  adjacent passage IDs.

Follow [MCP installation](docs/mcp-install.md) for Claude Code, Claude Desktop,
Cursor or a generic stdio client. It explains the three direct environment
variables, optional resolved-name overrides, member provisioning and connection
failures. Both tools are read-only; search can call the embedding provider. The
tools take no identity or role argument: the database decides what the member
reads. [MCP evidence](docs/mcp.md) retains the 2026-09-13 Claude Code session
and the browser/MCP parity coverage.

## Verify

The individual gates:

```sh
pnpm type-check
pnpm lint
pnpm format:check
pnpm build
pnpm test:ci
pnpm knip
pnpm dupes
```

Before contributing a change, run the credential-free aggregate, which is also
what GitHub Actions runs on every push (`.github/workflows/ci.yml`):

```sh
pnpm check:ci
```

The authorization rules live in the database, and they can be exercised without
this project's credentials. `pnpm test:db:local` applies the real migrations to
a throwaway PostgreSQL container and asserts anonymous denial, organization
isolation, premium tier gating, member write refusal, self-promotion,
service-only publication and the restricted search path - real SQL, no remote
project, no secrets. Docker is the only prerequisite;
[CONTRIBUTING.md](CONTRIBUTING.md) describes the container and the Supabase
primitives it stands in for.

[CONTRIBUTING.md](CONTRIBUTING.md) also explains the commit hooks, architecture
rules and review evidence. The full gate is `pnpm verify`: `check:ci` plus
authenticated integration, corpus replay and database audit. It needs the
ignored demo credentials, linked SQL metadata, raw snapshots and embedding
artifacts; [the baseline](docs/baseline.md) lists those prerequisites and the
separate `pnpm check:security` gate.

## Measured results and limits

The [answer evaluation](docs/evals.md) records two retained live repetitions on
**2026-09-13** against the deployed Edge function, with identical summaries:

| Measure                                   | Recorded result per repetition |
| ----------------------------------------- | ------------------------------ |
| Cases                                     | 14                             |
| Expected status matched                   | 13/14                          |
| Candidate recall at ten, before selection | 10/10 evidence cases           |
| Correct refusals                          | 4/4 negative controls          |
| Independently judged grounded             | 14/14                          |
| Unauthorized citations                    | 0                              |
| Restricted-string leaks                   | 0                              |
| Retrieval misses                          | 0                              |
| Selection misses                          | 1: F03                         |

F03 asks “How is Costco's fiscal year structured?” The answering passages were
retrieved at ranks 5 and 6. The two-passages-per-document cap selected ranks 1–4
from the two Costco documents, excluding the answer from context even though the
overall selector allows eight passages. The result was `not_found`: grounded in
the supplied context, but the wrong status for the corpus. The failure is
retained to expose the cap's limitation; tuning only for this case would conceal
the measured tradeoff. Fourteen labeled cases are a regression gate, not an
accuracy benchmark. See [ADR 0005](docs/adr/0005-retain-f03-selection-miss.md).

The [browser verification record](docs/frontend-port.md) holds two live Ask
requests, an exact-reader refresh, basic-member premium denial, reviewer counts
and responsive checks, each dated.

The full integration suite uses ordinary password sessions and rolled-back
database fixtures to exercise anonymous denial, tenant isolation, basic/premium
access, immutable published evidence, service-only publication and browser/MCP
parity. The live evaluation also reread every returned citation as its caller.
Offline `test:ci` excludes these authenticated integration checks.

Authorization is rechecked once, after generation. A claim is indivisible: when
any of its cited sources has become unreadable by then, the whole claim is
dropped, and an answer that loses every claim returns `not_found` with an
access-changed message (`tests/unit/revokedEvidence.test.ts`,
`tests/unit/partialRevocation.test.ts`, confirmed against `authorisedClaims.ts`
on 2026-09-14). The recheck governs the evidence set it observes; there is no
permission snapshot spanning generation and delivery, so a revocation landing
after the recheck, and publication or late-insert races, are outside it. See
[ADR 0006](docs/adr/0006-require-complete-claim-evidence.md).

Ask requests are debited against a per-member daily allowance before provider
work, completion usage totals are persisted, and the MCP server runs as a
dedicated member; the allowance and MCP parity suites cover all three. The
allowance bounds requests per member per day, not provider spend, and the
measured latencies in the [demo script](docs/demo-script.md) are observations
against one deployment rather than a target.

The [HTTP API guide](docs/api.md) describes the third client, executable local
examples, typed client, OpenAPI contract and authorization-safe conditional
reads.

## What I would build next

- **A multi-step research agent.** Plan, search, read and draft across a whole
  question tree, with every intermediate step carrying the same server-owned
  citations, so a finished memo can be audited claim by claim exactly as one
  answer is today.
- **Testimony cross-referenced against filings.** When an interviewee gives a
  number or a date, find the filing passage that confirms or contradicts it and
  show both side by side, using the `conflict` status the answer schema already
  has.
- **International filings ingestion.** Companies House, SEDAR+, ESEF filings
  from the EU and EDINET from Japan, under the same acquisition record, rights
  basis, immutable revisions and per-passage provenance as the EDGAR intake.
- **Persistent notebooks.** Saved questions, pinned passages and analyst notes
  stored under row level security, so a notebook can only ever cite what its
  owner can read, and a shared notebook re-authorizes every citation for each
  reader.
- **Sub-second search.** A query-embedding cache, a kept-warm function and an
  HNSW index tuned against the measured 2.3-6.4 s search latency, with p95
  tracked by the evaluation harness so a regression fails the gate.
- **MCP write tools.** Save a passage to a notebook or file a question from
  Claude Code or Cursor, through the same database authorization and allowance
  the two read tools use.
- **Eval-driven ranking.** A reranker admitted only when the gold set shows a
  gain with no new failures (the Voyage `rerank-2.5` experiment in `TODO.md`
  states that condition), and a gold set that grows with every corpus addition,
  so F03-class selection misses move the numbers before anyone touches the cap.

## Documentation map

The build authority is
[the one-day execution plan](docs/research/07-one-day-execution-plan.md).
Earlier research documents and dated reports keep their original scope, so they
can predate later components; [architecture](docs/architecture.md) describes the
current source.

| Document                                                     | Purpose                                                                                    |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| [CONTRIBUTING.md](CONTRIBUTING.md)                           | Setup, enforced hooks, verification and review conventions.                                |
| [CONTEXT.md](CONTEXT.md)                                     | Precise domain vocabulary.                                                                 |
| [api.md](docs/api.md)                                        | Caller-token HTTP facade, endpoints, examples, caching, limits and measured local latency. |
| [openapi.json](docs/openapi.json)                            | Generated OpenAPI 3.1 contract, checked against runtime schemas.                           |
| [ADR 0008](docs/adr/0008-caller-token-http-facade.md)        | No-credentials facade decision.                                                            |
| [ADR 0009](docs/adr/0009-scope-immutable-passage-caching.md) | Immutable evidence versus revocable access.                                                |
| [architecture.md](docs/architecture.md)                      | Browser/MCP request paths, seven actions, RLS, retrieval and structured answers.           |
| [mcp-install.md](docs/mcp-install.md)                        | Client configuration, required environment, connection checks and troubleshooting.         |
| [mcp.md](docs/mcp.md)                                        | Tool behavior, parity evidence and recorded Claude session.                                |
| [mcp-handshake.jsonl](docs/mcp-handshake.jsonl)              | Untouched timestamps and protocol versions from the 2026-09-13 session.                    |
| [baseline.md](docs/baseline.md)                              | Runtime boundaries, quality gates and dated baseline evidence.                             |
| [backend.md](docs/backend.md)                                | Database/import foundations, frozen revisions and historical verification.                 |
| [corpus.md](docs/corpus.md)                                  | Public/synthetic provenance, acceptance and corpus validation.                             |
| [evals.md](docs/evals.md)                                    | Labeled evaluation method, retained runs, failures and limits.                             |
| [frontend-contract.md](docs/frontend-contract.md)            | Browser/API contract and intended UI states.                                               |
| [frontend-port.md](docs/frontend-port.md)                    | Frontend implementation and dated browser checks.                                          |
| [demo-script.md](docs/demo-script.md)                        | Two-minute review script and failure fallback.                                             |
| [deploy.md](docs/deploy.md)                                  | Hosting, route checks and historical Pages preparation.                                    |
| [ADR 0001](docs/adr/0001-project-name.md)                    | One package/server name and independent-demo framing.                                      |
| [ADR 0002](docs/adr/0002-handler-authentication.md)          | Handler token validation, SDK deviation and forwarded RLS identity.                        |
| [ADR 0003](docs/adr/0003-caller-scoped-retrieval.md)         | No service-role retrieval.                                                                 |
| [ADR 0004](docs/adr/0004-retrieval-before-selection.md)      | Candidate recall before selection and honest error classification.                         |
| [ADR 0005](docs/adr/0005-retain-f03-selection-miss.md)       | Preserve the F03 selection miss.                                                           |
| [ADR 0006](docs/adr/0006-require-complete-claim-evidence.md) | Whole-claim evidence after revocation and ordinary refusal messages.                       |
| [Execution plan](docs/research/07-one-day-execution-plan.md) | Governing one-day execution plan.                                                          |
