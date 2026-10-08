import { join } from 'node:path'
import { episodesRoot } from './episodesRoot.ts'

/** Where the small AAC copy of an episode's audio is written. */
export function webAudioPath(id: string): string {
  return join(episodesRoot, id, 'audio.web.m4a')
}
