import { assertStoredVector } from './assertStoredVector.ts'
import type { CorpusDocument } from './CorpusDocument.ts'
import { readEmbedding } from './readEmbedding.ts'

export function assertStoredPassage(
  stored: Record<string, unknown>,
  passage: CorpusDocument['passages'][number],
  indexMode: 'hybrid' | 'lexical_only',
): void {
  const expected = {
    text_content: passage.text,
    ordinal: passage.ordinal,
    section: passage.section,
    speaker: passage.speaker,
    speaker_role: passage.speakerRole,
    token_count: passage.tokenCount + passage.metadataTokenCount,
    embedding_model: 'text-embedding-3-small',
  }
  for (const key of Object.keys(expected) as (keyof typeof expected)[])
    if (stored[key] !== expected[key])
      throw new Error('Existing passage mismatch')
  if (indexMode === 'lexical_only') {
    if (stored['embedding'] !== null)
      throw new Error('Unexpected vector in lexical-only revision')
    return
  }
  const expectedVector = readEmbedding(passage.text)?.vector
  if (!expectedVector) throw new Error('Persisted embedding artifact missing')
  assertStoredVector(stored['embedding'], expectedVector)
}
