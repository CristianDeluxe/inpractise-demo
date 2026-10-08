// @vitest-environment jsdom
import { renderRouteFixture } from '@/app/renderRouteFixture'
import { uiRuntimeFixture } from '@/app/uiRuntimeFixture'
import { labFetchFixture } from '@/transcripts/fixtures/labFetchFixture'
import { memberRuntimeFixture } from '@/transcripts/fixtures/memberRuntimeFixture'
import { cleanup, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { costTablesFixture } from './costTablesFixture'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('cost page', () => {
  it('shows this pipeline only: tokens, list-price USD, local ASR at zero, reviewer minutes', async () => {
    const { fetcher } = labFetchFixture(costTablesFixture())
    await renderRouteFixture('/app/cost', uiRuntimeFixture(fetcher).runtime)
    expect(
      await screen.findByRole('heading', { name: 'Pipeline cost' }),
    ).toBeTruthy()
    expect(screen.getByText('USD 13.25 per audio hour')).toBeTruthy()
    expect(screen.getByText('288.0 min per audio hour')).toBeTruthy()
    const row = screen.getByRole('row', { name: /Synthetic briefing/ })
    expect(within(row).getByText('30,000 in, 40,000 out')).toBeTruthy()
    expect(within(row).getByText('USD 0.4600')).toBeTruthy()
    expect(within(row).getByText(/USD 0$/)).toBeTruthy()
    expect(within(row).getByText('10.0 min')).toBeTruthy()
    expect(
      screen.getByText('120,000 tokens, USD 0.0720, 7 requests'),
    ).toBeTruthy()
    expect(screen.getByText('27,145')).toBeTruthy()
    expect(screen.getByText('USD 0.0005')).toBeTruthy()
    expect(screen.getAllByText('Measured').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Estimated').length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: /pricing/ })).not.toHaveLength(0)
    expect(screen.queryByText(/baseline/i)).toBeNull()
  })

  it('tells a member that daily usage is for reviewers and never calls the function', async () => {
    const { fetcher, urls } = labFetchFixture(costTablesFixture())
    await renderRouteFixture('/app/cost', memberRuntimeFixture(fetcher).runtime)
    expect(await screen.findByText(/Reviewer access is needed/)).toBeTruthy()
    expect(urls.some((url) => url.includes('usage_summary'))).toBe(false)
  })

  it('says so when nothing is measured yet', async () => {
    const { fetcher } = labFetchFixture({ 'rpc:usage_summary': [] })
    await renderRouteFixture('/app/cost', uiRuntimeFixture(fetcher).runtime)
    expect(await screen.findByText(/nothing to measure/)).toBeTruthy()
    expect(screen.getByText(/No Ask requests have been recorded/)).toBeTruthy()
  })
})
