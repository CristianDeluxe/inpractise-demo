// @vitest-environment jsdom
import { workspaceRoute } from '@/routes/workspaceRoute'
import { act, cleanup, screen, waitFor } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { observeCompletionFixture } from './observeCompletionFixture'
import { renderRouteFixture } from './renderRouteFixture'
import { uiLabelsFixture } from './uiLabelsFixture'
import { uiRuntimeFixture } from './uiRuntimeFixture'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

it('keeps route setup pending until its lazy component has loaded', async () => {
  vi.stubGlobal('scrollTo', vi.fn())
  const component = workspaceRoute.options.component
  if (!component?.preload) throw new Error('Expected a lazy workspace route')
  const originalPreload = component.preload
  const pending = Promise.withResolvers<undefined>()
  const preload = vi
    .spyOn(component, 'preload')
    .mockImplementation(async () => {
      await pending.promise
      await originalPreload()
    })
  const { runtime, fetcher } = uiRuntimeFixture()
  const completed = vi.fn()
  const rendering = observeCompletionFixture(
    renderRouteFixture('/app', runtime),
    completed,
  )
  try {
    await waitFor(() => {
      expect(preload).toHaveBeenCalled()
    })
    expect(completed).not.toHaveBeenCalled()
    expect(fetcher).not.toHaveBeenCalled()
  } finally {
    await act(async () => {
      pending.resolve(undefined)
      await preload.mock.results[0]?.value
      await rendering
    })
  }
  expect(
    await screen.findByRole('heading', { name: uiLabelsFixture.library }),
  ).toBeTruthy()
})
