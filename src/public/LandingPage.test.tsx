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
  it('shows a recorded podcast answer with its exact quote in the hero', async () => {
    await renderRouteFixture('/', null)
    const card = await screen.findByRole('article', {
      name: heroAnswer.question,
    })
    expect(card.textContent).toContain(heroAnswer.claim)
    expect(card.textContent).toContain(heroAnswer.quote)
    expect(card.textContent).toContain(heroAnswer.speaker)
    expect(card.textContent).toContain(heroAnswer.podcast)
    expect(card.textContent).toContain('Interview: 2024-11-20')
    expect(card.textContent).toContain(heroAnswer.passageId)
    expect(card.textContent).toContain('Public podcast - automatic transcript')
    expect(
      within(card)
        .getByRole('link', { name: /Open the transcript excerpt/ })
        .getAttribute('href'),
    ).toBe(heroAnswer.readerPath)
  })
  it('walks through the interview workflow', async () => {
    await renderRouteFixture('/', null)
    const workflow = await screen.findByRole('region', {
      name: 'How the workflow runs',
    })
    expect(within(workflow).getAllByRole('listitem')).toHaveLength(5)
  })
  it('names the sources and shows an unanswerable question', async () => {
    vi.stubGlobal('IntersectionObserver', undefined)
    await renderRouteFixture('/', null)
    await screen.findByText('A question the interviews cannot answer')
    expect(
      screen.getByText('No quote in these two interviews answers this.'),
    ).toBeTruthy()
    expect(screen.queryByText(/Northstar|Meridian|Costco|SEC/)).toBeNull()
    expect(screen.queryByText(/case G01|F03|13\/14/)).toBeNull()
  })
})
