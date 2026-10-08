// @vitest-environment jsdom
import { renderRouteFixture } from '@/app/renderRouteFixture'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { bundleFixture } from '../fixtures/bundleFixture'
import { stubBrowserMedia } from '../fixtures/stubBrowserMedia'
import { stubFetchWith } from '../fixtures/stubFetchWith'
import { stubLabFetch } from '../fixtures/stubLabFetch'
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
    stubLabFetch([])
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play')
    render(<ReviewWorkspace bundle={bundleFixture()} />)
    fireEvent.click(screen.getByRole('button', { name: 'Confidence' }))
    fireEvent.click(screen.getByRole('button', { name: 'Northwynd' }))
    const audio = screen.getByLabelText<HTMLAudioElement>('Episode audio')
    expect(audio.currentTime).toBe(2.5)
    expect(play).toHaveBeenCalled()
    audio.currentTime = 66
    fireEvent(audio, new Event('timeupdate'))
    expect(
      screen.getByRole('region', { name: 'Paragraph at 01:05' }).dataset[
        'playing'
      ],
    ).toBe('true')
  })

  it('does not steal shortcut keys from text fields', () => {
    stubLabFetch([])
    render(
      <>
        <input aria-label="note" />
        <ReviewWorkspace bundle={bundleFixture()} />
      </>,
    )
    fireEvent.keyDown(screen.getByLabelText('note'), { key: 'a' })
    fireEvent.keyDown(window, { key: 'a', ctrlKey: true })
    fireEvent.keyDown(window, { key: 'x' })
    expect(screen.getByText('3 edits pending')).toBeTruthy()
  })

  it('loads the review page from the API', async () => {
    stubLabFetch(bundleFixture())
    await renderRouteFixture('/lab/transcripts/synthetic-1', null)
    expect(
      await screen.findByRole('heading', {
        name: 'Synthetic briefing about Northwind Ledger',
      }),
    ).toBeTruthy()
  })

  it('reports a server error instead of crashing', async () => {
    stubFetchWith(
      () =>
        new Response('{"error":"x"}', {
          status: 500,
          headers: { 'content-type': 'application/json' },
        }),
    )
    await renderRouteFixture('/lab/transcripts/synthetic-1', null)
    expect(
      await screen.findByText(/Could not load the transcript/),
    ).toBeTruthy()
  })

  it('treats a failed request as an unavailable lab', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        await Promise.resolve()
        throw new Error('offline')
      }),
    )
    await renderRouteFixture('/lab/memory', null)
    expect(
      await screen.findByText('This page needs the development server'),
    ).toBeTruthy()
  })

  it('refreshes the report when decisions change in the review window', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    let review: unknown[] = []
    stubFetchWith(
      () =>
        new Response(JSON.stringify({ ...bundleFixture(), review }), {
          headers: { 'content-type': 'application/json' },
        }),
    )
    await renderRouteFixture('/lab/transcripts/synthetic-1/report', null)
    expect(
      await screen.findByText(
        'Revenue grew twelve percent at Northwind Ledger last year.',
      ),
    ).toBeTruthy()
    review = [{ editId: 'e1', verdict: 'rejected', decidedAt: 'now' }]
    await act(async () => {
      await vi.advanceTimersByTimeAsync(4100)
    })
    expect(
      await screen.findByText(
        'Revenue grew twelve percent at Northwynd Ledger last year.',
      ),
    ).toBeTruthy()
  })
})
