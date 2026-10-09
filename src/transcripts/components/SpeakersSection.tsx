import { useSpeakerShares } from '../hooks/useSpeakerShares'
import { RailSection } from './RailSection'
import { SpeakerShareRow } from './SpeakerShareRow'

/** Who holds the conversation: share of speaking time, turns and longest stretch per speaker. */
export function SpeakersSection() {
  const shares = useSpeakerShares()
  if (shares === null) return null
  return (
    <RailSection title="Speakers" label="Speaking time by speaker">
      <ul className="space-y-3 px-4 pt-1">
        {shares.map((share) => (
          <SpeakerShareRow key={share.role} share={share} />
        ))}
      </ul>
      <p className="px-4 pt-2 text-xs leading-relaxed text-muted-foreground">
        Inferred from the audio by local diarization; not verified.
      </p>
    </RailSection>
  )
}
