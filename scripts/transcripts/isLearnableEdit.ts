import { learnableCategories } from './learnableCategories.ts'
import type { ReviewedEdit } from './ReviewedEdit.ts'

/** A glossary candidate: entity, term or number, one to three words, a real change. */
export function isLearnableEdit(edit: ReviewedEdit): boolean {
  const words = edit.from
    .trim()
    .split(/\s+/u)
    .filter((word) => word !== '')
  return (
    learnableCategories.has(edit.category) &&
    words.length >= 1 &&
    words.length <= 3 &&
    edit.from !== edit.to
  )
}
