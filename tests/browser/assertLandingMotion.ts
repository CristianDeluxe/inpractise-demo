import { expect, type Page } from '@playwright/test'
import { assertLandingGeometry } from './assertLandingGeometry.ts'

export async function assertLandingMotion(page: Page) {
  await expect(
    page.getByRole('heading', { name: /Answers that/ }),
  ).toBeVisible()
  for (const element of await page.locator('.intro-fade').all())
    await expect(element).toHaveCSS('opacity', '1')
  await expect(page.locator('canvas')).toHaveAttribute('aria-hidden', 'true')
  await expect(page.locator('canvas')).toHaveCSS('pointer-events', 'none')
  await expect(page.locator('dl').last()).toContainText('Synthetic interviews6')
  const reducedMotion = await page.evaluate(
    () => matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const contextCount = await page
    .locator('html')
    .getAttribute('data-probe-canvas-contexts')
  expect(Number(contextCount)).toBe(reducedMotion ? 0 : 1)
  await assertLandingGeometry(page)
  await expect(page.locator('#built').getByRole('link')).toHaveCount(3)
  await expect(page.locator('#evidence')).toContainText(
    'Two accounts. Different contexts.',
  )
  await page.getByRole('link', { name: 'Explore the evidence' }).click()
  await expect(page.locator('#evidence').getByRole('heading')).toHaveText(
    'Audit the source.',
  )
}
