// @vitest-environment jsdom
import { renderRouteFixture } from '@/app/renderRouteFixture'
import { cleanup, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { bundleFixture } from '../fixtures/bundleFixture'
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
  it('say the lab is local-only when the dev API is absent', async () => {
    stubFetchWith(
      () =>
        new Response('<html></html>', {
          headers: { 'content-type': 'text/html' },
        }),
    )
    await renderRouteFixture('/lab/transcripts', null)
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
    await renderRouteFixture('/lab/transcripts/synthetic-1/report', null)
    expect(
      await screen.findByText(
        'Revenue grew twelve percent at Northwynd Ledger last year.',
      ),
    ).toBeTruthy()
    expect(screen.getByText('We hired forty people in Q3.')).toBeTruthy()
    expect(screen.getByText('01:05')).toBeTruthy()
    expect(screen.getByText('1 of 3')).toBeTruthy()
    expect(screen.getByText('1 pending, 1 rejected')).toBeTruthy()
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
    await renderRouteFixture('/lab/transcripts', null)
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
    await renderRouteFixture('/lab/memory', null)
    expect(await screen.findByText('Ledgar')).toBeTruthy()
    expect(screen.getByText(/Stored examples: 4/)).toBeTruthy()
  })
})
