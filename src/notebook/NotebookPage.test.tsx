// @vitest-environment jsdom
import { renderRouteFixture } from '@/app/renderRouteFixture'
import { uiRuntimeFixture } from '@/app/uiRuntimeFixture'
import {
  cleanup,
  fireEvent,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('NotebookPage', () => {
  it('groups notes by company, links the exact passage and deletes by id', async () => {
    vi.stubGlobal('scrollTo', vi.fn())
    const { runtime, requests } = uiRuntimeFixture()
    await renderRouteFixture('/app/notes', runtime)
    expect(
      await screen.findByRole('heading', { name: 'Your saved citations' }),
    ).toBeTruthy()
    const northstar = await screen.findByRole('region', { name: 'Northstar' })
    expect(within(northstar).getByText('Switching cost argument.')).toBeTruthy()
    expect(
      within(northstar)
        .getByRole('link', { name: /Open exact passage/ })
        .getAttribute('href'),
    ).toBe('/read/northstar/rev-1/p-1')
    const hidden = screen.getByRole('region', {
      name: 'Evidence not readable in this view',
    })
    expect(within(hidden).queryByRole('link')).toBeNull()
    expect(screen.getAllByLabelText('2 saved notes').length).toBeGreaterThan(0)
    fireEvent.click(
      within(northstar).getByRole('button', { name: 'Delete note' }),
    )
    await waitFor(() => {
      expect(
        requests.some(
          (request) =>
            request['action'] === 'note_delete' &&
            request['noteId'] === '00000000-0000-4000-8000-000000000001',
        ),
      ).toBe(true)
    })
    await waitFor(() => {
      expect(screen.getAllByLabelText('1 saved notes').length).toBeGreaterThan(
        0,
      )
    })
  })
})
