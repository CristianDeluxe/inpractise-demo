import { describe, expect, it } from 'vitest'
import { assertStoredPassage } from '../../scripts/db/assertStoredPassage.ts'
import { loadCorpus } from '../../scripts/db/loadCorpus.ts'
import { readEmbedding } from '../../scripts/db/readEmbedding.ts'
import { requireValue } from '../assertions/requireValue.ts'

describe('persisted vector verification', () => {
  it('accepts PostgreSQL float32 serialization and rejects an altered staged vector', () => {
    const passage = requireValue(requireValue(loadCorpus()[0]).passages[0])
    const artifact = requireValue(readEmbedding(passage.text))
    const stored = {
      text_content: passage.text,
      ordinal: passage.ordinal,
      section: passage.section,
      speaker: passage.speaker,
      speaker_role: passage.speakerRole,
      token_count: passage.tokenCount + passage.metadataTokenCount,
      embedding_model: 'text-embedding-3-small',
      embedding: JSON.stringify(artifact.vector.map(Math.fround)),
    }
    expect(() => {
      assertStoredPassage(stored, passage, 'hybrid')
    }).not.toThrow()
    const changed = artifact.vector.map(Math.fround)
    changed[0] = requireValue(changed[0]) + 0.1
    stored.embedding = JSON.stringify(changed)
    expect(() => {
      assertStoredPassage(stored, passage, 'hybrid')
    }).toThrow('Persisted database vector mismatch')
  })
})
