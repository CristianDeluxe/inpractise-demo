import { useMemo } from 'react'
import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { TranscriptWord } from '../contracts/TranscriptWord'
import { buildDiffRows } from '../edits/buildDiffRows'
import type { EditSegment } from '../edits/EditSegment'

export function useDiffRows(
  segments: readonly EditSegment<CorrectionEdit>[],
  words: readonly TranscriptWord[],
) {
  return useMemo(() => buildDiffRows(segments, words), [segments, words])
}
