# In Practise Demo

A signed-in research workspace for one workflow: search a caller-authorized
corpus, ask a standalone question, open the exact passage cited by the answer,
ask for something the corpus cannot establish, and inspect why a labeled
retrieval or selection check failed. A local MCP server exposes the same search
and passage reader through two read-only tools.

This is an **independent engineering demo** for a hiring conversation, not an In
Practise product. It contains four public SEC filings and six synthetic
interviews about invented companies and fictional speakers. It uses no private
In Practise data, research library or systems. Source-bearing screens disclose
public or synthetic provenance. See [corpus provenance](docs/corpus.md).

Live demo: <https://inpractise.cristiandeluxe.dev>. Sign-in uses a privately
provisioned member account; public signup is disabled. Hosting and the dated
route checks are recorded in [deployment](docs/deploy.md).

## Three engineering properties

1. **Server-owned evidence identity and scope.** Citations carry document,
   revision and passage IDs, the exact quotation, source dates and speaker
   attribution. Opening a citation reads the passage actually used and rechecks
   access.
2. **Retrieval failure is distinguishable from missing knowledge.** Labeled
   candidate recall is measured before context selection, and an induced
   missing-gold control fails its gate. A provider generation error is an error,
   never a refusal. Ordinary unlabeled queries are not automatically diagnosed
   as correct refusals.
3. **Authorization happens in the database before evidence leaves it.** Caller
   JWTs govern row level security across browser and MCP. No service-role key
   participates in retrieval, and reviewer status does not bypass organization
   or premium access.

[Architecture](docs/architecture.md) follows these properties through the real
files; [the glossary](CONTEXT.md) defines their vocabulary. The inspection UI
shows caller-scoped counts, but has no connected evaluation report or
induced-miss viewer. Use the recorded diagnostics for that part of the workflow.

## A reviewer's five-minute path

Obtain a basic-member login privately before starting. This is a suggested
review path, not a claimed timed rehearsal. Live Ask requests invoke a provider;
submit each once and describe the actual outcome if it differs from the retained
run.

| Time      | Action and evidence to inspect                                                                                                                                                                                                                                        |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0:00–0:40 | Open the [demo](https://inpractise.cristiandeluxe.dev), read the scope disclosure and [sign in](https://inpractise.cristiandeluxe.dev/login).                                                                                                                         |
| 0:40–1:20 | Open the [workspace](https://inpractise.cristiandeluxe.dev/app), search for Northstar and inspect the synthetic source label, dates and quotation.                                                                                                                    |
| 1:20–2:20 | Select Ask and submit “What makes a complex Northstar installation difficult to migrate?” Open a returned citation and follow its exact reader link; refresh the reader to check that the IDs remain stable.                                                          |
| 2:20–3:10 | Ask “What will Northstar Workflow net retention be in 2027?” The retained result is `not_found`, with no claims or citations. Inspect the actual result rather than treating related search hits as a forecast.                                                       |
| 3:10–4:15 | Read [method](https://inpractise.cristiandeluxe.dev/method) and [F03's recorded failure](docs/evals.md). The answer was retrieved but dropped during selection. The induced missing-gold test is in `tests/unit/ranking.test.ts`; it is a separate retrieval failure. |
| 4:15–5:00 | Open [Connect](https://inpractise.cristiandeluxe.dev/connect) and the [MCP install guide](docs/mcp-install.md). Check how the same member and exact passage IDs reach both clients.                                                                                   |

The [two-minute presentation script](docs/demo-script.md) adds the
premium-denial step and a recorded-evidence fallback. A reviewer account can
open `/inspect` for counts; a basic member cannot, and no connected report is
promised.

## Run locally

Use Node 24.20.0 and pnpm 12.4.1 from the repository root. Installation requires
access to private `@busirocket` packages and the `file:../max-lane` dependency
in `package.json`; this checkout is not a self-contained public install. Obtain
those inputs from the owner before installing.

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

Open `http://127.0.0.1:5173/`, then `/login` with the provisioned member. `/app`
contains the library, passage search and Ask; `/method` explains measurements
and `/connect` describes MCP. No signup or database provisioning is needed for
the existing demo. Stop with Ctrl-C. [Frontend setup](docs/frontend-port.md)
records the browser contract and dated live checks.

To build and inspect the production artifact locally:

```sh
pnpm build
pnpm preview --host 127.0.0.1 --port 4173 --strictPort
```

Open `http://127.0.0.1:4173/` and stop with Ctrl-C. Preview verifies local
serving, not deployment or hosting-specific routing.
[Deployment](docs/deploy.md) records the separate hosting procedure.

## MCP surface

The `inpractise-demo` stdio server exposes:

- `search_research(query, company?, limit?)`: ranked passages with immutable
  citations.
- `fetch_passage(documentId, revisionId, passageId)`: an exact passage with
  adjacent passage IDs.

Follow [MCP installation](docs/mcp-install.md) for Claude Code, Claude Desktop,
Cursor or a generic stdio client. It explains the four required environment
variables, member provisioning and connection failures. The tools are read-only;
search can call the embedding provider. They accept no identity or role
override, and the database determines access. [MCP evidence](docs/mcp.md)
retains the 2026-09-13 Claude Code session and browser/MCP parity coverage.

## Verify

The individual gates for this documentation and naming pass are:

```sh
pnpm type-check
pnpm lint
pnpm format:check
pnpm build
pnpm test:ci
pnpm knip
pnpm dupes
```

Before contributing a change, run the credential-free aggregate:

```sh
pnpm check:ci
```

[CONTRIBUTING.md](CONTRIBUTING.md) explains the actual commit hooks,
architecture rules and review evidence. The full gate is named `pnpm verify`;
unlike `check:ci`, it includes authenticated integration, corpus replay and
database audit. This is a reference to the script, **not a claim it was run for
this pass**: its `db:verify` step is excluded by this pass's scope. Full
verification needs the existing ignored demo credentials, linked SQL metadata,
raw snapshots and embedding artifacts. [The baseline](docs/baseline.md)
describes those prerequisites and the separate security gate.

Passing the commands above does not establish a clean secret scan, a remote CI
run, a deployment or a live evaluation. Security-scan findings and remote CI
installation blockers are tracked in [TODO.md](TODO.md).

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
the measured tradeoff. **These fourteen cases do not establish general
accuracy.** See [ADR 0005](docs/adr/0005-retain-f03-selection-miss.md).

The [browser verification record](docs/frontend-port.md) separately records two
live Ask requests, exact-reader refresh, basic-member premium denial, reviewer
counts and responsive checks. No connected reviewer evaluation report or live
induced-miss display is established. These are dated records, not measurements
rerun during this documentation pass.

The existing full integration suite uses ordinary password sessions and
rolled-back database fixtures to exercise anonymous denial, tenant isolation,
basic/premium access, immutable published evidence, service-only publication and
browser/MCP parity. The live evaluation also reread every returned citation as
its caller. Offline `test:ci` excludes these authenticated integration checks.

Source inspection on **2026-09-14** confirms that the answer builder drops a
claim when all its references lose authorization;
`tests/unit/revokedEvidence.test.ts` covers that behavior. **Full mid-request
revocation safety is not established**: there is no atomic
generation-to-delivery permission snapshot, and a multi-source claim can survive
losing some references. No concurrent revocation or publication/late-insert race
guarantee is claimed.

Request allowance debiting, durable usage totals, a connected reviewer report
and a dedicated MCP member remain incomplete. No enforced provider invoice cap,
general answer-quality guarantee, production latency target, complete plan
delivery, or new remote CI/deployment success is claimed by these local checks.

## Documentation map

The build authority is
[the one-day execution plan](docs/research/07-one-day-execution-plan.md).
Earlier research and dated implementation reports preserve their original scope;
they can describe work before later components existed. Use
[architecture](docs/architecture.md) for the source behavior verified in this
pass.

| Document                                                              | Purpose                                                                            |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| [CONTRIBUTING.md](CONTRIBUTING.md)                                    | Setup, enforced hooks, verification and review conventions.                        |
| [CONTEXT.md](CONTEXT.md)                                              | Precise domain vocabulary.                                                         |
| [architecture.md](docs/architecture.md)                               | Browser/MCP request paths, six actions, RLS, retrieval and structured answers.     |
| [mcp-install.md](docs/mcp-install.md)                                 | Client configuration, required environment, connection checks and troubleshooting. |
| [mcp.md](docs/mcp.md)                                                 | Tool behavior, parity evidence and recorded Claude session.                        |
| [mcp-handshake.jsonl](docs/mcp-handshake.jsonl)                       | Untouched timestamps and protocol versions from the 2026-09-13 session.            |
| [baseline.md](docs/baseline.md)                                       | Runtime boundaries, quality gates and dated baseline evidence.                     |
| [backend.md](docs/backend.md)                                         | Database/import foundations, frozen revisions and historical verification.         |
| [corpus.md](docs/corpus.md)                                           | Public/synthetic provenance, acceptance and corpus validation.                     |
| [evals.md](docs/evals.md)                                             | Labeled evaluation method, retained runs, failures and limits.                     |
| [frontend-contract.md](docs/frontend-contract.md)                     | Browser/API contract and intended UI states.                                       |
| [frontend-port.md](docs/frontend-port.md)                             | Frontend implementation and dated browser checks.                                  |
| [demo-script.md](docs/demo-script.md)                                 | Two-minute review script and failure fallback.                                     |
| [deploy.md](docs/deploy.md)                                           | Hosting, route checks and historical Pages preparation.                            |
| [ADR 0001](docs/adr/0001-project-name.md)                             | One package/server name and independent-demo framing.                              |
| [ADR 0002](docs/adr/0002-handler-authentication.md)                   | Handler token validation, SDK deviation and forwarded RLS identity.                |
| [ADR 0003](docs/adr/0003-caller-scoped-retrieval.md)                  | No service-role retrieval.                                                         |
| [ADR 0004](docs/adr/0004-retrieval-before-selection.md)               | Candidate recall before selection and honest error classification.                 |
| [ADR 0005](docs/adr/0005-retain-f03-selection-miss.md)                | Preserve the F03 selection miss.                                                   |
| [Research 01](docs/research/01-market-and-landing-research.md)        | Frozen market and landing research.                                                |
| [Research 02](docs/research/02-reusable-assets.md)                    | Frozen reusable-asset inventory.                                                   |
| [Research 03](docs/research/03-lovable-landing-brief.md)              | Frozen landing brief.                                                              |
| [Research 04](docs/research/04-members-and-admin-spec.md)             | Frozen members/admin specification.                                                |
| [Research 05](docs/research/05-askbot-and-mcp-spec.md)                | Frozen answer and MCP specification.                                               |
| [Research 06](docs/research/06-build-plan.md)                         | Earlier build plan, subordinate to Research 07.                                    |
| [Research 07](docs/research/07-one-day-execution-plan.md)             | Governing one-day execution plan.                                                  |
| [Research progress](docs/research/research-a-progress.md)             | Frozen research work record.                                                       |
| [Research verifier](docs/research/verify_specs.py)                    | Frozen specification-verification utility.                                         |
| [Research input hashes](docs/research/verification-input-hashes.json) | Frozen verification input identities.                                              |
