# Research evidence demo

An independent engineering demo for a hiring conversation with In Practise. It
is not an In Practise product and uses none of their private systems or
research. The accepted corpus is six disclosed synthetic interviews about
invented companies; acquired public SEC filings remain pending boundary review.

The implemented foundations are immutable source identity, database-enforced
authorization, caller-scoped retrieval, a typed browser API client, and corpus
verification. The HTTP research handler, answer generation, connected React UI,
MCP transport, and deployment remain unfinished. Client contract tests use
mocked HTTP responses; database integration tests exercise the actual demo
database.

## Setup and verification

Use pnpm 12.4.1. The lockfile pins repository-local Node 24.20.0 and Deno 2.9.6.

```sh
pnpm install --frozen-lockfile
pnpm check:ci
pnpm check:quality
```

For the complete local gate, the existing ignored credentials, database link
metadata, embedding artifacts, and raw SEC snapshots must already be present:

```sh
pnpm verify
```

It runs strict typing, lint, formatting, offline tests, coverage, corpus tests,
duplicate/dependency/type-coverage checks, the full integration suite, corpus
replay, a live database audit, and baseline conformance. It does not seed users,
apply migrations, acquire sources, generate interviews, or create embeddings.

With gitleaks installed, run the independent security gate:

```sh
pnpm check:security
```

Never copy the complete corpus or tenant-isolation fixtures into a public build.
Every source-bearing screen must disclose whether it is synthetic or public.

## Project references

- [Execution plan](docs/research/07-one-day-execution-plan.md): build authority.
- [Baseline and actual verification](docs/baseline.md): presets, commands, UI
  integration, and limits.
- [Backend](docs/backend.md): authorization, immutable evidence, and retrieval.
- [Corpus](docs/corpus.md): provenance, normalization, and public-review
  blocker.
- [Frontend contract](docs/frontend-contract.md): typed client and transport
  contract.
- [Active backlog](TODO.md) and [closed work](TODO_LOG.md).
