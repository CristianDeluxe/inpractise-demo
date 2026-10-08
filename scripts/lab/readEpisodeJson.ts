import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { episodesRoot } from './episodesRoot.ts'

/** Parsed JSON file of an episode folder; null when the file does not exist. */
export function readEpisodeJson(id: string, file: string): unknown {
  const path = join(episodesRoot, id, file)
  if (!existsSync(path)) return null
  return JSON.parse(readFileSync(path, 'utf8')) as unknown
}
