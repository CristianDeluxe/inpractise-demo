/** Follows matching words from (x, x - k) and returns the x where they stop matching. */
export function slideDiagonal(
  a: readonly string[],
  b: readonly string[],
  start: number,
  k: number,
): number {
  let x = start
  while (x < a.length && x - k < b.length && a[x] === b[x - k]) x += 1
  return x
}
