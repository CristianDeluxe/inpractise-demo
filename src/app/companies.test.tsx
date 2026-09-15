// @vitest-environment jsdom
import { citationFixture } from '@/api/citationFixture'
import { cleanup, fireEvent, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { renderRouteFixture } from './renderRouteFixture'
import { uiLabelsFixture } from './uiLabelsFixture'
import { uiRuntimeFixture } from './uiRuntimeFixture'
import { viewAsFetcherFixture } from './viewAsFetcherFixture'

beforeEach(() => {
  vi.stubGlobal('scrollTo', vi.fn())
})
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})
describe('company entry to the workspace', () => {
  it('lists one card per authorized company with scoped Ask and source links', async () => {
    const { runtime, fetcher, requests } = uiRuntimeFixture()
    viewAsFetcherFixture(fetcher, requests)
    await renderRouteFixture('/app', runtime)
    await screen.findByRole('heading', { name: uiLabelsFixture.workspace })
    const companies = await screen.findByRole('region', { name: 'Companies' })
    expect(within(companies).getAllByRole('article')).toHaveLength(2)
    const premium = within(companies).getByRole('article', {
      name: 'Premium Company',
    })
    expect(
      within(premium).getByText('1 synthetic interview, dated 2026-09-01'),
    ).toBeTruthy()
    expect(
      within(premium).getByText(/Latest publication 2026-09-02/),
    ).toBeTruthy()
    expect(
      within(premium)
        .getByRole('link', { name: 'Ask about Premium Company' })
        .getAttribute('href'),
    ).toBe('/app/ask?company=Premium+Company')
    expect(
      within(companies)
        .getByRole('link', { name: `Sources for ${citationFixture().company}` })
        .getAttribute('href'),
    ).toBe(`/app/library?company=${citationFixture().company}`)
    expect(screen.queryByText(/paragraphs/)).toBeNull()
    expect(screen.queryByLabelText('Company scope')).toBeNull()
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
    await renderRouteFixture(`/app/library?company=${'x'.repeat(81)}`, runtime)
    const scope = await screen.findByLabelText<HTMLSelectElement>(
      uiLabelsFixture.scope,
    )
    expect(scope.value).toBe('')
  })
})
