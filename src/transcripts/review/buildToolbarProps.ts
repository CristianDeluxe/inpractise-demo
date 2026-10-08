import type { TranscriptBundle } from '../api/TranscriptBundle'
import type { ReviewToolbarProps } from '../components/ReviewToolbarProps'
import type { ReviewWorkspaceState } from '../hooks/ReviewWorkspaceState'
import { countPending } from './countPending'
import { openReportWindow } from './openReportWindow'

/** Toolbar wiring: view state, counters and the actions the buttons call. */
export function buildToolbarProps(
  bundle: TranscriptBundle,
  ws: ReviewWorkspaceState,
): ReviewToolbarProps {
  const { transcript, correction } = bundle
  const { view, derived, controls, handlers } = ws
  return {
    mode: view.mode,
    onModeChange: view.setMode,
    hasCorrection: correction !== null,
    filter: view.filter,
    onFilterChange: view.setFilter,
    flaggedCount: derived.flaggedIds.length,
    totalCount: transcript.paragraphs.length,
    pending: countPending(derived.edits, controls.decisions),
    saveState: ws.saveState,
    onPrevious: handlers.previous,
    onNext: handlers.next,
    onOpenReport: () => {
      openReportWindow(transcript.id)
    },
  }
}
