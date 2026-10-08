import { defaultGoldPath } from './defaultGoldPath.ts'
import { retiredGoldPath } from './retiredGoldPath.ts'

/**
 * Retained `report-run-N.json` files measured the retired corpus and are
 * replayed against its own gold set; any other report belongs to the current one.
 */
export function goldPathForReport(reportFile: string): string {
  return /report-run-\d+\.json$/.test(reportFile)
    ? retiredGoldPath
    : defaultGoldPath
}
