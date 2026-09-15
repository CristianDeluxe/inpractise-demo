/**
 * Where a query vector came from. `stored` settles when a fresh vector has
 * been offered to the cache, so a caller can overlap that write with
 * retrieval rather than wait for it first or abandon it.
 */
export type QueryEmbedding = {
  vector: number[] | null
  source: 'cached' | 'fresh' | 'unavailable'
  stored: Promise<void>
}
