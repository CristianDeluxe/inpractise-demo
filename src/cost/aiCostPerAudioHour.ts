import type { CostRow } from './CostRow'

/** API cost scaled to one hour of audio; undefined without a priced AI pass. */
export function aiCostPerAudioHour(row: CostRow): number | undefined {
  if (row.aiCostUsd === undefined || row.audioSeconds <= 0) return undefined
  return row.aiCostUsd / (row.audioSeconds / 3600)
}
