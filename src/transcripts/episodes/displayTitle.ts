import { episodeDirectory } from './episodeDirectory'

/** The short title for a known episode; the recorded title for any other. */
export function displayTitle(id: string, recordedTitle: string): string {
  return episodeDirectory[id]?.title ?? recordedTitle
}
