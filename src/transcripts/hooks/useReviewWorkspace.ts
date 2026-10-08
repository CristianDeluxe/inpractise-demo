import type { TranscriptBundle } from '../api/TranscriptBundle'
import { useActiveParagraph } from './useActiveParagraph'
import { useAudioPlayer } from './useAudioPlayer'
import { useReviewActions } from './useReviewActions'
import { useReviewDecisions } from './useReviewDecisions'
import { useReviewDerived } from './useReviewDerived'
import { useReviewFocus } from './useReviewFocus'
import { useReviewKeys } from './useReviewKeys'
import { useScrollToParagraph } from './useScrollToParagraph'
import { useWorkspaceView } from './useWorkspaceView'

/** All state of the review workspace; the component only lays it out. */
export function useReviewWorkspace(bundle: TranscriptBundle) {
  const { transcript, correction } = bundle
  const view = useWorkspaceView(correction !== null)
  const derived = useReviewDerived(transcript, correction)
  const { decisions, decide, saveState } = useReviewDecisions(
    transcript.id,
    bundle.review,
  )
  const focusApi = useReviewFocus({
    flaggedIds: derived.flaggedIds,
    edits: derived.edits,
    decisions,
  })
  const audio = useAudioPlayer()
  const activeId = useActiveParagraph(audio.audioRef, transcript.paragraphs)
  const { controls, handlers } = useReviewActions({
    decisions,
    decide,
    focus: focusApi.focus,
    focusEdit: focusApi.focusEdit,
    moveParagraph: focusApi.moveParagraph,
    advance: focusApi.advance,
    seekTo: audio.seekTo,
  })
  useReviewKeys(handlers)
  useScrollToParagraph(focusApi.focus.paragraphId)
  return {
    view,
    derived,
    controls,
    handlers,
    saveState,
    audioRef: audio.audioRef,
    activeId,
    focusedParagraphId: focusApi.focus.paragraphId,
  }
}
