// @vitest-environment jsdom
import { renderRouteFixture } from '@/app/renderRouteFixture'
import { uiRuntimeFixture } from '@/app/uiRuntimeFixture'
import { cleanup, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { bundleFixture } from '../fixtures/bundleFixture'
import { labFetchFixture } from '../fixtures/labFetchFixture'
import { labTranscriptRowFixture } from '../fixtures/labTranscriptRowFixture'
import { paragraphTextMatcher } from '../fixtures/paragraphTextMatcher'
import { stubBrowserMedia } from '../fixtures/stubBrowserMedia'

beforeEach(stubBrowserMedia)
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('lab pages', () => {
  it('keep the lab behind sign-in and never query the database signed out', async () => {
    const { fetcher } = labFetchFixture()
    const { runtime, getSession } = uiRuntimeFixture(fetcher)
    getSession.mockResolvedValue({ data: { session: null }, error: null })
    await renderRouteFixture('/app/transcripts', runtime)
    expect(
      await screen.findByRole('heading', { name: 'Sign in to continue' }),
    ).toBeTruthy()
    expect(fetcher).not.toHaveBeenCalled()
  })

  it('rebuild the AI-final report with human decisions applied and list corrected terms', async () => {
    const { fetcher } = labFetchFixture({
      lab_transcripts: [labTranscriptRowFixture()],
      lab_reviews: [
        {
          transcript_id: bundleFixture().transcript.id,
          decisions: [
            { editId: 'e1', verdict: 'rejected', decidedAt: 'now' },
            { editId: 'e2', verdict: 'accepted', decidedAt: 'now' },
          ],
        },
      ],
    })
    await renderRouteFixture(
      '/app/transcripts/synthetic-1/report',
      uiRuntimeFixture(fetcher).runtime,
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
    expect(screen.getByText('94.1%')).toBeTruthy()
    expect(
      screen.getByText('1 automatic, 1 confirmed by a person'),
    ).toBeTruthy()
    expect(screen.getByText('Not applied; 1 reverted by a person')).toBeTruthy()
    expect(screen.getByText('twelve').getAttribute('title')).toBe(
      'Reliability 70.0%: optional spot-check',
    )
    expect(screen.getByText('Ledger', { selector: 'strong' })).toBeTruthy()
    expect(screen.queryByText('Northwind', { selector: 'strong' })).toBeNull()
  })

  it('lists transcripts with their statistics and saved decision counts', async () => {
    const row = labTranscriptRowFixture()
    const { fetcher } = labFetchFixture({
      lab_transcripts: [row],
      lab_reviews: [
        {
          transcript_id: row.transcript_id,
          decisions: [
            { editId: 'e1', verdict: 'accepted', decidedAt: 'now' },
            { editId: 'e2', verdict: 'rejected', decidedAt: 'now' },
          ],
        },
      ],
    })
    await renderRouteFixture(
      '/app/transcripts',
      uiRuntimeFixture(fetcher).runtime,
    )
    expect(await screen.findByText(row.source.title)).toBeTruthy()
    expect(screen.getByText('AI final ready')).toBeTruthy()
    const episode = screen.getByRole('row', { name: /Synthetic briefing/ })
    expect(within(episode).getByText('94.1%')).toBeTruthy()
    expect(within(episode).getByText('1')).toBeTruthy()
    expect(screen.getByText('2 / 3 reviewed')).toBeTruthy()
  })

  it('says when the AI pass has not run for an episode', async () => {
    const row = labTranscriptRowFixture()
    const { fetcher } = labFetchFixture({
      lab_transcripts: [
        {
          ...row,
          correction: null,
          correction_model: null,
          correction_input_tokens: null,
          correction_output_tokens: null,
          edit_count: 0,
        },
      ],
    })
    await renderRouteFixture(
      '/app/transcripts',
      uiRuntimeFixture(fetcher).runtime,
    )
    expect(await screen.findByText('AI pass not run')).toBeTruthy()
    expect(screen.getByText('Nothing to check yet')).toBeTruthy()
    expect(screen.queryByText('AI final ready')).toBeNull()
  })

  it('shows the learned glossary', async () => {
    const { fetcher } = labFetchFixture({
      lab_memory: [
        {
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
          example_count: 4,
        },
      ],
    })
    await renderRouteFixture('/app/memory', uiRuntimeFixture(fetcher).runtime)
    expect(await screen.findByText('Ledgar')).toBeTruthy()
    expect(screen.getByText(/Stored examples: 4/)).toBeTruthy()
  })

  it('shows an empty memory for an organisation with no row', async () => {
    await renderRouteFixture('/app/memory', uiRuntimeFixture().runtime)
    expect(await screen.findByText(/Stored examples: 0/)).toBeTruthy()
  })
})
