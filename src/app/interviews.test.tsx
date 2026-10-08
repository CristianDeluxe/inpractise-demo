// @vitest-environment jsdom
import { cleanup, screen, within } from '@testing-library/react'
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
  it('lists the public interviews only, with guest, date and a reader link', async () => {
    const { runtime } = mixedLibraryRuntimeFixture('reviewer')
    await renderRouteFixture('/app', runtime)
    await screen.findByRole('heading', { name: uiLabelsFixture.workspace })
    const list = await screen.findByRole('region', { name: 'Interviews' })
    expect(within(list).getAllByRole('article')).toHaveLength(2)
    expect(screen.queryByText('Northstar annual filing')).toBeNull()
    expect(screen.queryByText('Former buyer on pricing')).toBeNull()
    const roche = within(list).getByRole('article', {
      name: 'Roche CEO Thomas Schinecker on In Good Company',
    })
    expect(within(roche).getByText('2024-11-20')).toBeTruthy()
    expect(within(roche).getByText('92')).toBeTruthy()
    expect(
      within(roche).getByText(/Thomas Schinecker, Chief Executive Officer/),
    ).toBeTruthy()
    expect(
      within(roche).getByText('Public podcast - automatic transcript'),
    ).toBeTruthy()
    expect(
      within(roche)
        .getByRole('link', { name: /Read the transcript/ })
        .getAttribute('href'),
    ).toBe('/read/pod-roche-2024/rev-roche/T001')
    expect(
      within(roche)
        .getByRole('link', { name: /Ask about Roche/ })
        .getAttribute('href'),
    ).toBe('/app/ask?company=roche')
    const novartis = within(list).getByRole('article', {
      name: 'Novartis CEO Vasant Narasimhan on In Good Company',
    })
    expect(within(novartis).queryByText('Excerpts')).toBeNull()
  })
})
