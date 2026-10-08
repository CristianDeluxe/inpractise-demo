import { useCallback, useRef, useState, type RefObject } from 'react'
import type { ReviewDecision } from '../contracts/ReviewDecision'
import { runAfter } from '../review/runAfter'
import { saveOutcome } from '../review/saveOutcome'
import type { SaveState } from './SaveState'

/**
 * Saves run one at a time and each sends the newest decisions, so a slow
 * earlier PUT can never land after a later one and erase what it added. Only
 * the latest save reports its outcome.
 */
export function useOrderedSave(
  transcriptId: string,
  latest: RefObject<ReadonlyMap<string, ReviewDecision>>,
) {
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const queue = useRef<Promise<void>>(Promise.resolve())
  const ticket = useRef(0)
  const save = useCallback(async () => {
    ticket.current += 1
    const mine = ticket.current
    setSaveState('saving')
    queue.current = runAfter(queue.current, async () => {
      const outcome = await saveOutcome(transcriptId, [
        ...latest.current.values(),
      ])
      if (mine === ticket.current) setSaveState(outcome)
    })
    await queue.current
  }, [latest, transcriptId])
  return { save, saveState }
}
