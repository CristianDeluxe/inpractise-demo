import { useRuntime } from '@/runtime/hooks/useRuntime'
import { useEffect, useState } from 'react'
import { loadReviewDecisions } from '../api/loadReviewDecisions'
import type { ReviewDecision } from '../contracts/ReviewDecision'
import { reportPollMs } from './reportPollMs'

/** Keeps a report window on a second screen in step with decisions made in the review window. */
export function useRemoteReview(
  id: string,
  initial: readonly ReviewDecision[],
) {
  const runtime = useRuntime()
  const [review, setReview] = useState(initial)
  useEffect(() => {
    const poll = async () => {
      if (document.visibilityState === 'hidden') return
      try {
        setReview(await loadReviewDecisions(runtime, id))
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
  }, [id, runtime])
  return review
}
