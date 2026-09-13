# Research evidence demo

A signed-in research workspace for searching a caller-authorized corpus, asking
standalone questions, and opening the exact document revision and passage behind
an answer. A local MCP server exposes the same search and passage reader through
two read-only tools.

Live demo: <https://inpractise.cristiandeluxe.dev> — sign-in is by privately
provisioned member account; public signup is disabled. See
[deployment](docs/deploy.md).

## Scope

This is an independent engineering demo for a hiring conversation, not an In
Practise product. It contains four public SEC filings and six synthetic
interviews about invented companies and fictional speakers. It uses no private
In Practise data, research library or systems. Source-bearing screens disclose
public or synthetic provenance. See [corpus provenance](docs/corpus.md).

## Run locally

Use Node 24.20.0 and pnpm 12.4.1. Installation needs access to the private
`@busirocket` packages and the local `../max-lane` dependency declared in
`package.json`; this checkout is not a self-contained public install.

```sh
pnpm install --frozen-lockfile
```

Put only `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in ignored
`.env.local`, using the existing demo project's public configuration supplied by
the owner. These values are embedded in the browser build. Never put a service
key, provider key or password in a `VITE_` variable.

```sh
pnpm dev --host 127.0.0.1 --port 5173 --strictPort
```

Open `http://127.0.0.1:5173/`, then `/login` with a privately provisioned member
account. `/app` contains the library, passage search and Ask. `/method` explains
the measurement limits; `/connect` describes local MCP. No signup or database
provisioning is needed for the existing demo.
[Frontend setup](docs/frontend-port.md) records the browser contract and live
verification.

For the production artifact:

```sh
pnpm build
pnpm preview --host 127.0.0.1 --port 4173 --strictPort
```

See the [two-minute walkthrough](docs/demo-script.md) and
[Cloudflare Pages preparation](docs/deploy.md). Preview alone does not verify
Pages routing.

## Measured results

The [answer evaluation](docs/evals.md) records two retained live repetitions on
2026-09-13 against the deployed Edge function, with identical summaries:

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
from the two Costco documents, excluding the answer from the model's context.
The result was `not_found`: grounded in the supplied context, but the wrong
status for the corpus. The failure is retained to expose the selection-cap
limitation; tuning that cap solely to improve this case would conceal the
measured tradeoff. These fourteen cases do not establish general accuracy.

The [browser verification](docs/frontend-port.md) separately records two live
Ask requests, exact-reader refresh, basic-member premium denial, reviewer counts
and responsive checks. The reviewer endpoint currently returns no connected
evaluation report; it does not display an induced retrieval miss.

## MCP surface

`pnpm mcp` starts the local stdio server configured by `.mcp.json`:

- `search_research(query, company?, limit?)`: ranked passages with immutable
  citations.
- `fetch_passage(documentId, revisionId, passageId)`: a passage and adjacent
  passage IDs.

Supply `RESEARCH_URL`, `RESEARCH_PUBLISHABLE_KEY`, `RESEARCH_EMAIL` and
`RESEARCH_PASSWORD` through the process environment. The server uses an ordinary
member and the same research endpoint as the browser; tools accept no
organization, user or role override. The recorded Claude Code session negotiated
protocol **2025-11-25**, as retained in
[the handshake log](docs/mcp-handshake.jsonl).
[MCP evidence and configuration](docs/mcp.md) includes the real session and
parity tests.

## Tested security properties and limits

`pnpm test` runs the existing integration suite with ignored demo credentials,
linked SQL metadata and embedding artifacts. Its database fixtures roll back.
The suite exercises:

- Row level security: anonymous denial, tenant isolation, membership and
  basic/premium access through caller credentials.
- Immutable published evidence: privileged passage insert, update and delete
  rejection, plus publication integrity and retained revisions.
- Service-only publication: members cannot execute the publication function;
  invalid publication inputs fail.
- Browser/MCP parity: identical ordered search citation IDs, basic-member denial
  and a premium positive control.

The live evaluation additionally re-reads every returned citation as its caller
and recorded zero unauthorized citations. The answer handler also re-reads
selected evidence after generation. **Mid-request revocation is not established
as safe for claim text:** the response builder removes unauthorized citation
references but can retain the associated prose. This source-inspection finding
is recorded in [the active backlog](TODO.md); no race test or complete
revocation guarantee is claimed.

Run the presentation gates with:

```sh
pnpm type-check
pnpm lint
pnpm format:check
pnpm build
pnpm test
```

[The engineering baseline](docs/baseline.md) describes the broader `pnpm verify`
gate and its local prerequisites. The separate `pnpm check:security` scan has
recorded checksum false positives in [TODO.md](TODO.md); the five commands above
do not establish a clean security scan. No UI deployment or remote CI execution
is claimed here.
