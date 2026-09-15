import type { InvestigateStage } from '@/api/InvestigateStage'
import { useCallback, useState } from 'react'

/** The phases of the investigation in flight. Cleared when a new question
 * starts, so one investigation's progress never sits beside another's. */
export function useInvestigationStages() {
  const [stages, setStages] = useState<InvestigateStage[]>([])
  const reset = useCallback(() => {
    setStages([])
  }, [])
  const push = useCallback((stage: InvestigateStage) => {
    setStages((current) => [...current, stage])
  }, [])
  return { stages, reset, push }
}
