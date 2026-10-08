import type { MemoryEntry } from '@/transcripts/contracts/MemoryEntry.ts'
import { memoryPath } from './memoryPath.ts'
import { writeJsonFile } from './writeJsonFile.ts'

export function writeGlossary(entries: readonly MemoryEntry[]): void {
  writeJsonFile(memoryPath('glossary.json'), entries)
}
