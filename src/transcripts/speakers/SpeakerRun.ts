import type { SpeakerRole } from '../contracts/SpeakerRole'

/** Consecutive words of one paragraph spoken by the same role; role is undefined without diarization. */
export type SpeakerRun<T> = {
  readonly role: SpeakerRole | undefined
  readonly words: readonly T[]
}
