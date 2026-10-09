import { useSpeakerLabels } from '../hooks/useSpeakerLabels'
import { roleAt } from '../speakers/roleAt'
import type { SpeakerGutterProps } from './SpeakerGutterProps'

/** Who opens a paragraph, beside its timestamp; later turns are marked inline. */
export function SpeakerGutter({ start }: SpeakerGutterProps) {
  const labels = useSpeakerLabels()
  const role = labels === null ? undefined : roleAt(labels.turns, start)
  if (labels === null || role === undefined) return null
  return (
    <span
      className="text-xs font-medium leading-snug text-foreground/80"
      title="Speaker inferred from the audio"
    >
      {labels.names[role]}
    </span>
  )
}
