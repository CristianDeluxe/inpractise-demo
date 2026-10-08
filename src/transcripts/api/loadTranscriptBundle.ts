import type { BrowserRuntime } from '@/runtime/BrowserRuntime'
import { loadReviewDecisions } from './loadReviewDecisions'
import { signAudioUrl } from './signAudioUrl'
import type { TranscriptBundle } from './TranscriptBundle'
import type { TranscriptDetailRow } from './TranscriptDetailRow'
import { unwrapRows } from './unwrapRows'

export async function loadTranscriptBundle(
  runtime: BrowserRuntime,
  id: string,
): Promise<TranscriptBundle> {
  const rows = unwrapRows<TranscriptDetailRow[]>(
    await runtime.data
      .from('lab_transcripts')
      .select('transcript,correction,peaks,audio_object')
      .eq('transcript_id', id),
  )
  const row = rows[0]
  if (!row)
    throw new Error('This transcript does not exist or is not shared with you.')
  return {
    transcript: row.transcript,
    correction: row.correction,
    peaks: row.peaks,
    review: await loadReviewDecisions(runtime, id),
    audioUrl:
      row.audio_object === null
        ? null
        : await signAudioUrl(runtime, row.audio_object),
  }
}
