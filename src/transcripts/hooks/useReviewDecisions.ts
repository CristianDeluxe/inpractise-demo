import { useCallback, useMemo, useRef, useState } from 'react'
import type { ReviewDecision } from '../contracts/ReviewDecision'
import type { ReviewVerdict } from '../contracts/ReviewVerdict'
import { applyVerdict } from '../review/applyVerdict'
import { pushHistory } from '../review/pushHistory'
import { recordsToDecisionMap } from '../review/recordsToDecisionMap'
import { toDecisionRecords } from '../review/toDecisionRecords'
import type { DecisionHistoryEntry } from './DecisionHistoryEntry'
import { saveDelayMs } from './saveDelayMs'
import { useFlushOnLeave } from './useFlushOnLeave'
import { useOrderedSave } from './useOrderedSave'

/**
 * Optimistic decisions: state updates at once, the PUT follows after a short
 * pause, in order. Each change can be undone, newest first.
 */
export function useReviewDecisions(
  transcriptId: string,
  initial: readonly ReviewDecision[],
) {
  const [records, setRecords] = useState(() => toDecisionRecords(initial))
  const [history, setHistory] = useState<DecisionHistoryEntry[]>([])
  const timer = useRef<number | null>(null)
  const latest = useRef(records)
  const { save, saveState } = useOrderedSave(transcriptId, latest)
  const flush = useCallback(async () => {
    timer.current = null
    await save()
  }, [save])
  const commit = useCallback(
    (next: ReadonlyMap<string, ReviewDecision>) => {
      latest.current = next
      setRecords(next)
      if (timer.current !== null) window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => void flush(), saveDelayMs)
    },
    [flush],
  )
  const decide = useCallback(
    (editIds: readonly string[], verdict: ReviewVerdict | null) => {
      const entry = { records: latest.current, editIds }
      setHistory((past) => pushHistory(past, entry))
      const at = new Date().toISOString()
      commit(applyVerdict(latest.current, editIds, verdict, at))
    },
    [commit],
  )
  const undo = useCallback(() => {
    const entry = history.at(-1)
    if (!entry) return null
    setHistory(history.slice(0, -1))
    commit(entry.records)
    return entry.editIds[0] ?? null
  }, [commit, history])
  useFlushOnLeave(timer, flush)
  const decisions = useMemo(() => recordsToDecisionMap(records), [records])
  return { decisions, decide, undo, canUndo: history.length > 0, saveState }
}
