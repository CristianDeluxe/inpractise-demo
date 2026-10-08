import { readdir } from 'node:fs/promises'
import { isTranscriptId } from './isTranscriptId.ts'
import { summarizeTranscript } from './summarizeTranscript.ts'
import { transcriptsRoot } from './transcriptsRoot.ts'

export async function listTranscriptSummaries() {
  const names = await readdir(transcriptsRoot).catch(() => [])
  const summaries = await Promise.all(
    names.filter((name) => isTranscriptId(name)).map(summarizeTranscript),
  )
  return summaries.filter((summary) => summary !== null)
}
