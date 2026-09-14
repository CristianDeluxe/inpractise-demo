import { mkdirSync } from 'node:fs'
import type { CorpusDocument } from './CorpusDocument.ts'
import { embedBatch } from './embedBatch.ts'
import { persistEmbeddingBatch } from './persistEmbeddingBatch.ts'
import { readEmbedding } from './readEmbedding.ts'

/**
 * Checkpoint each successful batch before surfacing a sibling batch's failure.
 * Waiting for both settled outcomes preserves completed paid work for a retry;
 * only texts without a validated persisted artifact are sent again.
 */
export async function embedDocuments(
  documents: CorpusDocument[],
  apiKey: string,
): Promise<void> {
  mkdirSync('supabase/.temp/embeddings', { recursive: true })
  const texts = [
    ...new Set(
      documents.flatMap((document) => document.passages.map((p) => p.text)),
    ),
  ]
  const pending = texts.filter((text) => !readEmbedding(text))
  let inputTokens = 0
  let unknownUsageBatches = 0
  for (let offset = 0; offset < pending.length; offset += 32) {
    const batches = [
      pending.slice(offset, offset + 16),
      pending.slice(offset + 16, offset + 32),
    ].filter((batch) => batch.length)
    const results = await Promise.allSettled(
      batches.map(async (batch) => {
        const response = await embedBatch(batch, apiKey)
        persistEmbeddingBatch(batch, response)
        inputTokens += response.inputTokens ?? 0
        unknownUsageBatches += response.inputTokens === null ? 1 : 0
        console.log(
          JSON.stringify({
            event: 'embedding_batch_checkpoint',
            texts: batch.length,
            inputTokens: response.inputTokens,
          }),
        )
      }),
    )
    for (const result of results)
      if (result.status === 'rejected') throw result.reason
  }
  console.log(
    JSON.stringify({
      embeddingTexts: texts.length,
      reused: texts.length - pending.length,
      created: pending.length,
      dimensions: 1536,
      inputTokens,
      unknownUsageBatches,
    }),
  )
}
