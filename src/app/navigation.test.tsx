// @vitest-environment jsdom
import { cleanup, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mixedLibraryRuntimeFixture } from './mixedLibraryRuntimeFixture'
import { renderRouteFixture } from './renderRouteFixture'
import { sidebarGroupFixture } from './sidebarGroupFixture'

beforeEach(() => {
  vi.stubGlobal('scrollTo', vi.fn())
})
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('workspace navigation', () => {
  it('groups links into research, production and a collapsed engineering section', async () => {
    const { runtime } = mixedLibraryRuntimeFixture('reviewer')
    await renderRouteFixture('/app', runtime)
    const research = await sidebarGroupFixture('Research')
    expect(
      within(research)
        .getAllByRole('link')
        .map((link) => link.getAttribute('href')),
    ).toEqual(['/app', '/app/ask', '/app/notes'])
    const production = await sidebarGroupFixture('Production')
    expect(
      within(production)
        .getAllByRole('link')
        .map((link) => link.getAttribute('href')),
    ).toEqual(['/app/transcripts', '/app/memory', '/app/cost'])
    const engineering = await sidebarGroupFixture('Engineering')
    expect(engineering.open).toBe(false)
    expect(
      within(engineering)
        .getAllByRole('link')
        .map((link) => link.getAttribute('href')),
    ).toEqual(['/inspect', '/app/standards'])
  })
  it('shows diagnostics to reviewers only', async () => {
    const { runtime } = mixedLibraryRuntimeFixture('member')
    await renderRouteFixture('/app', runtime)
    const engineering = await sidebarGroupFixture('Engineering')
    expect(
      within(engineering).queryByRole('link', { name: 'Diagnostics' }),
    ).toBeNull()
    expect(
      within(engineering).getByRole('link', { name: 'How quotes are checked' }),
    ).toBeTruthy()
  })
  it('links to no removed route and no longer serves one', async () => {
    const { runtime } = mixedLibraryRuntimeFixture('reviewer')
    await renderRouteFixture('/app', runtime)
    await screen.findByRole('region', { name: 'Interviews' })
    const targets = screen
      .getAllByRole('link')
      .map((link) => link.getAttribute('href') ?? '')
    expect(targets.filter((href) => href.startsWith('/app/library'))).toEqual(
      [],
    )
    expect(targets.filter((href) => href.startsWith('/app/compare'))).toEqual(
      [],
    )
    expect(targets.filter((href) => href.startsWith('/app/companies'))).toEqual(
      [],
    )
    cleanup()
    await renderRouteFixture('/app/library', runtime)
    expect(await screen.findByText(/not found/i)).toBeTruthy()
  })
})
