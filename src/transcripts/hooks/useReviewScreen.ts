import type { ReviewSaver } from '../api/ReviewSaver'
import type { TranscriptBundle } from '../api/TranscriptBundle'
import { effectiveFilter } from '../review/effectiveFilter'
import { useAudioProps } from './useAudioProps'
import { useParagraphFilterSets } from './useParagraphFilterSets'
import { useReliabilitySummary } from './useReliabilitySummary'
import { useReviewWorkspace } from './useReviewWorkspace'
import { useVisibleParagraphs } from './useVisibleParagraphs'
import { useWorkspaceLayout } from './useWorkspaceLayout'

/** Everything the transcript screen derives from one bundle and its saver. */
export function useReviewScreen(
  bundle: TranscriptBundle,
  onSave: ReviewSaver | null,
) {
  const ws = useReviewWorkspace(bundle, onSave)
  const layout = useWorkspaceLayout(ws.activeEdits, ws.controls.focusedEditId)
  const audio = useAudioProps(bundle, ws.audioRef)
  const sets = useParagraphFilterSets(
    ws.derived.flaggedIds,
    ws.derived.edits,
    ws.controls.decisions,
    ws.derived.spotCheckIds,
  )
  const visible = useVisibleParagraphs(
    bundle.transcript.paragraphs,
    sets,
    effectiveFilter(ws.view.mode, ws.view.filter),
  )
  const reliability = useReliabilitySummary(
    bundle.transcript,
    bundle.correction,
    ws.controls.decisions,
  )
  return { ws, layout, audio, visible, reliability }
}
