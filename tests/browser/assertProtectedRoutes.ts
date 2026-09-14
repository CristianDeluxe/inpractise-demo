import { expect, type Page } from '@playwright/test'

export async function assertProtectedRoutes(page: Page) {
  for (const path of ['/app', '/inspect', '/read/northstar/rev-1/p-1']) {
    await page.goto(path)
    await expect(
      page.getByRole('heading', { name: 'Sign in to continue' }),
    ).toBeVisible()
    await expect(page.getByRole('alert')).toHaveCount(0)
    await expect(page.locator('main')).toContainText(path)
    await expect(page.getByRole('link', { name: 'Sign in' })).toHaveAttribute(
      'href',
      '/login',
    )
    await page.reload()
    await expect(
      page.getByRole('heading', { name: 'Sign in to continue' }),
    ).toBeVisible()
  }
}
