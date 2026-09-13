import { describe, expect, it } from 'vitest'
import { EmbeddingArtifactSchema } from '../../scripts/db/EmbeddingArtifactSchema.ts'
import { requireVariable } from '../../scripts/db/requireVariable.ts'
import { retrievalOutputPath } from '../../scripts/db/retrievalOutputPath.ts'

// Reject malformed inputs instead of supplying values that could make a gate pass.
describe('verification input boundaries', () => {
  it('requires an own, non-empty environment value', () => {
    expect(() => requireVariable({}, 'toString')).toThrow(
      'Missing variables: toString',
    )
    expect(() => requireVariable({ TOKEN: '' }, 'TOKEN')).toThrow(
      'Missing variables: TOKEN',
    )
    expect(requireVariable({ TOKEN: 'fixture-value' }, 'TOKEN')).toBe(
      'fixture-value',
    )
  })

  it('rejects missing report arguments and paths escaping the report directory', () => {
    expect(() => retrievalOutputPath(['--out'])).toThrow(
      'Report path must be inside',
    )
    expect(() =>
      retrievalOutputPath(['--out', 'supabase/.temp/../../escape.json']),
    ).toThrow('Report path must be inside')
    expect(retrievalOutputPath(['--out', 'supabase/.temp/report.json'])).toBe(
      'supabase/.temp/report.json',
    )
  })

  it('validates persisted vector dimensions, model and finite numbers at runtime', () => {
    const artifact = {
      model: 'text-embedding-3-small',
      dimensions: 1536,
      textHash: 'fixture',
      vector: Array.from({ length: 1536 }, () => 0.1),
      vectorHash: 'fixture',
      inputTokens: null,
    }
    expect(EmbeddingArtifactSchema.safeParse(artifact).success).toBe(true)
    expect(
      EmbeddingArtifactSchema.safeParse({ ...artifact, model: 'unexpected' })
        .success,
    ).toBe(false)
    expect(
      EmbeddingArtifactSchema.safeParse({ ...artifact, dimensions: 3 }).success,
    ).toBe(false)
    expect(
      EmbeddingArtifactSchema.safeParse({ ...artifact, vector: [0.1] }).success,
    ).toBe(false)
    expect(
      EmbeddingArtifactSchema.safeParse({
        ...artifact,
        vector: artifact.vector.map(() => Infinity),
      }).success,
    ).toBe(false)
  })
})
