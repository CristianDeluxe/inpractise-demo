export function audioUrl(id: string) {
  return `/local-api/transcripts/${encodeURIComponent(id)}/audio`
}
