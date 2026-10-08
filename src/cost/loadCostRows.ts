import { listTranscripts } from '@/transcripts/api/listTranscripts'
import { loadTranscriptBundle } from '@/transcripts/api/loadTranscriptBundle'
import { buildCostRow } from './buildCostRow'
import type { CostRow } from './CostRow'

/** The list says what exists; each bundle holds the decision timestamps. */
export async function loadCostRows(): Promise<CostRow[]> {
  const summaries = await listTranscripts()
  return Promise.all(
    summaries.map(async (summary) =>
      buildCostRow(summary, await loadTranscriptBundle(summary.id)),
    ),
  )
}
