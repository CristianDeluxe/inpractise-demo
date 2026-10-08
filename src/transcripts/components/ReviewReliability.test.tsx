// @vitest-environment jsdom
import { cleanup, fireEvent, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { renderReviewWorkspace } from '../fixtures/renderReviewWorkspace'
import { reviewSaverFixture } from '../fixtures/reviewSaverFixture'
import { stubBrowserMedia } from '../fixtures/stubBrowserMedia'
import { uncertainBundleFixture } from '../fixtures/uncertainBundleFixture'

beforeEach(stubBrowserMedia)
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('AI-final view', () => {
  it('opens on the corrected text with its reliability and no mandatory review', () => {
    renderReviewWorkspace(reviewSaverFixture(), false)
    expect(
      screen.getByText('AI final · 94.1% reliable · 1 word to spot-check'),
    ).toBeTruthy()
    expect(
      screen
        .getByRole('button', { name: 'AI final' })
        .getAttribute('aria-pressed'),
    ).toBe('true')
    expect(
      screen.getByText(/Checking the marked words is optional/),
    ).toBeTruthy()
    expect(screen.queryByText(/edits pending/)).toBeNull()
    expect(screen.getByText('Northwind')).toBeTruthy()
    expect(screen.queryByText('Northwynd')).toBeNull()
    expect(screen.getByText('Thanks')).toBeTruthy()
  })

  it('marks only the low-reliability words, with the reason on hover', () => {
    renderReviewWorkspace(reviewSaverFixture(), false)
    expect(screen.getByText('twelve').getAttribute('title')).toBe(
      'Reliability 70.0%: optional spot-check',
    )
    expect(screen.getByText('Revenue').getAttribute('title')).toBeNull()
  })

  it('keeps the other views one click away', () => {
    renderReviewWorkspace(reviewSaverFixture(), false)
    fireEvent.click(screen.getByRole('button', { name: 'Confidence' }))
    expect(screen.getByText('Northwynd')).toBeTruthy()
  })
})

describe('spot-check', () => {
  it('leaves an uncertain edit unapplied and walks only the uncertain edits', () => {
    renderReviewWorkspace(reviewSaverFixture(), false, uncertainBundleFixture())
    expect(
      screen.getByText('AI final · 88.2% reliable · 2 words to spot-check'),
    ).toBeTruthy()
    expect(screen.getByText('Ledgar')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Spot-check' }))
    expect(screen.getByText('1 edits pending')).toBeTruthy()
    expect(
      screen.getAllByRole('region', { name: /Paragraph at/ }),
    ).toHaveLength(1)
    fireEvent.keyDown(window, { key: 'j' })
    fireEvent.keyDown(window, { key: 'a' })
    expect(screen.getByText('0 edits pending')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'AI final' }))
    expect(
      screen.getByText('AI final · 94.1% reliable · 1 word to spot-check'),
    ).toBeTruthy()
    expect(screen.getByText('Ledger')).toBeTruthy()
  })

  it('reverts a rejected edit to the heard words and counts them as checked', () => {
    renderReviewWorkspace(reviewSaverFixture(), false, uncertainBundleFixture())
    fireEvent.click(screen.getByRole('button', { name: 'Spot-check' }))
    fireEvent.keyDown(window, { key: 'j' })
    fireEvent.keyDown(window, { key: 'r' })
    fireEvent.click(screen.getByRole('button', { name: 'AI final' }))
    const header = screen.getByRole('region', { name: 'AI-final reliability' })
    expect(
      within(header).getByText(
        'AI final · 94.1% reliable · 1 word to spot-check',
      ),
    ).toBeTruthy()
    expect(screen.getByText('Ledgar')).toBeTruthy()
  })
})
