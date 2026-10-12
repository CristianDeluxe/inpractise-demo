import type { MemoryBasis } from '@/transcripts/contracts/MemoryBasis.ts'

/** Once a person has vouched for a substitution, a machine signal does not downgrade it. */
export function strongerBasis(a: MemoryBasis, b: MemoryBasis): MemoryBasis {
  return a === 'human' || b === 'human' ? 'human' : 'references'
}
