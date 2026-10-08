import { fetchLabJson } from './fetchLabJson'
import type { TranscriptBundle } from './TranscriptBundle'

export async function loadTranscriptBundle(id: string) {
  return (await fetchLabJson(
    `/transcripts/${encodeURIComponent(id)}`,
  )) as TranscriptBundle
}
