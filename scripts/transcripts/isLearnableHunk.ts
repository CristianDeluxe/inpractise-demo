import type { ClassifiedHunk } from './ClassifiedHunk.ts'
import { isLearnableEdit } from './isLearnableEdit.ts'
import { splitWords } from './splitWords.ts'

/** One to three words on each side, a non-empty replacement, and a learnable category. */
export function isLearnableHunk(hunk: ClassifiedHunk): boolean {
  const toWords = splitWords(hunk.to).length
  return (
    toWords >= 1 &&
    toWords <= 3 &&
    isLearnableEdit({
      id: '',
      paragraphId: '',
      from: hunk.from,
      to: hunk.to,
      category: hunk.category,
      verdict: 'pending',
    })
  )
}
