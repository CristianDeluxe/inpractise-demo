import { expect, type Page } from '@playwright/test'
import { passageFixture } from './passageFixture.ts'

/**
 * Follows a claim's source link into the reader. The visible label names the
 * document and passage; the exact server identity is on the link's title, so
 * both the readable and the precise form are checked here.
 */
export async function openCitedPassage(page: Page) {
  const citation = passageFixture()
  const source = page.getByRole('link', {
    name: `Source: ${citation.company}, passage ${citation.passageId}`,
  })
  await expect(source).toHaveAttribute('title', citation.citationId)
  await source.click()
  await expect(
    page.getByRole('heading', { name: 'Read the source.' }),
  ).toBeVisible()
  await expect(page.getByText(citation.quote).first()).toBeVisible()
  expect(new URL(page.url()).pathname).toBe(citation.readerPath)
}
