// @vitest-environment jsdom
import { cleanup, fireEvent, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { renderRouteFixture } from './renderRouteFixture'
import { uiRuntimeFixture } from './uiRuntimeFixture'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('restored interview library', () => {
  it('selects tabs with the keyboard, wraps focus, and opens only the real workspace', async () => {
    const { runtime, requests } = uiRuntimeFixture()
    vi.stubGlobal('scrollTo', vi.fn())
    renderRouteFixture('/', runtime)
    const first = await screen.findByRole('tab', {
      name: 'In Practise content',
    })
    const partner = screen.getByRole('tab', { name: 'Partner interviews' })
    expect(first.getAttribute('aria-selected')).toBe('true')
    expect(partner.tabIndex).toBe(-1)
    expect(
      within(screen.getByRole('tabpanel')).getByText(
        'Former implementation lead',
      ),
    ).toBeTruthy()
    fireEvent.keyDown(first, { key: 'ArrowRight' })
    expect(partner.matches(':focus')).toBe(true)
    expect(partner.getAttribute('aria-selected')).toBe('true')
    expect(
      within(screen.getByRole('tabpanel')).getByText(
        'Former regional sales director',
      ),
    ).toBeTruthy()
    expect(screen.getByRole('tabpanel').id).toBe(
      partner.getAttribute('aria-controls'),
    )
    fireEvent.keyDown(partner, { key: 'ArrowRight' })
    expect(first.matches(':focus')).toBe(true)
    fireEvent.keyDown(first, { key: 'ArrowLeft' })
    expect(partner.matches(':focus')).toBe(true)
    fireEvent.keyDown(partner, { key: 'Home' })
    expect(first.matches(':focus')).toBe(true)
    fireEvent.keyDown(first, { key: 'End' })
    expect(partner.matches(':focus')).toBe(true)
    fireEvent.keyDown(partner, { key: 'ArrowDown' })
    expect(partner.matches(':focus')).toBe(true)
    fireEvent.click(first)
    expect(first.getAttribute('aria-selected')).toBe('true')
    for (const link of within(screen.getByRole('tabpanel')).getAllByRole(
      'link',
    )) {
      expect(link.getAttribute('href')).toBe('/app')
      expect(link.getAttribute('aria-describedby')).toBe('library-destination')
    }
    expect(requests).toHaveLength(0)
  })
  it('closes the mobile navigation after choosing a real route and restores trigger focus', async () => {
    vi.stubGlobal('scrollTo', vi.fn())
    renderRouteFixture('/', null)
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
