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

it('summarises the reviewer interviews from server counts beside the diagnostics', async () => {
  vi.stubGlobal('scrollTo', vi.fn())
  const { runtime, fetcher, requests } = uiRuntimeFixture()
  viewAsFetcherFixture(fetcher, requests)
  await renderRouteFixture('/inspect', runtime)
  const library = await screen.findByRole('region', {
    name: 'Authorized library',
  })
  expect(within(library).getByText('Interviews at a glance')).toBeTruthy()
  expect(within(library).getByText('Transcript excerpts')).toBeTruthy()
  expect(within(library).getByText('10')).toBeTruthy()
  expect(within(library).queryByText('Filings')).toBeNull()
  expect(requests.map((request) => request['action'])).toEqual([
    'me',
    'debug',
    'list',
  ])
})
