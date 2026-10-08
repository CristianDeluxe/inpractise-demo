/** True when both positions exist and hold the same non-empty key. */
export function isKeyMatch(
  left: readonly string[],
  right: readonly string[],
  i: number,
  j: number,
) {
  return (
    i < left.length &&
    j < right.length &&
    left[i] === right[j] &&
    left[i] !== ''
  )
}
