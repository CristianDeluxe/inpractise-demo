// @vitest-environment jsdom
import { renderRouteFixture } from '@/app/renderRouteFixture'
import { uiRuntimeFixture } from '@/app/uiRuntimeFixture'
import { stubFetchWith } from '@/transcripts/fixtures/stubFetchWith'
import { cleanup, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { costFetchFixture } from './costFetchFixture'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('cost page', () => {
  it('shows measured effort per transcript against the stated manual baseline', async () => {
    costFetchFixture()
    await renderRouteFixture('/app/cost', uiRuntimeFixture().runtime)
    expect(
      await screen.findByRole('heading', { name: 'Cleanup cost' }),
    ).toBeTruthy()
    expect(
      screen.getByText(
        'Measured cost of this pipeline',
      ),
    ).toBeTruthy()
    const reviewed = screen.getByRole('row', { name: /Briefing a/ })
    expect(within(reviewed).getByText('1 h 0 min')).toBeTruthy()
    expect(within(reviewed).getByText('4')).toBeTruthy()
    expect(within(reviewed).getByText('2')).toBeTruthy()
    expect(within(reviewed).getAllByText('10.0 min')).toHaveLength(2)
    const raw = screen.getByRole('row', { name: /Briefing b/ })
    expect(within(raw).getAllByText('not measured yet')).toHaveLength(2)
    expect(
      screen.getByRole('columnheader', {
        name: /estimated from decision timestamps/,
      }),
    ).toBeTruthy()
  })
  it('says the figure is not measured when no transcript was reviewed', async () => {
    const empty = new Response(JSON.stringify([]), {
      headers: { 'content-type': 'application/json' },
    })
    stubFetchWith(() => empty.clone())
    await renderRouteFixture('/app/cost', uiRuntimeFixture().runtime)
    expect(await screen.findByText('not measured yet')).toBeTruthy()
    expect(screen.getByText(/nothing to measure/)).toBeTruthy()
  })
  it('keeps the development-server state when the lab API is absent', async () => {
    stubFetchWith(
      () =>
        new Response('<html></html>', {
          headers: { 'content-type': 'text/html' },
        }),
    )
    await renderRouteFixture('/app/cost', uiRuntimeFixture().runtime)
    expect(
      await screen.findByText('This page needs the development server'),
    ).toBeTruthy()
  })
})
