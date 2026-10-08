// @vitest-environment jsdom
import { cleanup, fireEvent, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mixedLibraryRuntimeFixture } from './mixedLibraryRuntimeFixture'
import { renderRouteFixture } from './renderRouteFixture'
import { uiLabelsFixture } from './uiLabelsFixture'

beforeEach(() => {
  vi.stubGlobal('scrollTo', vi.fn())
})
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('interview library', () => {
  it('lists interviews only, with their date and excerpt count, and never a filing', async () => {
    const { runtime } = mixedLibraryRuntimeFixture('reviewer')
    await renderRouteFixture('/app', runtime)
    await screen.findByRole('heading', { name: uiLabelsFixture.workspace })
    const list = await screen.findByRole('region', { name: 'Interviews' })
    expect(within(list).getAllByRole('article')).toHaveLength(2)
    expect(screen.queryByText('Northstar annual filing')).toBeNull()
    expect(screen.queryByText('Public filing')).toBeNull()
    const northstar = within(list).getByRole('article', {
      name: 'Former operator on migrations',
    })
    expect(within(northstar).getByText('2026-09-01')).toBeTruthy()
    expect(within(northstar).getByText('12')).toBeTruthy()
    expect(
      within(northstar).getByText(
        'Synthetic interview — fictional company and speaker',
      ),
    ).toBeTruthy()
    expect(
      within(northstar)
        .getByRole('link', { name: /Ask about Northstar/ })
        .getAttribute('href'),
    ).toBe('/app/ask?company=northstar')
    const acme = within(list).getByRole('article', {
      name: 'Former buyer on pricing',
    })
    expect(within(acme).queryByText('Excerpts')).toBeNull()
  })
  it('filters by company from the URL and by title text', async () => {
    const { runtime } = mixedLibraryRuntimeFixture('reviewer')
    await renderRouteFixture('/app?company=acme', runtime)
    const list = await screen.findByRole('region', { name: 'Interviews' })
    expect(within(list).getAllByRole('article')).toHaveLength(1)
    fireEvent.change(screen.getByLabelText(uiLabelsFixture.scope), {
      target: { value: '' },
    })
    expect(await screen.findAllByRole('article')).toHaveLength(2)
    fireEvent.change(screen.getByLabelText('Filter by title'), {
      target: { value: 'MIGRATIONS' },
    })
    expect(screen.getAllByRole('article')).toHaveLength(1)
    fireEvent.change(screen.getByLabelText('Filter by title'), {
      target: { value: 'nothing like this' },
    })
    expect(screen.getByText('No interview matches these filters.')).toBeTruthy()
  })
})
