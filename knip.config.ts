import { createKnipConfig } from '@busirocket/quality-config/knip'

export default {
  ...createKnipConfig({
    framework: 'vite-react',
    // Installed outside npm; invoked by security gates and Git hooks.
    ignoreBinaries: ['gitleaks'],
    // tsc consumes the Deno namespace through the separate Edge tsconfig; the
    // two CSS packages are imported by src/styles.css, which knip cannot follow.
    ignoreDependencies: ['@types/deno', 'tailwindcss', 'tw-animate-css'],
  }),
  workspaces: {
    '.': {
      entry: [
        'src/main.tsx',
        'src/api/createResearchClient.ts',
        'scripts/db/{embed,evaluate,gate,import,preflight,prepare,seed,verify}.ts',
        'tests/**/*.test.ts',
        'src/**/*.test.{ts,tsx}',
        'supabase/functions/*/index.ts',
        'evals/run.ts',
        'mcp/start.ts',
      ],
      project: [
        'src/**/*.{ts,tsx}',
        'scripts/db/**/*.ts',
        'tests/**/*.ts',
        'evals/**/*.ts',
        'mcp/**/*.ts',
        'supabase/functions/**/*.ts',
        '*.config.{ts,mjs}',
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
