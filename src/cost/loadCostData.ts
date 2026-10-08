import type { BrowserRuntime } from '@/runtime/BrowserRuntime'
import type { CostData } from './CostData'
import { loadCostRows } from './loadCostRows'
import { loadEmbeddingTokens } from './loadEmbeddingTokens'
import { loadUsageSummary } from './loadUsageSummary'

export async function loadCostData(
  runtime: BrowserRuntime,
  isReviewer: boolean,
): Promise<CostData> {
  const [rows, embeddingTokens, usage] = await Promise.all([
    loadCostRows(runtime),
    loadEmbeddingTokens(runtime),
    isReviewer ? loadUsageSummary(runtime) : null,
  ])
  return { rows, embeddingTokens, usage }
}
