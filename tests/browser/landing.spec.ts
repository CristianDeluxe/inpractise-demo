import { expect } from '@playwright/test'
import { assertLandingMotion } from './assertLandingMotion.ts'
import { assertProtectedRoutes } from './assertProtectedRoutes.ts'
import { browserProbeTest as test } from './browserProbeTest.ts'
import { observeCanvasContexts } from './observeCanvasContexts.ts'

test('landing motion, layout and signed-out routes', async ({ page }) => {
  const errors: string[] = []
  const external: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('request', (request) => {
    if (new URL(request.url()).origin !== 'http://127.0.0.1:4197')
      external.push(request.url())
  })
  await page.route('https://**/*', async (route) => {
    await route.abort()
  })
  await page.addInitScript(observeCanvasContexts)
  await page.goto('/')
  await assertLandingMotion(page)
  await assertProtectedRoutes(page)
  expect(errors).toEqual([])
  expect(
    external.every((url) =>
      ['fonts.googleapis.com', 'fonts.gstatic.com'].includes(
        new URL(url).hostname,
      ),
    ),
  ).toBe(true)
})
