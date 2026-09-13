import { readFile } from 'node:fs/promises'
import { createGenerationRecord } from './createGenerationRecord.mjs'
import { generationRound } from './generationRound.mjs'
import { readJson } from './readJson.mjs'
import { sha256 } from './sha256.mjs'

export async function readGenerationRound(root, core) {
  const prompt = await readFile(`${root}/${generationRound.promptPath}`, 'utf8')
  const records = []
  for (const source of core.documents.filter((document) =>
    generationRound.sourceIds.includes(document.sourceId),
  )) {
    try {
      const record = await readJson(
        `${root}/${generationRound.directory}/${source.documentId}.generation.json`,
      )
      if (record.promptSha256 !== sha256(prompt))
        throw new Error('GENERATION_PROMPT_CHANGED')
      records.push(record)
    } catch (error) {
      if (error.code !== 'ENOENT') throw error
      records.push(createGenerationRecord(source, prompt))
    }
  }
  return { ...generationRound, promptSha256: sha256(prompt), records }
}
