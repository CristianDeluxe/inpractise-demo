import type { HunkCategory } from './HunkCategory.ts'

export type HunkTally = {
  readonly from: string
  readonly to: string
  readonly category: HunkCategory
  readonly count: number
  readonly sources: readonly string[]
}
