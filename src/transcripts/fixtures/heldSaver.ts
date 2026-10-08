import { vi } from 'vitest'
import type { ReviewSaver } from '../api/ReviewSaver'
import type { ReviewDecision } from '../contracts/ReviewDecision'

/** A saver whose every call waits until the test releases it; records what each call carried. */
export function heldSaver() {
  const sent: (readonly ReviewDecision[])[] = []
  const releases: (() => void)[] = []
  const save = vi.fn<ReviewSaver>(async (_id, decisions) => {
    sent.push(decisions)
    await new Promise<void>((resolve) => {
      releases.push(resolve)
    })
  })
  return { save, sent, releases }
}
