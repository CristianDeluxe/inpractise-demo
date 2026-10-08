import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ReviewDecision } from '../contracts/ReviewDecision'
import type { ReviewVerdict } from '../contracts/ReviewVerdict'
import { applyVerdict } from '../review/applyVerdict'
import { recordsToDecisionMap } from '../review/recordsToDecisionMap'
import { toDecisionRecords } from '../review/toDecisionRecords'
import { saveDelayMs } from './saveDelayMs'
import { useOrderedSave } from './useOrderedSave'

/** Optimistic decisions: state updates at once, the PUT follows after a short pause, in order. */
export function useReviewDecisions(
  transcriptId: string,
  initial: readonly ReviewDecision[],
) {
  const [records, setRecords] = useState(() => toDecisionRecords(initial))
  const timer = useRef<number | null>(null)
  const latest = useRef(records)
  const { save, saveState } = useOrderedSave(transcriptId, latest)
  const flush = useCallback(async () => {
    timer.current = null
    await save()
  }, [save])
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
