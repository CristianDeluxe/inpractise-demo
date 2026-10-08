import type { TranscriptSummary } from '../contracts/TranscriptSummary'
import { fetchLabJson } from './fetchLabJson'

export async function listTranscripts() {
  return (await fetchLabJson('/transcripts')) as TranscriptSummary[]
}
