import { isWordCharacter } from './isWordCharacter.ts'

/** Start offsets of case-sensitive occurrences bounded by non-word characters. */
export function findWholeWordOccurrences(
  text: string,
  needle: string,
): number[] {
  if (needle === '') return []
  const starts: number[] = []
  let position = text.indexOf(needle)
  while (position !== -1) {
    const before = text[position - 1]
    const after = text[position + needle.length]
    if (!isWordCharacter(before) && !isWordCharacter(after))
      starts.push(position)
    position = text.indexOf(needle, position + 1)
  }
  return starts
}
