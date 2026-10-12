import type { MemoryBasis } from '../contracts/MemoryBasis'

/** Rows stored before the basis existed carry none; they were learned from a person. */
export function basisLabel(basis: MemoryBasis | undefined): string {
  return basis === 'references' ? 'References' : 'Reviewer'
}
