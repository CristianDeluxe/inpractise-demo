import type { CompareStage } from '@/api/CompareStage'
import { useCallback, useState } from 'react'

/** The phases of a cross-reference in flight. Cleared when a new comparison
 *  starts, so the trail never shows one topic's progress beside another's
 *  verdict. */
export function useCompareStages() {
  const [stages, setStages] = useState<CompareStage[]>([])
  const reset = useCallback(() => {
    setStages([])
  }, [])
  const push = useCallback((stage: CompareStage) => {
    setStages((current) => [...current, stage])
  }, [])
  return { stages, reset, push }
}
