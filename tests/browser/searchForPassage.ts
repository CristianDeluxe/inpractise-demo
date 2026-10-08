import { expect, type Page } from '@playwright/test'
import { passageFixture } from './passageFixture.ts'

/** Runs a passage search and checks the exact quotation reaches the screen. */
export async function searchForPassage(page: Page) {
  const citation = passageFixture()
  await page.getByLabel('Search quotes').check()
  await page.getByLabel('Search query').fill('AI research')
  await page.getByRole('button', { name: /Search quotes/ }).click()
  await expect(
    page.getByRole('heading', { name: 'Matching quotes' }),
  ).toBeVisible()
  await expect(page.getByText(citation.quote).first()).toBeVisible()
}
