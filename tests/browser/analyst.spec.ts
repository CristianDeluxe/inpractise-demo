import { expect } from '@playwright/test'
import { askTheCorpus } from './askTheCorpus.ts'
import { browserProbeTest as test } from './browserProbeTest.ts'
import { openCitedPassage } from './openCitedPassage.ts'
import { searchForPassage } from './searchForPassage.ts'
import { signInOffline } from './signInOffline.ts'
import { stubResearchService } from './stubResearchService.ts'

test('an analyst signs in, searches, asks and opens the cited passage', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  // Registration order matters: Playwright matches the most recently added
  // route first, so the catch-all abort has to go in before the stubs.
  await page.route('https://**/*', async (route) => {
    await route.abort()
  })
  await stubResearchService(page)

  await signInOffline(page)
  await searchForPassage(page)
  await askTheCorpus(page)
  await openCitedPassage(page)
  expect(errors).toEqual([])
})
