# Frontend adapter and Lovable merge contract

This is an independent engineering demo. Its corpus consists of public filings
and synthetic interviews about invented companies. It is not an In Practise
product and has no access to In Practise systems or private research. Every UI
surface that presents evidence must display the source origin, including search
results, answers, the reader and diagnostics.

The binding authority is
[the execution plan, sections 6.2 and 6.3](research/07-one-day-execution-plan.md#62-six-action-http-contract).
The adapter lives in `src/api/`. It contains no React components, pages, styling
or routing. Import individual modules directly; there is no barrel file.

## Merge procedure

1. Inspect the incoming Lovable export separately and preserve any work in both
   repositories. Bring its React components, pages, hooks, styles, assets, entry
   point and router into this repository's `src/` and `public/`, keeping
   `src/api/` intact. Review each conflicting path before replacing it. The
   export has not arrived, so its actual generated filenames cannot yet be
   enumerated.
2. Delete the incoming application's mock corpus, mock answers, artificial
   delays, simulated fetch functions and invented research API clients after
   replacing their imports with this adapter. Inspect likely locations such as
   `src/data/`, `src/mocks/`, `src/lib/api*`, `src/services/` and generated
   hooks; remove the actual imported implementations, not directories by name
   alone. A clearly labeled public landing example is permitted by the plan, but
   it must never supply authenticated research screens or impersonate a live
   result.
3. Replace generated Supabase clients with one browser auth client configured
   from the two public environment variables below. Remove embedded project
   identifiers, hard-coded keys, duplicate session providers and generated
   database calls used for evidence retrieval. The UI obtains a user session;
   the research endpoint authorizes every operation through the database.
4. Reconcile the incoming package manifest, Vite configuration, Tailwind
   configuration and root TypeScript includes with their owner. Do not overwrite
   the root manifest, lockfile, migrations, corpus tools or backend directories
   with Lovable output. This lane adds no dependencies and makes no root
   configuration changes.
5. Connect `/login`, `/app`, `/read/:documentId/:revisionId/:passageId` and
   `/inspect` as described below. These are the reduced execution-plan routes.
   Earlier brief examples such as `/app/ask`, paragraph fragments and
   organization switching do not override the one-day plan.
6. Abort active requests on route changes, replacement queries and sign-out.
   Clear rendered evidence on sign-out or a changed session; discard cached
   access and query results. Do not persist answers in local storage or a shared
   query cache. A fresh question starts a fresh retrieval with an explicitly
   selected company filter.
7. Run the adapter checks recorded below, then the merged application's own
   typecheck and build. Verify all routes against the real authenticated
   endpoint before claiming integration. An offline adapter test does not prove
   RLS, CORS, deployment, provider operation or web/MCP parity.

## Browser configuration and authentication

The browser build needs exactly these environment variable names. Set their
values through the local ignored Vite environment file or the build environment;
no actual values belong in this document.

```dotenv
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

`VITE_SUPABASE_URL` is the Supabase project base URL, not the function URL. The
adapter posts to `/functions/v1/research`. `VITE_SUPABASE_PUBLISHABLE_KEY` is
the public project key used by the browser auth client and the request's
`apikey` header. The session's access token is separate and goes into
`Authorization: Bearer ...`. Never supply a service-role key, secret key,
database password, personal access token or model-provider key to a browser
build. Vite deliberately exposes variables prefixed with `VITE_` in client code.
See [Vite environment variables](https://vite.dev/guide/env-and-mode).

The root package already contains `@supabase/supabase-js` 2.116.0. The UI may
use it for password sign-in and obtaining the current session. The transport
accepts an injected token accessor, so it does not own Supabase sessions or
import React. Read the current token for every request rather than capturing the
first session token. A local session is not an authorization decision: the
backend validates the user and current membership. See
[Supabase getSession](https://supabase.com/docs/reference/javascript/auth-getsession).

Create the Supabase auth client in the UI's auth module with
`createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY)`.
Supply an accessor that awaits `supabase.auth.getSession()`, throws its error
when present, and returns `data.session?.access_token ?? null`. The following
setup assumes that accessor is named `getAccessToken`; the UI supplies it, and
the adapter calls it on every request.

```typescript
import { createResearchClient } from './src/api/createResearchClient.ts'

const client = createResearchClient({
  baseUrl: import.meta.env.VITE_SUPABASE_URL,
  publishableKey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  getAccessToken,
})
```

This snippet uses repository-root-relative module paths for illustration; adjust
relative imports to the actual UI module. A hook can keep `createRequestScope()`
in a stable reference, pass it as `{ scope }`, and call `scope.cancel?.()` on
cleanup or replacement. A supplied `AbortSignal` is also supported. Scopes are
opt-in: calls without a shared scope remain independent. A shared scope cancels
its previous request before starting the next; cancelled/older continuations
cannot resolve with late data. Use `ApiError.code === "cancelled"` for
cancellation handling and guard UI completion handlers against a subsequently
changed route/session.

Resolve validated citation paths against `window.location.origin` in the
browser, not another environment variable. The adapter accepts only the exact
root-relative path constructed from the citation's three encoded IDs, so
absolute URLs and protocol-relative URLs cannot pass validation. Evidence
navigation must use the validated server `readerPath`, never a model URL or
`sourceUrl`. The latter is provenance metadata and is not a reader route.

## HTTP contract

All six operations use one authenticated JSON POST. No request accepts a user,
organization, role, SQL expression, source URL or retrieval-mode override.

```text
{action:"me"}
{action:"list", company?:string, kind?:"synthetic_interview"|"sec_filing"}
{action:"read", documentId:string, revisionId:string, passageId:string}
{action:"search", query:string, company?:string, limit?:integer}
{action:"ask", query:string, company?:string}
{action:"debug"}
```

The query limit is 1–2,000 characters and 500 tokens; company slugs are at most
80 characters; search limit is an integer from 1 to 10, defaulting to 10. The
server remains responsible for token counting and authorization. List returns at
most ten current logical documents; overflow is an error. Read returns a passage
and neighboring passage IDs, with each subsequent neighbor read separately
authorized. Debug is read-only and reviewer-only; it cannot impersonate another
principal or run an evaluation/model.

```text
Success: {action,data,buildId,requestId}
Failure: {error:{code,message,retryable},requestId}
```

Keep the build and request identifiers available for troubleshooting. An HTTP
404 means missing or inaccessible evidence; it must not disclose the document
title or distinguish those two cases.

| HTTP status | `ApiError.code`        | Required UI behavior                                         |
| ----------- | ---------------------- | ------------------------------------------------------------ |
| 401         | `invalid_session`      | Clear evidence and request sign-in.                          |
| 403         | `forbidden`            | Show access denied; do not downgrade to another identity.    |
| 404         | `passage_not_found`    | Show a neutral unavailable-source state.                     |
| 422         | `bad_input`            | Show validation feedback and allow correction.               |
| 429         | `allowance_exhausted`  | Show the limit state; do not automatically resubmit.         |
| 502         | `invalid_model_answer` | Show an error; render no unvalidated answer.                 |
| 503         | `dependency_failure`   | Show an error and an explicit retry action when appropriate. |

`ApiError` also distinguishes `network`, `protocol`, `cancelled` and otherwise
unmapped `http_error`. Handle its typed `code`, not substrings in a message.
`status` and `requestId` may be null for client-side failures. When a valid
server error envelope exists, `serverCode` preserves its code and `retryable`
preserves its retry guidance; the normalized client code comes from the HTTP
status. Unknown HTTP statuses remain errors. Do not log access tokens, request
headers or arbitrary error payloads.

`not_found` is an answer. An error is not. A successful `ask` can return
`answered`, `partial`, `conflict` or `not_found`. The last means the successful
retrieval/answer workflow could not establish the requested claim; it has no
claims. A network failure, dependency failure, malformed response, invalid
quotation or invalid model answer must never be converted to `not_found`. Empty
search/list results are also distinct from a `not_found` answer.

## Evidence rendering

Each citation contains `citationId`, `documentId`, `revisionId`, `passageId`,
`quote`, `startChar`, `endChar`, `title`, `company`, `origin`, `kind`,
`speaker`, `speakerRole`, `interviewDate`, `publishedAt`, `sourceUrl` and
`readerPath`. The immutable ID is `documentId:revisionId:passageId`. The
quotation is the complete passage, with start zero and end equal to
`Array.from(quote).length`, not the JavaScript UTF-16 string length.

Reject malformed citations before rendering. In particular, an empty quotation,
inconsistent immutable ID or absolute/off-origin reader path is a protocol
error. Quote cards must remain selectable plain text and display the source
type, dates and speaker attribution when present. Label `origin: synthetic` as
an invented company and fictional speaker; label `origin: public` as a public
filing. Do not fill missing metadata with invented values. Do not use
`dangerouslySetInnerHTML` or a Markdown renderer for provider claims or
quotations.

The provider-owned answer has exactly `status`, `claims` and `missingEvidence`.
A claim has exactly `text` and `citationIds`; at most four claims, at most 500
characters per claim. `not_found` has zero claims; all other statuses require
claims and citations. Each cited ID must identify validated evidence supplied
with the answer. Exact quote validation is not a semantic entailment guarantee;
show source-attributed claims and keep contradictions/limitations visible.

Cancellation clears pending UI state immediately. It does not promise that
server work stops or that an already consumed allowance is refunded. Browser
abort can stop fetch/body consumption, but the adapter must also ignore late
completions from work that does not honor the signal. See
[AbortController.abort](https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort).

## Response-schema freeze: unresolved dependency

Section 6.2 lists the request keys, envelope keys, citation keys and
provider-answer keys. It does not provide complete JSON schemas for `me`,
document summaries, `read`, `debug`, or the model/usage/evidence metadata on
`ask`. Even the search fingerprint's serialized property name is not specified.
The planned shared HTTP schemas are absent from the backend at the time of this
implementation. The source database does establish citation origin values
(`synthetic` and `public`) and nullable speaker/date/source metadata;
`publishedAt` is required.

The briefing expressly forbids inventing fields. Consequently, this adapter does
not pretend that a guessed `{answer: ...}`, neighbor property name, access
object or diagnostic report structure is a frozen backend contract. The action
functions require a data parser supplied from the eventual reviewed backend
response schema. That parser must validate the entire action data shape and
return its inferred TypeScript type, not cast an unknown value or accept it
unchanged. The adapter's built-in evidence checks run in addition to that
parser.

The parser must reject unknown fields at the actual `ProviderAnswer` boundary,
for example with `z.strictObject`, and validate the separately allowed
`AnswerSchema` metadata. A normal Zod object that silently strips extra provider
fields is insufficient. The built-in answer scanner projects the three
provider-owned fields to validate status, claims and citation references; it
cannot determine whether an additional field is forbidden provider prose or
legitimate enclosing answer metadata until the wire boundary is frozen.
`extractProviderAnswer` is an accessor for an already validated response, not a
replacement for the full action parser. This strict-boundary check remains a
schema-freeze acceptance requirement.

This is a functional transport and evidence-validation seam, but **the
requirement for fully concrete response data shapes remains pending**. The
smallest next step is to obtain the exact action response schemas from the
backend owner, replace the generic data parameters with their concrete
types/parsers, and run shared success/error fixtures through both backend and
adapter. Do not wire generated UI guesses to an asserted response type. No
backend schema, root TODO or other lane's files were changed to conceal this
gap.

## Route behavior and worked call sequences

The examples below describe route integration, not implemented pages. `client`
is the configured research client, `parsers` contains the reviewed action-data
parsers, and each `controller` is a new `AbortController`. Define one request
scope for each independently rendered resource and retain it across replacement
requests. An answer scope must not cancel an unrelated source-reader request.

Import `me`, `list`, `read`, `search`, `ask` and `debug` from their
correspondingly named files under `src/api/`. Each function returns the
validated success envelope, so the action payload is `response.data`.
`MeData<T>`, `ListData<T>`, `ReadData<T>`, `AskData<T>` and `DebugData<T>`
preserve the type inferred by the injected `DataParser<T>`. `SearchData<T>`
additionally requires an `items` array, `mode: SearchMode` and
`truncated: boolean`; the backend parser supplies the concrete item type and
validates the actual fingerprint property. An item's evidence can be a direct
citation or a citation inside the frozen result shape.
`extractProviderAnswer(response.data)` returns the checked `ProviderAnswer`
union without assuming whether the unresolved answer layout is flat or nested.

### `/login`

Submit the entered credentials through the existing Supabase client's
`auth.signInWithPassword`. After sign-in succeeds, call `me` through the adapter
to establish current server access before navigating to `/app`. Restored
sessions also call `me`; do not infer premium/reviewer authorization from local
session metadata. Password authentication is owned by the auth client, not by a
seventh research action.

```typescript
await me(client, { action: 'me' }, parsers.me, { signal: controller.signal })
```

Render idle, signing-in/checking-access, credential/access error and cancelled
states. A missing session returns the route to sign-in. Empty is the initial
form, not an empty authorized account. `not_found` is not a login state. If the
user leaves while password sign-in is pending, invalidate the route's local
completion handler as well as aborting the subsequent `me` request; Supabase
password sign-in is outside this adapter's cancellation lifecycle.

### `/app`

Establish access with `me`; load the authorized current-document list with
`list`. Submit `search` only on an explicit search action and submit `ask` only
on an explicit standalone-question action. A suggested question may populate the
input, but must not spend allowance on page load. Omit `company` until the user
selects one; do not silently choose the first company.

```typescript
await list(client, { action: 'list' }, parsers.list, {
  signal: controller.signal,
})
await search(
  client,
  { action: 'search', query: question, limit: 10 },
  parsers.search,
  { signal: controller.signal, scope: searchScope },
)
await ask(client, { action: 'ask', query: question }, parsers.ask, {
  signal: controller.signal,
  scope: answerScope,
})
```

These are separate event examples, not a directive to perform all three calls on
every submit. Render loading separately for library/search/answer; an empty
authorized list or empty search is an empty-results state. Render a cancelled
request without an answer or error banner. Render `answered`, `partial` and
`conflict` with validated claims, exact quote cards and explicit missing
evidence. Render successful `not_found` as an insufficient-evidence answer
without claims. Render transport, HTTP and protocol errors as errors, with an
explicit retry action where allowed. Never show a failure as “the corpus has no
evidence.” Show search mode and the ten-result bound; do not invent a total
count or treat lexical-only mode as hybrid.

### `/read/:documentId/:revisionId/:passageId`

Read using the exact route parameters, including the retained revision. Do not
replace the revision with the current version. A source button navigates to the
validated `readerPath`; a deep link independently reauthorizes by calling
`read`.

```typescript
await read(
  client,
  { action: 'read', documentId, revisionId, passageId },
  parsers.read,
  { signal: controller.signal, scope: readerScope },
)
```

Render loading, an available exact passage, cancellation, a neutral
unavailable-source state for 404, and an error for other failures. Empty is not
a valid successful passage: an empty quotation is a protocol error. `not_found`
is not a reader state. Previous/next controls use the returned neighbor IDs and
issue another `read` using the same document and revision; never preload
unauthorized neighboring text or fabricate IDs. Disable a neighbor control when
its corresponding ID is absent according to the frozen schema. Keep
synthetic/public labels and nullable speaker/date attribution truthful.

### `/inspect`

Call `me` to establish access and `debug` for reviewer-authorized corpus counts
and the latest matching redacted report. The server makes the reviewer
authorization decision even when the UI hides the route from members.

```typescript
await debug(client, { action: 'debug' }, parsers.debug, {
  signal: controller.signal,
  scope: inspectorScope,
})
```

Render loading, cancelled, access denied for 403, error for failed diagnostics,
and an explicit no-matching-report state when the successful result contains
none. Use actual returned counts, including zero; do not make placeholder
statistics look real. `not_found` is not a diagnostic transport state.
Distinguish measured candidate recall from context selection; an induced
retrieval miss remains visible as a failed diagnostic. Never label an unreviewed
question a correct refusal. There is no run-model, impersonation or ingestion
mutation control.

## Verification record

The root `tsconfig.json` includes backend/scripts/tests but not `src/api`. This
lane therefore supplies `src/api/tsconfig.json`, extending nothing, as the
briefing permits. The merge owner must add the adapter and UI to the final
browser TypeScript build.

Executed from the repository root on 2026-09-13:

```text
$ pnpm exec tsc --noEmit -p src/api/tsconfig.json
```

Actual compiler output was empty (no stdout or stderr); exit status was **0**.
This check includes the adapter and its colocated tests under strict mode,
`noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`.

```text
$ pnpm exec vitest run --dir src/api --maxWorkers=1 --no-file-parallelism

 RUN  v4.1.6 <demo-root>


 Test Files  6 passed (6)
      Tests  61 passed (61)
   Start at  18:03:48
   Duration  762ms (transform 68ms, setup 0ms, import 241ms, tests 131ms, environment 0ms)
```

Exit status was **0**. Tests cover all six action wrappers, request/envelope
validation, all required HTTP status mappings, successful `not_found` versus
network error, citation identities/paths/code-point offsets, malformed answers,
foreign cited IDs, scope replacement, cancellation before token/fetch/body
completion, independent scopes, parsers that corrupt or fabricate evidence, and
search items with direct/wrapped citations or additional ranking metadata. They
run with injected local fetch fixtures, no credentials or network calls. Test
fixture data layouts do not freeze the missing production response schemas.

The client-setup snippet and all six documented action calls were also extracted
from this Markdown and executed with an offline
`node --import tsx --input-type=module` assertion harness. Actual output:

```text
Documentation examples: client setup and 6 action calls passed with test-only parsers; no network.
```

A TypeScript AST audit checked the implementation and test files. Actual output:

```text
Architecture: 65 TypeScript files passed one-unit, explicit-export, no-barrel, no-React and no-emoji checks.
```

These checks establish the local seam, not a working browser app or deployed
endpoint. The outstanding acceptance checks are the concrete response-schema
freeze, merged UI typecheck/build, and live authenticated route behavior
including CORS and RLS. They remain part of the existing frontend/backend
backlog; this lane owns only `src/api/` and this document.
