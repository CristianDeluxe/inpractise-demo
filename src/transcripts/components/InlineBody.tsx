import { useSegments } from '../hooks/useSegments'
import type { InlineBodyProps } from './InlineBodyProps'
import { TrackedText } from './TrackedText'

/** One column of corrected text with every proposed change tracked in place. */
export function InlineBody({ corrected, controls }: InlineBodyProps) {
  const segments = useSegments(corrected)
  return (
    <TrackedText segments={segments} variant="inline" controls={controls} />
  )
}
