import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { TranscriptWord } from '../contracts/TranscriptWord'
import { breaksOutsideEdits } from './breaksOutsideEdits'
import { cutSegmentsAtBreaks } from './cutSegmentsAtBreaks'
import type { DiffRow } from './DiffRow'
import type { EditSegment } from './EditSegment'
import { groupWordsByRow } from './groupWordsByRow'
import { sentenceBreaks } from './sentenceBreaks'

/** Splits a paragraph into sentence rows pairing raw words with their segments. */
export function buildDiffRows(
  segments: readonly EditSegment<CorrectionEdit>[],
  words: readonly TranscriptWord[],
): DiffRow[] {
  const raw = segments.map((segment) => segment.text).join('')
  const breaks = breaksOutsideEdits(segments, sentenceBreaks(raw))
  const cut = cutSegmentsAtBreaks(segments, breaks)
  const grouped = groupWordsByRow(words, breaks)
  return cut
    .map((rowSegments, index) => ({
      segments: rowSegments,
      words: grouped[index]?.words ?? [],
      firstWord: grouped[index]?.firstWord ?? 0,
    }))
    .filter((row) => row.segments.length > 0 || row.words.length > 0)
}
