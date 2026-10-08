import { rawWordIndexAt } from './rawWordIndexAt'
import type { ScoredChar } from './ScoredChar'
import type { ScoringContext } from './ScoringContext'

/** A raw character scored by the ASR confidence of its word, optionally capped. */
export function asrScoreAt(
  context: ScoringContext,
  position: number,
  cap: number,
): ScoredChar {
  const wordIndex = rawWordIndexAt(context.offsets, position)
  const confidence = context.paragraph.words[wordIndex]?.confidence ?? 0
  return { score: Math.min(confidence, cap), wordIndex }
}
