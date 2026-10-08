// @vitest-environment jsdom
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
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
  it('shows the disclosure, the counters and tracked changes inline', () => {
    stubLabFetch([])
    render(<ReviewWorkspace bundle={bundleFixture()} />)
    expect(
      screen.getByText(
        'Public podcast audio processed locally for an engineering demo. Machine transcript (Parakeet TDT v3), second pass by synthetic-model. Not human-verified. Not In Practise content.',
      ),
    ).toBeTruthy()
    expect(screen.getByText('3 edits pending')).toBeTruthy()
    expect(screen.getByText('Needs attention · 2 passages')).toBeTruthy()
    expect(
      screen.getByRole('button', {
        name: 'entity edit, pending: Northwynd to Northwind',
      }),
    ).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Side by side' }))
    expect(screen.getByText('Raw machine transcript')).toBeTruthy()
  })

  it('flags an edit for later, filters to it and undoes the flag', () => {
    stubLabFetch([])
    render(<ReviewWorkspace bundle={bundleFixture()} />)
    const undo = screen.getByRole('button', { name: /Undo last decision/ })
    expect(undo.hasAttribute('disabled')).toBe(true)
    fireEvent.click(
      screen.getByRole('button', { name: /Northwynd to Northwind/ }),
    )
    fireEvent.keyDown(window, { key: 'f' })
    expect(
      screen.getByRole('button', {
        name: 'entity edit, flagged for later: Northwynd to Northwind',
      }),
    ).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Flagged · 1 edits' }))
    expect(
      screen.getAllByRole('region', { name: /Paragraph at/ }),
    ).toHaveLength(1)
    fireEvent.click(screen.getByRole('button', { name: /^All/ }))
    fireEvent.keyDown(window, { key: 'u' })
    expect(
      screen.getByRole('button', {
        name: 'entity edit, pending: Northwynd to Northwind',
      }),
    ).toBeTruthy()
    expect(undo.hasAttribute('disabled')).toBe(true)
  })

  it('previews an edit on hover and decides it from the card', () => {
    stubLabFetch([])
    render(<ReviewWorkspace bundle={bundleFixture()} />)
    fireEvent.mouseEnter(
      screen.getByRole('button', { name: /Northwynd to Northwind/ }),
    )
    const card = screen.getByRole('dialog', { name: 'Edit preview' })
    fireEvent.click(within(card).getByRole('button', { name: 'Accept' }))
    expect(screen.getByText('2 edits pending')).toBeTruthy()
    expect(
      screen.getByRole('button', {
        name: 'entity edit, accepted: Northwynd to Northwind',
      }),
    ).toBeTruthy()
  })

  it('opens a clicked edit in the inspector with the rest of its paragraph', () => {
    stubLabFetch([])
    render(<ReviewWorkspace bundle={bundleFixture()} />)
    fireEvent.click(
      screen.getByRole('button', { name: /Northwynd to Northwind/ }),
    )
    const inspector = screen.getByRole('complementary', {
      name: 'Edit inspector',
    })
    expect(within(inspector).getByText('Synthetic reason')).toBeTruthy()
    expect(within(inspector).getByText('In this paragraph')).toBeTruthy()
  })

  it('opens an edit from the keyboard with Enter', () => {
    stubLabFetch([])
    render(<ReviewWorkspace bundle={bundleFixture()} />)
    fireEvent.keyDown(
      screen.getByRole('button', { name: /Northwynd to Northwind/ }),
      { key: 'Enter' },
    )
    const inspector = screen.getByRole('complementary', {
      name: 'Edit inspector',
    })
    expect(within(inspector).getByText('Synthetic reason')).toBeTruthy()
  })

  it('accepts an edit, updates the counter and saves the decision', async () => {
    const fetchSpy = stubLabFetch([])
    render(<ReviewWorkspace bundle={bundleFixture()} />)
    fireEvent.click(
      screen.getByRole('button', { name: /Northwynd to Northwind/ }),
    )
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
    fireEvent.click(screen.getByRole('button', { name: 'Side by side' }))
    const paragraph = screen.getAllByRole('region', {
      name: /^Paragraph at/,
    })[0] as HTMLElement
    expect(
      within(paragraph).getByText('Northwind', { selector: 'ins' }),
    ).toBeTruthy()
    fireEvent.click(
      screen.getByRole('button', { name: /Northwynd to Northwind/ }),
    )
    fireEvent.click(
      screen.getAllByRole('button', { name: 'Reject' })[0] as HTMLElement,
    )
    expect(
      within(paragraph).queryByText('Northwind', { selector: 'ins' }),
    ).toBeNull()
    expect(screen.getByText('2 edits pending')).toBeTruthy()
  })

  it('accepts every pending edit of a paragraph at once', () => {
    stubLabFetch([])
    render(<ReviewWorkspace bundle={bundleFixture()} />)
    fireEvent.click(
      screen.getByRole('button', { name: /Northwynd to Northwind/ }),
    )
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
    expect(
      screen.getByRole('button', { name: /accepted: Northwynd to Northwind/ }),
    ).toBeTruthy()
    expect(
      screen.getByRole('button', { name: /rejected: Ledgar to Ledger/ }),
    ).toBeTruthy()
  })

  it('switches between needs-attention and all paragraphs', () => {
    stubLabFetch([])
    render(<ReviewWorkspace bundle={bundleFixture()} />)
    expect(screen.queryByText('Thanks')).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: /^All/ }))
    expect(screen.getByText('Thanks everyone.')).toBeTruthy()
  })

  it('opens the report in a named window', () => {
    stubLabFetch([])
    const open = vi.spyOn(window, 'open').mockReturnValue(null)
    render(<ReviewWorkspace bundle={bundleFixture()} />)
    fireEvent.click(screen.getByRole('button', { name: 'Open report' }))
    expect(open).toHaveBeenCalledWith(
      '/app/transcripts/synthetic-1/report',
      'transcript-report-synthetic-1',
    )
  })
})
