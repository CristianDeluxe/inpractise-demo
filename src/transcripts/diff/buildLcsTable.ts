import { lcsAt } from './lcsAt'

/** table[i][j] is the longest common subsequence length of left[i:] and right[j:]. */
export function buildLcsTable(
  left: readonly string[],
  right: readonly string[],
): number[][] {
  const table = Array.from({ length: left.length + 1 }, () =>
    Array.from({ length: right.length + 1 }, () => 0),
  )
  for (let i = left.length - 1; i >= 0; i -= 1) {
    for (let j = right.length - 1; j >= 0; j -= 1) {
      const row = table[i]
      if (row === undefined) continue
      row[j] =
        left[i] === right[j]
          ? lcsAt(table, i + 1, j + 1) + 1
          : Math.max(lcsAt(table, i + 1, j), lcsAt(table, i, j + 1))
    }
  }
  return table
}
