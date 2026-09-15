// @vitest-environment jsdom
import { buildStats } from '@/public/buildStats'
import { buildTimelineThemes } from '@/public/buildTimelineThemes'
import { gateContent } from '@/public/gateContent'
import { cleanup, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { renderRouteFixture } from './renderRouteFixture'

beforeEach(() => {
  vi.stubGlobal('scrollTo', vi.fn())
})
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})
describe('the built-with-agents page', () => {
  it('renders the commit-derived timeline with a theme for every half-day', async () => {
    await renderRouteFixture('/built', null)
    expect(
      await screen.findByRole('heading', { name: 'Built with agents' }),
    ).toBeTruthy()
    expect(screen.getByText(String(buildStats.commitCount))).toBeTruthy()
    for (const halfDay of buildStats.halfDays) {
      expect(screen.getByRole('heading', { name: halfDay.label })).toBeTruthy()
      expect(screen.getByText(buildTimelineThemes[halfDay.key])).toBeTruthy()
    }
  })
  it('names the command behind every gate', async () => {
    await renderRouteFixture('/built', null)
    await screen.findByRole('heading', {
      name: 'The gates every change passes',
    })
    for (const gate of gateContent) {
      expect(screen.getByText(gate.command)).toBeTruthy()
    }
    expect(
      screen.getByRole('link', { name: 'section 2 of the execution plan' }),
    ).toBeTruthy()
  })
})
