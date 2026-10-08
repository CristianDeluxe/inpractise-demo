import type { MemoryEntry } from '@/transcripts/contracts/MemoryEntry.ts'
import { existsSync } from 'node:fs'
import { z } from 'zod'
import { MemoryEntrySchema } from './MemoryEntrySchema.ts'
import { memoryPath } from './memoryPath.ts'
import { readJsonFile } from './readJsonFile.ts'

export function readGlossary(): MemoryEntry[] {
  const path = memoryPath('glossary.json')
  return existsSync(path) ? readJsonFile(path, z.array(MemoryEntrySchema)) : []
}
