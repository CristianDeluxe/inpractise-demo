import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { episodesRoot } from './episodesRoot.ts'

/** Episode folders that hold a transcript, in name order. */
export function listEpisodeIds(): string[] {
  return readdirSync(episodesRoot)
    .filter((name) => /^[\w-]{1,64}$/.test(name))
    .filter((name) => existsSync(join(episodesRoot, name, 'transcript.json')))
    .sort()
}
