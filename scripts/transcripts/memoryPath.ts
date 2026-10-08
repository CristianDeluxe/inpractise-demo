import { join } from 'node:path'
import { transcriptsRoot } from './transcriptsRoot.ts'

export function memoryPath(file: string): string {
  return join(transcriptsRoot, 'memory', file)
}
