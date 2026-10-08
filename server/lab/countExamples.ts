import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { transcriptsRoot } from './transcriptsRoot.ts'

export async function countExamples() {
  try {
    const text = await readFile(
      join(transcriptsRoot, 'memory', 'examples.jsonl'),
      'utf8',
    )
    return text.split('\n').filter((line) => line.trim() !== '').length
  } catch {
    return 0
  }
}
