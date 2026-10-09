// @vitest-environment jsdom
import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { FocusScrollProps } from '../fixtures/FocusScrollProps'
import type { ReviewFocus } from '../review/ReviewFocus'
import { scrollFocusIntoView } from '../review/scrollFocusIntoView'
import { useScrollToFocus } from './useScrollToFocus'

vi.mock('../review/scrollFocusIntoView', () => ({
  scrollFocusIntoView: vi.fn(),
}))

afterEach(() => {
  vi.clearAllMocks()
})

describe('useScrollToFocus', () => {
  const first: ReviewFocus = { paragraphId: 'p1', editId: 'e1' }
  const second: ReviewFocus = { paragraphId: 'p2', editId: 'e2' }
  const renderFocus = (viewKey: string) =>
    renderHook(
      (props: FocusScrollProps) => {
        useScrollToFocus(props.focus, props.viewKey)
      },
      { initialProps: { focus: first, viewKey } },
    )

  it('scrolls when the focus moves within a view, as j and k do', () => {
    const { rerender } = renderFocus('inline:all')
    rerender({ focus: second, viewKey: 'inline:all' })
    expect(scrollFocusIntoView).toHaveBeenLastCalledWith(second)
  })

  it('skips the commit that switches view even when the focus changes with it', () => {
    const { rerender } = renderFocus('inline:all')
    vi.mocked(scrollFocusIntoView).mockClear()
    rerender({ focus: second, viewKey: 'spotcheck:all' })
    expect(scrollFocusIntoView).not.toHaveBeenCalled()
    rerender({ focus: first, viewKey: 'spotcheck:all' })
    expect(scrollFocusIntoView).toHaveBeenCalledTimes(1)
  })
})
