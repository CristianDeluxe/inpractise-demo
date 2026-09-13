import type { CorpusDocument } from './CorpusDocument.ts'
import type { PassageImport } from './PassageImport.ts'
import { readEmbedding } from './readEmbedding.ts'

export function toPassageRow(
  context: PassageImport,
  passage: CorpusDocument['passages'][number],
) {
  const { document, orgId, indexMode } = context
  const embedding = indexMode === 'hybrid' ? readEmbedding(passage.text) : null
  if (indexMode === 'hybrid' && !embedding)
    throw new Error('Embedding missing; run pnpm db:embed')
  return {
    org_id: orgId,
    document_id: document.documentId,
    revision_id: document.revisionId,
    passage_id: passage.passageId,
    ordinal: passage.ordinal,
    section: passage.section,
    speaker: passage.speaker,
    speaker_role: passage.speakerRole,
    text_content: passage.text,
    token_count: passage.tokenCount + passage.metadataTokenCount,
    embedding: embedding ? JSON.stringify(embedding.vector) : null,
    embedding_model: 'text-embedding-3-small',
  }
}
