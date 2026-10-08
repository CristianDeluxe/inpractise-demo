/** The raw word covering a character offset; a space belongs to the word before it. */
export function rawWordIndexAt(
  offsets: readonly number[],
  position: number,
): number {
  return Math.max(
    0,
    offsets.findLastIndex((offset) => offset <= position),
  )
}
