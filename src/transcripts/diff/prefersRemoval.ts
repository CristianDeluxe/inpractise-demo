import { lcsAt } from './lcsAt'

/** Whether the next diff step should drop a left token rather than add a right one. */
export function prefersRemoval(
  table: readonly (readonly number[])[],
  i: number,
  j: number,
) {
  const leftLength = table.length - 1
  const rightLength = (table[0]?.length ?? 1) - 1
  if (j >= rightLength) return true
  if (i >= leftLength) return false
  return lcsAt(table, i + 1, j) >= lcsAt(table, i, j + 1)
}
