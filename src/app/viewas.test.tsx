// @vitest-environment jsdom
import {
  act,
  cleanup,
  fireEvent,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { renderRouteFixture } from './renderRouteFixture'
import { responseFixture } from './responseFixture'
import { uiLabelsFixture } from './uiLabelsFixture'
import { uiPayloadFixture } from './uiPayloadFixture'
import { uiRuntimeFixture } from './uiRuntimeFixture'
import { viewAsPayloadFixture } from './viewAsPayloadFixture'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('server-backed viewing mode', () => {
  it('requests the selected mode, clears old evidence, hides diagnostics and changes coverage from server counts', async () => {
    vi.stubGlobal('scrollTo', vi.fn())
    const { runtime, fetcher, requests } = uiRuntimeFixture()
    fetcher.mockImplementation(async (_url, init) => {
      const request = JSON.parse(
        typeof init?.body === 'string' ? init.body : '{}',
      ) as Record<string, unknown>
      requests.push(request)
      return Promise.resolve(
        responseFixture(
          String(request['action']),
          viewAsPayloadFixture(request),
        ),
      )
    })
    await renderRouteFixture('/app', runtime)
    const coverage = await screen.findByRole('region', {
      name: 'Research coverage',
    })
    expect(within(coverage).getByText('7 paragraphs')).toBeTruthy()
    fireEvent.change(screen.getByLabelText('Company scope'), {
      target: { value: 'Premium Company' },
    })
    expect(within(coverage).queryByText('3 paragraphs')).toBeNull()
    expect(
      within(
        screen.getByRole('region', { name: 'Depth by company' }),
      ).getAllByRole('meter'),
    ).toHaveLength(1)
    expect(
      within(
        screen.getByRole('region', { name: 'Recent documents' }),
      ).getByText('7 paragraphs'),
    ).toBeTruthy()
    expect(screen.getAllByRole('link', { name: 'Diagnostics' })).toHaveLength(2)
    fireEvent.change(
      within(screen.getByRole('complementary')).getByLabelText('View as'),
      { target: { value: 'basic-member' } },
    )
    expect(
      await screen.findByText(/This view is restricted on purpose/),
    ).toBeTruthy()
    await screen.findByRole('heading', { name: uiLabelsFixture.library })
    expect(screen.queryByRole('link', { name: 'Diagnostics' })).toBeNull()
    expect(screen.queryByText('Premium Company')).toBeNull()
    expect(
      within(
        screen.getByRole('region', { name: 'Research coverage' }),
      ).getByText('3 paragraphs'),
    ).toBeTruthy()
    expect(requests.slice(-2)).toEqual([
      { action: 'me', viewAs: { role: 'member', premium: false } },
      { action: 'list', viewAs: { role: 'member', premium: false } },
    ])
    fireEvent.click(screen.getByRole('button', { name: /What makes complex/ }))
    fireEvent.click(screen.getByRole('button', { name: /Ask the corpus/ }))
    await screen.findByText('A supported claim with limits.')
    expect(requests.at(-1)).toHaveProperty('viewAs', {
      role: 'member',
      premium: false,
    })
    fireEvent.change(
      within(screen.getByRole('complementary')).getByLabelText('View as'),
      { target: { value: 'member' } },
    )
    await screen.findByRole('heading', { name: uiLabelsFixture.library })
    expect(screen.queryByText('A supported claim with limits.')).toBeNull()
    expect(requests.at(-1)).toHaveProperty('viewAs', { role: 'member' })
    expect(screen.queryByRole('link', { name: 'Diagnostics' })).toBeNull()
    fireEvent.change(
      within(screen.getByRole('complementary')).getByLabelText('View as'),
      { target: { value: 'full' } },
    )
    await waitFor(() => {
      expect(
        screen.queryByText(/This view is restricted on purpose/),
      ).toBeNull()
    })
    await screen.findByRole('heading', { name: uiLabelsFixture.library })
    expect(requests.at(-1)).not.toHaveProperty('viewAs')
    expect(screen.getAllByRole('link', { name: 'Diagnostics' })).toHaveLength(2)
  })
  it('never invents counts when the response has none', async () => {
    vi.stubGlobal('scrollTo', vi.fn())
    await renderRouteFixture('/app', uiRuntimeFixture().runtime)
    const coverage = await screen.findByRole('region', {
      name: 'Research coverage',
    })
    expect(within(coverage).getByText('Count unavailable')).toBeTruthy()
    expect(within(coverage).queryByText('0 paragraphs')).toBeNull()
    expect(screen.queryByRole('meter')).toBeNull()
  })
  it('aborts an in-flight full-access answer and suppresses its late response after downgrade', async () => {
    vi.stubGlobal('scrollTo', vi.fn())
    const { runtime, fetcher } = uiRuntimeFixture()
    await renderRouteFixture('/app', runtime)
    await screen.findByRole('heading', { name: uiLabelsFixture.library })
    const pending = Promise.withResolvers<Response>()
    fetcher.mockReturnValueOnce(pending.promise)
    fireEvent.click(screen.getByRole('button', { name: /What makes complex/ }))
    fireEvent.click(screen.getByRole('button', { name: /Ask the corpus/ }))
    await waitFor(() => {
      expect(fetcher).toHaveBeenCalledTimes(3)
    })
    const signal = fetcher.mock.calls.at(-1)?.[1]?.signal
    fetcher.mockResolvedValueOnce(
      responseFixture(
        'me',
        viewAsPayloadFixture({
          action: 'me',
          viewAs: { role: 'member', premium: false },
        }),
      ),
    )
    fetcher.mockResolvedValueOnce(
      responseFixture(
        'list',
        viewAsPayloadFixture({
          action: 'list',
          viewAs: { role: 'member', premium: false },
        }),
      ),
    )
    fireEvent.change(
      within(screen.getByRole('complementary')).getByLabelText('View as'),
      { target: { value: 'basic-member' } },
    )
    await screen.findByText(/This view is restricted on purpose/)
    expect(signal?.aborted).toBe(true)
    await act(async () => {
      pending.resolve(responseFixture('ask', uiPayloadFixture('ask')))
      await pending.promise
    })
    expect(screen.queryByText('A supported claim with limits.')).toBeNull()
  })
})
