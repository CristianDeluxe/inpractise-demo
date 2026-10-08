import type { CostRow } from './CostRow'
import { formatUsd } from './formatters/formatUsd'
import { noAiPassLabel } from './noAiPassLabel'
import { priceNotConfirmedLabel } from './priceNotConfirmedLabel'

export function aiCostText(row: CostRow, perHour: number | undefined): string {
  if (row.correctionModel === null) return noAiPassLabel
  if (perHour === undefined) return priceNotConfirmedLabel
  return `${formatUsd(perHour)} per audio hour`
}
