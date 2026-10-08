import type { Replacement } from './Replacement.ts'

/** Applies non-overlapping replacements in one left-to-right pass. */
export function applyReplacements(
  text: string,
  replacements: readonly Replacement[],
): string {
  const ordered = replacements.toSorted((a, b) => a.start - b.start)
  let output = ''
  let cursor = 0
  for (const replacement of ordered) {
    output += text.slice(cursor, replacement.start) + replacement.text
    cursor = replacement.end
  }
  return output + text.slice(cursor)
}
