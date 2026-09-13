// @vitest-environment jsdom
import { citationFixture } from '@/api/citationFixture'
import { cleanup, fireEvent, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { renderRouteFixture } from './renderRouteFixture'
import { responseFixture } from './responseFixture'
import { uiRuntimeFixture } from './uiRuntimeFixture'

beforeEach(() => {
  vi.stubGlobal('scrollTo', vi.fn())
})
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})
describe('source availability and provenance', () => {
  it('shows a neutral unavailable passage without exposing a title', async () => {
    const { runtime, fetcher } = uiRuntimeFixture()
    fetcher.mockResolvedValueOnce(
      responseFixture('me', { orgId: 'org', role: 'member', premium: false }),
    )
    fetcher.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          error: { code: 'not_found', message: 'Missing', retryable: false },
          requestId: 'missing',
        }),
        { status: 404 },
      ),
    )
    renderRouteFixture(citationFixture().readerPath, runtime)
    expect(await screen.findByText('This source is unavailable.')).toBeTruthy()
    expect(screen.queryByText(citationFixture().title)).toBeNull()
  })
  it('renders a public filing without inventing a speaker and copies the validated path', async () => {
    const { runtime, fetcher } = uiRuntimeFixture()
    const citation = {
      ...citationFixture(),
      origin: 'public',
      kind: 'sec_filing',
      speaker: null,
      speakerRole: null,
      interviewDate: null,
    }
    fetcher.mockResolvedValueOnce(
      responseFixture('me', { orgId: 'org', role: 'member', premium: false }),
    )
    fetcher.mockResolvedValueOnce(
      responseFixture('read', {
        citation,
        section: 'Annual report',
        isCurrentRevision: true,
        neighbourIds: [],
      }),
    )
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    })
    renderRouteFixture(citation.readerPath, runtime)
    expect(await screen.findByText('Public filing')).toBeTruthy()
    expect(
      screen.queryByText('Synthetic interview — fictional company and speaker'),
    ).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: 'Copy citation link' }))
    expect(
      await screen.findByRole('button', { name: 'Link copied' }),
    ).toBeTruthy()
    expect(writeText).toHaveBeenCalledWith(
      new URL(citation.readerPath, window.location.origin).href,
    )
  })
  it('renders an empty authorized library without selecting a company', async () => {
    const { runtime, fetcher } = uiRuntimeFixture()
    fetcher.mockResolvedValueOnce(
      responseFixture('me', { orgId: 'org', role: 'member', premium: false }),
    )
    fetcher.mockResolvedValueOnce(responseFixture('list', { items: [] }))
    renderRouteFixture('/app', runtime)
    expect(
      await screen.findByText('No authorized documents are available.'),
    ).toBeTruthy()
    expect(
      screen.getByLabelText<HTMLSelectElement>('Company scope').value,
    ).toBe('')
  })
})
