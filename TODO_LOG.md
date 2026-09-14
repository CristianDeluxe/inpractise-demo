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

- [x] 2026-09-14 — **Consolidated the reviewer demo identity in source.** The
      only advertised browser account is the premium `demo` reviewer. Basic,
      other-organization and MCP identities remain test fixtures. Preflight
      derives password requirements from the persona list; RLS and MCP controls
      use demo. Frozen evaluation labels resolve to demo without rewriting the
      gold set or historical reports. The walkthrough shows premium access live
      and describes denial through the database and parity tests. Verification:
      `pnpm check:ci`, `pnpm type-check`, `pnpm lint`, and the offline
      `work/demo-identity/verify-personas.mjs` assertions. Owner provisioning,
      remote verification and the ignored historical-artifact scan exception
      stay in TODO.md. No credentials, frozen artifacts, migrations or remote
      state were changed; no commit or push was made.

- [x] 2026-09-14 — **Edge function `research` token verification.** Read-only
      Management API evidence records deployed version 11 as `ACTIVE` with
      `verify_jwt=false`. Live handler probes rejected a missing token and a
      structurally valid JWT signed with incorrect test material as
      `401 unauthenticated`, with request IDs and no data. A real member session
      returned 200 before its natural expiry and Supabase Auth returned 403
      after `exp`; the probe stopped there because it expected 401 and did not
      persist the token. The credential-free regression therefore constructs a
      JWT with a past `exp`, models the observed Auth 403, and proves handler
      authentication maps it to `unauthenticated` before membership or evidence
      access. This is a constructed-token handler-path proof, not a claim that
      the expired token was replayed through the live handler. Verification:
      `PNPM_CONFIG_VERIFY_DEPS_BEFORE_RUN=false pnpm test:edge` passes 6 tests
      and 24 steps; the seven prescribed repository gates also pass.

- [x] 2026-09-14 — **Isolated source, history and workflow security from
      dependency installation.** CI now has a dependency-free, full-history
      `source-security` job that installs the existing pinned and checksummed
      gitleaks binary, runs the declared dependency-free `secrets:check` source
      scan with `NPM_CONFIG_FORCE=true` only to bypass npm's `devEngines` Deno
      provisioning before project installation, scans committed history with
      `.gitleaks.toml`, and retains the pinned actionlint and zizmor actions.
      The dependency audit remains a separate install-dependent job; verify and
      quality are unchanged, and `pnpm check:security` remains the combined
      local command. Local actionlint, source/history gitleaks, baseline-audit
      and workflow isolation checks passed. No remote CI was triggered. Current
      remote run `34801318491` fails earlier at the outdated lockfile; older run
      `34793517553` reached installation and all three jobs failed
      `ERR_PNPM_FS_PACKLIST_IO` because
      `/home/runner/work/inpractise-demo/max-lane` was absent.

- [x] 2026-09-14 — **Reverified publication and credential boundaries.** The
      published `main` commit and `origin/main` both resolve to
      `3f3dc7d34f3e0a302580af09f0d2582b7f548c05`. `.env.functions.remote` is
      ignored by `.gitignore:4`, absent from the Git index, and has no path
      history. A clean tree recreated with `git archive HEAD` was scanned from
      its own root with
      `gitleaks dir --config .gitleaks-source.toml --no-banner --redact .`:
      approximately 5.92 MB, no leaks. The committed history scan covered 19
      commits and approximately 6.33 MB with no leaks. The current source scan
      covered approximately 27.40 MB with no leaks. The source configuration
      excludes ignored local inputs and artifacts, while the history
      configuration scans committed content; no credential value is part of
      published source or this record.
      `./node_modules/.bin/baseline-audit --level moderate` reports zero
      advisories. The stale D1 credential-gate blocker is closed; no scanner,
      ignore rule, credential, history, remote state or deployment was changed.

- [x] 2026-09-14 — **Rejected expanded synthetic interview candidates.** Owner
      review rejected S4 because P8's observational-gap explanation weakens the
      frozen P2 ledger observation and invites an unsupported reconciliation
      with S3; P6 and P16 also introduce unestablished recordkeeping
      limitations. S5 was rejected because P6, P10 and P16 introduce refund
      uncertainty that conflicts with frozen P3; P10 additionally adds an
      unestablished refund-exclusion mechanism. Neither candidate entered the
      accepted manifest. All generation attempts, audits, sidecars, review
      documents and source responses remain retained as evidence. Verification:
      `./node_modules/node/bin/node --test scripts/corpus/checks.test.mjs`;
      `./node_modules/node/bin/node scripts/corpus/verify.mjs`;
      `./node_modules/node/bin/node scripts/corpus/auditRegeneration.mjs`;
      `./node_modules/node/bin/node scripts/corpus/verifyPreservedCorpus.mjs`;
      and
      `git diff --check -- corpus/generated/briefing-i/REVIEW.md TODO.md TODO_LOG.md`.

- [x] 2026-09-14 — **Dedicated MCP member.** Seeded a separate basic-tier `mcp`
      member in `org-a`, isolating MCP quota and lockout effects from the
      browser basic persona. Verification: authorized seed exit 0, `.env.remote`
      mode 0600, real stdio password sign-in with an exact `s1/P2` fetch, and
      MCP parity 4/4.

- [x] 2026-09-14 — **Database-enforced Ask allowances.** Applied additive
      migrations 8–10 and deployed research version 11 ACTIVE. Each caller has
      100 Ask requests per UTC day, debited before retrieval/providers; failures
      remain charged and absent completion usage remains unknown. A non-login
      function owner remains subject to RLS. SQL debit/exhaustion/scope and
      two-connection lock tests roll back. Verification: all eight briefing
      gates, `pnpm test` (39 files, 165 tests), `pnpm test:edge` and
      `pnpm check:deno`; raw output and deployment attempts in
      `work/backlog2/item1-*`. ADR 0007 records the trade-off.

- [x] 2026-09-14 — **Provider-free search parity.** Extracted the shared search
      operation from embedding acquisition. Browser-shaped and real MCP requests
      now compare ordered citations and explicit lexical modes over live
      caller-scoped RLS with controlled embeddings; deployed Read parity remains
      live. `pnpm test` passes without paid provider calls. This does not claim
      deployed hybrid-provider determinism.

- [x] 2026-09-14 — **Investigate intermittent workspace-test readiness.**
      Reproduced the historical Source library timeout under 32-process load:
      3/40 with phase instrumentation and 15/40 without it, after 208 lower-load
      executions had passed. Traces showed lazy module loading plus
      session/me/list effects consumed the initial one-second DOM wait; the
      library was still loading at failure. renderRouteFixture now awaits
      router.load before mounting, and all 23 existing call sites await it. A
      deferred-preload regression failed before the fix and passed after it.
      Both traced and untraced 40-run batches passed after the change; the
      traced batch included a 1.24-second lazy import. No timeout increased.
      CONTRIBUTING documents the setup contract. Verification: all seven
      prescribed gates passed in item02-complete, including 140 offline Vitest
      tests and 24 native Deno steps. Detailed phase tables and commands are in
      FINDINGS.md and work/backlog1/item02-timing-report.md.

- [x] 2026-09-14 — **Context selection drops a retrieved answer on a
      two-document company.** Reconciled the existing ADR 0005 decision with
      docs/evals.md: retain the two-per-document cap and F03 refusal. The global
      bounds are eight passages and 4,000 tokens; four selected passages follow
      from having two documents, not a four-slot global limit. Removed the ADR
      claim that the same decision remains open in the backlog. Historical
      reports were not regenerated. Verification: all seven prescribed commands
      passed in item10; pnpm test:ci verifies selector and diagnostic behavior.

- [x] 2026-09-14 — **Strict structured answer contract.** Source inspection
      confirmed strict schema parsing, source-label bounds against supplied
      context, and invalid status/claim combinations already fail. Added native
      Deno tests through the actual HTTP handler with Auth, retrieval and
      provider transport stubbed: 21 answer steps cover exact server-owned
      citation mapping, malformed/uncited/invalid answers, provider
      HTTP/network/transport failures and valid refusal text. No provider call
      occurs; Deno has no network permission. Browser UI tests verify both error
      codes remain errors and honor retryability. Verification: pnpm test:edge
      passed 2 tests / 24 steps including token cases; pnpm check:deno passed;
      all seven prescribed gates passed in item09-complete (139 offline Vitest
      tests). Earlier lint failures and their fixes remain in the findings log.

- [x] 2026-09-14 — **Pin the Supabase CLI to 2.75.0.** Already exactly pinned in
      package.json and pnpm-lock.yaml. pnpm exec supabase --version prints
      2.75.0; functions deploy --help exposes --project-ref and --no-verify-jwt,
      secrets set --help exposes --env-file, and db push --help exposes
      --dry-run. All four commands and all seven item07 gates exit 0.
      docs/baseline.md records the commands and local-binary requirement. No
      deployment, secret write or migration push occurred.

- [x] 2026-09-14 — **Reduce the shared SPA entry bundle.** Measured all entry
      dependencies using source-map byte attribution and Rolldown
      renderedLength. One @supabase chunk group reduces entry 599.61 to 384.23
      kB (Vite gzip 172.43 to 117.78 kB); new SDK chunk 214.97 kB. All chunks
      are below the unchanged warning limit, the SDK is modulepreloaded, and all
      previous dynamic route facades remain split. Five cold runs per viewport
      show median hero-ready 2093.1 to 2083.2 ms at 1440px and 2090.8 to 2075.4
      ms at 390px (4x CPU, 40 ms latency, 5 Mbps). Six browser cases and all
      seven item06 gates passed. Commands and per-dependency table are in the
      briefing FINDINGS.md and work/backlog1/report-bundle.py. Also reconciled
      the architecture guide with the already-tested ADR 0006 evidence policy.

- [x] 2026-09-14 — **Bound cached browser-probe teardown.** Pinned
      repository-owned Playwright Test 1.58.2; pnpm browser:install installs
      local browser binaries and pnpm test:browser builds/serves the app with
      dummy configuration. All six 1440/390/320px reduced/normal-motion
      scenarios pass with the final fixture (1.1 minutes). A forced assertion
      plus hung browser.close exits 1 in 12.05 seconds and retains both the
      assertion and the 10-second fixture-teardown error; the temporary probe
      was removed. All seven item05 gates passed. CONTRIBUTING.md#browser-probe
      documents setup and bounds; tests/browser/tsconfig.json isolates DOM test
      types from Node/Edge tooling. No external cache path or user Chrome
      profile is required.

- [x] 2026-09-14 — **Exercise concurrent publication and a late passage
      insert.** Added a real two-connection publication race with a staging
      barrier and transaction/statement deadlines. Exactly one contender aborts
      with PostgreSQL 40P01; the winner publishes exactly one current
      canonical-valid revision. Both rollback and original revision rows plus
      absence of inserted passages are asserted. A separate staged fixture
      publishes, rejects a late passage INSERT, and proves complete
      passage/revision row equality. Targeted tests: 2/2 passed. All seven
      item04-final gates passed. Sequential pnpm test passed; complete output in
      work/backlog1/item04-full-test-final.log. A separate TODO records the
      transactional staging lock-upgrade retry limitation; no promise of two
      successful committed publications or migration change.

- [x] 2026-09-14 — **Verify partial citation revocation and empty-answer
      messaging.** Every cited source must survive final authorization or the
      whole claim is dropped; independent complete claims remain. Zero-claim
      generated refusals keep their original missingEvidence. ADR 0006 records
      the comparison/evidence rationale and README links it. Five focused tests
      reproduced four failures before the fix; all seven new/existing revocation
      tests now pass. All seven item03-final gates exit 0 (138 offline tests).
      Initial item03 lint failure was a duplicated fixture string, resolved
      through a separately imported fixture constant.

- [x] 2026-09-14 — **Reconcile Knip configuration hints.** Knip 6.35.1 now
      checks CSS imports and omits ignored root patterns and the resolved
      dependency-cruiser exemption. Actual reporter counters: 621 processed
      before, 622 after; zero unused files in both. Temporary backlogUnusedProbe
      produced exit 1, then was removed. pnpm knip prints no hints. All seven
      item01 gates exited 0; raw outputs in work/backlog1/. Official reference:
      https://knip.dev/reference/configuration-hints and installed schema.json.

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
  - Result: A new free project in the personal `<personal-org>` organisation,
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
  the full history. `A inpractise.cristiandeluxe.dev -> <server-ip>`
  (unproxied) was created in the `cristiandeluxe.dev` Cloudflare zone, and the
  subdomain, a CloudLinux Node selector application at
  `/home/<account>/apps/inpractise-demo` (Node 24, `server.js`, Passenger) and
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

### 2026-09-14 — Documented caller-token HTTP API

- Added six `/api/v1` endpoints, shared-schema OpenAPI 3.1, typed client using
  existing evidence validators, RFC 9457 problems, correlation, per-principal
  in-process quotas and bounded keyset pagination. Preserved the original SPA
  and static-asset handler. No new runtime dependency, commit, push or
  deployment.
- Added read-owned `X-Research-Org-Id` metadata to research success responses
  without changing their JSON or authorization. Scoped ETag v2 excludes mutable
  envelope/current-revision data; every 304 reauthorizes. Older backends return
  uncached 200. Public immutable/zero-read caching was rejected because access
  is revocable; remote rollout stays blocked in TODO.
- `PNPM_CONFIG_VERIFY_DEPS_BEFORE_RUN=false pnpm exec vitest run tests/api --no-coverage`:
  9 files, 55 tests passed. `python3 scripts/api/exercise.py`: all endpoints
  plus 304/401/429/provider-503, cursor continuation, malformed request target
  survival and static regressions passed against the built origin with an
  offline fixture. Captures and the 200-sample local latency method are in
  `docs/api-examples.json` and `docs/api-latency.json`; this does not claim live
  backend/provider parity.
- Independent review found and resolved omitted tenant scope in validators and
  lost backend IDs on locally generated problems. Final broad verification is
  recorded in the task's FINDINGS.md.

### 2026-09-14 — HTTP API deployed and conditional caching verified live

- The origin now loads its own `.env` (`server/loadOriginEnv.mjs`), because the
  CloudLinux Node selector starts the app without it; before that every
  authenticated `/api/v1` call answered `503 dependency_failure` with
  `RESEARCH_URL is not configured.`
- Deployed `supabase functions deploy research --no-verify-jwt` so success
  responses carry `x-research-org-id`; the facade needs it to scope the ETag.
- nginx hides `If-None-Match` from the backend on any location with
  `proxy_cache` enabled, which the cPanel vhost sets on `location /`. Added the
  user include
  `/etc/nginx/conf.d/users/<account>/inpractise.cristiandeluxe.dev/api.conf`
  scoping `/api/v1` out of the cache and forwarding the validators.
- Evidence against `https://inpractise.cristiandeluxe.dev/api/v1`: `/me` 200
  `{"orgId":"org-a"}`; `/documents?pageSize=2` and `POST /search` returned
  corpus rows; the cited passage returned 200 with an `ETag` and 304 on
  `If-None-Match`; the `org-b` persona replaying the `org-a` tag got 200,
  not 304. Documented in `docs/deploy.md`.

### 2026-09-14 — Shared config scope settled on `@syntopica`, judge made optional

- The five shared config packages are published under `@syntopica/*` at the
  exact versions this repository pins (`create-baseline` 0.9.0, `eslint-config`
  0.8.0, `tsconfig` 0.3.0, `prettier-config` 0.2.0, `quality-config` 0.11.0);
  the former package scope is retired. Renamed every manifest, config and
  document and regenerated the lockfile in the same commit, which is what commit
  `3f3dc7d` had not done.
- `@cristiandeluxe/max-lane` moved to `optionalDependencies`. It is the local
  answer-quality judge and nothing outside `evals/` imports it, so the CI scope
  now excludes that directory: `type-check:ci` drops it from the project list
  (new `tsconfig.evals.json` keeps it in the full `type-check`) and `lint:ci`
  adds `--ignore-pattern 'evals/**'` over the same ESLint configuration.
- Evidence: `pnpm install --frozen-lockfile` exit 0; `pnpm check:ci` exit 0 both
  normally and with `node_modules/@cristiandeluxe` unlinked to simulate a runner
  without the sibling checkout; `pnpm check:quality` and `pnpm conformance` exit
  0; full `pnpm type-check` and `pnpm lint`, which do cover `evals/`, exit 0
  with the sibling present.

### 2026-09-14 - CI green on a clean runner

- Run `34817650779` passed all four jobs on `95d589d`: `check:ci`,
  `check:quality`, `audit:check` and the source/history/workflow security scan.
  The blocker recorded since run `34801318491` is closed.
- Three causes, all now fixed: the `@syntopica/*` rename shipped with its
  regenerated lockfile; `@cristiandeluxe/max-lane` became optional and the CI
  type-check and lint scopes exclude `evals/`; `zizmor` reported four
  low-confidence `artipacked` findings, answered with
  `persist-credentials: false` on every `actions/checkout` - the workflow never
  pushes, so the token has no reason to stay in `.git/config`.
- `tests/unit/corpusVocabulary.test.ts` rehashes the raw source artifacts that
  `corpus/raw/` deliberately keeps out of the repository, so it is excluded from
  `vitest.ci.config.ts` and still runs in the local `pnpm test`.

### 2026-09-14 — Server-enforced viewing modes and coverage

- Implemented strict downgrade-only `viewAs` across the research service and
  HTTP facade. Effective access intersects real membership; `me` returns both
  principals. Restricted diagnostics refuse before querying, and passage ETags
  include the requested mode.
- Added the workspace selector, restriction banner and evidence cancellation on
  mode changes. Coverage bars, company depth and recent documents derive from
  caller-authorized database passage counts and retain company filtering.
- Verification: `pnpm check:ci` passed (39 Vitest files / 214 tests, 14 Deno
  tests / 24 steps; 88.76% statement coverage), `pnpm check:deno`,
  `pnpm type-check`, `pnpm lint`, `pnpm build`, `pnpm check:security` and
  `git diff --check` passed. The isolated component command
  `PLAYWRIGHT_BROWSERS_PATH=0 pnpm exec tsx --tsconfig tsconfig.app.json work/viewas-visual.mts`
  passed four 400px scenarios with no overflow or animation. Independent review
  found no actionable defects.
- New migration `20260914000011_scoped_search_candidates.sql` remains unapplied
  by instruction; live SQL/count behavior and restricted search/ask await the
  owner-authorized application and rollout recorded in TODO.md. No commit, push,
  provisioning, provider generation or deployment was performed.

### 2026-09-14 — Restricted search applied, demo identity live, landing figures pinned

- `20260914000011_scoped_search_candidates.sql` is applied on the remote project
  and the Edge function is rolled out. `pnpm db:verify` reports
  `search_candidates` as `prosecdef=false` with no anonymous execute, so
  restricted search runs as the caller.
- The consolidated demo identity is provisioned: four `auth.users` and four
  memberships, `me@cristiandeluxe.dev` as the premium reviewer. Retired
  agency-domain accounts are gone.
- `pnpm db:verify` had been failing since
  `20260914000008_request_allowances.sql` added `public.request_usage`: the
  script still expected five RLS tables and aborted before its grant assertions,
  which also made `pnpm verify` red. Expected set widened to six;
  `request_usage` satisfies the same invariants (RLS on, no anonymous select, no
  member write). Evidence:
  `PASS: six RLS tables, default-deny anonymous grants, no member writes, caller-scoped retrieval, service-only publication`.
- Landing-page corpus figures were decorative and three of four were wrong. They
  now read 6 synthetic interviews, 4 public filings, 962 indexed passages and 5
  companies, each recomputed from `corpus/manifest.json` by
  `tests/unit/demoCorpusStats.test.ts`.
- Refusal copy distinguishes the two ways an answer can be absent: zero
  candidates names retrieval, a positive count says how many passages were read.
  Status headings no longer show raw contract codes.
- `AGENTS.md` no longer claims there is no remote or deployment; it names
  `CristianDeluxe/inpractise-demo`, the live host, and keeps the rule that a
  local gate proves neither. The downgrade-only view-as design is documented in
  `docs/architecture.md` and `README.md`, where it had no coverage at all.

### 2026-09-14 — Analyst browser workflow and a credential-free authorization suite

- `tests/browser/analyst.spec.ts` walks sign-in, passage search, a standalone
  question and a claim's source link into the reader, against stubbed Supabase
  Auth and research responses. Evidence: `pnpm test:browser` 12 passed, the
  analyst spec green at 1440/390/320px under both motion settings.
- Route registration order was the one trap: Playwright matches the most
  recently registered route first, so the catch-all HTTPS abort has to be
  registered before the fixtures that must answer.
- Claim source links read `Source: <documentId>:<64 hex>:<passageId>`. The
  visible label now names the document and passage, the exact identity stays on
  the link's `title`, and the card's reader link carries the identity in its
  accessible name so several citations are distinguishable.
- `pnpm test:db:local` runs the authorization rules as real SQL against a
  throwaway `pgvector/pgvector:pg17` container on 127.0.0.1:54399, applying
  `scripts/db/local/bootstrap.sql` and every migration unedited. Seven cases:
  anonymous denial, organization isolation, premium tier gating, member write
  refusal, self-promotion, service-only publication, and premium evidence
  excluded from the restricted search path before ranking.
- Negative control: disabling row level security on `public.passages` and
  granting `select` to `authenticated` fails the tier case; restoring the
  container returns 7 passed.
- Two shim gaps were found by running it rather than by reading: passages must
  be written before the revision is published (the immutability trigger), and
  the request roles need `usage` on the `extensions` schema or a policy-correct
  call fails on the schema instead of the policy.
- `scripts/db/loadTarget.ts` and `scripts/db/createDatabase.ts` are unchanged;
  `createLocalDatabase` refuses any host that is not loopback and never reads
  `.env.remote`.

### 2026-09-14 — Retrieval diagnostic record, per answer and per request

- `retrieveCandidates` already computed candidate-at-ten, selected ids and the
  selected token budget, and `handleAsk` discarded all three. Both shapes the
  owner asked for are now built.
- Per answer: `ask` carries a `diagnostics` object for an unrestricted reviewer
  only, gated on the EFFECTIVE principal, so a reviewer viewing as a member does
  not receive it. Evidence: `pnpm test:edge` 16 passed / 29 steps, including
  `viewAsDiagnostics.test.ts` which asserts both downgrades withhold it.
- Per request: new migration `20260914000012_request_diagnostics.sql` adds
  `diagnostics` and `recorded_at` to `public.request_usage` and
  `record_request_diagnostics`, owned by the existing narrow non-bypass
  `request_usage_writer` role, identity from the JWT, payload bounded at 4096
  bytes, one write per request. `debug` returns the caller's own recent rows and
  `src/inspection/InspectionPage.tsx` renders them.
- The ledger write is deliberately best effort: a correct answer must not become
  an error because a diagnostic row failed to write. The failure is visible as a
  request whose diagnostics stay null.
- Evidence: `pnpm test:db:local` 11 passed, including a second write to the same
  request refused, another principal's request refused, an over-sized payload
  refused, and one principal's rows invisible to another.
- Gates: `pnpm check:ci` exit 0, `pnpm type-check`, `pnpm lint`,
  `pnpm test:edge`, `pnpm test:browser` 12 passed. The migration is applied on
  the local container only; remote application stays an owner-authorized step in
  `TODO.md`.

### 2026-09-14 — Diagnostics migration applied and the function redeployed

- `20260914000012_request_diagnostics.sql` applied to the remote project with
  `supabase db push --linked`; `supabase migration list --linked` now shows all
  twelve migrations on both sides. `pnpm db:verify` still reports
  `PASS: six RLS tables, default-deny anonymous grants, no member writes, caller-scoped retrieval, service-only publication`.
- Read-only inspection of the remote schema confirms
  `record_request_diagnostics` is `prosecdef=true`, owned by
  `request_usage_writer`, with no anonymous execute and execute granted to
  `authenticated`; `request_usage.diagnostics` is nullable `jsonb` and
  `recorded_at` is `not null timestamptz`.
- `supabase functions deploy research --use-api --no-verify-jwt --import-map supabase/functions/deploy-import-map.json`
  redeployed the handler. Management API reports version 14 `ACTIVE` with
  `verify_jwt=false`.
- Live checks against the deployed endpoint as the demo reviewer: `ask` returned
  200 with a diagnostic record (10 candidates ranked, 8 selected, 928 tokens of
  context across four revisions); the same `ask` with `viewAs: {role: 'member'}`
  returned 200 with no diagnostics; `debug` returned 200 with the written rows
  under `recentRequests`.

### 2026-09-14 - Frontend redeployed so `/inspect` survives the new `debug` field

- The deployed bundle's `parseDebugData` is a `z.strictObject`, so the
  `recentRequests` key added to `debug` in the same day's Edge deployment would
  have made `/inspect` fail to parse a valid response. Rebuilt and redeployed
  the origin in the same pass rather than leaving the two sides disagreeing.
- `pnpm build`, rsync of `dist server server.js` to the cPanel app root, then
  `cloudlinux-selector restart` returned `{"result": "success"}`.
- Evidence: `/`, `/method`, `/connect`, `/login`, `/app`, `/inspect` each 200;
  `/api/v1/health`
  `{"status":"ok","scope":"facade-only","backendChecked":false}`;
  `/assets/InspectionPage-C71whWct.js` 200 containing `recentRequests` and
  `candidateAt10`; `/assets/WorkspacePage-iTCvrxnZ.js` 200 containing
  `candidateAt10`. Recorded in `docs/deploy.md`.

### 2026-09-14 - Demo script timed against the deployment

- Every request the two-minute script makes was run once against
  `https://inpractise.cristiandeluxe.dev` signed in as the demo reviewer: sign
  in 989ms, search 6418ms, the answered Ask 4439ms (`answered`, one claim,
  diagnostic record present), the cited passage read 515ms and 200, the refusal
  Ask 3843ms (`not_found`, no claims), `debug` 2007ms with six recent requests.
- The 6418ms search was a cold start. Three consecutive searches after it took
  3017ms, 2562ms and 2310ms, so the script's 8-second fallback threshold only
  holds for a warm function; `docs/demo-script.md` now requires a throwaway
  search before the timer.
- Corrected one now-false line in the script: the `/method` slot claimed the
  inspection endpoint has no connected report, which the diagnostics work
  deployed the same day made untrue.
- The backlog entry stays `[~]`: the requests are measured, a human reading the
  narration against a clock is not something an automated run can establish.

### 2026-09-14 - Lock-upgrade deadlock for transactional publishers resolved

- Cause confirmed: a publisher that stages passages and then publishes in one
  transaction holds a foreign-key key-share lock on the document row and asks to
  upgrade it, so two of them deadlock and PostgreSQL aborts one with `40P01`.
- Fix is an ordering rule, not a schema change: take
  `select document_id from public.documents ... for update` before staging. No
  migration, and the importer is unaffected because it issues separate REST
  operations.
- Evidence: `tests/integration/publication-concurrency.test.ts` now holds both
  cases and passes twice in a row - the unguarded pair still aborts exactly one
  transaction with `40P01` and leaves the prior revision intact, and the
  parent-locked pair both publish with the follower measurably blocked on the
  lock (~1s against a 1s hold) instead of aborted. Helper:
  `tests/database/publishWithParentLock.ts`. Rule recorded in `docs/backend.md`.
