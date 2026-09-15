/** A deterministic 1536-dimension vector, the shape the embedding model returns. */
export function embeddingVectorFixture(seed = 1): number[] {
  return Array.from({ length: 1_536 }, (_, index) => (index + seed) / 1_536)
}
