// @vitest-environment jsdom
import { compareStreamFixture } from '@/app/compareStreamFixture'
import { renderRouteFixture } from '@/app/renderRouteFixture'
import { uiLabelsFixture } from '@/app/uiLabelsFixture'
import { uiRuntimeFixture } from '@/app/uiRuntimeFixture'
import { comparePayloadFixture } from '@/contracts/comparePayloadFixture'
import { cleanup, fireEvent, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

it('reports the cross-reference progress and renders both sides with their relation', async () => {
  vi.stubGlobal('scrollTo', vi.fn())
  const { runtime } = uiRuntimeFixture()
  await renderRouteFixture('/app/compare', runtime)
  const scope = await screen.findByLabelText(uiLabelsFixture.scope)
  fireEvent.change(scope, { target: { value: 'northstar' } })
  fireEvent.change(screen.getByLabelText('Topic to cross-reference'), {
    target: { value: 'deployment time' },
  })
  fireEvent.click(screen.getByRole('button', { name: /Compare/ }))

  const progress = await screen.findByRole('list', {
    name: 'Cross-reference progress',
  })
  expect(progress.textContent).toContain('Allowance debited')
  expect(progress.textContent).toContain('interview and')
  expect(progress.textContent).toContain('Rereading')

  const result = await screen.findByRole('region', { name: 'Cross-reference' })
  expect(result.textContent).toContain('Executive interviews')
  expect(result.textContent).toContain('SEC filings')
  expect(
    screen.getByRole('heading', { name: 'How the two sides relate' }),
  ).toBeTruthy()
  expect(result.textContent).toContain('Agrees with')
})

it('cross-references a topic across every authorized company with none chosen', async () => {
  vi.stubGlobal('scrollTo', vi.fn())
  const { runtime, fetcher } = uiRuntimeFixture()
  await renderRouteFixture('/app/compare', runtime)
  await screen.findByLabelText(uiLabelsFixture.scope)
  fireEvent.change(screen.getByLabelText('Topic to cross-reference'), {
    target: { value: 'supply chain risk' },
  })
  expect(
    screen.getByText(
      /Compares interviews against filings across every company you may read/i,
    ),
  ).toBeTruthy()
  fetcher.mockResolvedValueOnce(
    compareStreamFixture(
      comparePayloadFixture({ extra: { company: undefined } }),
    ),
  )
  fireEvent.click(screen.getByRole('button', { name: /Compare/ }))

  const result = await screen.findByRole('region', { name: 'Cross-reference' })
  expect(result.textContent).toContain('All authorized companies')
})

it('shows the no-filing-evidence state for a company with only interviews', async () => {
  vi.stubGlobal('scrollTo', vi.fn())
  const { runtime, fetcher } = uiRuntimeFixture()
  await renderRouteFixture('/app/compare', runtime)
  const scope = await screen.findByLabelText(uiLabelsFixture.scope)
  fireEvent.change(scope, { target: { value: 'northstar' } })
  fireEvent.change(screen.getByLabelText('Topic to cross-reference'), {
    target: { value: 'deployment time' },
  })
  fetcher.mockResolvedValueOnce(
    compareStreamFixture(
      comparePayloadFixture({
        filingSide: { status: 'not_found', claims: [] },
        relations: [],
        uncovered: ['filings'],
      }),
    ),
  )
  fireEvent.click(screen.getByRole('button', { name: /Compare/ }))

  expect(
    await screen.findByText(/No sec filings evidence for this company/i),
  ).toBeTruthy()
})
