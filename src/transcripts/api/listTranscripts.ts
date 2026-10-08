import type { BrowserRuntime } from '@/runtime/BrowserRuntime'
import type { TranscriptSummary } from '../contracts/TranscriptSummary'
import { reliabilityForDecisions } from '../reliability/reliabilityForDecisions'
import type { DecisionsRow } from './DecisionsRow'
import { listColumns } from './listColumns'
import type { TranscriptListRow } from './TranscriptListRow'
import { unwrapRows } from './unwrapRows'

/** Row-level security limits both queries to the caller's organisation. */
export async function listTranscripts(
  runtime: BrowserRuntime,
): Promise<TranscriptSummary[]> {
  const transcripts = unwrapRows<TranscriptListRow[]>(
    await runtime.data
      .from('lab_transcripts')
      .select(listColumns)
      .order('transcript_id'),
  )
  const reviews = unwrapRows<DecisionsRow[]>(
    await runtime.data.from('lab_reviews').select('transcript_id,decisions'),
  )
  return transcripts.map((row) => {
    const decisions =
      reviews.find((review) => review.transcript_id === row.transcript_id)
        ?.decisions ?? []
    return {
      id: row.transcript_id,
      source: row.source,
      stats: row.stats,
      hasCorrection: row.correction_model !== null,
      edits: row.edit_count,
      reviewed: decisions.length,
      reliability: reliabilityForDecisions(
        row.transcript,
        row.correction,
        decisions,
      ),
    }
  })
}
