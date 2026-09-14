import { test } from '@playwright/test'

export const browserProbeTest = test.extend({
  browser: [
    async ({ playwright, launchOptions }, use) => {
      const browser = await playwright.chromium.launch(launchOptions)
      try {
        await use(browser)
      } finally {
        await browser.close()
      }
    },
    { scope: 'worker', timeout: 10000 },
  ],
})
