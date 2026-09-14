import { getEncoding } from 'js-tiktoken'
import type { CorpusDocument } from '../CorpusDocument.ts'

/**
 * Recompute both text and attribution costs before accepting the declared budget.
 * The 500-token passage ceiling includes metadata, so budgeting only the quote
 * would undercount the context that retrieval selection is allowed to admit.
 */
export function validatePassageTokens(document: CorpusDocument): void {
  const tokenizer = getEncoding('cl100k_base')
  for (const p of document.passages) {
    const tokens = tokenizer.encode(p.text).length
    const metadata = tokenizer.encode(
      [
        document.title,
        document.company,
        p.speaker,
        p.speakerRole,
        p.section,
      ].join('\n'),
    ).length
    if (
      tokens !== p.tokenCount ||
      metadata !== p.metadataTokenCount ||
      tokens + metadata > 500
    )
      throw new Error(
        `Passage token count mismatch: ${document.documentId}/${p.passageId}`,
      )
  }
}
