import { alignWords } from './alignWords.ts'
import { classifyHunks } from './classifyHunks.ts'
import type { PairAnalysis } from './PairAnalysis.ts'
import type { PairText } from './PairText.ts'
import { splitWords } from './splitWords.ts'
import { wordErrorRate } from './wordErrorRate.ts'

export function analyzePair(pair: PairText): PairAnalysis {
  const raw = splitWords(pair.raw)
  const final = splitWords(pair.final)
  const hunks = alignWords(raw, final)
  return {
    name: pair.name,
    rawWords: raw.length,
    finalWords: final.length,
    hunks,
    classified: classifyHunks(hunks),
    wer: wordErrorRate(hunks, final.length),
  }
}
