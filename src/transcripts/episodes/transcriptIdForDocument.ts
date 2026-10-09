import { episodeDirectory } from './episodeDirectory'

export function transcriptIdForDocument(
  documentId: string,
): string | undefined {
  return Object.keys(episodeDirectory).find(
    (id) => episodeDirectory[id]?.documentId === documentId,
  )
}
