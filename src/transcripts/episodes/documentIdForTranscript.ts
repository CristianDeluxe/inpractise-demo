import { episodeDirectory } from './episodeDirectory'

export function documentIdForTranscript(id: string): string | undefined {
  return episodeDirectory[id]?.documentId
}
