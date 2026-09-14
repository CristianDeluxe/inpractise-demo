# ADR 0003: No service-role retrieval

Date: 2026-09-14.

## Context

The demo must prove that browser and MCP access share the same database
boundary. Fetching with a privileged service key and filtering afterward could
expose evidence before authorization, contrary to the
[execution plan](../research/07-one-day-execution-plan.md).

## Decision

All retrieval receives the principal's token-forwarding client. The
`search_candidates` RPC is `SECURITY INVOKER`;
[evidence access policies](../../supabase/migrations/20260913000002_evidence_access.sql)
derive membership from `auth.uid()`. The
[MCP configuration type](../../mcp/McpConfig.ts) holds only the project URL,
publishable key and member credentials. Service credentials belong to separate
operator provisioning/publication paths.

## Consequences

Organization, active membership, approved published revision and premium
entitlement are checked before evidence leaves PostgreSQL. Reviewer status does
not bypass tier or organization. Search, passage reads and post-generation
citation rereads use the same principal; client arguments cannot grant access.
Missing and inaccessible passages have the same not-found response without a
title hint.

Verification: `pnpm type-check` and `pnpm test:ci` check source boundaries. The
full integration coverage and its credential prerequisites are recorded in
[MCP evidence](../mcp.md) and [the baseline](../baseline.md); offline tests
alone do not prove live RLS parity.
