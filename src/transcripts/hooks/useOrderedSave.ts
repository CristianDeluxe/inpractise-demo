import { useCallback, useRef, useState, type RefObject } from 'react'
import type { ReviewSaver } from '../api/ReviewSaver'
import type { ReviewDecision } from '../contracts/ReviewDecision'
import { runAfter } from '../review/runAfter'
import { saveOutcome } from '../review/saveOutcome'
import type { SaveState } from './SaveState'

/**
 * Saves run one at a time and each sends the newest decisions, so a slow
 * earlier write can never land after a later one and erase what it added.
 * Only the latest save reports its outcome. Without a saver nothing is sent.
 */
export function useOrderedSave(
  transcriptId: string,
  latest: RefObject<ReadonlyMap<string, ReviewDecision>>,
  onSave: ReviewSaver | null,
) {
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const queue = useRef<Promise<void>>(Promise.resolve())
  const ticket = useRef(0)
  const save = useCallback(async () => {
    if (onSave === null) return
    ticket.current += 1
    const mine = ticket.current
    setSaveState('saving')
    queue.current = runAfter(queue.current, async () => {
      const outcome = await saveOutcome(onSave, transcriptId, [
        ...latest.current.values(),
      ])
      if (mine === ticket.current) setSaveState(outcome)
    })
    await queue.current
  }, [latest, onSave, transcriptId])
  return { save, saveState }
}
