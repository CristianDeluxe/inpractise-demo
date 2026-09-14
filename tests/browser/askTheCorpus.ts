import { expect, type Page } from '@playwright/test'

/** Asks a standalone question and checks the answer keeps its stated limits. */
export async function askTheCorpus(page: Page) {
  await page.getByLabel('Standalone Ask').check()
  await page
    .getByLabel('Your question')
    .fill('Why are complex migrations hard?')
  await page.getByRole('button', { name: /Ask the corpus/ }).click()
  await expect(
    page.getByRole('heading', { name: 'Partly answered' }),
  ).toBeVisible()
  await expect(
    page.getByText('No enterprise switching cost was measured.'),
  ).toBeVisible()
}
