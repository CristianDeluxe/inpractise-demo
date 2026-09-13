import { embedBatch } from '../scripts/db/embedBatch.ts'

/** The same embedding model the corpus was indexed with; a different one would
 *  measure a retrieval system that does not exist. */
export async function embedQuestion(
  question: string,
  apiKey: string,
): Promise<number[]> {
  const batch = await embedBatch([question], apiKey)
  const vector = batch.vectors[0]
  if (!vector) throw new Error('Question embedding missing')
  return vector
}
