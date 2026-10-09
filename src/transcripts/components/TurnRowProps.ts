import type { ReactNode } from 'react'

export type TurnRowProps = {
  /** Where the timestamp replays from; also decides the speaker shown. */
  readonly start: number
  /** Review note under the speaker, shown on a paragraph's first turn. */
  readonly note: string | null
  /** This turn is the one being heard. */
  readonly active: boolean
  readonly onSeek: (seconds: number) => void
  readonly children: ReactNode
}
