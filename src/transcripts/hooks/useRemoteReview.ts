import { useEffect, useState } from 'react'
import { loadTranscriptBundle } from '../api/loadTranscriptBundle'
import type { ReviewDecision } from '../contracts/ReviewDecision'
import { reportPollMs } from './reportPollMs'

/** Keeps a report window on a second screen in step with decisions made in the review window. */
export function useRemoteReview(
  id: string,
  initial: readonly ReviewDecision[],
) {
  const [review, setReview] = useState(initial)
  useEffect(() => {
    const poll = async () => {
      if (document.visibilityState === 'hidden') return
      try {
        setReview((await loadTranscriptBundle(id)).review)
      } catch {
        // Keep showing the last known decisions.
      }
    }
    const timer = window.setInterval(() => {
      void poll()
    }, reportPollMs)
    return () => {
      window.clearInterval(timer)
    }
  }, [id])
  return review
}
