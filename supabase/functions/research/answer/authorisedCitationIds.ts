import type { CitationSource } from '../citations/CitationSource.ts'

/** The citation ids the caller could still read on the re-read pass. */
export function authorisedCitationIds(
  sources: readonly CitationSource[],
): ReadonlySet<string> {
  return new Set(
    sources.map(
      (source) =>
        `${source.documentId}:${source.revisionId}:${source.passageId}`,
    ),
  )
}
