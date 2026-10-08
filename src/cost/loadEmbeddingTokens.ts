import type { BrowserRuntime } from '@/runtime/BrowserRuntime'
import { unwrapRows } from '@/transcripts/api/unwrapRows'
import type { PassageTokenRow } from './PassageTokenRow'

/** Stored token counts of the passages the caller may read: what embedding one copy of them consumes. */
export async function loadEmbeddingTokens(
  runtime: BrowserRuntime,
): Promise<number> {
  const rows = unwrapRows<PassageTokenRow[]>(
    await runtime.data.from('passages').select('token_count'),
  )
  return rows.reduce((total, row) => total + row.token_count, 0)
}
