import { join } from 'node:path'
import { countExamples } from './countExamples.ts'
import { readJsonFile } from './readJsonFile.ts'
import { transcriptsRoot } from './transcriptsRoot.ts'

export async function readMemoryOverview() {
  const glossary = await readJsonFile(
    join(transcriptsRoot, 'memory', 'glossary.json'),
  )
  return {
    glossary: Array.isArray(glossary) ? (glossary as unknown[]) : [],
    examples: await countExamples(),
  }
}
