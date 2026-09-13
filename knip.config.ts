import { createKnipConfig } from '@busirocket/quality-config/knip'

export default {
  ...createKnipConfig({
    framework: 'vite-react',
    project: [
      'scripts/db/**/*.ts',
      'tests/**/*.ts',
      'supabase/functions/**/*.ts',
    ],
    entry: ['supabase/functions/*/index.ts'],
    // Installed outside npm; invoked by security gates and Git hooks.
    ignoreBinaries: ['gitleaks'],
    // tsc consumes this ambient namespace through the separate Edge tsconfig.
    ignoreDependencies: ['@types/deno'],
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
      ],
      project: [
        'src/**/*.{ts,tsx}',
        'scripts/db/**/*.ts',
        'tests/**/*.ts',
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
