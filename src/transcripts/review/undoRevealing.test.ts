import { describe, expect, it, vi } from 'vitest'
import { undoRevealing } from './undoRevealing'

describe('undoRevealing', () => {
  it('leaves the Flagged filter when an edit is reverted', () => {
    const setFilter = vi.fn()
    const undo = undoRevealing(() => 'e2', { filter: 'deferred', setFilter })
    expect(undo()).toBe('e2')
    expect(setFilter).toHaveBeenCalledWith('all')
  })

  it('keeps any other filter', () => {
    const setFilter = vi.fn()
    undoRevealing(() => 'e2', { filter: 'attention', setFilter })()
    expect(setFilter).not.toHaveBeenCalled()
  })

  it('keeps the filter when there is nothing to undo', () => {
    const setFilter = vi.fn()
    expect(undoRevealing(() => null, { filter: 'deferred', setFilter })()).toBe(
      null,
    )
    expect(setFilter).not.toHaveBeenCalled()
  })
})
