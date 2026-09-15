// The checks a change passes before it stays. Commands are the package.json
// scripts; the first six run together as `pnpm check:ci` on every push.
export const gateContent = [
  {
    name: 'Type-check',
    command: 'pnpm type-check:ci',
    detail:
      'Four TypeScript projects, each with its own tsconfig: Node scripts, the browser app, the Deno Edge modules and the Playwright suite. Edge modules receive no Node ambient types, so a server-only import in the function fails here.',
  },
  {
    name: 'Lint with architectural rules',
    command: 'pnpm lint:ci',
    detail:
      'ESLint with the strict code-policy preset: one exported unit per file, no unexported helpers, no re-export barrels, a 100-line ceiling per file and 50 per function, layer boundaries between app, components and services. Zero warnings, and no suppressions may be generated to pass.',
  },
  {
    name: 'Unused code and duplication',
    command: 'pnpm knip && pnpm dupes',
    detail:
      'Any file unreachable from an entry point, any unused export and any duplicated block fails the run. An agent that leaves a helper behind, or copies one instead of importing it, is caught here.',
  },
  {
    name: 'Unit and component tests',
    command: 'pnpm test:ci',
    detail:
      'Vitest offline with 80 percent coverage thresholds. Route tests mount the real route tree over a memory history; contract tests assert a forged citation and a dropped gold passage are detected.',
  },
  {
    name: 'Edge function tests',
    command: 'pnpm test:edge',
    detail:
      'Native Deno tests drive the actual HTTP handler with Auth, retrieval and the provider transport stubbed and no network permission. pnpm check:deno type-checks the modules with their own import map.',
  },
  {
    name: 'Authorization as real SQL',
    command: 'pnpm test:db:local',
    detail:
      'Every migration applied unedited to a throwaway pgvector container, then seven cases: anonymous denial, organisation isolation, premium tier gating, member write refusal, self-promotion, service-only publication and premium evidence excluded before ranking. pnpm test:rls repeats the rules with live caller sessions.',
  },
  {
    name: 'Evaluation gate',
    command: 'pnpm eval:answers && pnpm eval:gate',
    detail:
      'Fourteen frozen gold cases against the deployed function. Candidate recall is measured before context selection, every returned citation is re-read as its caller, an independent judge checks grounding, and a refusal mismatch fails in both directions. The one tolerated failure is the recorded F03 selection miss. pnpm eval:replay re-checks the retained reports without credentials.',
  },
  {
    name: 'Secrets and dependencies',
    command: 'pnpm check:security',
    detail:
      'gitleaks over the working tree and the full history, then a dependency audit at moderate severity. The pre-push hook runs the secret scan; CI runs it in a job that installs nothing.',
  },
] as const
