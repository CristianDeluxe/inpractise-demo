import { expect, type Page } from '@playwright/test'

export async function assertLandingGeometry(page: Page) {
  const width = page.viewportSize()?.width ?? 0
  const bounds = await page
    .locator('section')
    .first()
    .locator('.page-shell > div')
    .first()
    .boundingBox()
  expect(bounds).not.toBeNull()
  expect((bounds?.x ?? 0) + (bounds?.width ?? 0)).toBeLessThanOrEqual(width)
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
  ).toBe(false)
}
