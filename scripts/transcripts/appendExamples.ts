import type { MemoryExample } from '@/transcripts/contracts/MemoryExample.ts'
import { appendFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { memoryPath } from './memoryPath.ts'

export function appendExamples(examples: readonly MemoryExample[]): void {
  if (examples.length === 0) return
  const path = memoryPath('examples.jsonl')
  mkdirSync(dirname(path), { recursive: true })
  appendFileSync(
    path,
    examples.map((example) => `${JSON.stringify(example)}\n`).join(''),
  )
}
