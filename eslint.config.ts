import { createAccessibilityConfig } from '@busirocket/eslint-config/accessibility'
import { createBaseConfig } from '@busirocket/eslint-config/base'
import { createCodeQualityConfig } from '@busirocket/eslint-config/code-quality'
import { createNodeConfig } from '@busirocket/eslint-config/node'
import { createViteReactConfig } from '@busirocket/eslint-config/vite-react'
import codePolicy from 'eslint-plugin-code-policy'
import { defineConfig } from 'eslint/config'
import globals from 'globals'

export default defineConfig([
  { ignores: ['work/**', 'corpus/**', 'supabase/.temp/**'] },
  ...createBaseConfig({ tsconfigRootDir: import.meta.dirname }),
  {
    files: [
      'scripts/**/*.{ts,mjs}',
      'server.js',
      'server/**/*.mjs',
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
      'tests/**/*.ts',
      'evals/**/*.ts',
      'mcp/**/*.ts',
      'vite.config.ts',
    ],
    languageOptions: {
      parserOptions: { projectService: false, project: './tsconfig.node.json' },
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
