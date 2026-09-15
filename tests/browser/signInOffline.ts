import { expect, type Page } from '@playwright/test'

/** Signs in against the stubbed auth endpoint and lands on the workspace. */
export async function signInOffline(page: Page) {
  await page.goto('/login')
  await page.getByLabel('Email').fill('me@cristiandeluxe.dev')
  await page.getByLabel('Password').fill('offline-password')
  await page.getByRole('button', { name: /Sign in/ }).click()
  await expect(
    page.getByRole('heading', { name: 'Start with a company.' }),
  ).toBeVisible()
}
