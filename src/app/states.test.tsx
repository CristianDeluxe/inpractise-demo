import { uiLabelsFixture } from './uiLabelsFixture'
// @vitest-environment jsdom
import { citationFixture } from '@/api/citationFixture'
import {
  act,
  cleanup,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { renderRouteFixture } from './renderRouteFixture'
import { responseFixture } from './responseFixture'
import { sessionFixture } from './sessionFixture'
import { uiRuntimeFixture } from './uiRuntimeFixture'

beforeEach(() => {
  vi.stubGlobal('scrollTo', vi.fn())
})
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})
describe('research request states', () => {
  it('cancels pending work and suppresses a late completion', async () => {
    const { runtime, fetcher } = uiRuntimeFixture()
    await renderRouteFixture('/app', runtime)
    await screen.findByRole('heading', { name: uiLabelsFixture.library })
    const pending = Promise.withResolvers<Response>()
    fetcher.mockReturnValueOnce(pending.promise)
    fireEvent.change(screen.getByLabelText(uiLabelsFixture.question), {
      target: { value: 'question' },
    })
    fireEvent.click(screen.getByRole('button', { name: /Ask the corpus/ }))
    fireEvent.click(await screen.findByRole('button', { name: 'Cancel' }))
    expect(screen.getByText(/Cancelled./)).toBeTruthy()
    await act(async () => {
      pending.resolve(
        responseFixture('ask', {
          status: 'not_found',
          claims: [],
          citations: [],
          missingEvidence: [],
          mode: 'hybrid',
          candidateCount: 0,
        }),
      )
      await pending.promise
    })
    expect(screen.queryByText(/could not establish an answer/)).toBeNull()
    expect(runtime.controllers.size).toBe(0)
  })
  it('clears all evidence on expired session and auth identity changes', async () => {
    const { runtime, fetcher, authChange } = uiRuntimeFixture()
    await renderRouteFixture('/app', runtime)
    await screen.findByRole('heading', { name: uiLabelsFixture.library })
    const authListener = authChange.mock.calls[0]?.[0]
    if (!authListener) throw new Error('Missing auth listener')
    await act(async () => {
      await authListener('SIGNED_IN', sessionFixture)
    })
    await screen.findByRole('heading', { name: uiLabelsFixture.library })
    const previousCalls = fetcher.mock.calls.length
    await act(async () => {
      await authListener('SIGNED_IN', sessionFixture)
    })
    expect(fetcher).toHaveBeenCalledTimes(previousCalls)
    fetcher.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          error: {
            code: 'invalid_session',
            message: 'Expired',
            retryable: false,
          },
          requestId: 'expired',
        }),
        { status: 401 },
      ),
    )
    fireEvent.change(screen.getByLabelText(uiLabelsFixture.question), {
      target: { value: 'question' },
    })
    fireEvent.click(screen.getByRole('button', { name: /Ask the corpus/ }))
    await waitFor(() => {
      expect(
        screen.queryByRole('heading', { name: uiLabelsFixture.library }),
      ).toBeNull()
    })
    expect(screen.getByRole('link', { name: 'Sign in' })).toBeTruthy()
  })
  it('renders not_found without claims, and escapes provider text', async () => {
    const { runtime, fetcher } = uiRuntimeFixture()
    await renderRouteFixture('/app', runtime)
    await screen.findByRole('heading', { name: uiLabelsFixture.library })
    fetcher.mockResolvedValueOnce(
      responseFixture('ask', {
        status: 'not_found',
        claims: [],
        citations: [],
        missingEvidence: [],
        mode: 'lexical_only',
        candidateCount: 0,
      }),
    )
    fireEvent.change(screen.getByLabelText(uiLabelsFixture.question), {
      target: { value: 'missing' },
    })
    fireEvent.click(screen.getByRole('button', { name: /Ask the corpus/ }))
    expect(
      await screen.findByText(/could not establish an answer/),
    ).toBeTruthy()
    const citation = citationFixture()
    fetcher.mockResolvedValueOnce(
      responseFixture('ask', {
        status: 'conflict',
        claims: [
          {
            text: '<img src=x onerror=alert(1)>',
            citationIds: [citation.citationId],
          },
        ],
        citations: [citation],
        missingEvidence: ['Accounts disagree'],
        mode: 'hybrid',
        candidateCount: 2,
      }),
    )
    fireEvent.click(screen.getByRole('button', { name: /Ask the corpus/ }))
    expect(await screen.findByText('<img src=x onerror=alert(1)>')).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'conflict' })).toBeTruthy()
    expect(screen.queryByRole('img')).toBeNull()
  })
  it('keeps missing passages neutral and empty search distinct', async () => {
    const { runtime, fetcher } = uiRuntimeFixture()
    await renderRouteFixture('/app', runtime)
    await screen.findByRole('heading', { name: uiLabelsFixture.library })
    fetcher.mockResolvedValueOnce(
      responseFixture('search', {
        items: [],
        mode: 'hybrid',
        truncated: false,
      }),
    )
    fireEvent.click(screen.getByLabelText('Passage search'))
    fireEvent.change(screen.getByLabelText('Search query'), {
      target: { value: 'missing' },
    })
    fireEvent.click(screen.getByRole('button', { name: /Search passages/ }))
    expect(await screen.findByText('No matching passages.')).toBeTruthy()
  })
  it('keeps reviewer denial enforced on the diagnostic route', async () => {
    const { runtime, fetcher } = uiRuntimeFixture()
    fetcher.mockResolvedValueOnce(
      responseFixture('me', { orgId: 'org', role: 'member', premium: false }),
    )
    fetcher.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          error: { code: 'forbidden', message: 'Denied', retryable: false },
          requestId: 'denied',
        }),
        { status: 403 },
      ),
    )
    await renderRouteFixture('/inspect', runtime)
    expect(await screen.findByText(/Access denied/)).toBeTruthy()
    expect(screen.queryByRole('link', { name: 'Diagnostics' })).toBeNull()
    expect(screen.queryByText('No reviewed evaluation report')).toBeNull()
  })
})
