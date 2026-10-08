// @vitest-environment jsdom
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { bundleFixture } from '../fixtures/bundleFixture'
import { stubBrowserMedia } from '../fixtures/stubBrowserMedia'
import { stubLabFetch } from '../fixtures/stubLabFetch'
import { ReviewWorkspace } from './ReviewWorkspace'

beforeEach(stubBrowserMedia)
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('ReviewWorkspace', () => {
  it('shows the disclosure, the counters and raw/corrected columns', () => {
    stubLabFetch([])
    render(<ReviewWorkspace bundle={bundleFixture()} />)
    expect(
      screen.getByText(
        'Public podcast audio processed locally for an engineering demo. Machine transcript (Parakeet TDT v3), second pass by synthetic-model. Not human-verified. Not In Practise content.',
      ),
    ).toBeTruthy()
    expect(screen.getByText('3 edits pending')).toBeTruthy()
    expect(screen.getByText('Needs attention (2)')).toBeTruthy()
    expect(screen.getByText('Raw machine transcript')).toBeTruthy()
  })

  it('accepts an edit, updates the counter and saves the decision', async () => {
    const fetchSpy = stubLabFetch([])
    render(<ReviewWorkspace bundle={bundleFixture()} />)
    fireEvent.click(
      screen.getAllByRole('button', { name: 'Accept' })[0] as HTMLElement,
    )
    expect(screen.getByText('2 edits pending')).toBeTruthy()
    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1)
    })
    const [url, init] = fetchSpy.mock.calls[0] as unknown as [
      string,
      RequestInit,
    ]
    expect(url).toBe('/local-api/transcripts/synthetic-1/review')
    expect(init.method).toBe('PUT')
    expect(JSON.parse(init.body as string)).toMatchObject([
      { editId: 'e1', verdict: 'accepted' },
    ])
  })

  it('reverts a rejected edit in the corrected column', () => {
    stubLabFetch([])
    render(<ReviewWorkspace bundle={bundleFixture()} />)
    expect(screen.getByText('Northwind', { selector: 'mark' })).toBeTruthy()
    fireEvent.click(
      screen.getAllByRole('button', { name: 'Reject' })[0] as HTMLElement,
    )
    expect(screen.queryByText('Northwind', { selector: 'mark' })).toBeNull()
    expect(screen.getByText('2 edits pending')).toBeTruthy()
  })

  it('accepts every pending edit of a paragraph at once', () => {
    stubLabFetch([])
    render(<ReviewWorkspace bundle={bundleFixture()} />)
    fireEvent.click(
      screen.getByRole('button', { name: /Accept all 2 pending/ }),
    )
    expect(screen.getByText('1 edits pending')).toBeTruthy()
  })

  it('moves with j and decides with a and r', () => {
    stubLabFetch([])
    render(<ReviewWorkspace bundle={bundleFixture()} />)
    fireEvent.keyDown(window, { key: 'j' })
    fireEvent.keyDown(window, { key: 'a' })
    fireEvent.keyDown(window, { key: 'r' })
    expect(screen.getByText('1 edits pending')).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Accepted' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Rejected' })).toBeTruthy()
  })

  it('switches between needs-attention and all paragraphs', () => {
    stubLabFetch([])
    render(<ReviewWorkspace bundle={bundleFixture()} />)
    expect(screen.queryByText('Thanks')).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: /^All/ }))
    expect(screen.getByRole('button', { name: 'Thanks' })).toBeTruthy()
  })

  it('opens the report in a named window', () => {
    stubLabFetch([])
    const open = vi.spyOn(window, 'open').mockReturnValue(null)
    render(<ReviewWorkspace bundle={bundleFixture()} />)
    fireEvent.click(screen.getByRole('button', { name: 'Open report' }))
    expect(open).toHaveBeenCalledWith(
      '/lab/transcripts/synthetic-1/report',
      'transcript-report-synthetic-1',
    )
  })
})
