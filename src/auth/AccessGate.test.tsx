// @vitest-environment jsdom
import { renderRouteFixture } from '@/app/renderRouteFixture'
import { uiRuntimeFixture } from '@/app/uiRuntimeFixture'
import { cleanup, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

beforeEach(() => {
  vi.stubGlobal('scrollTo', vi.fn())
})
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('AccessGate', () => {
  it('holds the workspace frame while access is being confirmed', async () => {
    const { runtime, fetcher } = uiRuntimeFixture()
    fetcher.mockImplementation(async () => new Promise<Response>(() => {}))
    await renderRouteFixture('/app', runtime)

    await screen.findByRole('status', { name: 'Confirming workspace access' })
    expect(
      screen.queryByRole('heading', { name: 'Workspace access' }),
    ).toBeNull()
  })
})
