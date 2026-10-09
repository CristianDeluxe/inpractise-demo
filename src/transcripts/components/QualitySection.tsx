import type { QualitySectionProps } from './QualitySectionProps'
import { RailSection } from './RailSection'
import { ReliabilityExplainer } from './ReliabilityExplainer'
import { ReliabilityHeadline } from './ReliabilityHeadline'
import { SpotCheckAudioFact } from './SpotCheckAudioFact'

/** The figure that replaces mandatory review, the words it leaves to check, and how it is computed. */
export function QualitySection({
  transcript,
  reliability,
}: QualitySectionProps) {
  return (
    <RailSection title="Quality">
      {reliability === null ? null : (
        <ReliabilityHeadline summary={reliability} />
      )}
      <SpotCheckAudioFact transcript={transcript} />
      <ReliabilityExplainer />
    </RailSection>
  )
}
