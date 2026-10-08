/** The row an offset falls in: how many breaks sit at or before it. */
export function rowOfOffset(breaks: readonly number[], offset: number) {
  return breaks.filter((point) => point <= offset).length
}
