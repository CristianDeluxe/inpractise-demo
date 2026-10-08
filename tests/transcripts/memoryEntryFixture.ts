import type { MemoryEntry } from '@/transcripts/contracts/MemoryEntry.ts'

export function memoryEntryFixture(
  overrides: Partial<MemoryEntry> = {},
): MemoryEntry {
  return {
    from: 'Acme Corp',
    to: 'ACME Corporation',
    category: 'entity',
    occurrences: 1,
    sources: ['demo0001'],
    lastSeenAt: '2026-01-01T00:00:00.000Z',
    ...overrides,
  }
}
