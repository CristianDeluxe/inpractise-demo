// @vitest-environment jsdom
import { renderRouteFixture } from '@/app/renderRouteFixture'
import { cleanup, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { heroAnswer } from './heroAnswer'

beforeEach(() => {
  vi.stubGlobal('scrollTo', vi.fn())
})
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('landing page', () => {
  it('shows a recorded answer with its exact citation in the hero', async () => {
    await renderRouteFixture('/', null)
    const card = await screen.findByRole('article', {
      name: heroAnswer.question,
    })
    expect(card.textContent).toContain(heroAnswer.claim)
    expect(card.textContent).toContain(heroAnswer.citation.quote)
    expect(card.textContent).toContain(heroAnswer.citation.speaker)
    expect(card.textContent).toContain('Interview: 2026-08-04')
    expect(card.textContent).toContain('Published: 2026-08-06')
    expect(card.textContent).toContain(heroAnswer.citation.revisionId)
    expect(card.textContent).toContain(
      'Synthetic interview — fictional company and speaker',
    )
    expect(
      within(card)
        .getByRole('link', { name: /Open exact passage/ })
        .getAttribute('href'),
    ).toBe(heroAnswer.citation.readerPath)
  })
  it('links each engineering property to its page', async () => {
    await renderRouteFixture('/', null)
    const strip = await screen.findByRole('region', { name: 'How it is built' })
    expect(
      within(strip)
        .getAllByRole('link')
        .map((link) => link.getAttribute('href')),
    ).toEqual(['/method', '/inspect', '/connect'])
  })
  it('renders every section without scrolling or an observer', async () => {
    vi.stubGlobal('IntersectionObserver', undefined)
    await renderRouteFixture('/', null)
    await screen.findByText('Two accounts. Different contexts.')
    expect(screen.queryByText(/Five interviews/)).toBeNull()
    expect(screen.queryByRole('link', { name: /podcast/i })).toBeNull()
  })
})
