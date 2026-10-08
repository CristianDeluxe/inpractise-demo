import { audioUrl } from '../api/audioUrl'
import { useReviewWorkspace } from '../hooks/useReviewWorkspace'
import { useVisibleParagraphs } from '../hooks/useVisibleParagraphs'
import { useWorkspaceLayout } from '../hooks/useWorkspaceLayout'
import { buildToolbarProps } from '../review/buildToolbarProps'
import { ConfidenceLegend } from './ConfidenceLegend'
import { ReviewColumns } from './ReviewColumns'
import { ReviewConsole } from './ReviewConsole'
import type { ReviewWorkspaceProps } from './ReviewWorkspaceProps'
import { TranscriptHeader } from './TranscriptHeader'

export function ReviewWorkspace({ bundle, nav }: ReviewWorkspaceProps) {
  const { transcript } = bundle
  const ws = useReviewWorkspace(bundle)
  const layout = useWorkspaceLayout(
    transcript.paragraphs,
    ws.derived.edits,
    ws.controls.focusedEditId,
  )
  const visible = useVisibleParagraphs(
    transcript.paragraphs,
    ws.derived.flaggedIds,
    ws.view.filter,
  )
  return (
    <main
      id="main-content"
      className="page-shell py-10 md:py-12"
      style={layout.style}
    >
      <TranscriptHeader
        transcript={transcript}
        correction={bundle.correction}
        nav={nav}
      />
      <ReviewConsole
        consoleRef={layout.consoleRef}
        audio={{ src: audioUrl(transcript.id), audioRef: ws.audioRef }}
        toolbar={buildToolbarProps(bundle, ws)}
      />
      <ConfidenceLegend />
      <ReviewColumns paragraphs={visible} ws={ws} layout={layout} />
    </main>
  )
}
