import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/browser',
  outputDir: './work/browser-results',
  timeout: 30000,
  globalTimeout: 180000,
  workers: 1,
  retries: 0,
  use: { baseURL: 'http://127.0.0.1:4197', headless: true },
  projects: [1440, 390, 320].flatMap((width) =>
    (['reduce', 'no-preference'] as const).map((reducedMotion) => ({
      name: `${width}-${reducedMotion}`,
      use: { viewport: { width, height: 1000 }, reducedMotion },
    })),
  ),
  webServer: {
    command:
      'pnpm build && pnpm preview --host 127.0.0.1 --port 4197 --strictPort',
    url: 'http://127.0.0.1:4197',
    reuseExistingServer: false,
    timeout: 30000,
    env: {
      VITE_SUPABASE_URL: 'https://example.supabase.co',
      VITE_SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_browser_test',
    },
  },
})
