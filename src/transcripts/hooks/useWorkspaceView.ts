import { useState } from 'react'
import type { ReviewFilter } from '../review/ReviewFilter'
import type { ReviewMode } from '../review/ReviewMode'

/** The AI-final text is the default; without a second pass only the raw confidence view exists. */
export function useWorkspaceView(hasCorrection: boolean) {
  const [mode, setMode] = useState<ReviewMode>(
    hasCorrection ? 'final' : 'confidence',
  )
  const [filter, setFilter] = useState<ReviewFilter>('attention')
  return { mode, setMode, filter, setFilter }
}
