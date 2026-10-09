import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { TranscriptWord } from '../contracts/TranscriptWord'
import type { DiffRow } from './DiffRow'
import type { EditSegment } from './EditSegment'
import { sentenceBreaks } from './sentenceBreaks'
import { sliceAtBreaks } from './sliceAtBreaks'

/** Splits a paragraph into sentence rows pairing raw words with their segments. */
export function buildDiffRows(
  segments: readonly EditSegment<CorrectionEdit>[],
  words: readonly TranscriptWord[],
): DiffRow[] {
  const raw = segments.map((segment) => segment.text).join('')
  return sliceAtBreaks(segments, words, sentenceBreaks(raw))
}
