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
describe('public demo routes', () => {
  it('renders the landing page without calling research', async () => {
    const { runtime, requests } = uiRuntimeFixture()
    await renderRouteFixture('/', runtime)
    expect(
      await screen.findByRole('heading', { name: /From the call/ }),
    ).toBeTruthy()
    expect(requests).toHaveLength(0)
  })
  it.each([
    ['/method', 'How quotes and sources are checked'],
    ['/connect', 'Tools'],
    ['/missing', 'Page unavailable'],
  ])('renders %s', async (path, title) => {
    await renderRouteFixture(path, null)
    expect(await screen.findByRole('heading', { name: title })).toBeTruthy()
  })
  it('keeps public pages available without browser configuration', async () => {
    await renderRouteFixture('/app', null)
    expect(
      await screen.findByText('Workspace configuration required'),
    ).toBeTruthy()
  })
  it('has password sign-in only and validates access after login', async () => {
    const { runtime, requests } = uiRuntimeFixture()
    await renderRouteFixture('/login', runtime)
    fireEvent.change(await screen.findByLabelText('Email'), {
      target: { value: 'demo@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'test-password' },
    })
    fireEvent.click(screen.getByRole('button', { name: /Sign in/ }))
    expect(
      await screen.findByRole('heading', { name: uiLabelsFixture.workspace }),
    ).toBeTruthy()
    expect(requests[0]?.['action']).toBe('me')
    expect(screen.queryByText('Request access')).toBeNull()
  })
})
