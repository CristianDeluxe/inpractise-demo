// @vitest-environment jsdom
import { cleanup, fireEvent, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { renderRouteFixture } from './renderRouteFixture'
import { uiLabelsFixture } from './uiLabelsFixture'
import { uiRuntimeFixture } from './uiRuntimeFixture'

beforeEach(() => {
  vi.stubGlobal('scrollTo', vi.fn())
})
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})
describe('provider errors in the research workspace', () => {
  it.each([
    { code: 'dependency_failure', status: 503, retryable: true },
    { code: 'invalid_model_answer', status: 502, retryable: false },
  ])(
    'handles $code as an error and honors retryability',
    async ({ code, status, retryable }) => {
      const { runtime, fetcher } = uiRuntimeFixture()
      await renderRouteFixture('/app', runtime)
      await screen.findByRole('heading', { name: uiLabelsFixture.workspace })
      fetcher.mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            error: {
              code,
              message: 'Unavailable',
              retryable,
            },
            requestId: 'provider-failure',
          }),
          { status },
        ),
      )
      fireEvent.change(screen.getByLabelText(uiLabelsFixture.question), {
        target: { value: 'question' },
      })
      fireEvent.click(screen.getByRole('button', { name: /Ask the corpus/ }))
      expect(await screen.findByRole('alert')).toBeTruthy()
      expect(screen.queryByText(/Not established by the corpus/)).toBeNull()
      expect(screen.queryByRole('button', { name: 'Retry' }) !== null).toBe(
        retryable,
      )
      if (!retryable) return
      fireEvent.click(screen.getByRole('button', { name: 'Retry' }))
      expect(
        await screen.findByText('A supported claim with limits.'),
      ).toBeTruthy()
    },
  )
})
