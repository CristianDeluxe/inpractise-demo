import { join } from 'node:path'
import { transcriptsRoot } from './transcriptsRoot.ts'

export function transcriptPath(id: string, file: string): string {
  return join(transcriptsRoot, id, file)
}
