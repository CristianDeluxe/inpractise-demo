# HTTP API v1

This is an independent engineering demo over **public filings and synthetic
interviews about invented companies**. It is not an In Practise product and has
no access to private In Practise research. The HTTP API is a third client of the
same research backend used by the browser and MCP.

The facade owns no credential, issues no tokens, and stores no sessions. It
forwards the caller's `Authorization` header unchanged to
`POST /functions/v1/research`; all evidence authorization remains in the backend
database. Removing the facade would not change which evidence the caller may
read. Reviewer-only `debug` diagnostics are deliberately absent from v1. Health
is local liveness, not the sixth research action.

## Run and reproduce

The existing `server.js` now dispatches `/api/v1` to the API bundle and
everything else to the original static handler. `pnpm build` produces both
`dist/` and `server/build/api.mjs`, including its existing Zod dependency. Node
24 requires no installed runtime packages for the bundled origin. Set
`RESEARCH_URL` to the **complete research endpoint URL**, ending in
`/functions/v1/research`; the similarly named MCP setting expects a project base
URL instead. No publishable key or service-role key is read by the facade. A
backend gateway requiring a separate key is incompatible with this
credential-free facade and must be configured by its owner.

Reproduce the captured examples and measurements from the repository root:

```sh
PNPM_CONFIG_VERIFY_DEPS_BEFORE_RUN=false pnpm build
python3 scripts/api/exercise.py
```

The pnpm environment setting disables automatic dependency reinstallation
because this checkout has the pre-existing unpublished-package/lockfile blocker
described in [baseline.md](baseline.md). It does not disable any verification
check. The script requires Python 3, curl, the existing installed tooling, and
free ports 4397/4398. It starts the **built** Node origin and an explicitly
unauthenticated offline backend fixture on loopback, executes curl examples,
measures 200 requests after 20 warm-ups, and stops its own processes. Each curl
has a 15-second deadline; child readiness and shutdown are bounded. The fixture
has a 120-second lifetime. It never accesses a remote database, mints real
tokens, or calls a provider.

All examples below were executed through that built origin.
`BASE=http://127.0.0.1:4397`; the runner supplies `TOKEN` as a disposable
fixture value in memory, through curl stdin rather than process arguments. For
an authorized real backend, use an existing member access token from your normal
login. Never commit or print it. These fixture results verify the facade
transport and contracts; they do **not** prove live database or provider parity.

## Authentication and correlation

Every evidence endpoint and `/me` requires
`Authorization: Bearer <caller token>`. Missing tokens return 401 with
`WWW-Authenticate: Bearer`. Rejected tokens retain the backend's HTTP status,
code and request ID. Health and the OpenAPI document are public. No
organization, role or user identity is accepted as an input field.

`X-Request-Id` accepts 1–128 ASCII letters, digits, underscore, period or
hyphen; an absent or invalid value is replaced with a UUID. The facade forwards
it on **both** backend calls. `X-Correlation-Id` always returns this facade
correlation value. `X-Request-Id` returns the final backend request ID when a
backend response exists, otherwise the facade ID; backend-owned IDs therefore
remain visible even though the current backend generates a different ID. Error
bodies contain both `requestId` and `correlationId`. Passage bodies contain
neither, preserving byte-stable representations.

## Endpoints

| Method and path                                                                  | Input and result                                                                                                                                                                                     |
| -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET /api/v1/documents`                                                          | Optional `company` (max 80 characters), `kind` (`synthetic_interview` or `sec_filing`), `pageSize` (1–50, default 20), `cursor`; returns `items` and nullable `nextCursor`.                          |
| `GET /api/v1/documents/{documentId}/revisions/{revisionId}/passages/{passageId}` | Each path ID is 1–200 characters and URL encoded. Returns exact `citation`, `section`, and `neighbourIds`.                                                                                           |
| `POST /api/v1/search`                                                            | JSON `query` (1–2000 characters), optional `company`, `limit` (1–10); returns ranked `items`, `mode`, `truncated`.                                                                                   |
| `POST /api/v1/answers`                                                           | JSON `query`, optional `company`; returns `status`, `claims`, `missingEvidence`, `citations`, `mode`, `candidateCount`, optional `diagnostics`. **Consumes the caller's backend request allowance.** |
| `GET /api/v1/me`                                                                 | Returns `orgId`, `role` (`member` or `reviewer`) and `premium` (false means basic tier).                                                                                                             |
| `GET /api/v1/health`                                                             | Returns `status: ok`, `scope: facade-only`, `backendChecked: false`; makes no backend request.                                                                                                       |
| `GET /api/v1/openapi.json`                                                       | Returns the checked-in, generated OpenAPI 3.1.1 document; no backend request.                                                                                                                        |

Source responses retain `origin` and `kind`: `synthetic` identifies invented
interview material, `public` identifies a public filing. Clients must display
this disclosure. Unknown fields, duplicate query parameters, unsupported methods
and invalid media types are rejected. JSON request bodies are limited to 16,384
bytes at the Node boundary. Successful bodies are the action data, without the
backend's changing envelope.

Pagination is a facade keyset over a **freshly authorized** backend list capped
at 50 documents. The cursor encodes the last document ID and filters; it is not
a secret, permission, database snapshot or authorization claim. It cannot be
reused with different filters. Every page reapplies database authorization.
Concurrent publication can change subsequent pages; a backend corpus overflow
remains an error, not silent truncation.

### Executed curl examples

For authenticated examples, the header is supplied through stdin to keep the
token out of process arguments. The executed runner substitutes the same values
shown here and stores full returned bodies and headers in
[api-examples.json](api-examples.json). HTTP dates and timing headers vary
between runs.

**documents** — observed HTTP 200.

```sh
curl --silent --show-error --max-time 15 -i -X GET "$BASE/api/v1/documents?pageSize=1&company=northstar&kind=synthetic_interview" -H "X-Request-Id: example-documents" --config - <<EOF
header = "Authorization: Bearer $TOKEN"
EOF
```

**passage** — observed HTTP 200.

```sh
curl --silent --show-error --max-time 15 -i -X GET "$BASE/api/v1/documents/northstar/revisions/rev-1/passages/p-1" -H "X-Request-Id: example-passage" --config - <<EOF
header = "Authorization: Bearer $TOKEN"
EOF
```

**search** — observed HTTP 200.

```sh
curl --silent --show-error --max-time 15 -i -X POST "$BASE/api/v1/search" -H "X-Request-Id: example-search" -H "Content-Type: application/json" --data '{"query":"evidence"}' --config - <<EOF
header = "Authorization: Bearer $TOKEN"
EOF
```

**answers** — observed HTTP 200.

```sh
curl --silent --show-error --max-time 15 -i -X POST "$BASE/api/v1/answers" -H "X-Request-Id: example-answers" -H "Content-Type: application/json" --data '{"query":"evidence"}' --config - <<EOF
header = "Authorization: Bearer $TOKEN"
EOF
```

**me** — observed HTTP 200.

```sh
curl --silent --show-error --max-time 15 -i -X GET "$BASE/api/v1/me" -H "X-Request-Id: example-me" --config - <<EOF
header = "Authorization: Bearer $TOKEN"
EOF
```

```json
{
  "orgId": "demo-org",
  "role": "member",
  "premium": false
}
```

**health** — observed HTTP 200.

```sh
curl --silent --show-error --max-time 15 -i -X GET "$BASE/api/v1/health" -H "X-Request-Id: example-health"
```

```json
{
  "status": "ok",
  "scope": "facade-only",
  "backendChecked": false
}
```

**openapi** — observed HTTP 200.

```sh
curl --silent --show-error --max-time 15 -i -X GET "$BASE/api/v1/openapi.json" -H "X-Request-Id: example-openapi"
```

## Caching and conditional reads

Published passage identity is immutable, but **authorization is revocable**.
Public cacheability does not follow from immutable text: it would authorize a
shared cache to return protected evidence without a new database decision.
Therefore this implementation deliberately uses
`Cache-Control: private, no-cache` with `Vary: Authorization`, and checks the
backend on every conditional request. This is an explicit safety deviation from
the original request for public immutable caching and a zero-read 304. No
existing endpoint proves a passage universally readable without authentication.
[ADR 0009](adr/0009-scope-immutable-passage-caching.md) records the trade-off;
[RFC 9111](https://www.rfc-editor.org/rfc/rfc9111.html#section-3.5) describes
caching authenticated responses.

The strong validator contains the representation version and base64url-encoded
JSON tuple `[orgId, documentId, revisionId, passageId]`, never a prose hash. The
facade validates server-owned citation identity first. It omits mutable
`isCurrentRevision`, `buildId` and request IDs from the passage body, and
serializes a fixed schema in a fixed order. A representation layout change
requires an ETag prefix version change. Exact content, attribution and neighbor
IDs belong to the immutable revision.

The organization comes from `X-Research-Org-Id` on the **actual backend read
response**, not a preceding `me` response or caller input. `researchResponse.ts`
supplies this header from the principal used by that action without changing its
JSON envelope or authorization. When an older backend omits the header, the
facade returns passage 200 with `no-store`, no ETag and no 304. The header
change is local and has not been deployed; conditional caching against the
existing remote backend is unverified.

The executed passage request returned:

```http
ETag: "passage-v2-WyJkZW1vLW9yZyIsIm5vcnRoc3RhciIsInJldi0xIiwicC0xIl0"
Cache-Control: private, no-cache
Vary: Authorization
```

The following conditional request was executed and returned **304 with an empty
body**, the same ETag, current rate-limit headers and backend request ID:

```sh
curl --silent --show-error --max-time 15 -i "$BASE/api/v1/documents/northstar/revisions/rev-1/passages/p-1" -H 'If-None-Match: "passage-v2-WyJkZW1vLW9yZyIsIm5vcnRoc3RhciIsInJldi0xIiwicC0xIl0"' -H 'X-Request-Id: example-not-modified' --config - <<EOF
header = "Authorization: Bearer $TOKEN"
EOF
```

`If-None-Match` supports exact, weak and comma-separated tags plus `*`. A
mismatched validator returns 200. Denied or revoked access returns the backend
error, even with a previously valid ETag. This saves response bytes, **not**
backend reads. Libraries, search results, answers, identity, health, OpenAPI and
all errors use `no-store` because their content or operational metadata can
change.

## Errors

Errors use [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html)
`application/problem+json`. Each code has the stable URI
`urn:inpractise-demo:problem:<code>`. Existing backend codes remain intact:
`unauthenticated`, `forbidden`, `not_found`, `invalid_request`,
`allowance_exhausted`, `invalid_model_answer`, `dependency_failure`. Provider
failures are 502/503 errors, never empty successful answers. Facade codes also
include `invalid_cursor` (422), `method_not_allowed` (405), `body_too_large`
(413), `unsupported_media_type` (415), `rate_limited` (429),
`invalid_backend_response` (502), and `limiter_capacity` (503). Malformed
backend envelopes and transport failures cannot become successful data.

Executed without a token:

```sh
curl --silent --show-error --max-time 15 -i "$BASE/api/v1/me" -H 'X-Request-Id: example-unauthenticated'
```

Observed HTTP 401, with this actual problem body:

```json
{
  "type": "urn:inpractise-demo:problem:unauthenticated",
  "title": "unauthenticated",
  "status": 401,
  "detail": "A caller bearer token is required.",
  "code": "unauthenticated",
  "retryable": false,
  "requestId": "example-unauthenticated",
  "correlationId": "example-unauthenticated"
}
```

Executed against the offline fixture to induce a provider failure (the query is
a **fixture control**, not a production API feature):

```sh
curl --silent --show-error --max-time 15 -i -X POST "$BASE/api/v1/answers" -H 'Content-Type: application/json' --data '{"query":"provider-failure"}' -H 'X-Request-Id: example-provider' --config - <<EOF
header = "Authorization: Bearer $TOKEN"
EOF
```

Observed HTTP 503:

```json
{
  "type": "urn:inpractise-demo:problem:dependency_failure",
  "title": "dependency failure",
  "status": 503,
  "detail": "Offline fixture provider failure.",
  "code": "dependency_failure",
  "retryable": true,
  "requestId": "fixture-provider-failure",
  "correlationId": "example-provider"
}
```

## Rate limits

The in-process limiter allows 60 admitted authenticated facade requests per
principal per 60-second window starting at the first request. It partitions by a
digest of issuer and subject **only after the backend has accepted that exact
token**. Refreshing a token does not reset quota; another principal gets a
separate bucket. Quota admission is synchronous, including under concurrent
requests. Expired buckets are removed; at 10,000 active principals new buckets
receive 503 rather than evicting active quotas.

This is a **single-process limiter**, not a distributed limit: workers have
independent state, and restarts clear it. It is separate from the backend's
persistent answer allowance. A backend `me` call precedes rate admission, even
on a denied request; this design does not protect backend authentication from an
unauthenticated flood. Evidence operations then call their actual action.
Health/OpenAPI are exempt. Use upstream abuse controls before treating this as a
public production gateway.

Headers follow
[draft-ietf-httpapi-ratelimit-headers-11](https://datatracker.ietf.org/doc/draft-ietf-httpapi-ratelimit-headers/11/),
verified during implementation. They are structured fields, not the older
`RateLimit-Limit`/`RateLimit-Remaining` family:

```http
RateLimit-Policy: "principal";q=60;w=60
RateLimit: "principal";r=0;t=60
Retry-After: 60
```

The runner repeatedly executed the `/me` curl example within the window and
observed HTTP 429 with `rate_limited`, `r=0` and `Retry-After`. Its exact
response is in `api-examples.json`. A backend `allowance_exhausted` also remains
429; the facade does not invent a reset time for that persistent allowance.

## Typed client and contract agreement

Import `createHttpClient` directly from `src/http-api/createHttpClient.ts`; no
barrel is required. It returns a generic typed request function: pass an
operation name (`documents`, `passage`, `search`, `answers`, `me`, `health`) and
the inferred input. Results discriminate `status: 200` with typed `data` from
`status: 304` with an ETag. It accepts cancellation, correlation and conditional
headers; it never signs in or refreshes a token. `HttpProblemError.problem`
preserves the validated problem document. The client uses the same `src/api`
citation and answer validators as the browser, including full-passage offsets,
reader paths, cited-claim consistency and supplied-evidence membership. These
usage paths are executed in `tests/api/client.test.ts`.

The handler, client and OpenAPI generator use `src/http-api/operations.ts` and
the same Zod wire schemas. Browser parsers retain their semantic refinements
while sharing those wire shapes. JSON Schema describes structural constraints;
additional citation/claim relationships are checked by the common runtime
validators. `tests/api/openapi.test.ts` compares the checked-in document to
generated output and checks every route schema; stale generated documentation
fails the credential-free suite. Regenerate with the executed command:

```sh
PNPM_CONFIG_VERIFY_DEPS_BEFORE_RUN=false pnpm api:spec
```

## Local latency

Measured by `python3 scripts/api/exercise.py`: 200 sequential `GET /api/v1/me`
requests after 20 discarded warm-ups, against the built Node origin and a local
fixture backend. Percentiles use nearest-rank indexes. `Server-Timing` reports
awaited backend fetch/body time and the rest of facade handler execution;
loopback time also includes HTTP transport. Parsing, quota bookkeeping, response
validation and serialization count toward facade time. This is neither
production latency nor a measurement of the real research backend.

| Measurement                | p50 (ms) | p95 (ms) |
| -------------------------- | -------: | -------: |
| Facade handler added time  |    0.225 |    0.319 |
| Local fixture backend time |    1.648 |    1.800 |
| Complete loopback request  |    2.238 |    2.577 |

The local engineering target is facade handler p95 below 5 ms for this small
`/me` workload; the observed run meets it. This is a measured development
target, not an enforced production SLO. Search and answers incur an additional
authentication round trip before their backend action, and no latency claim for
provider generation is made. Full sample-method metadata is in
[api-latency.json](api-latency.json).

## Verification and remaining limits

The seven requested gates are `pnpm type-check`, `pnpm lint`,
`pnpm format:check`, `pnpm build`, `pnpm test:ci`, `pnpm knip`, and
`pnpm dupes`, using the documented installation-check environment override. The
focused contract gate is `pnpm exec vitest run tests/api --no-coverage`; the
built-origin examples are verified by `python3 scripts/api/exercise.py`. See
`TODO_LOG.md` and the task's `FINDINGS.md` for actual gate outcomes.

No API deployment, commit, push, migration, seed, import, embedding, token
provisioning or provider generation was performed. The API bundle must accompany
any future origin release; the existing remote deployment has not been verified
to contain it. Cross-origin browser CORS and a distributed limiter are
deliberately absent. The fixture backend is test tooling and must never be
configured as a production research endpoint. Current real backend behavior
remains authoritative for authorization, publication, billing and provider
availability.
