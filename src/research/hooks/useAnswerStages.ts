import type { AskStage } from '@/api/AskStage'
import { useCallback, useState } from 'react'

/** The phases of the answer in flight. Cleared when a new question starts, so
 * the panel never shows one question's progress beside another's answer. */
export function useAnswerStages() {
  const [stages, setStages] = useState<AskStage[]>([])
  const reset = useCallback(() => {
    setStages([])
  }, [])
  const push = useCallback((stage: AskStage) => {
    setStages((current) => [...current, stage])
  }, [])
  return { stages, reset, push }
}
