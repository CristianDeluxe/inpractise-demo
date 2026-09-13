import type { CitationSource } from '../citations/CitationSource.ts'

/**
 * Labels are small integers, not citation ids. A model asked to echo a
 * `document:revision:passage` triple shortens it and the answer is rejected as
 * invalid; a number it cannot mangle, and the server owns the mapping back.
 */
export function buildContext(sources: readonly CitationSource[]): string {
  return sources
    .map(
      (source, index) =>
        `[${String(index + 1)}] ${source.title} (${source.company}, ${source.kind}` +
        (source.speaker ? `, ${source.speaker}` : '') +
        (source.interviewDate ? `, ${source.interviewDate}` : '') +
        `)\n${source.text}`,
    )
    .join('\n\n')
}
