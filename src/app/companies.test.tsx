// @vitest-environment jsdom
import { citationFixture } from '@/api/citationFixture'
import { cleanup, fireEvent, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mixedLibraryRuntimeFixture } from './mixedLibraryRuntimeFixture'
import { renderRouteFixture } from './renderRouteFixture'
import { uiLabelsFixture } from './uiLabelsFixture'
import { uiRuntimeFixture } from './uiRuntimeFixture'

beforeEach(() => {
  vi.stubGlobal('scrollTo', vi.fn())
})
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})
describe('company entry to the workspace', () => {
  it('lists one card per company with interview counts only and scoped links', async () => {
    const { runtime } = mixedLibraryRuntimeFixture('reviewer')
    await renderRouteFixture('/app/companies', runtime)
    await screen.findByRole('heading', { name: uiLabelsFixture.companies })
    const companies = await screen.findByRole('region', { name: 'Companies' })
    expect(within(companies).getAllByRole('article')).toHaveLength(2)
    const northstar = within(companies).getByRole('article', {
      name: 'Northstar',
    })
    expect(
      within(northstar).getByText('Interviews', { selector: 'dt' }),
    ).toBeTruthy()
    expect(within(northstar).getByText('1', { selector: 'dd' })).toBeTruthy()
    expect(within(northstar).getByText('2026-09-01')).toBeTruthy()
    expect(within(northstar).getByText('2026-09-02')).toBeTruthy()
    expect(
      within(northstar)
        .getByRole('link', { name: 'Ask about Northstar' })
        .getAttribute('href'),
    ).toBe('/app/ask?company=northstar')
    expect(
      within(northstar)
        .getByRole('link', { name: 'Interviews with Northstar' })
        .getAttribute('href'),
    ).toBe('/app?company=northstar')
    expect(within(companies).queryByText(/filing/i)).toBeNull()
    expect(
      within(companies).queryByRole('link', { name: /Compare/ }),
    ).toBeNull()
  })
  it('opens Ask with the company from the URL and writes scope changes back', async () => {
    const { runtime } = uiRuntimeFixture()
    const { router } = await renderRouteFixture(
      `/app/ask?company=${citationFixture().company}`,
      runtime,
    )
    const scope = await screen.findByLabelText<HTMLSelectElement>(
      uiLabelsFixture.scope,
    )
    expect(scope.value).toBe(citationFixture().company)
    fireEvent.change(scope, { target: { value: '' } })
    expect(
      (await screen.findByLabelText<HTMLSelectElement>(uiLabelsFixture.scope))
        .value,
    ).toBe('')
    expect(router.state.location.search).toEqual({})
  })
  it('ignores a company value the schema rejects', async () => {
    const { runtime } = uiRuntimeFixture()
    await renderRouteFixture(`/app?company=${'x'.repeat(81)}`, runtime)
    const scope = await screen.findByLabelText<HTMLSelectElement>(
      uiLabelsFixture.scope,
    )
    expect(scope.value).toBe('')
  })
})
