import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { saveReview } from '../api/saveReview'
import type { ReviewDecision } from '../contracts/ReviewDecision'
import type { ReviewVerdict } from '../contracts/ReviewVerdict'
import { applyVerdict } from '../review/applyVerdict'
import { recordsToDecisionMap } from '../review/recordsToDecisionMap'
import { toDecisionRecords } from '../review/toDecisionRecords'
import type { SaveState } from './SaveState'
import { saveDelayMs } from './saveDelayMs'

/** Optimistic decisions: state updates at once, the PUT follows after a short pause. */
export function useReviewDecisions(
  transcriptId: string,
  initial: readonly ReviewDecision[],
) {
  const [records, setRecords] = useState(() => toDecisionRecords(initial))
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const timer = useRef<number | null>(null)
  const latest = useRef(records)
  const flush = useCallback(async () => {
    timer.current = null
    setSaveState('saving')
    try {
      await saveReview(transcriptId, [...latest.current.values()])
      setSaveState('saved')
    } catch {
      setSaveState('error')
    }
  }, [transcriptId])
  const decide = useCallback(
    (editIds: readonly string[], verdict: ReviewVerdict | null) => {
      latest.current = applyVerdict(
        latest.current,
        editIds,
        verdict,
        new Date().toISOString(),
      )
      setRecords(latest.current)
      if (timer.current !== null) window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => void flush(), saveDelayMs)
    },
    [flush],
  )
  useEffect(
    () => () => {
      if (timer.current !== null) {
        window.clearTimeout(timer.current)
        void flush()
      }
    },
    [flush],
  )
  const decisions = useMemo(() => recordsToDecisionMap(records), [records])
  return { decisions, decide, saveState }
}
