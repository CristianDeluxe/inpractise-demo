/** Start offset of each word in the words joined by single spaces. */
export function wordOffsets(words: readonly string[]): number[] {
  const offsets: number[] = []
  let offset = 0
  for (const word of words) {
    offsets.push(offset)
    offset += word.length + 1
  }
  return offsets
}
