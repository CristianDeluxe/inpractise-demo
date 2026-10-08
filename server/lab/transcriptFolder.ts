import { join } from 'node:path'
import { transcriptsRoot } from './transcriptsRoot.ts'

/** The caller must have validated the id with isTranscriptId. */
export function transcriptFolder(id: string) {
  return join(transcriptsRoot, id)
}
