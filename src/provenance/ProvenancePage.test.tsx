// @vitest-environment jsdom
import { renderRouteFixture } from '@/app/renderRouteFixture'
import { uiRuntimeFixture } from '@/app/uiRuntimeFixture'
import { cleanup, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

afterEach(() => {
  cleanup()
})

describe('ProvenancePage', () => {
  it('renders a neutral not-found state for a request id that resolves to nothing', async () => {
    const { runtime, fetcher } = uiRuntimeFixture()
    fetcher.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          action: 'me',
          data: { orgId: 'org', role: 'member', premium: false },
          buildId: 'build',
          requestId: 'request',
        }),
        { headers: { 'content-type': 'application/json' } },
      ),
    )
    fetcher.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          error: {
            code: 'not_found',
            message: 'No such request',
            retryable: false,
          },
          requestId: 'missing',
        }),
        { status: 404, headers: { 'content-type': 'application/json' } },
      ),
    )
    await renderRouteFixture(
      '/answer/00000000-0000-0000-0000-000000000000',
      runtime,
    )
    expect(
      await screen.findByText('No answer was found for this request id.'),
    ).toBeTruthy()
    expect(screen.queryByRole('alert')).toBeNull()
    expect(screen.queryByText('Sign in')).toBeNull()
  })
})
