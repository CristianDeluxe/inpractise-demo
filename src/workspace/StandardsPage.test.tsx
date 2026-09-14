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

describe('workspace standards', () => {
  it('keeps the workspace navigation while the standards are read', async () => {
    const { runtime } = uiRuntimeFixture()
    await renderRouteFixture('/app/standards', runtime)

    await screen.findByRole('heading', { name: 'How we handle evidence' })
    expect(
      screen.getAllByRole('navigation', { name: 'Workspace' }).length,
    ).toBeGreaterThan(0)
  })
})
