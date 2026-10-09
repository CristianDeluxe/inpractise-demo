import { useMemo } from 'react'
import { speakerShares } from '../speakers/speakerShares'
import { useSpeakerLabels } from './useSpeakerLabels'

/** Talk-time statistics of the episode, or null when it has no named speakers. */
export function useSpeakerShares() {
  const labels = useSpeakerLabels()
  return useMemo(
    () => (labels === null ? null : speakerShares(labels)),
    [labels],
  )
}
