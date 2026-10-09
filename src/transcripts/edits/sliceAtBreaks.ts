import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { TranscriptWord } from '../contracts/TranscriptWord'
import { breaksOutsideEdits } from './breaksOutsideEdits'
import { cutSegmentsAtBreaks } from './cutSegmentsAtBreaks'
import type { DiffRow } from './DiffRow'
import type { EditSegment } from './EditSegment'
import { groupWordsByRow } from './groupWordsByRow'

/** Cuts a paragraph at text offsets (never inside an edit), pairing each slice's segments with its raw words. */
export function sliceAtBreaks(
  segments: readonly EditSegment<CorrectionEdit>[],
  words: readonly TranscriptWord[],
  breaks: readonly number[],
): DiffRow[] {
  const kept = breaksOutsideEdits(segments, breaks)
  const cut = cutSegmentsAtBreaks(segments, kept)
  const grouped = groupWordsByRow(words, kept)
  return cut
    .map((rowSegments, index) => ({
      segments: rowSegments,
      words: grouped[index]?.words ?? [],
      firstWord: grouped[index]?.firstWord ?? 0,
    }))
    .filter((row) => row.segments.length > 0 || row.words.length > 0)
}
