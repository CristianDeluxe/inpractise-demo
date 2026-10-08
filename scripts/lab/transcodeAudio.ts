import { execFileSync } from 'node:child_process'
import { existsSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { episodesRoot } from './episodesRoot.ts'
import { ffmpegArguments } from './ffmpegArguments.ts'
import { webAudioPath } from './webAudioPath.ts'

/**
 * Mono AAC at 48 kbps with the index up front, so a browser can start and seek
 * through range requests. A copy newer than its source is reused.
 */
export function transcodeAudio(id: string): string {
  const source = join(episodesRoot, id, 'audio.m4a')
  const target = webAudioPath(id)
  if (!existsSync(source)) throw new Error(`Missing audio source for ${id}`)
  if (
    existsSync(target) &&
    statSync(target).mtimeMs >= statSync(source).mtimeMs
  )
    return target
  execFileSync('ffmpeg', ffmpegArguments(source, target), { stdio: 'inherit' })
  return target
}
