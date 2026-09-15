// @vitest-environment jsdom
import { cleanup, fireEvent, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { renderRouteFixture } from './renderRouteFixture'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('public site navigation', () => {
  it('closes the mobile navigation after choosing a real route and restores trigger focus', async () => {
    vi.stubGlobal('scrollTo', vi.fn())
    await renderRouteFixture('/', null)
    const trigger = await screen.findByRole('button', { name: 'Open menu' })
    fireEvent.click(trigger)
    const menu = await screen.findByRole('dialog', { name: 'In Practise' })
    fireEvent.click(within(menu).getByRole('link', { name: 'Standards' }))
    expect(
      await screen.findByRole('heading', { name: 'How we handle evidence' }),
    ).toBeTruthy()
    expect(screen.queryByRole('dialog')).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))
    fireEvent.click(screen.getByRole('button', { name: 'Close menu' }))
    expect(screen.queryByRole('dialog')).toBeNull()
  })
})
