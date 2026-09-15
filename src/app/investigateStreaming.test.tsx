// @vitest-environment jsdom
import { cleanup, fireEvent, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
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

describe('the investigate mode', () => {
  it('reports the bounded loop as it runs and shows the sub-question breakdown', async () => {
    const { runtime, requests } = uiRuntimeFixture()
    await renderRouteFixture('/app/ask', runtime)
    await screen.findByLabelText(uiLabelsFixture.scope)
    fireEvent.click(screen.getByLabelText('Investigate'))
    fireEvent.change(screen.getByLabelText(uiLabelsFixture.question), {
      target: { value: 'What does the corpus establish about northstar?' },
    })
    fireEvent.click(screen.getByRole('button', { name: /Investigate/ }))
    const trace = await screen.findByRole('list', {
      name: 'Investigation progress',
    })
    expect(trace.textContent).toContain('Allowance debited')
    expect(trace.textContent).toContain('Planned 2 sub-questions')
    expect(trace.textContent).toContain('Step 1: 4 of 12 candidates kept')
    expect(trace.textContent).toContain('Step 2 reformulated')
    expect(trace.textContent).toContain('Synthesising from 5 passages')
    expect(
      await screen.findByRole('heading', { name: 'Answered from the corpus' }),
    ).toBeTruthy()
    const breakdown = screen.getByRole('list', { name: 'Sub-questions' })
    expect(breakdown.textContent).toContain(
      'What did northstar say about pricing?',
    )
    expect(requests.at(-1)).toHaveProperty('action', 'investigate')
    expect(requests.at(-1)).toHaveProperty('stream', true)
  })
  it('treats a stream that ends without a result as a protocol failure', async () => {
    const { runtime, fetcher } = uiRuntimeFixture()
    await renderRouteFixture('/app/ask', runtime)
    await screen.findByLabelText(uiLabelsFixture.scope)
    fireEvent.click(screen.getByLabelText('Investigate'))
    fetcher.mockResolvedValueOnce(
      new Response(
        'event: stage\ndata: {"phase":"debited","elapsedMs":1}\n\n',
        {
          headers: { 'content-type': 'text/event-stream' },
        },
      ),
    )
    fireEvent.change(screen.getByLabelText(uiLabelsFixture.question), {
      target: { value: 'What does the corpus establish about northstar?' },
    })
    fireEvent.click(screen.getByRole('button', { name: /Investigate/ }))
    expect(
      await screen.findByText(
        'The response failed validation. No unvalidated evidence is displayed.',
      ),
    ).toBeTruthy()
    expect(
      screen.queryByRole('region', { name: 'Investigation result' }),
    ).toBeNull()
  })
})
