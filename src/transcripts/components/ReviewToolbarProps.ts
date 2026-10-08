import type { SaveState } from '../hooks/SaveState'
import type { ReviewFilter } from '../review/ReviewFilter'
import type { ReviewMode } from '../review/ReviewMode'

export type ReviewToolbarProps = {
  readonly mode: ReviewMode
  readonly onModeChange: (mode: ReviewMode) => void
  readonly hasCorrection: boolean
  readonly filter: ReviewFilter
  readonly onFilterChange: (filter: ReviewFilter) => void
  readonly flaggedCount: number
  readonly totalCount: number
  readonly pending: number
  readonly deferredCount: number
  readonly canUndo: boolean
  readonly onUndo: () => void
  readonly saveState: SaveState
  readonly onPrevious: () => void
  readonly onNext: () => void
  readonly onOpenReport: () => void
}
