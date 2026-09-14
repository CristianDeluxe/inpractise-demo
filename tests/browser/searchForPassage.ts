import { expect, type Page } from '@playwright/test'
import { passageFixture } from './passageFixture.ts'

/** Runs a passage search and checks the exact quotation reaches the screen. */
export async function searchForPassage(page: Page) {
  const citation = passageFixture()
  await page.getByLabel('Passage search').check()
  await page.getByLabel('Search query').fill('migration')
  await page.getByRole('button', { name: /Search passages/ }).click()
  await expect(
    page.getByRole('heading', { name: 'Ranked passages' }),
  ).toBeVisible()
  await expect(page.getByText(citation.quote).first()).toBeVisible()
}
