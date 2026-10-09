// @vitest-environment jsdom
import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { paragraphListFixture } from '../fixtures/paragraphListFixture'
import { switchViewFixture } from '../fixtures/switchViewFixture'
import { toolbarFixture } from '../fixtures/toolbarFixture'
import { workspaceViewFixture } from '../fixtures/workspaceViewFixture'
import { useViewAnchor } from './useViewAnchor'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('useViewAnchor', () => {
  it('scrolls by the drift of the same paragraph so it keeps its offset', () => {
    const scroll = switchViewFixture([
      { id: 'a', start: 0, top: -50, height: 100 },
      { id: 'b', start: 30, top: 180, height: 300 },
    ])
    expect(scroll).toHaveBeenCalledWith({ top: 60, behavior: 'instant' })
  })

  it('does not scroll when the paragraph stays where it was', () => {
    const scroll = switchViewFixture([
      { id: 'b', start: 30, top: 120, height: 90 },
    ])
    expect(scroll).not.toHaveBeenCalled()
  })

  it('falls back to the nearest paragraph in time when the anchor is filtered out', () => {
    const scroll = switchViewFixture([
      { id: 'x', start: 0, top: 900, height: 100 },
      { id: 'c', start: 40, top: 500, height: 100 },
    ])
    expect(scroll).toHaveBeenCalledWith({ top: 380, behavior: 'instant' })
  })

  it('leaves the scroll alone when the new view renders nothing', () => {
    expect(switchViewFixture([])).not.toHaveBeenCalled()
  })

  it('ignores a request to switch to the view already shown', () => {
    const scroll = vi.spyOn(window, 'scrollBy').mockImplementation(() => {})
    const view = workspaceViewFixture('final')
    const { result } = renderHook(() =>
      useViewAnchor({
        listRef: { current: paragraphListFixture([]) },
        toolbarRef: { current: toolbarFixture(100) },
        view,
      }),
    )
    result.current.setMode('final')
    expect(view.setMode).not.toHaveBeenCalled()
    expect(scroll).not.toHaveBeenCalled()
  })
})
