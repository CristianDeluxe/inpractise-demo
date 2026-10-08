import { useMemo } from 'react'
import type { TranscriptBundle } from '../api/TranscriptBundle'
import { scoreTranscript } from '../reliability/scoreTranscript'
import { toDecisionMap } from '../review/toDecisionMap'
import { useReliabilitySummary } from './useReliabilitySummary'
import { useRemoteReview } from './useRemoteReview'

/** Everything the report shows, rebuilt whenever a decision arrives from the review window. */
export function useReportView(bundle: TranscriptBundle) {
  const { transcript, correction } = bundle
  const review = useRemoteReview(transcript.id, bundle.review)
  const decisions = useMemo(() => toDecisionMap(review), [review])
  const paragraphs = useMemo(
    () => scoreTranscript(transcript, correction, decisions),
    [transcript, correction, decisions],
  )
  const summary = useReliabilitySummary(transcript, correction, decisions)
  return { decisions, paragraphs, summary }
}
