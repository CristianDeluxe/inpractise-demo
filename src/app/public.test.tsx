// @vitest-environment jsdom
import { cleanup, fireEvent, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { renderRouteFixture } from './renderRouteFixture'
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
  it('opens a labelled curated source without calling research', async () => {
    const { runtime, requests } = uiRuntimeFixture()
    renderRouteFixture('/', runtime)
    expect(
      await screen.findByRole('heading', { name: /Executive insight/ }),
    ).toBeTruthy()
    fireEvent.click(
      screen.getAllByRole('button', { name: /Open source passage/ })[0] ??
        document.body,
    )
    expect(await screen.findByRole('dialog')).toBeTruthy()
    expect(
      screen.getByText(/I did not measure customer retention/),
    ).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Close source' }))
    expect(requests).toHaveLength(0)
    expect(screen.queryByText('Since 2019')).toBeNull()
  })
  it.each([
    ['/method', 'How we handle evidence'],
    ['/connect', 'Tools'],
    ['/missing', 'Page unavailable'],
  ])('renders %s', async (path, title) => {
    renderRouteFixture(path, null)
    expect(await screen.findByRole('heading', { name: title })).toBeTruthy()
  })
  it('keeps public pages available without browser configuration', async () => {
    renderRouteFixture('/app', null)
    expect(
      await screen.findByText('Workspace configuration required'),
    ).toBeTruthy()
  })
  it('has password sign-in only and validates access after login', async () => {
    const { runtime, requests } = uiRuntimeFixture()
    renderRouteFixture('/login', runtime)
    fireEvent.change(await screen.findByLabelText('Email'), {
      target: { value: 'demo@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'test-password' },
    })
    fireEvent.click(screen.getByRole('button', { name: /Sign in/ }))
    expect(
      await screen.findByRole('heading', { name: 'Source library' }),
    ).toBeTruthy()
    expect(requests[0]?.['action']).toBe('me')
    expect(screen.queryByText('Request access')).toBeNull()
  })
})
