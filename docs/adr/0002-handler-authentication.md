# ADR 0002: Validate the user in the handler and forward the token

Date: 2026-09-14.

## Context

The [execution plan](../research/07-one-day-execution-plan.md) chooses
`verify_jwt=false` with in-handler `auth.getUser(token)` validation and
caller-token forwarding. A project publishable key identifies the application,
not its user; disabling gateway verification alone cannot authorize research
access.
[Supabase's authorization guidance](https://supabase.com/docs/guides/functions/auth)
distinguishes project API keys from user JWTs.

## Decision

Preserve in-handler validation before any research action.
[authenticate.ts](../../supabase/functions/research/authenticate.ts) calls
[verifyToken.ts](../../supabase/functions/research/verifyToken.ts), which
validates the token through `GET /auth/v1/user`, then creates the database
client with that same bearer token. The source records why the planned SDK call
was replaced: `auth.getUser` on the client configured with a global
Authorization header was rejected. This documents that recorded compatibility
reason; it does not claim every SDK configuration has that limitation.

## Consequences

An invalid session fails before evidence access; Auth outages become dependency
errors. Valid identity still requires active database membership, and RLS
determines visibility. Decoding a JWT or trusting the publishable key alone is
insufficient. OPTIONS preflight is unauthenticated; malformed requests can fail
validation before authentication without touching the corpus.

`supabase/config.toml` still has no function-specific JWT setting. On
2026-09-14, a read-only
[Management API function listing](https://supabase.com/docs/reference/api/v1-list-all-functions)
confirmed deployed `research` version 11 is `ACTIVE` with `verify_jwt=false`.
Missing bearer tokens and a structurally valid JWT signed with deliberately
incorrect test material each returned the handler's `401 unauthenticated`
envelope, with a request ID and no evidence data.

A real member session returned 200 before its natural expiry. After its `exp`,
Supabase Auth's `/auth/v1/user` endpoint rejected the same token with HTTP 403.
The probe expected only 401 and stopped before sending the expired token through
the Edge handler; the token was intentionally kept only in process memory and
cannot be replayed.

Verification: `pnpm test:edge` runs native Deno tests without network
permission; `pnpm test:ci` includes them. Its expiry case constructs a JWT with
an `exp` in the past, models the observed Auth 403 response, and proves that the
handler maps it to `unauthenticated` before a membership or evidence read. This
is a constructed-token handler control-flow proof, not remote cryptographic or
clock verification and not an end-to-end replay of an expired token through the
deployed handler. No authentication configuration or deployment write was
performed.
