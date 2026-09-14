import type { Citation } from '@/api/Citation'

/** How a passage is credited on screen: the speaker, or the document itself. */
export function citationAttribution(citation: Citation): string {
  if (!citation.speaker) return citation.title
  return citation.speakerRole
    ? `${citation.speaker}, ${citation.speakerRole}`
    : citation.speaker
}
