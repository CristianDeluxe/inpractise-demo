# ADR 0009: Separate immutable evidence from revocable access

Published organization/document/revision/passage identity supports a strong
versioned ETag once mutable current-revision, build and request metadata are
omitted from the representation. It does not make protected evidence publicly
cacheable: use `private, no-cache`, vary on authorization, and reauthorize
through the backend before every 304. This explicitly departs from the
briefing's public immutable, zero-read caching request to preserve database
authorization; introducing a universally public resource or immutable access
grants requires a separate design. Verify conditional reads and denied access
with `pnpm exec vitest run tests/api/cache.test.ts --no-coverage`.

The actual read response supplies `X-Research-Org-Id` from its authenticated
principal; using a preceding `me` response would permit a membership-change
race. Older backends without this additive header receive uncached 200 responses
without a validator. The backend metadata change is not deployed by this task.
