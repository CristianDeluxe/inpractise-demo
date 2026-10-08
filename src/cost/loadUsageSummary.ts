import type { BrowserRuntime } from '@/runtime/BrowserRuntime'
import { unwrapRows } from '@/transcripts/api/unwrapRows'
import type { UsageDay } from './UsageDay'
import type { UsageRow } from './UsageRow'

/** Reviewer-only; the database raises for anyone else. */
export async function loadUsageSummary(
  runtime: BrowserRuntime,
): Promise<UsageDay[]> {
  const rows = unwrapRows(await runtime.data.rpc('usage_summary')) as UsageRow[]
  return rows.map((row) => ({
    day: row.day,
    requests: row.request_count,
    inputTokens: row.input_tokens,
    outputTokens: row.output_tokens,
    totalTokens: row.tokens_total,
  }))
}
