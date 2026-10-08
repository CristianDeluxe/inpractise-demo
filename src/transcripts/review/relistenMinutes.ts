import type { TranscriptDocument } from '../contracts/TranscriptDocument'
import { relistenSeconds } from './relistenSeconds'

export function relistenMinutes(transcript: TranscriptDocument) {
  const seconds = relistenSeconds(transcript)
  return seconds === 0 ? 0 : Math.max(1, Math.round(seconds / 60))
}
