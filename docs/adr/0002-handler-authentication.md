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

`verify_jwt=false` is a deployment requirement recorded by the plan and handler
comment, **not a setting present in `supabase/config.toml`**. Remote
configuration was not inspected in this documentation pass; redeployment must
preserve that requirement and test missing, forged and expired tokens. No
deployment command is issued here.

Verification: `pnpm type-check` and `pnpm test:ci` cover the checked source and
offline boundaries; they do not establish the remote gateway setting or the full
live token matrix.
