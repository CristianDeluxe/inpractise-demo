# Deployment

The demo is live at <https://inpractise.cristiandeluxe.dev>, served by a Node
origin on a cPanel host behind Phusion Passenger under the CloudLinux Node
selector. The source is the public repository
[CristianDeluxe/inpractise-demo](https://github.com/CristianDeluxe/inpractise-demo).

## Topology

| Piece         | Value                                                           |
| ------------- | --------------------------------------------------------------- |
| DNS           | `A inpractise.cristiandeluxe.dev -> <server-ip>`, not proxied   |
| TLS           | cPanel AutoSSL, Let's Encrypt, issued 2026-09-14                |
| Account       | `<account>` on <host>                                           |
| Application   | `/home/<account>/apps/inpractise-demo`, Node 24, `server.js`    |
| Document root | `/home/<account>/inpractise.cristiandeluxe.dev` (Passenger)     |
| Backend       | the existing Supabase research endpoint; nothing else is hosted |

`server.js` and `server/` are the origin: they serve `dist/` and return
`index.html` for any path that is not a file, so a reloaded deep route reaches
the client router. Fingerprinted `assets/` are served immutable, the entry
document `no-cache`, and every response carries
`X-Robots-Tag: noindex, nofollow`.

## Build

```sh
pnpm install --frozen-lockfile
pnpm build
```

`VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` must be in the local
environment or ignored `.env.local` before building; Vite embeds them in the
artifact, so a change to either requires a rebuild. Nothing else public may
enter the bundle: never copy `.env.remote`, `.env.functions.remote`, the corpus
or evaluation reports into `dist`.

## Deploy

```sh
DEPLOY_SSH_KEY=/path/to/owner-supplied-private-key
rsync -az --delete --exclude '.env' --exclude 'node_modules' --exclude 'tmp' \
  -e "ssh -p <port> -i \"$DEPLOY_SSH_KEY\"" \
  dist server server.js <deploy-user>@<host>:/home/<account>/apps/inpractise-demo/

ssh -p <port> -i "$DEPLOY_SSH_KEY" <deploy-user>@<host> '
  chown -R <account>:<account> /home/<account>/apps/inpractise-demo
  cloudlinux-selector restart --json --interpreter nodejs \
    --domain inpractise.cristiandeluxe.dev --app-root apps/inpractise-demo'
```

Set `DEPLOY_SSH_KEY` to the user-provided private-key path. `--exclude '.env'`
is required: the server-side environment file is not in the repository and
`--delete` would otherwise remove it.

## Verification performed on 2026-09-14

Against `https://inpractise.cristiandeluxe.dev`: `/`, `/method`, `/connect`,
`/login`, `/app`, `/inspect` and a full immutable reader path each returned 200
with the HTML shell; the entry document carries `no-cache` and the noindex
header; `/assets/index-*.js` returned `text/javascript` with
`public, max-age=31536000, immutable`; `robots.txt` disallows everything; and an
`OPTIONS` preflight to the Supabase research function from this origin, with
`apikey, authorization, content-type`, returned 204. The only secret-shaped
match in the served bundle is supabase-js's own `sb_secret_` prefix check, not a
key.

Noindex discourages indexing; it is not access control. Authenticated evidence
stays behind Supabase authorization.

### Frontend redeploy on 2026-09-14 for the diagnostics contract

`debug` began returning a `recentRequests` key and
`src/contracts/parseDebugData.ts` is a `z.strictObject`, so the previously
deployed bundle would have failed to parse the new response and broken
`/inspect`. The deployed origin must therefore be rebuilt in the same pass as an
Edge function response change, not after it.

`pnpm build`, then the rsync above for `dist server server.js`, then
`cloudlinux-selector restart --json --interpreter nodejs --domain inpractise.cristiandeluxe.dev --app-root apps/inpractise-demo`,
which returned `{"result": "success"}`. Re-probed: `/`, `/method`, `/connect`,
`/login`, `/app` and `/inspect` each returned 200, and `/api/v1/health` returned
`{"status":"ok","scope":"facade-only","backendChecked":false}`. The lazy chunks
were fetched individually to confirm the new code is the code being served:
`/assets/InspectionPage-C71whWct.js` returned 200 and contains both
`recentRequests` and `candidateAt10`, and `/assets/WorkspacePage-iTCvrxnZ.js`
returned 200 and contains `candidateAt10`.

### Company entry and follow-up release on 2026-09-15

Two frontend passes and one function pass. First `/app` became the company entry
(commits `999b9ce` and `ef5e1b3`): `pnpm build` with the real environment, the
rsync above, and `cloudlinux-selector restart` returned `{"result": "success"}`;
`/`, `/login`, `/app`, `/app/ask`, `/app/library` and `/inspect` returned 200
and the served `WorkspacePage-*.js` chunk contained `Start with a company`,
`Synthetic interviews` and `Interview dates`.

Then follow-up questions (commit `87c0873`), frontend first because the deployed
client validates `ask` responses with a strict schema and would have rejected
the new `resolvedQuery` key: build, rsync and restart as above, then
`supabase functions deploy research --use-api --no-verify-jwt --import-map supabase/functions/deploy-import-map.json --project-ref <ref>`
returned `"Deployed Functions."`. Re-probed: `/`, `/app`, `/app/ask` and
`/inspect` returned 200 and the served entry chunk contained both
`Asked the corpus as` and `Follow-ups are fine`. As the demo reviewer against
the live function, a first `ask` returned `answered` with `resolvedQuery` equal
to the question as typed, and a follow-up `And what about the smaller ones?`
sent with that one earlier turn returned `partial` with two claims and two
citations and `resolvedQuery`
`What makes smaller Northstar installations hard or easy to replace compared to complex ones?`.
CI run 34990945894 on `87c0873` passed after one rerun of the security job,
whose first attempt failed downloading gitleaks (`curl: (35)`), not on a
finding.

### Notebook, compare, investigate and latency release on 2026-09-16

Head commit `2c40b14` (`main`), deployed from a linked worktree while another
session held the primary checkout. Migrations first, since both sides validate
each other with strict schemas: `supabase db push` applied
`20260915000013_research_notes.sql`, `20260915000014_query_embedding_cache.sql`
and `20260915000015_search_candidates_kind_filter.sql`;
`supabase migration list` then showed all fifteen local migrations matched on
the remote project. `pnpm db:verify` refused to run from the worktree path (its
guard hardcodes the primary checkout), so the CLI's migration list stood as the
confirmation, as anticipated.

`supabase functions deploy research --use-api --no-verify-jwt --import-map supabase/functions/deploy-import-map.json --project-ref <ref>`
returned "Deployed Functions on project \<ref\>: research".

`pnpm build` with the real `VITE_` environment, the rsync above for
`dist server server.js`, then
`cloudlinux-selector restart --json --interpreter nodejs --domain inpractise.cristiandeluxe.dev --app-root apps/inpractise-demo`
returned `{"result": "success"}`.

Re-probed `/`, `/method`, `/built`, `/connect`, `/login`, `/app`, `/app/ask`,
`/app/compare`, `/app/notes` and `/inspect`: all returned 200. The served
`/assets/index-*.js` hash matched the just-built artifact byte-for-byte
(`index-BuHe2mcN.js`). This app code-splits by route, so the entry chunk itself
carries no feature prose; the route table it does carry lists `/app/ask` and
`/app/compare`, and the lazy `AskPage-*.js` (200) contains the `investigate`
stream-event identifier while `ComparePage-*.js` (200) is the chunk that route
loads, confirming the new bundle is live.

As the reviewer (`me@cristiandeluxe.dev`) against the live function, one call
each, no retries: `search` (microsoft, "revenue growth") 200 in 5403 ms; `ask`
("What drove revenue growth?", microsoft) 200 in 4749 ms, `answered`;
`investigate` ("How has margin trended?", microsoft) 200 in 3489 ms, `not_found`
(the corpus does not establish a margin trend for the question as asked, a valid
retrieval outcome, not an error); `compare` (microsoft, "cloud growth") 200 in
1799 ms; `note_save` against the search's first citation 200 in 546 ms;
`note_list` 200 in 502 ms, one row; `note_delete` of that note 200 in 435 ms.

Chromium screenshots of the live `/` and `/built` at 1440x900 full-page showed
no empty band taller than 80px on either page.

### Research agent, cross-reference, notebook and ingestion release on 2026-09-16

Head commit `64754e6` (`main`), deployed from the `ship-main` worktree (the
primary checkout stayed detached at the same commit for an earlier fix, so
`main` itself was only checked out there). Confirmed migrations first:
`supabase migration list --project-ref <ref>` showed all sixteen local
migrations, including `20260915000013_research_notes.sql`,
`20260915000014_query_embedding_cache.sql`,
`20260915000015_search_candidates_kind_filter.sql` and the corpus stage's
`20260916000016_annual_report_kind.sql`, matched on the remote project - none
needed a `db push`. `pnpm db:verify` still refuses to run from a worktree path
(its guard hardcodes the primary checkout); run from the primary checkout it
failed exactly as `TODO.md` records, asserting a stale table list that does not
know about `query_embeddings` or `research_notes` - and its `actual` list proved
both new tables exist, which stood as the confirmation.

`supabase functions deploy research --use-api --no-verify-jwt --import-map supabase/functions/deploy-import-map.json --project-ref <ref>`
returned
`{"project_ref":"...","functions":["research"],"message":"Deployed Functions."}`.

`pnpm build` with the real `VITE_` environment, the rsync above for
`dist server server.js`, then
`cloudlinux-selector restart --json --interpreter nodejs --domain inpractise.cristiandeluxe.dev --app-root apps/inpractise-demo`
returned `{"result": "success"}`.

Re-probed `/`, `/method`, `/connect`, `/built`, `/login`, `/app`, `/app/ask`,
`/app/compare`, `/app/notes` and `/inspect`: all returned 200. The served
`/assets/index-URcuHN0p.js` matched the just-built artifact byte-for-byte.

As the reviewer (`me@cristiandeluxe.dev`) against the live function, one call
each, no retries: `search` (microsoft, "revenue growth") 200 in 2342 ms; `ask`
("What drove revenue growth?", microsoft) 200 in 2204 ms, `answered`;
`investigate` ("How has margin trended?", microsoft) 200 in 3676 ms, `not_found`
(a valid retrieval outcome, not an error); `compare` (microsoft, "cloud growth")
200 in 1378 ms, both sides `not_found` for that exact phrasing; `note_save`
against the search's first citation 200 in 499 ms; `note_list` 200 in 400 ms,
one row; `note_delete` of that note 200 in 470 ms.

`pnpm api:latency deployed` (`scripts/api/measureLatency.ts`) recorded one
labelled run against `zkcervfahhmyzmrdpgjx.supabase.co` in
[api-latency.json](api-latency.json): sign-in 460 ms, cold search 4790 ms, warm
`searchMs` p50 1394 ms / p95 1727 ms, `readMs` p50 437 ms / p95 509 ms,
`askFirstPhaseMs` p50 468 ms / p95 1002 ms, `askAnswerMs` p50 3112 ms / p95 4325
ms, all ten sampled asks `answered`.

Chromium screenshots of the live `/` and `/built` at 1440x900 full-page showed
no empty band taller than 80px on either page.

### Investigate-length and compare-scope hotfix on 2026-09-16

Head commit `40d9edd` (`main`), two live defects: `investigate` rejected any
question whose synthesis spanned more than one company, because the prompt never
stated the schema's 500-character claim cap; and `compare` required a company,
but no company in the corpus carries both interviews and filings, so every
cross-reference reported both sides uncovered. Fixed the prompt (state the cap,
one sentence per claim) plus one bounded retry restating the limit when every
schema failure is `too_big`, and made the compare company scope optional end to
end, server and client, defaulting to every authorized company.

Function deployed first, since the client would start sending `compare` without
a company:
`supabase functions deploy research --use-api --no-verify-jwt --import-map supabase/functions/deploy-import-map.json --project-ref <ref>`
returned
`{"project_ref":"...","functions":["research"], "message":"Deployed Functions."}`.
`pnpm build` with the real `VITE_` environment, the rsync above for
`dist server server.js`, then
`cloudlinux-selector restart --json --interpreter nodejs --domain inpractise.cristiandeluxe.dev --app-root apps/inpractise-demo`
returned `{"result": "success"}`.

Re-probed `/`, `/method`, `/connect`, `/login`, `/app`, `/app/ask`,
`/app/compare`, `/app/notes` and `/inspect`: all returned 200, and
`/api/v1/health` returned
`{"status":"ok","scope":"facade-only", "backendChecked":false}`. The served
`/assets/index-BRz6tZxk.js` matched the just-built artifact byte-for-byte, and
the lazy `ComparePage-BI0UgVDx.js` (200) contains
`across every company you may read`.

As the reviewer (`me@cristiandeluxe.dev`) against the live function:
`investigate` with the exact failing question, "How do Microsoft and Costco each
describe their principal competitive risks?", returned `partial` (four claims,
both sub-questions covered) instead of `invalid_model_answer`.

A follow-up question ("How does Rolls-Royce describe its exposure to supply
chain and raw material risk compared to how Microsoft describes its
cybersecurity risk?") reproducibly returned `dependency_failure` ("Usage
recording failed") on this first deployment. That traced to a bug in the retry
itself, not the prompt fix: `requestSynthesis.ts` called the real `onUsage`
callback once per completion, so a retried request called `record_request_usage`
twice for the same `request_id`; that RPC accepts exactly one write per request
(`WHERE total_tokens IS NULL`), and the second call always failed. Fixed by
accounting both the original and retried completions against the local
`TokenBudget` only (via the existing `budgetUsageSink` pattern used elsewhere
for discardable calls) and calling the real `onUsage` exactly once, with the
cumulative totals, after whichever attempt is final. Added a regression test
asserting exactly one `record_request_usage` call across a retried pair
(`investigateSynthesisRetry.test.ts`); confirmed it fails against the old code
("Expected one usage write covering both attempts, saw 2") and passes against
the fix. Redeployed the `research` function with the fix; the same question then
returned `502 invalid_model_answer` ("claims/too_big") instead of
`dependency_failure` - a different, genuine schema failure: the model's `claims`
array itself (not one claim's text) exceeded its 4-entry cap, which this
hotfix's retry prompt does not address (it only restates the per-claim-text
limit). Re-running "What does Costco say about membership fee income?" three
times in a row live returned `partial` (4 claims), then the same
`claims/too_big` error, then `partial` (4 claims) again with nothing else
changed, confirming this is pre-existing model non-determinism at the 4-claims
boundary, not a regression from this change. Recorded as a distinct, separate
finding in `TODO.md`.

Two more `investigate` questions, chosen because they were stable across
repeated calls: "What do Microsoft, Costco and Rolls-Royce each say about
regulatory and legal risk in their filings?" returned `partial` (three claims);
a repeat of "What does Costco say about membership fee income?" returned
`partial` (four claims).

`compare` with no company: topic "how hard is it to replace an installed system"
returned `company: null`, both sides `partial` (one claim each) with one
`extends` relation; topic "supply chain and supplier concentration risk"
returned `company: null`, both sides `partial` (three interview claims, one
filing claim) with three `extends` relations. A scoped regression check,
`compare` with `company: "microsoft"` and topic "cloud growth", still returned
`company: "microsoft"` with `uncovered: ["interviews"]`, matching prior
behaviour.

## HTTP API on the origin

`server.js` routes `/api/v1` to the facade built from `server/api/` and every
other path to the static origin. The facade is credential-free: it forwards the
caller's bearer token to the research Edge function and holds no key of its own,
so the only server-side variable it needs is the backend URL.

`RESEARCH_URL` lives in `/home/<account>/apps/inpractise-demo/.env` (`0600`,
owned by `<account>`, excluded from `rsync` by the deploy command above). The
CloudLinux Node selector starts the app without reading that file, so
`server.js` loads it itself through `server/loadOriginEnv.mjs`; a missing file
is reported by path and the facade then answers `503 dependency_failure` rather
than starting with a silent misconfiguration.

```sh
ssh <host> '
  f=/home/<account>/apps/inpractise-demo/.env
  grep -q "^RESEARCH_URL=" "$f" || echo "RESEARCH_URL=<supabase-url>/functions/v1/research" >> "$f"
  chown <account>:<account> "$f" && chmod 600 "$f"
  sed "s/=.*/=<set>/" "$f"'
```

### nginx must forward the validators

Evidence responses carry `ETag` and `Cache-Control: private, no-cache`, and the
facade answers `304` to a matching `If-None-Match`. nginx hides conditional
request headers from the backend on any location where `proxy_cache` is enabled,
which the cPanel-generated vhost sets on `location /`. The API prefix therefore
opts out in
`/etc/nginx/conf.d/users/<account>/inpractise.cristiandeluxe.dev/api.conf`:

```nginx
location /api/v1 {
    proxy_cache off;
    proxy_cache_bypass 1;
    proxy_no_cache 1;

    include conf.d/includes-optional/cpanel-proxy.conf;
    proxy_set_header If-None-Match $http_if_none_match;
    proxy_set_header If-Modified-Since $http_if_modified_since;
    proxy_pass $CPANEL_APACHE_PROXY_PASS;
}
```

That directory is the cPanel user-include location, so it survives a vhost
rebuild. Without it the passage endpoint still answers correctly, but always
with `200`.

### API verification performed on 2026-09-14

Against `https://inpractise.cristiandeluxe.dev/api/v1`: `/health` returned
`{"status":"ok","scope":"facade-only"}`; `/openapi.json` returned 200;
unauthenticated `/me` returned `401 application/problem+json` with
`urn:inpractise-demo:problem:unauthenticated` and a `requestId`; the test-only
basic fixture's `/me` returned
`{"orgId":"org-a","role":"member","premium":false}`; `/documents?pageSize=2` and
`POST /search` with `{"query":...,"limit":2}` returned corpus rows with
document, revision and passage identifiers; the cited passage returned `200`
with an `ETag`, and repeating it with `If-None-Match` returned `304`. The
`org-b` persona received its own organization's copy and a `200` - not a `304` -
when replaying the `org-a` `ETag`, because the read scope is part of the tag.

The `x-research-org-id` header the facade needs for that scope is produced by
`supabase/functions/research/researchResponse.ts`, which was deployed in the
same pass (`supabase functions deploy research --no-verify-jwt`).

## Two AutoSSL notes

cPanel created the subdomain with both `inpractise.cristiandeluxe.dev` and
`www.` on the account's AutoSSL exclusion list
(`/var/cpanel/ssl/autossl/excludes/<account>.json`), so the first
`autossl_check` skipped the domain entirely and HTTPS served a self-signed
certificate. Clearing that list and rerunning
`/usr/local/cpanel/bin/autossl_check --user=<account>` issued the certificate.
The `www.` host has no DNS record and fails DCV by design; the certificate
covers the bare host only.

## Historical Cloudflare Pages preparation

This repository produces a static Vite SPA. Its backend is the existing Supabase
research endpoint; Pages needs no Worker, Function, database binding or backend
secret. This document prepares a direct upload only. No Cloudflare project,
deployment, DNS record or remote CI run was created during this task.

## Build input and output

| Setting                      | Value                            |
| ---------------------------- | -------------------------------- |
| Working directory            | Repository root                  |
| Runtime                      | Node 24.20.0, pnpm 12.4.1        |
| Install                      | `pnpm install --frozen-lockfile` |
| Build command                | `pnpm build`                     |
| Output directory             | `dist`                           |
| Browser environment variable | `VITE_SUPABASE_URL`              |
| Browser environment variable | `VITE_SUPABASE_PUBLISHABLE_KEY`  |

Supply the two public variables in ignored `.env.local` or the local build
environment before building. Vite embeds them in the artifact; adding variables
to Pages after a direct upload cannot change that artifact. Rebuild when either
changes. Never copy `.env.remote`, credentials, the corpus, evaluation reports
or the MCP process into `dist`.

`pnpm install --frozen-lockfile` succeeds on a clean checkout. The one
unpublished dependency, `@cristiandeluxe/max-lane`, is optional and belongs to
the local `evals/` harness alone; pnpm skips it when the sibling directory is
absent, and no build or runtime path imports it. See
[Vite environment variables](https://vite.dev/guide/env-and-mode) and
[Pages build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/).

## Routing and noindex

`public/_redirects` is copied to `dist/_redirects`. Its explicit HTTP 200
rewrites serve the root HTML shell (`/`) for `/method`, `/connect`, `/login`,
`/app`, `/inspect`, `/read/*` and the existing auth/workspace aliases. The
browser keeps the requested URL, including immutable reader IDs. Assets are not
rewritten. `public/404.html` is copied to the output to **disable Pages
automatic SPA fallback**: an unmatched URL is a real 404, making a missing
rewrite observable. A filesystem-only server such as Python's `http.server` does
not interpret `_redirects`; use the Pages static server below.

The existing `index.html` robots meta tag, `public/robots.txt` disallow rule and
`public/_headers` with `X-Robots-Tag: noindex, nofollow` remain. The added 404
page also has noindex metadata. Noindex discourages indexing; it is not access
control. Authenticated evidence remains behind Supabase authorization. See
[Pages routing](https://developers.cloudflare.com/pages/configuration/serving-pages/),
[redirect rules](https://developers.cloudflare.com/pages/configuration/redirects/)
and [headers](https://developers.cloudflare.com/pages/configuration/headers/).

## Verify locally before uploading

The preparation uses Wrangler **4.131.1**. From the repository root:

```sh
pnpm build
pnpm dlx wrangler@4.131.1 pages dev dist --ip 127.0.0.1 --port 4175 --inspector-port 9235 --compatibility-date 2026-09-11
```

This serves the actual `dist` using Cloudflare's local static asset handler,
without Vite preview or a proxy command. `dist/404.html` disables implicit SPA
fallback. In a second terminal:

```sh
curl --fail --silent --show-error http://127.0.0.1:4175/method
curl --fail --silent --show-error http://127.0.0.1:4175/app
curl --fail --silent --show-error http://127.0.0.1:4175/read/s1/ab42aaa01bc9ae30065733e728e678b004f91fc097ff33186169ac69dc2fde94/P2
curl --silent --show-error --output /dev/null --write-out '%{http_code}\n' http://127.0.0.1:4175/not-a-client-route
```

The first three requests must return the built HTML shell with noindex; the last
must print `404`. Also verify `/connect`, `/login`, `/inspect`, existing aliases
and both reader paths in [the demo script](demo-script.md). A direct `/read/...`
load must return the shell, then authenticate before retrieving any evidence.
Verify JavaScript and CSS URLs from `dist/index.html` still return their
original bytes and content types, and that `X-Robots-Tag` is present on both
rewrites and ordinary assets.

The task's repeatable probe is `python3 /tmp/lovable-work/verify-pages.py`,
against the server on port 4175. It checks direct routes, aliases, immutable
reader paths, headers, noindex, assets and a negative 404 control. It also
checks a separate copy of the same build without `_redirects`, served on port
4176: `/method`, `/app` and the reader must fail there. That proves explicit
rules, rather than automatic fallback, make the production artifact work. The
copy and probe are local verification artifacts, not upload inputs.

The task installed the same Wrangler version under
`/tmp/lovable-work/pages-tools` and invoked its binary directly, with cache,
configuration, persistence and temporary directories under `/tmp/lovable-work`.
This avoids writing tool caches outside the authorized roots. See
[local Pages development](https://developers.cloudflare.com/pages/functions/local-development/).

## Owner-controlled publication steps — not executed

1. Resolve the remote signup policy and the mid-request claim-revocation risk
   recorded in [TODO.md](../TODO.md). Review the final artifact and approve
   publication under the intended personal/side-project Cloudflare account.
2. Authenticate Wrangler in that account. Select a Pages project name and
   production branch. Create a **Direct Upload** project through Workers & Pages
   → Create application → Get started → Drag and drop, or use
   `pnpm dlx wrangler@4.131.1 pages project create` and answer its
   project-name/production-branch prompts. Do not upload the repository root.
3. Build and run the checks above. After the project exists, set
   `PAGES_PROJECT_NAME` and `PAGES_PRODUCTION_BRANCH` to the owner's choices.
   The upload is one command:

```sh
pnpm dlx wrangler@4.131.1 pages deploy dist --project-name "$PAGES_PROJECT_NAME" --branch "$PAGES_PRODUCTION_BRANCH"
```

4. Use the URL returned by that command. No custom domain or DNS change is
   needed for its assigned `pages.dev` address. Recheck noindex headers, direct
   reader refresh and the `me@cristiandeluxe.dev` reviewer sign-in there;
   rehearse the two-minute script against that exact origin. Keep the premium
   denial as an integration-test check rather than a live reviewer step.

These authentication, project-creation and upload commands are documented for
the owner and were **not executed**. Their syntax follows
[Cloudflare Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/);
local serving does not establish a successful deployment.

### Evidence-integrity release on 2026-09-14

Frontend first, then the Edge function: `src/http-api/answerOutput.ts` extends a
`z.strictObject`, so a client deployed before this release would have rejected
an `ask` response carrying `vintage` as a protocol error and lost the whole
answer. `pnpm build`, the rsync above for `dist server server.js`, then
`cloudlinux-selector restart` returned `{"result": "success"}`;
`supabase functions deploy research --use-api --no-verify-jwt --import-map supabase/functions/deploy-import-map.json`
then published version 15.

Re-probed live: `/`, `/method`, `/connect`, `/login`, `/app`, `/inspect` and
`/answer/<unknown-uuid>` each returned 200, and `/api/v1/health` returned
`{"status":"ok","scope":"facade-only","backendChecked":false}`. The lazy chunks
were fetched individually: `/assets/ProvenancePage-83qmoxjX.js` returned 200 and
contains `provenance`, and `/assets/WorkspacePage-DNjTE4YG.js` returned 200 and
contains both `Sources disagree` and `vintage`. As the reviewer persona, `ask`
returned `answered` with
`vintage={"oldest":"2026-08-04","newest":"2026-08-26","oldestAgeDays":41,"newestAgeDays":19}`,
the Harbor delivery question returned `status=conflict` with two claims,
`provenance` on the caller's own request id returned 200 with the revision list
marked `current: true`, and an unknown request id returned 404 `not_found`,
which the client maps to `request_not_found`.
