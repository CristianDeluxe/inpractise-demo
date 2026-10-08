import { expect, type Page } from '@playwright/test'

/** Asks a standalone question and checks the answer keeps its stated limits. */
export async function askTheInterviews(page: Page) {
  await page.getByLabel('Ask', { exact: true }).check()
  await page
    .getByLabel('Your question')
    .fill('How is Roche using AI in research and development?')
  await page.getByRole('button', { name: /Ask the interviews/ }).click()
  await expect(
    page.getByRole('heading', { name: 'Partly answered' }),
  ).toBeVisible()
  await expect(page.getByText('No revenue forecast was given.')).toBeVisible()
}
