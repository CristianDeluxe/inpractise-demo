# TODO Log

> Searchable record of closed project work. Active work lives in `TODO.md`.

## 2026

### 2026-09

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
