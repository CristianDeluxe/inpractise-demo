import { renameSync, writeFileSync } from 'node:fs'
import type { EmbeddingBatchResult } from './EmbeddingBatchResult.ts'
import { sha256 } from './sha256.ts'

export function persistEmbeddingBatch(
  batch: string[],
  response: EmbeddingBatchResult,
): void {
  for (const [index, text] of batch.entries()) {
    const textHash = sha256(`text-embedding-3-small:1536:${text}`)
    const vector = response.vectors[index]
    if (!vector)
      throw new Error('Embedding provider omitted a requested vector')
    const path = `supabase/.temp/embeddings/${textHash}.json`
    writeFileSync(
      `${path}.tmp`,
      JSON.stringify({
        model: 'text-embedding-3-small',
        dimensions: 1536,
        textHash,
        vector,
        vectorHash: sha256(JSON.stringify(vector)),
        inputTokens: response.inputTokens,
      }),
      { mode: 0o600 },
    )
    renameSync(`${path}.tmp`, path)
  }
}
