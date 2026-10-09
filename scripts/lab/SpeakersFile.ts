import type { SpeakerTurn } from '@/transcripts/contracts/SpeakerTurn.ts'

/** work/transcripts/<id>/speakers.json as written by the diarization scripts (turn text omitted). */
export type SpeakersFile = {
  readonly method: string
  readonly turns: readonly SpeakerTurn[]
}
