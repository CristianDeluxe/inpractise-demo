import { defineConfig, mergeConfig } from 'vitest/config'
import shared from './vitest.config.ts'

export default mergeConfig(
  shared,
  defineConfig({
    test: {
      // Remote integration tests and persisted embedding artifacts run in
      // `verify`. The corpus vocabulary test rehashes the raw source artifacts,
      // which `corpus/raw/` keeps out of the repository, so it is local-only.
      exclude: [
        'tests/integration/**',
        'tests/unit/embedding.test.ts',
        'tests/unit/corpusVocabulary.test.ts',
      ],
    },
  }),
)
