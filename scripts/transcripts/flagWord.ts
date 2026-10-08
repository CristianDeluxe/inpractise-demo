import type { ConfidenceBand } from '@/transcripts/contracts/ConfidenceBand.ts'
import type { WordFlag } from '@/transcripts/contracts/WordFlag.ts'
import { hasDigit } from './hasDigit.ts'
import { isEntityWord } from './isEntityWord.ts'
import { isFillerWord } from './isFillerWord.ts'
import { isRepeatedWord } from './isRepeatedWord.ts'
import type { MergedWord } from './MergedWord.ts'

export function flagWord(
  word: MergedWord,
  band: ConfidenceBand,
  previous: MergedWord | undefined,
  memoryHit: boolean,
): WordFlag[] {
  const flags: WordFlag[] = []
  if (band === 'low') flags.push('low-confidence')
  if (isEntityWord(word.text, word.sentenceStart)) flags.push('entity')
  if (hasDigit(word.text)) flags.push('number')
  if (isFillerWord(word.text)) flags.push('filler')
  if (isRepeatedWord(word.text, previous?.text)) flags.push('repetition')
  if (memoryHit) flags.push('memory')
  return flags
}
