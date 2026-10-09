// @vitest-environment jsdom
import { renderRouteFixture } from '@/app/renderRouteFixture'
import { uiRuntimeFixture } from '@/app/uiRuntimeFixture'
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { bundleFixture } from '../fixtures/bundleFixture'
import { episodeAudio } from '../fixtures/episodeAudio'
import { jsonResponse } from '../fixtures/jsonResponse'
import { labFetchFixture } from '../fixtures/labFetchFixture'
import { labTranscriptRowFixture } from '../fixtures/labTranscriptRowFixture'
import { paragraphTextMatcher } from '../fixtures/paragraphTextMatcher'
import { renderReviewWorkspace } from '../fixtures/renderReviewWorkspace'
import { reviewSaverFixture } from '../fixtures/reviewSaverFixture'
import { stubBrowserMedia } from '../fixtures/stubBrowserMedia'
import { ReviewWorkspace } from './ReviewWorkspace'

beforeEach(stubBrowserMedia)
afterEach(() => {
  cleanup()
  vi.useRealTimers()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('review playback and pages', () => {
  it('seeks and plays when a word is clicked, and follows playback', () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play')
    renderReviewWorkspace()
    fireEvent.click(screen.getByRole('button', { name: 'Confidence' }))
    fireEvent.click(screen.getByRole('button', { name: 'Northwynd' }))
    const audio = screen.getByLabelText<HTMLAudioElement>('Episode audio')
    expect(audio.currentTime).toBe(2.5)
    expect(play).toHaveBeenCalled()
    audio.currentTime = 66
    fireEvent(audio, new Event('timeupdate'))
    expect(
      within(
        screen.getByRole('region', { name: 'Paragraph at 01:05' }),
      ).getByRole('group', { current: true }),
    ).toBeTruthy()
  })

  it('plays from the button and seeks from the waveform keyboard', () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play')
    renderReviewWorkspace()
    fireEvent.click(screen.getByRole('button', { name: 'Play' }))
    expect(play).toHaveBeenCalled()
    const slider = screen.getByRole('slider', { name: 'Playback position' })
    fireEvent.keyDown(slider, { key: 'ArrowRight' })
    const audio = screen.getByLabelText<HTMLAudioElement>('Episode audio')
    expect(audio.currentTime).toBe(5)
    fireEvent.keyDown(slider, { key: 'Home' })
    expect(audio.currentTime).toBe(0)
  })

  it('loops the selected edit until the loop is stopped', async () => {
    renderReviewWorkspace()
    fireEvent.click(
      screen.getByRole('button', { name: /Northwynd to Northwind/ }),
    )
    await act(async () => {
      fireEvent.keyDown(window, { key: 'l' })
      await Promise.resolve()
    })
    const audio = screen.getByLabelText<HTMLAudioElement>('Episode audio')
    const start = audio.currentTime
    expect(
      screen.getAllByRole('button', { name: /Stop loop/, pressed: true }),
    ).not.toHaveLength(0)
    audio.currentTime = 9999
    fireEvent(audio, new Event('timeupdate'))
    expect(audio.currentTime).toBe(start)
    fireEvent.keyDown(window, { key: 'l' })
    expect(screen.getAllByRole('button', { name: /^Loop/ })).not.toHaveLength(0)
  })

  it('does not steal shortcut keys from text fields', () => {
    render(
      <>
        <input aria-label="note" />
        <ReviewWorkspace
          bundle={bundleFixture()}
          onSave={reviewSaverFixture()}
        />
      </>,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Track changes' }))
    fireEvent.keyDown(screen.getByLabelText('note'), { key: 'a' })
    fireEvent.keyDown(window, { key: 'a', ctrlKey: true })
    fireEvent.keyDown(window, { key: 'x' })
    expect(screen.getByText('3 edits pending')).toBeTruthy()
  })

  it('loads the review page and signs the audio under the caller session', async () => {
    const { fetcher } = labFetchFixture({
      lab_transcripts: [labTranscriptRowFixture()],
    })
    await renderRouteFixture(
      '/app/transcripts/synthetic-1',
      uiRuntimeFixture(fetcher).runtime,
    )
    expect(
      await screen.findByRole('heading', {
        name: 'Synthetic briefing about Northwind Ledger',
      }),
    ).toBeTruthy()
    expect(episodeAudio().src).toContain(
      '/storage/v1/object/sign/lab-audio/demo-org/synthetic-1.m4a',
    )
  })

  it('reports a missing transcript instead of crashing', async () => {
    await renderRouteFixture(
      '/app/transcripts/unknown',
      uiRuntimeFixture().runtime,
    )
    expect(
      await screen.findByText(/Could not load the transcript/),
    ).toBeTruthy()
  })

  it('reports a database error instead of crashing', async () => {
    const failing = vi.fn<typeof fetch>(async () =>
      Promise.resolve(jsonResponse({ message: 'boom' }, 500)),
    )
    await renderRouteFixture('/app/memory', uiRuntimeFixture(failing).runtime)
    expect(await screen.findByText(/Could not load the memory/)).toBeTruthy()
  })

  it('refreshes the report when decisions change in the review window', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    const tables = {
      lab_transcripts: [labTranscriptRowFixture()],
      lab_reviews: [] as unknown[],
    }
    const { fetcher } = labFetchFixture(tables)
    await renderRouteFixture(
      '/app/transcripts/synthetic-1/report',
      uiRuntimeFixture(fetcher).runtime,
    )
    expect(
      await screen.findByText(
        paragraphTextMatcher(
          'Revenue grew twelve percent at Northwind Ledger last year.',
        ),
      ),
    ).toBeTruthy()
    tables.lab_reviews = [
      {
        transcript_id: 'synthetic-1',
        decisions: [{ editId: 'e1', verdict: 'rejected', decidedAt: 'now' }],
      },
    ]
    await act(async () => {
      await vi.advanceTimersByTimeAsync(4100)
    })
    expect(
      await screen.findByText(
        paragraphTextMatcher(
          'Revenue grew twelve percent at Northwynd Ledger last year.',
        ),
      ),
    ).toBeTruthy()
  })
})
