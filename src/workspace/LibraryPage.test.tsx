// @vitest-environment jsdom
import { renderRouteFixture } from '@/app/renderRouteFixture'
import { uiLabelsFixture } from '@/app/uiLabelsFixture'
import { uiRuntimeFixture } from '@/app/uiRuntimeFixture'
import { cleanup, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

it('reaches the source library on its own route', async () => {
  vi.stubGlobal('scrollTo', vi.fn())
  await renderRouteFixture('/app/library', uiRuntimeFixture().runtime)
  expect(
    await screen.findByRole('heading', { name: uiLabelsFixture.library }),
  ).toBeTruthy()
})
