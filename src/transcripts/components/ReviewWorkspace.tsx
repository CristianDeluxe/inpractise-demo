import { useAudioProps } from '../hooks/useAudioProps'
import { useParagraphFilterSets } from '../hooks/useParagraphFilterSets'
import { useReviewWorkspace } from '../hooks/useReviewWorkspace'
import { useVisibleParagraphs } from '../hooks/useVisibleParagraphs'
import { useWorkspaceLayout } from '../hooks/useWorkspaceLayout'
import { buildToolbarProps } from '../review/buildToolbarProps'
import { ConfidenceLegend } from './ConfidenceLegend'
import { ReadOnlyNotice } from './ReadOnlyNotice'
import { ReviewColumns } from './ReviewColumns'
import { ReviewConsole } from './ReviewConsole'
import type { ReviewWorkspaceProps } from './ReviewWorkspaceProps'
import { TranscriptHeader } from './TranscriptHeader'

export function ReviewWorkspace({ bundle, nav, onSave }: ReviewWorkspaceProps) {
  const { transcript } = bundle
  const ws = useReviewWorkspace(bundle, onSave)
  const layout = useWorkspaceLayout(ws.derived.edits, ws.controls.focusedEditId)
  const audio = useAudioProps(bundle, ws.audioRef)
  const sets = useParagraphFilterSets(
    ws.derived.flaggedIds,
    ws.derived.edits,
    ws.controls.decisions,
  )
  const visible = useVisibleParagraphs(
    transcript.paragraphs,
    sets,
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
      {onSave === null ? <ReadOnlyNotice /> : null}
      <ReviewConsole
        consoleRef={layout.consoleRef}
        audio={audio}
        toolbar={buildToolbarProps(bundle, ws)}
      />
      <ConfidenceLegend />
      <ReviewColumns paragraphs={visible} ws={ws} layout={layout} />
    </main>
  )
}
