// @vitest-environment jsdom
import { renderRouteFixture } from '@/app/renderRouteFixture'
import { uiRuntimeFixture } from '@/app/uiRuntimeFixture'
import { cleanup, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { bundleFixture } from '../fixtures/bundleFixture'
import { paragraphTextMatcher } from '../fixtures/paragraphTextMatcher'
import { stubBrowserMedia } from '../fixtures/stubBrowserMedia'
import { stubFetchWith } from '../fixtures/stubFetchWith'
import { stubLabFetch } from '../fixtures/stubLabFetch'

beforeEach(stubBrowserMedia)
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('lab pages', () => {
  it('keep the lab behind sign-in and never call its API signed out', async () => {
    const lab = stubLabFetch([])
    const { runtime, getSession } = uiRuntimeFixture()
    getSession.mockResolvedValue({ data: { session: null }, error: null })
    await renderRouteFixture('/app/transcripts', runtime)
    expect(
      await screen.findByRole('heading', { name: 'Sign in to continue' }),
    ).toBeTruthy()
    expect(lab).not.toHaveBeenCalled()
  })

  it('say the lab is local-only when the dev API is absent', async () => {
    stubFetchWith(
      () =>
        new Response('<html></html>', {
          headers: { 'content-type': 'text/html' },
        }),
    )
    await renderRouteFixture('/app/transcripts', uiRuntimeFixture().runtime)
    expect(
      await screen.findByText('This page needs the development server'),
    ).toBeTruthy()
  })

  it('rebuild the report with rejected edits reverted and list corrected terms', async () => {
    const bundle = {
      ...bundleFixture(),
      review: [
        { editId: 'e1', verdict: 'rejected', decidedAt: 'now' },
        { editId: 'e2', verdict: 'accepted', decidedAt: 'now' },
      ],
    }
    stubLabFetch(bundle)
    await renderRouteFixture(
      '/app/transcripts/synthetic-1/report',
      uiRuntimeFixture().runtime,
    )
    expect(
      await screen.findByText(
        paragraphTextMatcher(
          'Revenue grew twelve percent at Northwynd Ledger last year.',
        ),
      ),
    ).toBeTruthy()
    expect(
      screen.getByText(paragraphTextMatcher('We hired forty people in Q3.')),
    ).toBeTruthy()
    expect(screen.getByText('01:05')).toBeTruthy()
    expect(screen.getByText('1 of 3')).toBeTruthy()
    expect(screen.getByText('1 pending, 0 flagged, 1 rejected')).toBeTruthy()
    expect(screen.getByText('Ledger', { selector: 'strong' })).toBeTruthy()
    expect(screen.queryByText('Northwind', { selector: 'strong' })).toBeNull()
  })

  it('lists transcripts with their statistics', async () => {
    const { transcript } = bundleFixture()
    stubLabFetch([
      {
        id: transcript.id,
        source: transcript.source,
        stats: transcript.stats,
        hasCorrection: true,
        edits: 3,
        reviewed: 2,
      },
    ])
    await renderRouteFixture('/app/transcripts', uiRuntimeFixture().runtime)
    expect(await screen.findByText(transcript.source.title)).toBeTruthy()
    expect(screen.getByText('corrected')).toBeTruthy()
    expect(screen.getByText('2 / 3 reviewed')).toBeTruthy()
  })

  it('shows the learned glossary', async () => {
    stubLabFetch({
      glossary: [
        {
          from: 'Ledgar',
          to: 'Ledger',
          category: 'entity',
          occurrences: 3,
          sources: ['synthetic-1'],
          lastSeenAt: 'now',
        },
      ],
      examples: 4,
    })
    await renderRouteFixture('/app/memory', uiRuntimeFixture().runtime)
    expect(await screen.findByText('Ledgar')).toBeTruthy()
    expect(screen.getByText(/Stored examples: 4/)).toBeTruthy()
  })
})
