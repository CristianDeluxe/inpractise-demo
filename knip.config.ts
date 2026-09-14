import { createKnipConfig } from '@syntopica/quality-config/knip'

export default {
  ...createKnipConfig({
    framework: 'vite-react',
    // Installed outside npm; invoked by security gates and Git hooks.
    ignoreBinaries: ['gitleaks'],
    // tsc consumes the Deno namespace through the separate Edge tsconfig.
    ignoreDependencies: ['@types/deno'],
  }),
  // Workspace patterns below replace the unused framework root patterns.
  entry: undefined,
  project: undefined,
  // depcruise is called directly in package.json, so Knip resolves its package.
  ignoreDependencies: createKnipConfig({
    framework: 'vite-react',
    ignoreDependencies: ['@types/deno'],
  }).ignoreDependencies?.filter(
    (dependency) => dependency !== 'dependency-cruiser',
  ),
  workspaces: {
    '.': {
      entry: [
        'src/main.tsx',
        'src/api/createResearchClient.ts',
        'scripts/db/{embed,evaluate,gate,import,preflight,prepare,seed,verify}.ts',
        'tests/**/*.test.ts',
        'src/**/*.test.{ts,tsx}',
        'supabase/functions/*/index.ts',
        'supabase/functions/tests/**/*.test.ts',
        'evals/live/run.ts',
        'evals/replay.ts',
        'mcp/start.ts',
        'server.js',
        'server/api/createApiListener.ts',
        'scripts/api/generateOpenApi.ts',
        'scripts/api/fixtureBackend.ts',
        'src/http-api/createHttpClient.ts',
      ],
      project: [
        'src/**/*.{ts,tsx,css}',
        'scripts/db/**/*.ts',
        'tests/**/*.ts',
        'evals/**/*.ts',
        'mcp/**/*.ts',
        'supabase/functions/**/*.ts',
        '*.config.{ts,mjs}',
        'server/**/*.{mjs,ts}',
        'scripts/api/**/*.ts',
      ],
    },
    'scripts/corpus': {
      entry: [
        'acquire.mjs',
        'auditGeneration.mjs',
        'auditRegeneration.mjs',
        'build.mjs',
        'generate.mjs',
        'prepareReview.mjs',
        'verify.mjs',
        'verifyPreservedCorpus.mjs',
        '**/*.test.mjs',
      ],
      project: ['**/*.mjs'],
    },
  },
}
