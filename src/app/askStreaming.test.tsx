// @vitest-environment jsdom
import { cleanup, fireEvent, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { askOnceFixture } from './askOnceFixture'
import { renderRouteFixture } from './renderRouteFixture'
import { uiLabelsFixture } from './uiLabelsFixture'
import { uiRuntimeFixture } from './uiRuntimeFixture'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

it('reports each phase of the answer as it arrives', async () => {
  const { requests } = await askOnceFixture()
  const progress = await screen.findByRole('list', { name: 'Answer progress' })
  expect(progress.textContent).toContain('Allowance debited')
  expect(progress.textContent).toContain('10 candidates ranked (hybrid)')
  expect(progress.textContent).toContain('6 passages selected')
  expect(progress.textContent).toContain('Rereading 6 citations')
  expect(requests.at(-1)).toHaveProperty('stream', true)
})

it('treats a stream that ends without a result as a protocol failure', async () => {
  vi.stubGlobal('scrollTo', vi.fn())
  const { runtime, fetcher } = uiRuntimeFixture()
  await renderRouteFixture('/app/ask', runtime)
  await screen.findByLabelText(uiLabelsFixture.scope)
  fetcher.mockResolvedValueOnce(
    new Response('event: stage\ndata: {"phase":"debited"}\n\n', {
      headers: { 'content-type': 'text/event-stream' },
    }),
  )
  fireEvent.click(screen.getByRole('button', { name: /What makes complex/ }))
  fireEvent.click(screen.getByRole('button', { name: /Ask the corpus/ }))
  expect(
    await screen.findByText(
      'The response failed validation. No unvalidated evidence is displayed.',
    ),
  ).toBeTruthy()
  expect(screen.queryByRole('region', { name: 'Answer' })).toBeNull()
})
