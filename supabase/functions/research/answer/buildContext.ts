import type { CitationSource } from '../citations/CitationSource.ts'
import { fenceSourceText } from './fenceSourceText.ts'

/**
 * Labels are small integers, not citation ids. A model asked to echo a
 * `document:revision:passage` triple shortens it and the answer is rejected as
 * invalid; a number it cannot mangle, and the server owns the mapping back.
 * The passage text itself is fenced: it is quoted third-party material, not
 * part of the instructions.
 */
export function buildContext(sources: readonly CitationSource[]): string {
  return sources
    .map(
      (source, index) =>
        `[${String(index + 1)}] ${source.title} (${source.company}, ${source.kind}` +
        (source.speaker ? `, ${source.speaker}` : '') +
        (source.interviewDate ? `, ${source.interviewDate}` : '') +
        `)\n${fenceSourceText(index + 1, source.text)}`,
    )
    .join('\n\n')
}
