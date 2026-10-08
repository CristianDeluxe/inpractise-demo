import type { TranscriptDocument } from '../contracts/TranscriptDocument'
import { mergedDuration } from './mergedDuration'
import { relistenPaddingSeconds } from './relistenPaddingSeconds'

/**
 * Audio a reviewer still has to hear: every low-confidence word that is not a
 * filler, padded on both sides, with overlapping windows merged.
 */
export function relistenSeconds(transcript: TranscriptDocument) {
  const intervals = transcript.paragraphs.flatMap((paragraph) =>
    paragraph.words
      .filter((word) => word.band === 'low' && !word.flags.includes('filler'))
      .map((word) => ({
        start: Math.max(0, word.start - relistenPaddingSeconds),
        end: word.end + relistenPaddingSeconds,
      })),
  )
  return mergedDuration(intervals)
}
