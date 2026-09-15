// @vitest-environment jsdom
import { cleanup, fireEvent, screen } from '@testing-library/react'
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

it('opens Ask from the workspace without leaving the page', async () => {
  const { runtime } = uiRuntimeFixture()
  await renderRouteFixture('/app', runtime)
  await screen.findByRole('heading', { name: uiLabelsFixture.workspace })
  fireEvent.click(screen.getByRole('button', { name: 'Ask IP' }))
  const panel = await screen.findByRole('dialog')
  expect(
    screen.getByRole('heading', { name: uiLabelsFixture.workspace }),
  ).toBeTruthy()
  expect(panel.textContent).toContain('Ask IP')
  expect(screen.getByLabelText(uiLabelsFixture.question)).toBeTruthy()
})

it('leaves the bubble off the Ask page itself', async () => {
  const { runtime } = uiRuntimeFixture()
  await renderRouteFixture('/app/ask', runtime)
  await screen.findByLabelText(uiLabelsFixture.scope)
  expect(screen.queryByRole('button', { name: 'Ask IP' })).toBeNull()
})
