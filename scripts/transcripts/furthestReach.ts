/** Furthest x on diagonal k after round d: step down from k+1, or right from k-1. */
export function furthestReach(
  v: Int32Array,
  offset: number,
  k: number,
  d: number,
): number {
  const below = v[offset + k - 1] ?? 0
  const above = v[offset + k + 1] ?? 0
  const down = k === -d || (k !== d && below < above)
  return down ? above : below + 1
}
