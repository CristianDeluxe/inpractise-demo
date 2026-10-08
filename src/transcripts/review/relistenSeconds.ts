import type { TranscriptDocument } from '../contracts/TranscriptDocument'
import { mergedDuration } from './mergedDuration'
import { relistenIntervals } from './relistenIntervals'

/** Audio a reviewer still has to hear: the relisten windows, overlaps counted once. */
export function relistenSeconds(transcript: TranscriptDocument) {
  return mergedDuration(relistenIntervals(transcript))
}
