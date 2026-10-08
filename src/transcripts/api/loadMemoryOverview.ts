import type { BrowserRuntime } from '@/runtime/BrowserRuntime'
import type { MemoryOverview } from './MemoryOverview'
import type { MemoryRow } from './MemoryRow'
import { unwrapRows } from './unwrapRows'

/** An organisation with no memory row yet has an empty glossary. */
export async function loadMemoryOverview(
  runtime: BrowserRuntime,
): Promise<MemoryOverview> {
  const rows = unwrapRows<MemoryRow[]>(
    await runtime.data.from('lab_memory').select('glossary,example_count'),
  )
  return {
    glossary: rows[0]?.glossary ?? [],
    examples: rows[0]?.example_count ?? 0,
  }
}
