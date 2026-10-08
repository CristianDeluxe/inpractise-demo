import type { MemoryExample } from '@/transcripts/contracts/MemoryExample.ts'
import { existsSync, readFileSync } from 'node:fs'
import { MemoryExampleSchema } from './MemoryExampleSchema.ts'
import { memoryPath } from './memoryPath.ts'

export function readExamples(): MemoryExample[] {
  const path = memoryPath('examples.jsonl')
  if (!existsSync(path)) return []
  return readFileSync(path, 'utf8')
    .split('\n')
    .filter((line) => line.trim() !== '')
    .map((line) => MemoryExampleSchema.parse(JSON.parse(line)))
}
