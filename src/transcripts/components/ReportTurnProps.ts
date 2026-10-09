import type { SpeakerRole } from '../contracts/SpeakerRole'
import type { ScoredWord } from '../reliability/ScoredWord'

export type ReportTurnProps = {
  readonly start: number
  readonly role: SpeakerRole | undefined
  /** Null when the episode has no named speakers. */
  readonly name: string | null
  readonly words: readonly ScoredWord[]
}
