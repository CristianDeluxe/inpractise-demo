import type { PassageReference } from '@/reader/PassageReference'
import { useState } from 'react'

export function useNeighbor(reference: PassageReference) {
  const [passageId, setPassageId] = useState(reference.passageId)
  return { reference: { ...reference, passageId }, select: setPassageId }
}
