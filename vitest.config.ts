import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.ts'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ['tests/**/*.test.ts', 'src/**/*.test.{ts,tsx}'],
      maxWorkers: 1,
      fileParallelism: false,
      coverage: {
        provider: 'v8',
        include: ['src/**/*.{ts,tsx}', 'supabase/functions/_shared/**/*.ts'],
        exclude: ['**/*.test.{ts,tsx}', '**/*Fixture.ts'],
        thresholds: { lines: 80, branches: 80, functions: 80, statements: 80 },
      },
    },
  }),
)
