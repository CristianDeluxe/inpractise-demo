import type { CorrectionEdit } from '../contracts/CorrectionEdit'

export function countByCategory(edits: readonly CorrectionEdit[]) {
  const counts = new Map<string, number>()
  for (const edit of edits) {
    counts.set(edit.category, (counts.get(edit.category) ?? 0) + 1)
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1])
}
