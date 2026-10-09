import type { SpeakerChangeProps } from './SpeakerChangeProps'

/** Marks the word where the other speaker takes over, inside a paragraph. */
export function SpeakerChange({ name }: SpeakerChangeProps) {
  return (
    <span className="mx-1 inline-block rounded bg-secondary px-1.5 align-middle font-sans text-xs font-medium text-secondary-foreground">
      {name}:
    </span>
  )
}
