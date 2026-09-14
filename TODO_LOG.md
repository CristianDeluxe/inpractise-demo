# TODO Log

- 2026-09-14 — **Restored Lovable landing sections and hover behavior.**
  Restored the library tabs/cards, podcast artwork/platform links, executives
  CTA, interlude gradient/reveal, evidence chrome, header/mobile menu and all
  footer columns. Cards open `/app`; login/recruitment presentation opens
  `/login`; the RSS link serves a disclosed static demo feed. Particle pointer
  highlighting matches Lovable and stops under reduced motion. Source dialogs
  restore focus to the invoking citation or text button; hero masks preserve
  descenders. Library presentation entries and copied artwork match the
  read-only reference. Verification: `python3 work/lovable3/verify.py` runs the
  seven requested gates; `python3 work/lovable3/verify-reference.py` checks
  reference parity and scope; browser commands/results and deliberate
  differences are recorded beside the Lovable3 briefing in `FINDINGS.md` and
  under `work/lovable3/`. One intermittent unchanged workspace-test readiness
  timeout is preserved in the active TODO; isolated and full reruns passed. No
  commit, push, deployment or backend/corpus mutation was performed.

- 2026-09-14 — **Owner-approved Lovable presentation values.** The owner
  superseded the earlier corpus-backed hero statistics and ticker requirements:
  restored Lovable's exact labels, values and middle-dot punctuation, removed
  the statistics framing and manifest drift tests. All other application changes
  are preserved. Verification commands: `pnpm type-check`, `pnpm lint`,
  `pnpm format:check`, `pnpm build`, `pnpm test:ci`, `pnpm knip`, `pnpm dupes`.
  Results are appended to the Lovable2 briefing's `FINDINGS.md` and recorded in
  `work/lovable2/owner-*.log`.

- 2026-09-14 — **Calm protected-route sign-in and restored landing motion.**
  Missing sessions show a sign-in invitation with the requested URL; rejected
  sessions retain the existing alert and request ID. Restored hero choreography,
  decorative particles, scroll reveals, the running-index ticker and the four
  hero statistics, desk parallax, and link underlines. Reduced motion disables
  motion work and keeps content visible; mobile hero columns no longer clip
  copy. Evidence: `pnpm type-check`, `pnpm lint`, `pnpm format:check`,
  `pnpm build`, `pnpm test:ci`, `pnpm knip`, `pnpm dupes`; raw logs and a
  repeatable browser probe are in ignored `work/lovable2/`. The Lovable2
  briefing's `FINDINGS.md` records results and deliberate design adaptations.

- 2026-09-14 — **Revoked evidence can no longer leave prose behind.**
  `buildAskResult` dropped the citation of a passage the caller had lost access
  to but kept the claim text. It now drops the claim, and an answer that loses
  all of its evidence becomes `not_found` with "Access to the supporting
  evidence changed." Regression: `tests/unit/revokedEvidence.test.ts`, two
  cases. Deployed.

- 2026-09-14 — **Public signup disabled on the demo project.** Remote
  `disable_signup` was `false`; set to `true` through the Management API and
  confirmed from the client: `POST /auth/v1/signup` answers 422
  `signup_disabled`. Only provisioned accounts remain.

- 2026-09-14 — **CORS refused the browser.** The function allowed only
  `authorization, content-type`, so every browser request failed its preflight.
  It now allows `apikey, authorization, content-type, x-client-info`; verified
  with a live OPTIONS probe returning 204.

- 2026-09-14 — **Research documents moved out of the career knowledge base.**
  `docs/research/` here is the single copy; the portfolio keeps a pointer at
  `career/applications/2026-09-inpractise-fullstack-product-engineer/code-project.md`
  (commit 7e89c6b there).

> Searchable record of closed project work. Active work lives in `TODO.md`.

## 2026

### 2026-09

- [x] 2026-09-14 — **Unified project naming and documented the review/install
      path.** Package and MCP identity are `inpractise-demo`; the human title is
      In Practise Demo. Rewrote README, added CONTRIBUTING, CONTEXT,
      architecture, client installation guidance and five ADRs; preserved frozen
      research, corpus, migrations, lockfile and the captured handshake.
      Recorded actual token validation, missing allowance enforcement and
      revocation limits. Verification: `pnpm type-check`, `pnpm lint`,
      `pnpm format:check`, `pnpm build`, `pnpm test:ci`, `pnpm knip`,
      `pnpm dupes` and `pnpm check:ci` passed (133 offline tests and seven
      corpus tests in the aggregate). `pnpm mcp` reported the renamed server;
      SDK stdio probes negotiated it, discovered both tools and fetched the
      documented synthetic passage. Installation, local dev/preview and isolated
      Claude CLI registration examples were executed.
      `python3 work/docs1/audit-docs.py` checks links, document-map coverage,
      retained results and protected hashes. Full outputs and unverified claims
      are in the docs1 briefing's FINDINGS.md; repeatable local probes are in
      ignored `work/docs1/`. No commit, push, deployment, provider generation or
      database provisioning was performed.

- [x] 2026-09-14 — **Publication decisions resolved by Briefing D1.** The owner
      authorized public `CristianDeluxe/inpractise-demo` and nova hosting at
      `https://inpractise.cristiandeluxe.dev`. This closes the remote-ownership
      decision and supersedes Pages hosting. D1's read-only preflight verified
      the GitHub identity, ignored credential/build paths and three checksum
      false positives. Publication remains blocked in `TODO.md`: the working
      scan found a real key in an ignored, never-tracked file, triggering the
      briefing's stop rule, and nova SSH returned `No route to host`.
      `pnpm check:security` exited 1; no passing security or deployment claim is
      made. Evidence: `docs/deploy.md` and the D1 redacted reports under
      `/tmp/lovable-work/`.

- [x] 2026-09-13 — **Presentation and deployment preparation (U4):** Rewrote
      README around the running workflow, disclosed SEC/synthetic scope,
      measured 14-case evaluation and F03 selection miss, negotiated MCP
      protocol and tested security boundaries. Updated method copy without
      changing its design. Added a 120-second demo script with exact local URLs,
      two failure demonstrations and a timed historical-evidence fallback. Added
      Pages documentation, explicit rewrites and a noindex 404 page that
      disables automatic SPA fallback. Local Pages serving passes 18 direct
      routes, asset identity/type, noindex and a real 404; removing rewrites in
      a separate copy makes method/app/reader return 404. Method reflows at
      1440/390/320px. All five briefing gates pass (134 tests); the extra
      offline suite passes 114 tests. A local synthetic probe confirms retained
      claim prose after citation revocation; the backend fix and deployed
      rehearsal remain active backlog items. Verification:
      `sh /tmp/lovable-work/verify.sh`,
      `python3 /tmp/lovable-work/verify-pages.py`,
      `node /tmp/lovable-work/u4-browser.mjs`, and
      `node /tmp/lovable-work/u4-integrity.mjs`. Full commands, limitations and
      local evidence are in `/tmp/lovable-work/FINDINGS.md`. No commit, push,
      deployment, provider generation or backend/test/validator edit.

- [x] 2026-09-13 — **Live browser verification after the owner CORS fix:**
      Production Vite build served locally passed real basic-member sign-in,
      nine authorized documents, ten hybrid-ranked passages, an answered Ask
      with one cited claim and a not-found Ask with no claims or citations.
      Exactly two live Ask requests were used. Source dialogs, server-built
      reader links and full refresh pass. Premium S6/P2 returns a plain 404 with
      no restricted title or label in the DOM or basic research payloads. Basic
      inspection denies access; reviewer inspection shows nine documents, nine
      revisions, 958 passages and 958 vectors, with no report connected.
      Sign-out clears evidence and aborts a pending live search. Six routes and
      source dialogs fit 1440/390/320px; visible keyboard focus, source-dialog
      focus return and selectable quotations pass. No response interception or
      UI fix was used. The earlier fixture-only/CORS backlog entries are closed.
      Evidence: `/tmp/lovable-work/FINDINGS.md`, `live-browser.mjs`,
      `live-browser.log`, `live-attempt-1-browser-results.json`,
      `live-browser-results.json`, `live-accessibility-results.json` and
      `live-*.png`. The extended keyboard path reaches the form at all three
      widths, and a real pointer drag selects the complete quote. Verification:
      `node /tmp/lovable-work/live-browser.mjs --surfaces-only` exits 0 against
      the local preview; `sh /tmp/lovable-work/verify.sh` exits 0 with 134 full
      tests and 114 offline tests. The initial run's reader timing assertion was
      corrected in the probe; its two successful Ask responses are retained. No
      commit, push, deployment or backend/test modification was performed.

- [x] 2026-09-13 — **Product method and local MCP pages:** Ported the Lovable
      editorial presentation with accurate public/synthetic provenance, evidence
      rejection rules, authorization and retrieval limitations, and the actual
      `search_research` / `fetch_passage` tools. Removed invented connection
      claims and unsupported flows. Evidence: `src/app/public.test.tsx` and
      `/tmp/lovable-work/browser-fixture.log`; `pnpm test` exercises the
      public-route tests. No publication was performed.

- [x] 2026-09-13 — **Research:** Market, competitive and reuse research for the
      In Practise demo completed before any code was written.
  - Result: Seven documents covering the public surface of inpractise.com, 21
    competitor profiles, a gap report separating observed marketing gaps from
    unvalidated product opportunities, a Lovable landing brief, the members and
    admin specification, the askbot and MCP specification, and a one-day
    execution plan that cuts the 92-128 hour target down to a single day.
  - Evidence: `docs/research/01-market-and-landing-research.md` through
    `07-one-day-execution-plan.md`; `python3 docs/research/verify_specs.py`
    passed. Committed in the portfolio repository as `79114ab` and `f539cf5`.

- [x] 2026-09-13 — **Infrastructure:** Dedicated Supabase project created for
      the demo.
  - Result: A new free project in the personal `PixelPotion` organisation,
    region eu-west-3, empty and owned by this repository. The Supabase MCP
    server was not used because it authenticates as the Favish account and sees
    only that organisation; the personal access token was used instead.
  - Evidence: project reference and credentials in the ignored `.env.remote`;
    the OpenAI key was probed against the embeddings endpoint and returned HTTP
    200 with 1,536 dimensions.

- [x] 2026-09-13 — **Infrastructure:** Docker made available through OrbStack.
  - Result: OrbStack started; `docker info` succeeds and the server reports
    29.4.0. A local Supabase stack is therefore available again for the
    unattended database tests the execution plan wanted.
  - Evidence: `docker version --format '{{.Server.Version}}'` returned 29.4.0.

- [x] 2026-09-13 — **Repository:** Demo repository initialised with secret
      hygiene in place before any credential was written.
  - Result: `.gitignore` covering `node_modules/`, `dist/`, every `.env*` except
    the example, `work/` and `corpus/raw/`; `.env.example` carrying names with
    empty values; `.env.remote` written with mode 600; repository identity set
    to the personal address.
  - Files: `.gitignore`, `.env.example`.

- [x] 2026-09-13 — **Strict baseline adoption:** Installed the specified shared
      ESLint, TypeScript, Prettier and quality packages together; enabled the
      strict code-policy preset and explicit barrel rejection. Replaced the
      handwritten architecture/format scripts, split compound backend/API/corpus
      units, typed database clients from the live public schema, and hardened
      own-property and external-data validation. Added separate Node, Deno and
      React/Vite surfaces, local hooks and a prepared CI workflow. No commit,
      migration edit, corpus regeneration, or credential edit was made.
      Evidence: `pnpm verify`, `pnpm check:security`, and the command output and
      limits in `docs/baseline.md`. Independent review found one history-scanner
      exclusion issue and a missing Vitest/Vite config merge. Both were fixed;
      an alias-import test verifies shared resolution, and a negative
      `.env.remote` probe confirmed history scanning detects a synthetic secret.

- [x] 2026-09-13 — **Existing backend and RLS reverified:** The initial seed
      blocker had already been resolved. The complete suite passes 87 tests,
      including existing password-session, tenant/tier isolation, anonymous
      denial, immutable publication, vector replay and import checks.
      `pnpm db:verify` confirms two organisations, four memberships/users, 12
      documents, 13 revisions, 52 passages, 48 vectors and zero retained test
      documents. No seed or import mutation was rerun. Concurrent publication
      race coverage remains unverified as recorded in `docs/backend.md`.

- [x] 2026-09-13 — **Corpus and gold replay verified:** `pnpm corpus:verify`
      passes six accepted synthetic documents, 24 passages, 24/24 exact gold
      paragraphs, two isolated fixtures, four SEC candidates/938 passages and
      all ten generation-attempt records. `pnpm test:corpus` passes all five
      tamper and normalization tests. Frozen corpus, migrations and research
      artifacts match the pre-adoption hashes. Public acceptance and expansion
      decisions remain open in `TODO.md`.

- [x] 2026-09-13 — **Dependency advisories resolved:** Updated Vitest and its
      coverage provider to 4.1.11 and constrained the Supabase CLI's transitive
      tar to 7.5.22. `pnpm audit:check` reports zero advisories without waivers;
      strict lint still exposes the three separate upstream peer-range metadata
      warnings.

- [x] 2026-09-13 — **Contributor documentation:** Added `README.md`,
      `AGENTS.md`, and `docs/baseline.md`; `CLAUDE.md` delegates to `AGENTS.md`.
      Corrected superseded backend seed-status and corpus runtime guidance while
      retaining historical command evidence. Verify documentation formatting
      with `pnpm format:check`.

- [x] 2026-09-13 — **Briefing I SEC acceptance:** Recorded the owner's approval
      of four reviewed 10-K revisions and added their 938 unchanged passages to
      `manifest.documents`. Accepted filings use
      `origin`/`sourceKind=sec_filing` with original URLs, retrieval timestamps,
      hashes and SEC reuse policy. The corpus has 10 accepted documents / 962
      passages, including six unchanged synthetic cores / 24 exact gold
      paragraphs, with zero vectors. Verification:
      `pnpm exec node scripts/corpus/verify.mjs` exits 0.

- [x] 2026-09-13 — **Briefing I bounded regeneration executed:** Replaced the
      active generation prompt with a versioned 16-turn structure, preserved all
      historical outputs, and enforced three attempts per source / twelve
      globally with success stops and resumable checkpoints. Twelve actual
      requests used 14,404 prompt + 14,634 completion = 29,038 tokens. S4/S5
      pass the unchanged automatic gate; S1–S3 fail length after three attempts.
      Generator correctly exits 1; a checkpoint-only rerun makes no further
      requests. Semantic concerns and owner review remain open in TODO.md.
      Evidence: `docs/corpus.md`, `corpus/generated/briefing-i/audit.json`;
      `pnpm exec node --test scripts/corpus/checks.test.mjs` passes seven tests;
      strict corpus ESLint passes;
      `pnpm exec node scripts/corpus/verifyPreservedCorpus.mjs` confirms 55
      original corpus/validation files are unchanged. No commit, import or
      embedding run.

- [x] 2026-09-13 — **Briefing K corpus vocabulary and complete ingestion:**
      Restored four SEC documents to `origin=public`, retained
      `kind=sec_filing`, removed the duplicate active-manifest `sourceKind`, and
      recomputed canonical revisions, file hashes and the corpus fingerprint.
      The accepted filing bytes now exactly match the originally approved files.
      Six synthetic normalized files and both fixtures remain byte-identical.
      This supersedes Briefing I's mistaken `origin=sec_filing` vocabulary
      without rewriting historical evidence. The importer and migrations were
      unchanged.
  - Verification: `pnpm exec node scripts/corpus/verify.mjs`,
    `pnpm exec node --test scripts/corpus/checks.test.mjs` and
    `pnpm exec node scripts/corpus/verifyPreservedCorpus.mjs` exit 0.
    `pnpm verify` exits 0 with 73 offline tests, 89 full-suite tests and seven
    corpus tests. Two new tests cover the accepted vocabulary at the importer
    boundary. Registered the two existing Briefing I CLI entry points in Knip
    after its first run exposed them as unreachable; no gate was lowered.
  - Ingestion: initial `pnpm db:import` exited 1 because hybrid vectors were
    missing. `pnpm db:embed` then created 708 unique artifacts in 45 batches,
    reused 24, and recorded 54,743 actual input tokens with no unknown usage.
    Its replay reused all 732 artifacts, created zero and used zero tokens.
    Import resumed successfully: eight public revisions published and twelve
    existing synthetic pairs unchanged. A second complete import returned
    `unchanged` for all twenty pairs; all three evidence-table content
    fingerprints and counts match before/after replay.
  - Final database: 20 organisation-scoped documents, 21 revisions (20 current),
    1,928 passages and 1,924 vectors; zero unpublished revisions or retained
    test documents. These are two copies of ten sources plus retained S6
    history; the current isolated Org B fixture stays lexical-only.
  - Evidence: `docs/corpus.md`, `docs/backend.md`, and ignored
    `work/briefing-k/` command logs, hash snapshots and embedding usage. The
    separate security scan still exits 1 for three independently verified
    historical checksum false positives, recorded in TODO; dependency audit
    exits 0 with zero advisories. No commit, migration edit or generation run.

- 2026-09-14 — **Published the demo and deployed it on nova as a Node
  application.** The public repository `CristianDeluxe/inpractise-demo` carries
  the full history. `A inpractise.cristiandeluxe.dev -> 46.4.179.175`
  (unproxied) was created in the `cristiandeluxe.dev` Cloudflare zone, and the
  subdomain, a CloudLinux Node selector application at
  `/home/cristiandev/apps/inpractise-demo` (Node 24, `server.js`, Passenger) and
  a Let's Encrypt certificate were created on nova.
  - The origin is `server.js` plus `server/`: `dist/` with an index.html
    fallback for unknown paths, immutable caching for fingerprinted assets,
    `no-cache` for the entry document and `X-Robots-Tag: noindex, nofollow`
    everywhere.
  - Verified live: `/`, `/method`, `/connect`, `/login`, `/app`, `/inspect` and
    a full immutable reader path all 200 with the shell; asset content type and
    cache headers correct; `robots.txt` disallows everything; a Supabase
    research-function preflight from this origin with
    `apikey, authorization, content-type` returned 204; the only secret-shaped
    string in the served bundle is supabase-js's own `sb_secret_` prefix check.
  - Two obstacles resolved rather than worked around: lfd had banned this
    machine's IP on nova (cleared through the `neo` jump host), and cPanel put
    the new subdomain on the account's AutoSSL exclusion list, which silently
    skipped certificate issuance.
  - The working-tree secret scan was scoped to what can actually leak: ignored
    build and credential paths are excluded from it, and the corpus checksum
    manifest — whose digests recompute to the files they name — from both scans.
    `gitleaks git` over the full history reports no leaks.
  - Evidence: `docs/deploy.md`, commits `a1df133`, `c594512`, `1dc8e14`.
