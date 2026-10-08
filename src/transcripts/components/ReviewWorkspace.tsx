import { audioUrl } from '../api/audioUrl'
import { useReviewWorkspace } from '../hooks/useReviewWorkspace'
import { useVisibleParagraphs } from '../hooks/useVisibleParagraphs'
import { countPending } from '../review/countPending'
import { openReportWindow } from '../review/openReportWindow'
import { ReviewConsole } from './ReviewConsole'
import { ReviewList } from './ReviewList'
import type { ReviewWorkspaceProps } from './ReviewWorkspaceProps'
import { TranscriptHeader } from './TranscriptHeader'

export function ReviewWorkspace({ bundle }: ReviewWorkspaceProps) {
  const { transcript, correction } = bundle
  const ws = useReviewWorkspace(bundle)
  const { view, derived, controls, handlers } = ws
  const visible = useVisibleParagraphs(
    transcript.paragraphs,
    derived.flaggedIds,
    view.filter,
  )
  return (
    <main id="main-content" className="page-shell py-12">
      <TranscriptHeader transcript={transcript} correction={correction} />
      <ReviewConsole
        audio={{ src: audioUrl(transcript.id), audioRef: ws.audioRef }}
        toolbar={{
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
        }}
      />
      <ReviewList
        paragraphs={visible}
        correctedById={derived.correctedById}
        mode={view.mode}
        controls={controls}
        activeId={ws.activeId}
        focusedParagraphId={ws.focusedParagraphId}
      />
    </main>
  )
}
