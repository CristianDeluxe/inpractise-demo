import type { BrowserRuntime } from '@/runtime/BrowserRuntime'
import type { DecisionsRow } from '@/transcripts/api/DecisionsRow'
import { unwrapRows } from '@/transcripts/api/unwrapRows'
import { buildCostRow } from './buildCostRow'
import { costColumns } from './costColumns'
import type { CostRecord } from './CostRecord'
import type { CostRow } from './CostRow'

/** The cost columns say what each episode used; the reviews hold the decision timestamps. */
export async function loadCostRows(
  runtime: BrowserRuntime,
): Promise<CostRow[]> {
  const records = unwrapRows<CostRecord[]>(
    await runtime.data
      .from('lab_transcripts')
      .select(costColumns)
      .order('transcript_id'),
  )
  const reviews = unwrapRows<DecisionsRow[]>(
    await runtime.data.from('lab_reviews').select('transcript_id,decisions'),
  )
  return records.map((record) =>
    buildCostRow(
      record,
      reviews.find((review) => review.transcript_id === record.transcript_id)
        ?.decisions ?? [],
    ),
  )
}
