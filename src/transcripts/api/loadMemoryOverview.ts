import { fetchLabJson } from './fetchLabJson'
import type { MemoryOverview } from './MemoryOverview'

export async function loadMemoryOverview() {
  return (await fetchLabJson('/memory')) as MemoryOverview
}
