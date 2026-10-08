import type { ConfidenceBand } from '../contracts/ConfidenceBand'
import type { TranscriptWord } from '../contracts/TranscriptWord'
import type { WordFlag } from '../contracts/WordFlag'
import { confidenceByBand } from './confidenceByBand'

export function wordFixture(
  text: string,
  start: number,
  band: ConfidenceBand = 'high',
  flags: readonly WordFlag[] = [],
): TranscriptWord {
  return {
    text,
    start,
    end: start + 0.4,
    confidence: confidenceByBand[band],
    band,
    flags,
  }
}
