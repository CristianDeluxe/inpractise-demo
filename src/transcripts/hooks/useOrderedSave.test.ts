// @vitest-environment jsdom
import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { ReviewDecision } from '../contracts/ReviewDecision'
import { heldFetch } from '../fixtures/heldFetch'
import { useOrderedSave } from './useOrderedSave'

describe('useOrderedSave', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('waits for a slow save, then sends every decision in the next one', async () => {
    const { bodies, releases } = heldFetch()
    const first: ReviewDecision = {
      editId: 'e1',
      verdict: 'accepted',
      decidedAt: 'T1',
    }
    const second: ReviewDecision = {
      editId: 'e2',
      verdict: 'rejected',
      decidedAt: 'T2',
    }
    const latest = { current: new Map([['e1', first]]) }
    const { result } = renderHook(() => useOrderedSave('demo', latest))
    act(() => {
      void result.current.save()
    })
    latest.current = new Map([
      ['e1', first],
      ['e2', second],
    ])
    let last: Promise<void> = Promise.resolve()
    act(() => {
      last = result.current.save()
    })
    await waitFor(() => {
      expect(bodies).toHaveLength(1)
    })
    expect(result.current.saveState).toBe('saving')
    releases[0]?.()
    await waitFor(() => {
      expect(bodies).toHaveLength(2)
    })
    expect(JSON.parse(bodies[1] ?? '[]')).toEqual([first, second])
    releases[1]?.()
    await act(async () => {
      await last
    })
    expect(result.current.saveState).toBe('saved')
  })
})
