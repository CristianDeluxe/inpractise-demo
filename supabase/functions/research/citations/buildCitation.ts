import type { Citation } from './Citation.ts'
import type { CitationSource } from './CitationSource.ts'
import { readerPath } from './readerPath.ts'

/**
 * The quote is the whole immutable passage, so the offsets are the passage's own
 * bounds. A shorter string that merely occurs in the source is not a citation.
 */
export function buildCitation(source: CitationSource): Citation {
  return {
    citationId: `${source.documentId}:${source.revisionId}:${source.passageId}`,
    documentId: source.documentId,
    revisionId: source.revisionId,
    passageId: source.passageId,
    quote: source.text,
    startChar: 0,
    endChar: Array.from(source.text).length,
    title: source.title,
    company: source.company,
    origin: source.origin,
    kind: source.kind,
    speaker: source.speaker,
    speakerRole: source.speakerRole,
    interviewDate: source.interviewDate,
    publishedAt: source.publishedAt,
    sourceUrl: source.sourceUrl,
    readerPath: readerPath(
      source.documentId,
      source.revisionId,
      source.passageId,
    ),
  }
}
