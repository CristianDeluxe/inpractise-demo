import type { Page } from '@playwright/test'
import { researchPayload } from './researchPayload.ts'

/**
 * Serves Supabase Auth and the research function from fixtures so the analyst
 * workflow runs with the network cut. Every other external request is aborted
 * by the caller, which is what makes a stray dependency fail the test rather
 * than pass quietly.
 */
export async function stubResearchService(page: Page) {
  await page.route('**/auth/v1/token**', async (route) => {
    await route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({
        access_token: 'offline-access-token',
        refresh_token: 'offline-refresh-token',
        token_type: 'bearer',
        expires_in: 3600,
        expires_at: Math.floor(Date.now() / 1000) + 3600,
        user: {
          id: 'offline-user',
          aud: 'authenticated',
          role: 'authenticated',
          email: 'me@cristiandeluxe.dev',
          app_metadata: {},
          user_metadata: {},
          created_at: '2026-09-13T00:00:00Z',
        },
      }),
    })
  })
  await page.route('**/functions/v1/research', async (route) => {
    const request = route.request().postDataJSON() as { action: string }
    await route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({
        action: request.action,
        data: researchPayload(request.action),
        buildId: 'offline-build',
        requestId: `offline-${request.action}`,
      }),
    })
  })
}
