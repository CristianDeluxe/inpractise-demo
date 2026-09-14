# Deployment

The demo is live at <https://inpractise.cristiandeluxe.dev>, served by a Node
origin on nova (`<account>` cPanel account) behind Phusion Passenger under the
CloudLinux Node selector. The source is the public repository
[CristianDeluxe/inpractise-demo](https://github.com/CristianDeluxe/inpractise-demo).

## Topology

| Piece         | Value                                                           |
| ------------- | --------------------------------------------------------------- |
| DNS           | `A inpractise.cristiandeluxe.dev -> <server-ip>`, not proxied  |
| TLS           | cPanel AutoSSL, Let's Encrypt, issued 2026-09-14                |
| Account       | `<account>` on <host>                              |
| Application   | `/home/<account>/apps/inpractise-demo`, Node 24, `server.js`  |
| Document root | `/home/<account>/inpractise.cristiandeluxe.dev` (Passenger)   |
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
rsync -az --delete --exclude '.env' --exclude 'node_modules' --exclude 'tmp' \
  -e 'ssh -p <port> -i ~/.ssh/busirocket' \
  dist server server.js root@<host>:/home/<account>/apps/inpractise-demo/

ssh -p <port> -i ~/.ssh/busirocket root@<host> '
  chown -R <account>:<account> /home/<account>/apps/inpractise-demo
  cloudlinux-selector restart --json --interpreter nodejs \
    --domain inpractise.cristiandeluxe.dev --app-root apps/inpractise-demo'
```

`--exclude '.env'` is required: the server-side environment file is not in the
repository and `--delete` would otherwise remove it.

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

Installation is currently blocked on five unpublished exact `@syntopica/*`
packages, an outdated lockfile that still names `@busirocket/*`, and unpublished
`@cristiandeluxe/max-lane`, which is declared as `file:../max-lane`. Build from
a provisioned checkout only after the owner makes the exact packages available,
publishes or vendors max-lane without importing Keychain credentials, and
commits a regenerated lockfile; a clean Cloudflare Git build is not established
by these instructions. See
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
   reader refresh, basic-member sign-in and premium denial there; rehearse the
   two-minute script against that exact origin.

These authentication, project-creation and upload commands are documented for
the owner and were **not executed**. Their syntax follows
[Cloudflare Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/);
local serving does not establish a successful deployment.
