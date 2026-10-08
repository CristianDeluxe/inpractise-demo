import { useSegments } from '../hooks/useSegments'
import type { InlineBodyProps } from './InlineBodyProps'
import { TrackedText } from './TrackedText'

/** One column of corrected text with every proposed change tracked in place. */
export function InlineBody({
  paragraph,
  corrected,
  controls,
}: InlineBodyProps) {
  const segments = useSegments(paragraph, corrected)
  return (
    <TrackedText segments={segments} variant="inline" controls={controls} />
  )
}
