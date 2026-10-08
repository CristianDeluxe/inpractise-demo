import type { TranscriptDocument } from '../contracts/TranscriptDocument'
import { relistenPaddingSeconds } from './relistenPaddingSeconds'
import type { TimeInterval } from './TimeInterval'

/** Padded windows around every low-confidence word that is not a filler. */
export function relistenIntervals(
  transcript: TranscriptDocument,
): TimeInterval[] {
  return transcript.paragraphs.flatMap((paragraph) =>
    paragraph.words
      .filter((word) => word.band === 'low' && !word.flags.includes('filler'))
      .map((word) => ({
        start: Math.max(0, word.start - relistenPaddingSeconds),
        end: word.end + relistenPaddingSeconds,
      })),
  )
}
