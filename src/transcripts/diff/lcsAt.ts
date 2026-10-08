export function lcsAt(
  table: readonly (readonly number[])[],
  i: number,
  j: number,
) {
  return table[i]?.[j] ?? 0
}
