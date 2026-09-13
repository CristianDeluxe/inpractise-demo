import { existsSync, readFileSync } from 'node:fs'
import type { EmbeddingArtifact } from './EmbeddingArtifact.ts'
import { EmbeddingArtifactSchema } from './EmbeddingArtifactSchema.ts'
import { sha256 } from './sha256.ts'

export function readEmbedding(text: string): EmbeddingArtifact | null {
  const textHash = sha256(`text-embedding-3-small:1536:${text}`)
  const path = `supabase/.temp/embeddings/${textHash}.json`
  if (!existsSync(path)) return null
  const artifact = EmbeddingArtifactSchema.parse(
    JSON.parse(readFileSync(path, 'utf8')),
  )
  if (
    artifact.textHash !== textHash ||
    !artifact.vector.some((n) => n !== 0) ||
    artifact.vectorHash !== sha256(JSON.stringify(artifact.vector))
  )
    throw new Error('Invalid persisted embedding artifact')
  return artifact
}
