import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.ts'

// The local authorization suite runs real SQL against the throwaway container
// `pnpm db:local:up` starts, so it is kept out of every credential-free gate.
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ['tests/local/**/*.test.ts'],
      maxWorkers: 1,
      fileParallelism: false,
      testTimeout: 30000,
    },
  }),
)
