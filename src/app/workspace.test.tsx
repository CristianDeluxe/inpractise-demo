// @vitest-environment jsdom
import { citationFixture } from '@/api/citationFixture'
import {
  cleanup,
  fireEvent,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { diagnosticsFixture } from './diagnosticsFixture'
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
describe('authorized research workflow', () => {
  it('requires explicit submit, preserves company scope and opens exact evidence', async () => {
    const { runtime, requests, signOut } = uiRuntimeFixture()
    await renderRouteFixture('/app/ask', runtime)
    await screen.findByLabelText(uiLabelsFixture.scope)
    expect(requests.map((request) => request['action'])).toEqual(['me', 'list'])
    expect(
      screen.getByLabelText<HTMLSelectElement>('Company scope').value,
    ).toBe('')
    fireEvent.click(screen.getByRole('button', { name: /What makes complex/ }))
    expect(requests).toHaveLength(2)
    fireEvent.click(screen.getByRole('button', { name: /Ask the corpus/ }))
    expect(
      await screen.findByText('A supported claim with limits.'),
    ).toBeTruthy()
    expect(
      screen.getByRole('heading', { name: 'Partly answered' }),
    ).toBeTruthy()
    expect(requests.at(-1)?.['company']).toBeUndefined()
    fireEvent.click(screen.getByRole('button', { name: 'Inspect source' }))
    expect(
      await screen.findByText('Retained historical revision', { exact: false }),
    ).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Close source' }))
    fireEvent.change(screen.getByLabelText('Company scope'), {
      target: { value: citationFixture().company },
    })
    expect(screen.queryByText('A supported claim with limits.')).toBeNull()
    fireEvent.click(screen.getByLabelText('Passage search'))
    fireEvent.change(screen.getByLabelText('Search query'), {
      target: { value: 'migration' },
    })
    fireEvent.click(screen.getByRole('button', { name: /Search passages/ }))
    expect(
      await screen.findByRole('heading', { name: 'Ranked passages' }),
    ).toBeTruthy()
    expect(requests.at(-1)?.['company']).toBe(citationFixture().company)
    expect(
      screen
        .getByRole('link', {
          name: `Open exact passage ${citationFixture().citationId}`,
        })
        .getAttribute('href'),
    ).toBe(citationFixture().readerPath)
    fireEvent.click(
      within(screen.getByRole('complementary')).getByRole('button', {
        name: 'Sign out',
      }),
    )
    await waitFor(() => {
      expect(screen.queryByText('Ranked passages')).toBeNull()
    })
    expect(signOut).toHaveBeenCalled()
  })
  it('reads a deep link without substituting the current revision', async () => {
    const { runtime, requests } = uiRuntimeFixture()
    await renderRouteFixture(citationFixture().readerPath, runtime)
    expect(
      await screen.findByText('Retained historical revision', { exact: false }),
    ).toBeTruthy()
    expect(requests.at(-1)?.['revisionId']).toBe(citationFixture().revisionId)
    fireEvent.click(screen.getByRole('button', { name: 'Adjacent passage P3' }))
    await waitFor(() => {
      expect(requests.at(-1)?.['passageId']).toBe('P3')
    })
    expect(await screen.findByText(/response failed validation/)).toBeTruthy()
  })
  it('shows real scoped counts and an unavailable evaluation report', async () => {
    const { runtime, requests } = uiRuntimeFixture()
    await renderRouteFixture('/inspect', runtime)
    expect(
      await screen.findByRole('heading', {
        name: 'No reviewed evaluation report',
      }),
    ).toBeTruthy()
    expect(requests.map((request) => request['action'])).toEqual([
      'me',
      'debug',
    ])
    expect(screen.getByText(/Diagnosis: unclassified/)).toBeTruthy()
  })
  it('never mounts evidence children when membership is denied', async () => {
    const { runtime, requests, fetcher } = uiRuntimeFixture()
    fetcher.mockResolvedValue(
      new Response(
        JSON.stringify({
          error: { code: 'forbidden', message: 'Denied', retryable: false },
          requestId: 'denied',
        }),
        { status: 403 },
      ),
    )
    await renderRouteFixture('/app', runtime)
    expect(await screen.findByText(/Access denied/)).toBeTruthy()
    expect(requests).toHaveLength(0)
    expect(fetcher).toHaveBeenCalledTimes(1)
    expect(screen.queryByText(uiLabelsFixture.workspace)).toBeNull()
  })
  it('displays retrieval diagnostics when present in answer', async () => {
    const { runtime } = uiRuntimeFixture()
    await renderRouteFixture('/app/ask', runtime)
    await screen.findByLabelText(uiLabelsFixture.scope)
    fireEvent.click(screen.getByRole('button', { name: /What makes complex/ }))
    fireEvent.click(screen.getByRole('button', { name: /Ask the corpus/ }))
    expect(
      await screen.findByText('A supported claim with limits.'),
    ).toBeTruthy()
    expect(
      screen.getByRole('heading', { name: 'Retrieval diagnostics' }),
    ).toBeTruthy()
    const dropped = diagnosticsFixture.candidateAt10.filter(
      (candidateId) => !diagnosticsFixture.selectedIds.includes(candidateId),
    )
    expect(screen.getAllByText('selected')).toHaveLength(
      diagnosticsFixture.selectedIds.length,
    )
    expect(screen.getAllByText('dropped')).toHaveLength(dropped.length)
    expect(screen.getByText(dropped[0] ?? '')).toBeTruthy()
  })
})
