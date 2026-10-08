import { isWordBoundary } from './isWordBoundary'

/**
 * Start offsets of case-sensitive occurrences of needle that do not cut a word:
 * an edge of the needle made of a letter or digit must meet a non-word character.
 */
export function wholeWordStarts(text: string, needle: string): number[] {
  if (needle === '') return []
  const checksBefore = !isWordBoundary(needle[0])
  const checksAfter = !isWordBoundary(needle.at(-1))
  const starts: number[] = []
  let position = text.indexOf(needle)
  while (position !== -1) {
    const before = !checksBefore || isWordBoundary(text[position - 1])
    const after = !checksAfter || isWordBoundary(text[position + needle.length])
    if (before && after) starts.push(position)
    position = text.indexOf(needle, position + 1)
  }
  return starts
}
