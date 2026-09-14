import { createAccessibilityConfig } from '@syntopica/eslint-config/accessibility'
import { createBaseConfig } from '@syntopica/eslint-config/base'
import { createCodeQualityConfig } from '@syntopica/eslint-config/code-quality'
import { createNodeConfig } from '@syntopica/eslint-config/node'
import { createViteReactConfig } from '@syntopica/eslint-config/vite-react'
import codePolicy from 'eslint-plugin-code-policy'
import { defineConfig } from 'eslint/config'
import globals from 'globals'

export default defineConfig([
  { ignores: ['work/**', 'corpus/**', 'supabase/.temp/**', 'server/build/**'] },
  ...createBaseConfig({ tsconfigRootDir: import.meta.dirname }),
  {
    files: [
      'scripts/**/*.{ts,mjs}',
      'server.js',
      'server/**/*.{mjs,ts}',
      'tests/**/*.ts',
      'evals/**/*.ts',
      'mcp/**/*.ts',
      '*.config.{ts,mjs,cjs}',
      '.dependency-cruiser.cjs',
    ],
    extends: [createNodeConfig()],
  },
  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    extends: [createViteReactConfig(), createAccessibilityConfig()],
    languageOptions: { globals: globals.browser },
  },
  ...createCodeQualityConfig(),
  codePolicy.configs.strict,
  {
    files: [
      'scripts/db/**/*.ts',
      'scripts/api/**/*.ts',
      'server/api/**/*.ts',
      'tests/**/*.ts',
      'evals/*.ts',
      'mcp/**/*.ts',
      'vite.config.ts',
      'vite.api.config.ts',
    ],
    languageOptions: {
      parserOptions: { projectService: false, project: './tsconfig.node.json' },
    },
  },
  {
    // Local-only answer-quality harness; its judge dependency is optional, so
    // the CI lint scope skips it (see the lint:ci script).
    files: ['evals/live/**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: false,
        project: './tsconfig.evals.json',
      },
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: { projectService: false, project: './tsconfig.app.json' },
    },
  },
  {
    files: ['supabase/functions/**/*.ts'],
    languageOptions: {
      globals: { ...globals.browser, Deno: 'readonly' },
      parserOptions: {
        projectService: false,
        project: './supabase/functions/tsconfig.json',
      },
    },
  },
  {
    files: ['tests/browser/**/*.ts', 'playwright.config.ts'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: false,
        project: './tests/browser/tsconfig.json',
      },
    },
  },
  // Pure barrels also violate this repository's explicit-import policy.
  {
    files: ['**/*.{ts,tsx,js,jsx,mjs,cjs}'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ExportAllDeclaration',
          message: 'Import each unit directly; barrel exports are forbidden.',
        },
        {
          selector: 'ExportNamedDeclaration[source]',
          message:
            'Import each unit directly; re-export barrels are forbidden.',
        },
      ],
    },
  },
  // These repository-local ingestion tools intentionally read/write computed paths.
  // Corpus loaders verify containment and hashes; generated outputs use fixed roots.
  // This syntactic rule cannot follow those checks. Runtime request code stays covered.
  {
    files: ['scripts/corpus/**/*.mjs', 'scripts/db/**/*.ts', 'evals/**/*.ts'],
    rules: { 'security/detect-non-literal-fs-filename': 'off' },
  },
  // The handshake log is an operator-chosen path from the environment, written
  // outside request handling. Every other MCP unit stays covered by the rule.
  {
    files: ['mcp/recordHandshake.ts'],
    rules: { 'security/detect-non-literal-fs-filename': 'off' },
  },
  // The baseline size layer omits .mjs; corpus code follows the same budgets.
  {
    files: ['scripts/corpus/**/*.mjs'],
    rules: {
      'max-lines': [
        'error',
        { max: 100, skipBlankLines: true, skipComments: true },
      ],
      'max-lines-per-function': [
        'warn',
        { max: 50, skipBlankLines: true, skipComments: true, IIFEs: true },
      ],
      complexity: ['warn', { max: 10 }],
      'max-depth': ['warn', { max: 4 }],
      'max-params': ['warn', { max: 4 }],
    },
  },
  {
    files: ['scripts/corpus/**/*.test.mjs'],
    rules: {
      'max-lines': [
        'error',
        { max: 200, skipBlankLines: true, skipComments: true },
      ],
      // As in the baseline test layer: this measures the test wrapper, not a case.
      'max-lines-per-function': 'off',
    },
  },
])
