import type { TranscriptWord } from '../contracts/TranscriptWord'
import type { SpeakerLabels } from '../speakers/SpeakerLabels'
import { speakerRuns } from '../speakers/speakerRuns'

/** Offsets in the space-joined raw text where another speaker's words begin. */
export function speakerBreaks(
  labels: SpeakerLabels | null,
  words: readonly TranscriptWord[],
): number[] {
  const breaks: number[] = []
  let offset = 0
  for (const run of speakerRuns(labels, words)) {
    if (offset > 0) breaks.push(offset)
    offset += run.words.reduce((sum, word) => sum + word.text.length + 1, 0)
  }
  return breaks
}
