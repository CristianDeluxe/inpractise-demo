# ADR 0001: One project name

Date: 2026-09-14.

## Context

The repository was `inpractise-demo`, the site was
`inpractise.cristiandeluxe.dev`, the package was `research-evidence-demo`, and
MCP advertised `research-evidence`. Reviewers and agent clients encountered
different identities for the same independent engineering demo.

## Decision

Use `inpractise-demo` for the package and MCP server ID, and **In Practise
Demo** as the human title. Keep the deployed hostname. This is not an In
Practise product or affiliation; it uses public filings and synthetic
interviews, never private In Practise data.

## Consequences

Client registrations using the old ID need updating. No import or workspace
dependency resolves the old package name: the workspace and lockfile identify
the root by path. Frozen research records the original plan and is not
rewritten. The dated MCP capture is retained as historical evidence, not
regenerated to imply another session occurred.

Verification: `pnpm type-check`, `pnpm build`, `pnpm mcp`; identity and protocol
inspection described in [MCP installation](../mcp-install.md).
