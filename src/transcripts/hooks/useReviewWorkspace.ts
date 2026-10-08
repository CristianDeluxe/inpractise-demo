import type { TranscriptBundle } from '../api/TranscriptBundle'
import { useActiveParagraph } from './useActiveParagraph'
import { useAudioPlayer } from './useAudioPlayer'
import { useEditPreview } from './useEditPreview'
import { useReviewActions } from './useReviewActions'
import { useReviewDecisions } from './useReviewDecisions'
import { useReviewDerived } from './useReviewDerived'
import { useReviewFocus } from './useReviewFocus'
import { useReviewKeys } from './useReviewKeys'
import { useScrollToFocus } from './useScrollToFocus'
import { useWorkspaceView } from './useWorkspaceView'

/** All state of the review workspace; the component only lays it out. */
export function useReviewWorkspace(bundle: TranscriptBundle) {
  const { transcript, correction } = bundle
  const view = useWorkspaceView(correction !== null)
  const derived = useReviewDerived(transcript, correction)
  const { decisions, decide, undo, canUndo, saveState } = useReviewDecisions(
    transcript.id,
    bundle.review,
  )
  const focusApi = useReviewFocus({
    flaggedIds: derived.flaggedIds,
    edits: derived.edits,
    decisions,
  })
  const audio = useAudioPlayer()
  const preview = useEditPreview()
  const activeId = useActiveParagraph(audio.audioRef, transcript.paragraphs)
  const { controls, handlers } = useReviewActions({
    decisions,
    decide,
    focus: focusApi.focus,
    focusEdit: focusApi.focusEdit,
    moveParagraph: focusApi.moveParagraph,
    advance: focusApi.advance,
    focusNextPending: focusApi.focusNextPending,
    seekTo: audio.seekTo,
    playSpan: audio.playSpan,
    loopSpan: audio.loopSpan,
    stopLoop: audio.stopLoop,
    looping: audio.looping,
    undo,
    canUndo,
    spanById: derived.spanById,
    audioRef: audio.audioRef,
    previewEdit: preview.open,
    endPreview: preview.close,
  })
  useReviewKeys(handlers)
  useScrollToFocus(focusApi.focus)
  return {
    view,
    derived,
    controls,
    handlers,
    saveState,
    audioRef: audio.audioRef,
    activeId,
    focusedParagraphId: focusApi.focus.paragraphId,
    preview,
  }
}
