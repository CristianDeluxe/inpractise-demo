/** Character offset of each word in the paragraph text the review builds (words joined by single spaces). */
export function wordStartOffsets(words: readonly string[]): number[] {
  let position = 0
  return words.map((word) => {
    const start = position
    position += word.length + 1
    return start
  })
}
