import { RailSection } from './RailSection'
import { ReviewFacts } from './ReviewFacts'
import type { ReviewFactsProps } from './ReviewFactsProps'

/** What the second pass changed and what it left uncertain, against the raw recognition. */
export function CorrectionsSection(props: ReviewFactsProps) {
  return (
    <RailSection title="Corrections">
      <ReviewFacts {...props} />
    </RailSection>
  )
}
