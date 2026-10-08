import type { Hunk } from './Hunk.ts'
import type { HunkCategory } from './HunkCategory.ts'

export type ClassifiedHunk = Hunk & {
  readonly category: HunkCategory
}
