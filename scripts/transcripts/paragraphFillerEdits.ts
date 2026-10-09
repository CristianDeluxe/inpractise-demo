import type { CorrectionEdit } from '@/transcripts/contracts/CorrectionEdit.ts'
import type { CharRange } from './CharRange.ts'
import { editRanges } from './editRanges.ts'
import { fillerEdit } from './fillerEdit.ts'
import { fillerRuns } from './fillerRuns.ts'

/** Rule edits for every filler run the corrector left, never overlapping its edits or each other. */
export function paragraphFillerEdits(
  paragraphId: string,
  words: readonly string[],
  existing: readonly CorrectionEdit[],
): CorrectionEdit[] {
  const taken: CharRange[] = editRanges(words.join(' '), existing)
  const added: CorrectionEdit[] = []
  for (const run of fillerRuns(words)) {
    const edit = fillerEdit({ paragraphId, words, run, taken })
    if (edit === null) continue
    added.push(edit)
    taken.push(...editRanges(words.join(' '), [edit]))
  }
  return added
}
