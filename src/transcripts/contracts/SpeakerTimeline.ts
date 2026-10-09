import type { SpeakerTurn } from './SpeakerTurn'

/** Automatic diarization of the episode; not human-reviewed. */
export type SpeakerTimeline = {
  readonly method: string
  readonly turns: readonly SpeakerTurn[]
}
