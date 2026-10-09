/** Index of the last block starting at or before a second; 0 before the first. */
export function runIndexAt(starts: readonly number[], seconds: number) {
  return Math.max(
    0,
    starts.findLastIndex((start) => start <= seconds + 0.05),
  )
}
