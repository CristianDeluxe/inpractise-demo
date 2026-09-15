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
import { askStreamFixture } from './askStreamFixture'
import { renderRouteFixture } from './renderRouteFixture'
import { responseFixture } from './responseFixture'
import { uiLabelsFixture } from './uiLabelsFixture'
import { uiPayloadFixture } from './uiPayloadFixture'
import { uiRuntimeFixture } from './uiRuntimeFixture'
import { viewAsFetcherFixture } from './viewAsFetcherFixture'
import { viewAsPayloadFixture } from './viewAsPayloadFixture'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('server-backed viewing mode', () => {
  it('requests the selected mode, clears old evidence, hides diagnostics and relists companies from server rows', async () => {
    vi.stubGlobal('scrollTo', vi.fn())
    const { runtime, fetcher, requests } = uiRuntimeFixture()
    viewAsFetcherFixture(fetcher, requests)
    await renderRouteFixture('/app', runtime)
    const companies = await screen.findByRole('region', { name: 'Companies' })
    expect(
      within(companies).getByRole('article', { name: 'Premium Company' }),
    ).toBeTruthy()
    expect(screen.getAllByRole('link', { name: 'Diagnostics' })).toHaveLength(2)
    fireEvent.change(
      within(screen.getByRole('complementary')).getByLabelText('View as'),
      { target: { value: 'basic-member' } },
    )
    expect(
      await screen.findByText(/This view is restricted on purpose/),
    ).toBeTruthy()
    await screen.findByRole('heading', { name: uiLabelsFixture.workspace })
    expect(screen.queryByRole('link', { name: 'Diagnostics' })).toBeNull()
    expect(screen.queryByText('Premium Company')).toBeNull()
    expect(
      within(screen.getByRole('region', { name: 'Companies' })).getAllByRole(
        'article',
      ),
    ).toHaveLength(1)
    expect(requests.slice(-2)).toEqual([
      { action: 'me', viewAs: { role: 'member', premium: false } },
      { action: 'list', viewAs: { role: 'member', premium: false } },
    ])
    fireEvent.change(
      within(screen.getByRole('complementary')).getByLabelText('View as'),
      { target: { value: 'member' } },
    )
    await screen.findByRole('heading', { name: uiLabelsFixture.workspace })
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
    await screen.findByRole('heading', { name: uiLabelsFixture.workspace })
    expect(requests.at(-1)).not.toHaveProperty('viewAs')
    expect(screen.getAllByRole('link', { name: 'Diagnostics' })).toHaveLength(2)
  })
  it('clears a delivered answer on the ask route when the viewing mode narrows', async () => {
    vi.stubGlobal('scrollTo', vi.fn())
    const { runtime, fetcher, requests } = uiRuntimeFixture()
    viewAsFetcherFixture(fetcher, requests)
    await renderRouteFixture('/app/ask', runtime)
    await screen.findByLabelText(uiLabelsFixture.scope)
    fireEvent.click(screen.getByRole('button', { name: /What makes complex/ }))
    fireEvent.click(screen.getByRole('button', { name: /Ask the corpus/ }))
    await screen.findByText('A supported claim with limits.')
    expect(requests.at(-1)).not.toHaveProperty('viewAs')
    fireEvent.change(
      within(screen.getByRole('complementary')).getByLabelText('View as'),
      { target: { value: 'basic-member' } },
    )
    await screen.findByText(/This view is restricted on purpose/)
    await waitFor(() => {
      expect(screen.queryByText('A supported claim with limits.')).toBeNull()
    })
    expect(requests.at(-1)).toHaveProperty('viewAs', {
      role: 'member',
      premium: false,
    })
  })
  it('never invents counts on the diagnostics page when the response has none', async () => {
    vi.stubGlobal('scrollTo', vi.fn())
    await renderRouteFixture('/inspect', uiRuntimeFixture().runtime)
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
    await renderRouteFixture('/app/ask', runtime)
    await screen.findByLabelText(uiLabelsFixture.scope)
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
      pending.resolve(askStreamFixture(uiPayloadFixture('ask')))
      await pending.promise
    })
    expect(screen.queryByText('A supported claim with limits.')).toBeNull()
  })
})
