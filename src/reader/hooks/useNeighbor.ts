import type { PassageReference } from '@/reader/PassageReference'
import { useState } from 'react'

/**
 * Neighbor selection stays inside the original document and revision. State is
 * seeded only on mount, so callers must remount when the initial reference changes;
 * ReaderPage keys its loader by the complete evidence triple for this reason.
 */
export function useNeighbor(reference: PassageReference) {
  const [passageId, setPassageId] = useState(reference.passageId)
  return { reference: { ...reference, passageId }, select: setPassageId }
}
