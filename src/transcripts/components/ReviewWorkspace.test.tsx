// @vitest-environment jsdom
import {
  cleanup,
  fireEvent,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { paragraphTextMatcher } from '../fixtures/paragraphTextMatcher'
import { renderReviewWorkspace } from '../fixtures/renderReviewWorkspace'
import { reviewSaverFixture } from '../fixtures/reviewSaverFixture'
import { stubBrowserMedia } from '../fixtures/stubBrowserMedia'

beforeEach(stubBrowserMedia)
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('ReviewWorkspace', () => {
  it('shows the disclosure, the counters and tracked changes inline', () => {
    renderReviewWorkspace()
    expect(
      screen.getByText(
        'Public podcast audio processed locally for an engineering demo: automatic Parakeet TDT v3 transcript, second AI pass by synthetic-model, speakers inferred from the audio. Not human-verified. Not In Practise content.',
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
    renderReviewWorkspace()
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
    renderReviewWorkspace()
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
    renderReviewWorkspace()
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
    renderReviewWorkspace()
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
    const onSave = reviewSaverFixture()
    renderReviewWorkspace(onSave)
    fireEvent.click(
      screen.getByRole('button', { name: /Northwynd to Northwind/ }),
    )
    fireEvent.click(
      screen.getAllByRole('button', { name: 'Accept' })[0] as HTMLElement,
    )
    expect(screen.getByText('2 edits pending')).toBeTruthy()
    await waitFor(() => {
      expect(onSave).toHaveBeenCalledTimes(1)
    })
    expect(onSave).toHaveBeenCalledWith('synthetic-1', [
      expect.objectContaining({ editId: 'e1', verdict: 'accepted' }),
    ])
  })

  it('is read-only without a saver: says so and records nothing', () => {
    renderReviewWorkspace(null)
    expect(
      screen.getByText(/Reviewer access needed to record decisions/),
    ).toBeTruthy()
    expect(screen.getByText('Read-only')).toBeTruthy()
    fireEvent.click(
      screen.getByRole('button', { name: /Northwynd to Northwind/ }),
    )
    fireEvent.click(
      screen.getAllByRole('button', { name: 'Accept' })[0] as HTMLElement,
    )
    expect(screen.getByText('3 edits pending')).toBeTruthy()
  })

  it('reverts a rejected edit in the corrected column', () => {
    renderReviewWorkspace()
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
    renderReviewWorkspace()
    fireEvent.click(
      screen.getByRole('button', { name: /Northwynd to Northwind/ }),
    )
    fireEvent.click(
      screen.getByRole('button', { name: /Accept all 2 pending/ }),
    )
    expect(screen.getByText('1 edits pending')).toBeTruthy()
  })

  it('moves with j and decides with a and r', () => {
    renderReviewWorkspace()
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
    renderReviewWorkspace()
    expect(screen.queryByText('Thanks')).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: /^All/ }))
    expect(
      screen.getByText(paragraphTextMatcher('Thanks everyone.')),
    ).toBeTruthy()
  })

  it('opens the report in a named window', () => {
    const open = vi.spyOn(window, 'open').mockReturnValue(null)
    renderReviewWorkspace()
    fireEvent.click(screen.getByRole('button', { name: 'Open report' }))
    expect(open).toHaveBeenCalledWith(
      '/app/transcripts/synthetic-1/report',
      'transcript-report-synthetic-1',
    )
  })
})
