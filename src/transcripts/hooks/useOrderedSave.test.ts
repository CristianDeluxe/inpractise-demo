// @vitest-environment jsdom
import { act, renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { ReviewDecision } from '../contracts/ReviewDecision'
import { heldSaver } from '../fixtures/heldSaver'
import { useOrderedSave } from './useOrderedSave'

describe('useOrderedSave', () => {
  it('waits for a slow save, then sends every decision in the next one', async () => {
    const { save, sent, releases } = heldSaver()
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
    const { result } = renderHook(() => useOrderedSave('demo', latest, save))
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
      expect(sent).toHaveLength(1)
    })
    expect(result.current.saveState).toBe('saving')
    releases[0]?.()
    await waitFor(() => {
      expect(sent).toHaveLength(2)
    })
    expect(sent[1]).toEqual([first, second])
    releases[1]?.()
    await act(async () => {
      await last
    })
    expect(result.current.saveState).toBe('saved')
  })

  it('sends nothing without a saver', async () => {
    const latest = { current: new Map<string, ReviewDecision>() }
    const { result } = renderHook(() => useOrderedSave('demo', latest, null))
    await act(async () => {
      await result.current.save()
    })
    expect(result.current.saveState).toBe('idle')
  })

  it('reports a failed save', async () => {
    const latest = { current: new Map<string, ReviewDecision>() }
    const { result } = renderHook(() =>
      useOrderedSave('demo', latest, async () =>
        Promise.reject(new Error('no')),
      ),
    )
    await act(async () => {
      await result.current.save()
    })
    expect(result.current.saveState).toBe('error')
  })
})
