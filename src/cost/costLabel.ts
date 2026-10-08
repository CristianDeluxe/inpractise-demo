import { formatUsd } from './formatters/formatUsd'
import { priceNotConfirmedLabel } from './priceNotConfirmedLabel'

/** USD when a confirmed price priced the tokens, otherwise the plain statement. */
export function costLabel(usd: number | undefined): string {
  return usd === undefined ? priceNotConfirmedLabel : formatUsd(usd)
}
