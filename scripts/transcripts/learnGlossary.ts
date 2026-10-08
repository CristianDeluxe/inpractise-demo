import type { MemoryEntry } from '@/transcripts/contracts/MemoryEntry.ts'
import { isLearnableEdit } from './isLearnableEdit.ts'
import type { ReviewedEdit } from './ReviewedEdit.ts'
import { trimSharedPunctuation } from './trimSharedPunctuation.ts'
import { upsertGlossaryEntry } from './upsertGlossaryEntry.ts'

/** Folds counted, learnable edits into the glossary, ignoring punctuation both sides share. */
export function learnGlossary(
  glossary: readonly MemoryEntry[],
  counted: readonly ReviewedEdit[],
  transcriptId: string,
  now: string,
): MemoryEntry[] {
  return counted
    .map((edit) => ({ ...edit, ...trimSharedPunctuation(edit.from, edit.to) }))
    .filter((edit) => isLearnableEdit(edit))
    .reduce<MemoryEntry[]>(
      (entries, edit) => upsertGlossaryEntry(entries, edit, transcriptId, now),
      [...glossary],
    )
}
