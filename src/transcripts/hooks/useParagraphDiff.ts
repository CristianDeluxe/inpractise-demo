import { useMemo } from 'react'
import type { CorrectedParagraph } from '../contracts/CorrectedParagraph'
import type { TranscriptParagraph } from '../contracts/TranscriptParagraph'
import { diffWords } from '../diff/diffWords'
import { splitTokens } from '../diff/splitTokens'
import type { DecisionMap } from '../review/DecisionMap'
import { revertRejectedEdits } from '../review/revertRejectedEdits'

/** Corrected tokens after the reviewer's rejections, and the word diff against the raw text. */
export function useParagraphDiff(
  paragraph: TranscriptParagraph,
  corrected: CorrectedParagraph,
  decisions: DecisionMap,
) {
  const text = revertRejectedEdits(corrected.text, corrected.edits, decisions)
  return useMemo(() => {
    const tokens = splitTokens(text)
    const raw = paragraph.words.map((word) => word.text)
    return { tokens, diff: diffWords(raw, tokens) }
  }, [paragraph, text])
}
