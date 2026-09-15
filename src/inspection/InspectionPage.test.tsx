// @vitest-environment jsdom
import { renderRouteFixture } from '@/app/renderRouteFixture'
import { uiRuntimeFixture } from '@/app/uiRuntimeFixture'
import { viewAsFetcherFixture } from '@/app/viewAsFetcherFixture'
import { cleanup, screen, within } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

it('charts the reviewer library from server counts beside the corpus diagnostics', async () => {
  vi.stubGlobal('scrollTo', vi.fn())
  const { runtime, fetcher, requests } = uiRuntimeFixture()
  viewAsFetcherFixture(fetcher, requests)
  await renderRouteFixture('/inspect', runtime)
  const library = await screen.findByRole('region', {
    name: 'Authorized library',
  })
  expect(within(library).getByText('Corpus at a glance')).toBeTruthy()
  const coverage = within(library).getByRole('region', {
    name: 'Research coverage',
  })
  expect(within(coverage).getByText('7 paragraphs')).toBeTruthy()
  expect(within(coverage).getByText('3 paragraphs')).toBeTruthy()
  expect(
    within(
      within(library).getByRole('region', { name: 'Depth by company' }),
    ).getAllByRole('meter'),
  ).toHaveLength(2)
  expect(requests.map((request) => request['action'])).toEqual([
    'me',
    'debug',
    'list',
  ])
})
