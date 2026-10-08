import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { episodesRoot } from './episodesRoot.ts'
import type { MemorySnapshot } from './MemorySnapshot.ts'

/** The learned glossary and the number of stored examples; empty when none were learned yet. */
export function readMemorySnapshot(): MemorySnapshot {
  const glossaryPath = join(episodesRoot, 'memory', 'glossary.json')
  const examplesPath = join(episodesRoot, 'memory', 'examples.jsonl')
  const glossary: unknown = existsSync(glossaryPath)
    ? JSON.parse(readFileSync(glossaryPath, 'utf8'))
    : []
  const examples = existsSync(examplesPath)
    ? readFileSync(examplesPath, 'utf8')
        .split('\n')
        .filter((line) => line.trim() !== '').length
    : 0
  return {
    glossary: Array.isArray(glossary) ? (glossary as unknown[]) : [],
    example_count: examples,
  }
}
