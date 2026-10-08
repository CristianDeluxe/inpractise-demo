import { statSync } from 'node:fs'
import { maxAudioBytes } from './maxAudioBytes.ts'

/** Returns the size in bytes, or throws when the copy is too large to publish. */
export function assertAudioSize(path: string): number {
  const { size } = statSync(path)
  if (size > maxAudioBytes)
    throw new Error(
      `${path} is ${String(size)} bytes; the limit is ${String(maxAudioBytes)}`,
    )
  return size
}
