# ADR 0008: A caller-token HTTP facade

The third-party HTTP interface forwards the caller's bearer unchanged to the
existing research backend and holds no key, session or token-minting capability.
Database authorization remains the sole evidence-access authority; even quota
partitioning follows successful backend authentication, at the cost of an extra
`me` call for evidence operations. Reviewer diagnostics remain outside v1.
Verify this boundary with `pnpm exec vitest run tests/api --no-coverage`; see
[the API guide](../api.md).
