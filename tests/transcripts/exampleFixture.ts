import type { MemoryExample } from '@/transcripts/contracts/MemoryExample.ts'

export function exampleFixture(
  paragraphId: string,
  raw: string,
): MemoryExample {
  return {
    transcriptId: 'demo0001',
    paragraphId,
    raw,
    corrected: raw.toUpperCase(),
  }
}
