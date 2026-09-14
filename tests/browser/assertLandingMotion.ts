import { expect, type Page } from '@playwright/test'
import { assertLandingGeometry } from './assertLandingGeometry.ts'

export async function assertLandingMotion(page: Page) {
  await expect(
    page.getByRole('heading', { name: /Executive insight/ }),
  ).toBeVisible()
  for (const element of await page.locator('.intro-fade').all())
    await expect(element).toHaveCSS('opacity', '1')
  await expect(page.locator('canvas')).toHaveAttribute('aria-hidden', 'true')
  await expect(page.locator('canvas')).toHaveCSS('pointer-events', 'none')
  await expect(page.locator('dl')).toContainText('Synthetic interviews6')
  const reducedMotion = await page.evaluate(
    () => matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  await expect(page.locator('.ticker-track')).toHaveCSS(
    'animation-name',
    reducedMotion ? 'none' : 'ticker',
  )
  const contextCount = await page
    .locator('html')
    .getAttribute('data-probe-canvas-contexts')
  expect(Number(contextCount)).toBe(reducedMotion ? 0 : 1)
  await assertLandingGeometry(page)
  for (const reveal of await page.locator('.reveal').all()) {
    await reveal.scrollIntoViewIfNeeded()
    await expect(reveal).toHaveCSS('opacity', '1')
  }
  await page.getByRole('link', { name: 'Explore the evidence' }).click()
  await expect(page.locator('#evidence').getByRole('heading')).toHaveText(
    'Audit the source.',
  )
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.locator('.parallax-art')).toHaveCSS('transform', 'none')
}
