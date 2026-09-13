export type EmbeddingArtifact = {
  model: 'text-embedding-3-small'
  dimensions: 1536
  textHash: string
  vector: number[]
  vectorHash: string
  inputTokens: number | null
}
