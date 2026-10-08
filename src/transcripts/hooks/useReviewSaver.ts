import { AccessContext } from '@/auth/AccessContext'
import { useRuntime } from '@/runtime/hooks/useRuntime'
import { useContext, useMemo } from 'react'
import type { ReviewSaver } from '../api/ReviewSaver'
import { saveReview } from '../api/saveReview'

/** The saver for the signed-in reviewer; null for anyone the database would refuse. */
export function useReviewSaver(): ReviewSaver | null {
  const runtime = useRuntime()
  const access = useContext(AccessContext)
  const orgId = access?.role === 'reviewer' ? access.orgId : null
  return useMemo(
    () =>
      orgId === null
        ? null
        : async (id, decisions) => saveReview(runtime, orgId, id, decisions),
    [orgId, runtime],
  )
}
