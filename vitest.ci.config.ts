import { defineConfig, mergeConfig } from 'vitest/config'
import shared from './vitest.config.ts'

export default mergeConfig(
  shared,
  defineConfig({
    test: {
      // Remote integration tests and persisted embedding artifacts run in `verify`.
      exclude: ['tests/integration/**', 'tests/unit/embedding.test.ts'],
    },
  }),
)
