# Lovable design port

The browser application is a client-only Vite SPA with code-based TanStack
Router routes. It retains the Lovable navy/orange palette, editorial typography,
desk artwork, source cards and workspace navigation. The approved reductions in
`/tmp/lovable-work/MAP.md` remove unsupported product flows and fabricated data.
The implementation brief is `/tmp/lovable-work/BRIEFING-U2.md`.

Verification commands: `pnpm type-check`, `pnpm lint`, `pnpm format:check`,
`pnpm build`, `pnpm test`. The original test command, suites, coverage
thresholds, validators, backend, corpus, evaluation harness and MCP
implementation are unchanged. Additional UI/parser tests live under `src/app`
and `src/contracts`. `pnpm test:ci` also checks the credential-free subset with
the original coverage thresholds.

## Browser entry and routes

`index.html` mounts `src/main.tsx`; `src/routes/routeTree.ts` assembles the
routes. The public `/`, `/method` and `/connect` routes work without
credentials. The landing comparison contains only reviewed public fields from
`corpus/sample.json`. It is explicitly curated and never supplies an
authenticated answer.

`/login` offers provisioned password sign-in. A successful `me` response gates
`/app`, `/read/:documentId/:revisionId/:passageId` and `/inspect`. The workspace
combines a library, explicit passage search, standalone Ask and source dialogs.
The reader reauthorizes exact revisions; adjacent passage reads retain the same
document and revision. Inspection calls reviewer-only `debug` even when a member
manually enters its URL. The server remains the authority.

Old auth/reset URLs redirect to password login, library/Ask URLs to the matching
workspace section, and diagnostics to inspection. Old document identifiers are
not converted into invented passage references. No source is opened by guessing
its first passage ID.

The root mounts the independent-demo disclosure. Source records separately label
fictional companies/speakers and public filings. Provider claims and quotations
are escaped React text; no Markdown or raw HTML renderer handles evidence.

## Environment and data boundary

The browser uses only `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.
The local ignored `.env.local` contains those two public values copied from the
existing project configuration. No private key or password is embedded in the
application. `src/runtime` owns the single browser Auth client and request
lifetime; `src/operations` calls the existing individual `src/api` actions with
current session credentials.

`src/contracts/parse*Data.ts` strictly validates the shapes observed in the
current backend. It reuses the existing citation and provider-answer validators.
Unknown provider prose, malformed citations and foreign claim references reject
the response. This source-backed integration does not replace the outstanding
backend-owner schema-freeze agreement in `frontend-contract.md`.

Requests are independent per resource. Replacement, cancellation, unmount and
session changes suppress stale completions. Auth invalidation clears the
evidence subtree. Repeated Auth notifications for the same token do not erase
current work. No answer/history cache is persisted, and no search or Ask retries
automatically.

## Verified boundary and release blockers

The backend owner deployed the CORS fix separately. Briefing U3 verified the
production build in headless Chrome through the deployed endpoint, without
response interception. Basic sign-in returns nine authorized documents and
hybrid search returns ten ranked passages. Exactly two explicit Ask requests
produced an answer with one cited claim and a bounded not-found response with no
claims or citations. The server-provided reader path survives a full page
refresh and opens the quotation actually returned.

A basic member receives a plain 404 for the premium S6/P2 passage, with no
restricted title or label in the rendered DOM or captured research payloads.
Basic inspection renders the server's access denial. Reviewer inspection shows
nine documents, nine revisions, 958 passages and 958 vectors, with
`report: null` and `diagnosis: unclassified`. Sign-out removes rendered evidence
and aborts an in-flight live search. No UI or backend change was needed.

These live browser checks supersede the earlier CORS blocker and fixture-only
browser findings. They do not establish browser/MCP parity or measured answer
quality beyond the two observed questions.

Other retained boundaries:

- The UI enforces the documented ten-document list limit with an error. The
  backend currently permits fifty; its owner must reconcile the bounds.
- List records contain no first-passage pointer. Use explicit passage search.
- Neighbor IDs have no direction. Controls say “Adjacent passage”.
- Search/Ask have no fingerprint or model/usage metadata to display.
- Debug currently returns `report: null` and `diagnosis: unclassified`. The UI
  says no reviewed evaluation report is connected; it cannot display an induced
  miss until a matching redacted report is supplied.
- Remote signup policy and deployment remain separate pre-release work.
- Route components load as separate chunks. The shared entry still exceeds
  Vite's default 500 kB warning; no warning threshold was raised.

## Render checks and artifacts

Briefing U3 exercised six routes at 1440px, 390px and 320px against real
responses, including source-panel reflow, visible keyboard focus, dialog focus
return and selectable quotations. Screenshots were also visually inspected. This
was automated headless Chrome verification, not a human screen-reader or
mobile-device session.

`/tmp/lovable-work/FINDINGS.md` records commands, screenshots and limitations.
`live-browser.mjs --surfaces-only` repeats the non-Ask browser checks against
the local production preview. `live-browser-results.json` and `live-browser.log`
retain that passing run. The initial run's real Ask evidence is retained in
`live-attempt-1-browser-results.json`; its reader assertion ran before route
completion and was corrected in the probe. `live-ask-budget.json` records the
two consumed requests. The harness caps cumulative Ask attempts at four and does
not retry automatically. `live-*.png` contains the live evidence; older
`*-fixture-*.png` images remain explicitly fixture-only.

All five required gates pass through `sh /tmp/lovable-work/verify.sh`, which
also runs the offline suite. Full tests: 134 passing; offline tests: 114
passing. Use the repository's Node 24.20.0 runtime and the wrapper's local
cache/temp environment when repeating these commands within the briefing's write
boundaries.

The output directory is `dist/`, with no worker or server runtime. U4 adds
explicit `_redirects` and a top-level `404.html` to disable implicit SPA
fallback and make missing rewrite rules observable. Noindex metadata,
`robots.txt` and `_headers` are included. See
[deployment preparation](deploy.md) for the local Pages static-server checks. No
deployment, commit or push was performed.
