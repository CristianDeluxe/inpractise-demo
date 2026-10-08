import { useMemo } from 'react'
import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { DecisionMap } from '../review/DecisionMap'
import { deferredParagraphIds } from '../review/deferredParagraphIds'
import type { ParagraphFilterSets } from '../review/ParagraphFilterSets'

export function useParagraphFilterSets(
  flaggedIds: readonly string[],
  edits: readonly CorrectionEdit[],
  decisions: DecisionMap,
): ParagraphFilterSets {
  return useMemo(
    () => ({
      attention: new Set(flaggedIds),
      deferred: deferredParagraphIds(edits, decisions),
    }),
    [decisions, edits, flaggedIds],
  )
}
