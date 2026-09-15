// @vitest-environment jsdom
import { citationFixture } from '@/api/citationFixture'
import { suggestedQuestions } from '@/research/suggestedQuestions'
import { cleanup, fireEvent, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
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

it('answers a starter question inside the bubble and cites its passage', async () => {
  const { runtime, requests } = uiRuntimeFixture()
  await renderRouteFixture('/app', runtime)
  await screen.findByRole('heading', { name: uiLabelsFixture.workspace })
  fireEvent.click(screen.getByRole('button', { name: 'Ask IP' }))
  const starter = suggestedQuestions[0] ?? ''
  fireEvent.click(await screen.findByRole('button', { name: starter }))
  fireEvent.click(screen.getByRole('button', { name: 'Ask the corpus' }))
  const transcript = await screen.findByRole('list', {
    name: 'Questions and answers',
  })
  expect(
    await within(transcript).findByText('A supported claim with limits.'),
  ).toBeTruthy()
  expect(within(transcript).getByText(starter)).toBeTruthy()
  expect(
    within(transcript)
      .getByRole('link', { name: `${citationFixture().company}, passage p-1` })
      .getAttribute('href'),
  ).toBe(citationFixture().readerPath)
  expect(requests.at(-1)).toMatchObject({ action: 'ask', stream: true })
  expect(requests.at(-1)?.['company']).toBeUndefined()
})

it('keeps the failed question on screen with the reason it failed', async () => {
  const { runtime, fetcher } = uiRuntimeFixture()
  await renderRouteFixture('/app', runtime)
  await screen.findByRole('heading', { name: uiLabelsFixture.workspace })
  fireEvent.click(screen.getByRole('button', { name: 'Ask IP' }))
  fetcher.mockRejectedValueOnce(new TypeError('Network down'))
  fireEvent.change(await screen.findByLabelText(uiLabelsFixture.question), {
    target: { value: 'What did the operator say about migrations?' },
  })
  fireEvent.click(screen.getByRole('button', { name: 'Ask the corpus' }))
  expect(await screen.findByRole('alert')).toBeTruthy()
  expect(
    screen.getByText('What did the operator say about migrations?'),
  ).toBeTruthy()
})
