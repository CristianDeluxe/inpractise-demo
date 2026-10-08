import { useState } from 'react'
import type { ReviewFilter } from '../review/ReviewFilter'
import type { ReviewMode } from '../review/ReviewMode'

export function useWorkspaceView(hasCorrection: boolean) {
  const [mode, setMode] = useState<ReviewMode>(
    hasCorrection ? 'diff' : 'confidence',
  )
  const [filter, setFilter] = useState<ReviewFilter>('attention')
  return { mode, setMode, filter, setFilter }
}
