import type { ClassifiedHunk } from './ClassifiedHunk.ts'
import { classifyHunk } from './classifyHunk.ts'
import type { Hunk } from './Hunk.ts'
import { stripEdgePunctuation } from './stripEdgePunctuation.ts'

/** Classifies hunks, dropping the ones that carry no learnable signal and trimming edge punctuation. */
export function classifyHunks(hunks: readonly Hunk[]): ClassifiedHunk[] {
  return hunks.flatMap((hunk) => {
    const category = classifyHunk(hunk)
    return category === null
      ? []
      : [
          {
            from: stripEdgePunctuation(hunk.from),
            to: stripEdgePunctuation(hunk.to),
            category,
          },
        ]
  })
}
