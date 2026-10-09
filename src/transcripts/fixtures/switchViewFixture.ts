import { renderHook } from '@testing-library/react'
import { vi } from 'vitest'
import { useViewAnchor } from '../hooks/useViewAnchor'
import type { ParagraphRow } from './ParagraphRow'
import { paragraphListFixture } from './paragraphListFixture'
import { toolbarFixture } from './toolbarFixture'
import { workspaceViewFixture } from './workspaceViewFixture'

/**
 * Reads at paragraph "b" (start 30, 20px below a toolbar ending at 100), switches
 * to Track changes, lays the list out as `after` and returns the scroll spy.
 */
export function switchViewFixture(after: readonly ParagraphRow[]) {
  const scroll = vi.spyOn(window, 'scrollBy').mockImplementation(() => {})
  const list = {
    current: paragraphListFixture([
      { id: 'a', start: 0, top: -300, height: 200 },
      { id: 'b', start: 30, top: 120, height: 200 },
      { id: 'c', start: 60, top: 340, height: 200 },
    ]),
  }
  const toolbarRef = { current: toolbarFixture(100) }
  const { result, rerender } = renderHook(
    (view: ReturnType<typeof workspaceViewFixture>) =>
      useViewAnchor({ listRef: list, toolbarRef, view }),
    { initialProps: workspaceViewFixture('final') },
  )
  result.current.setMode('inline')
  list.current = paragraphListFixture(after)
  rerender(workspaceViewFixture('inline'))
  return scroll
}
