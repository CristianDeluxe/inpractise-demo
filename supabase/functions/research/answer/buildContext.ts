import type { CitationSource } from '../citations/CitationSource.ts'
import { fenceSourceText } from './fenceSourceText.ts'

/**
 * Labels are small integers, not citation ids. A model asked to echo a
 * `document:revision:passage` triple shortens it and the answer is rejected as
 * invalid; a number it cannot mangle, and the server owns the mapping back.
 * The passage text itself is fenced: it is quoted third-party material, not
 * part of the instructions. An offset lets a second group of passages continue
 * the same numbering.
 */
export function buildContext(
  sources: readonly CitationSource[],
  offset = 0,
): string {
  return sources
    .map((source, index) => {
      const label = index + 1 + offset
      return (
        `[${String(label)}] ${source.title} (${source.company}, ${source.kind}` +
        (source.speaker ? `, ${source.speaker}` : '') +
        (source.interviewDate ? `, ${source.interviewDate}` : '') +
        `)\n${fenceSourceText(label, source.text)}`
      )
    })
    .join('\n\n')
}
