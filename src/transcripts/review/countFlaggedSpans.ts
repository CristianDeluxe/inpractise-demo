import type { TranscriptDocument } from '../contracts/TranscriptDocument'

/** A flagged span is a maximal run of consecutive low-band words inside a paragraph. */
export function countFlaggedSpans(transcript: TranscriptDocument) {
  let spans = 0
  for (const paragraph of transcript.paragraphs) {
    let inside = false
    for (const word of paragraph.words) {
      const low = word.band === 'low'
      if (low && !inside) spans += 1
      inside = low
    }
  }
  return spans
}
